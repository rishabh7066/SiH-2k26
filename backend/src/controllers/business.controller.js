import { supabaseAdmin } from '../config/supabase.js';

// ─── RUN FEASIBILITY ASSESSMENT ───────────────────────────────────────────────
export const runAssessment = async (req, res, next) => {
  try {
    const {
      village_id,
      village_name,
      business_type,
      investment_amount,
      loan_amount,
      monthly_income,
      household_expenses,
      existing_shops_count,
      population
    } = req.body;

    // ── Core scoring logic ────────────────────────────────────────────────────

    // 1. Market demand score (based on population vs shops)
    const popPerShop = population / Math.max(1, existing_shops_count);
    const demandScore = Math.min(100, Math.round((popPerShop / 200) * 40));

    // 2. Loan safety score — EMI should be ≤ 30% of net income
    const emi = loan_amount > 0 ? Math.round(loan_amount / 36) : 0; // 3-year tenure
    const netIncome = monthly_income - household_expenses;
    const emiRatio = netIncome > 0 ? emi / netIncome : 1;
    const loanSafetyScore = Math.min(40, Math.round(Math.max(0, 1 - emiRatio) * 40));

    // 3. Investment readiness score
    const coverageRatio = investment_amount > 0 ? (investment_amount - loan_amount) / investment_amount : 0;
    const investmentScore = Math.min(20, Math.round(coverageRatio * 20));

    // Total score
    const totalScore = demandScore + loanSafetyScore + investmentScore;

    // Verdict
    let verdict, verdictHi, recommendation;
    if (totalScore >= 70) {
      verdict = 'FEASIBLE';
      verdictHi = 'उपयुक्त';
      recommendation = 'Strong market demand and manageable loan. Recommended to proceed.';
    } else if (totalScore >= 45) {
      verdict = 'CAUTIOUS';
      verdictHi = 'सावधानी से';
      recommendation = 'Moderate opportunity. Reduce loan amount or choose less saturated business.';
    } else {
      verdict = 'NOT_RECOMMENDED';
      verdictHi = 'अनुशंसित नहीं';
      recommendation = 'High risk detected. Market may be saturated or loan EMI too high.';
    }

    const result_data = {
      score: totalScore,
      verdict,
      verdictHi,
      recommendation,
      breakdown: {
        demand: demandScore,
        loan_safety: loanSafetyScore,
        investment: investmentScore
      },
      emi,
      emiRatio: Math.round(emiRatio * 100),
      safe_loan_limit: Math.round(netIncome * 0.30 * 36),
      popPerShop: Math.round(popPerShop)
    };

    // ── Save to DB (if user is logged in) ────────────────────────────────────
    let assessment_id = null;
    if (req.user) {
      const { data: saved, error: saveError } = await supabaseAdmin
        .from('assessments')
        .insert({
          user_id: req.user.id,
          village_id: village_id || null,
          business_type,
          input_data: {
            village_name, investment_amount, loan_amount,
            monthly_income, household_expenses,
            existing_shops_count, population
          },
          result_data,
          score: totalScore
        })
        .select('id')
        .single();

      if (!saveError) assessment_id = saved?.id;
    }

    return res.status(200).json({
      success: true,
      assessment_id,
      result: result_data
    });
  } catch (err) {
    next(err);
  }
};

// ─── GET USER'S ASSESSMENT HISTORY ────────────────────────────────────────────
export const getHistory = async (req, res, next) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('assessments')
      .select('id, business_type, score, result_data, input_data, created_at')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) throw error;

    return res.status(200).json({ success: true, assessments: data });
  } catch (err) {
    next(err);
  }
};

// ─── GET SINGLE ASSESSMENT ─────────────────────────────────────────────────────
export const getAssessmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('assessments')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id) // RLS: only owner can see
      .single();

    if (error || !data) {
      return res.status(404).json({ success: false, error: 'Assessment not found' });
    }

    return res.status(200).json({ success: true, assessment: data });
  } catch (err) {
    next(err);
  }
};
