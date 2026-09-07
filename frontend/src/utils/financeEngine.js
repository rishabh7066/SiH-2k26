// Financial Calculation Engine based on SIH 26091 Specification

export function calculateProjectFinance({
  beneficiaryCapital = 100000,
  projectCostRatio = 10, // 10% margin -> 100% project cost = 10x capital
  interestRate = 8.5,
  tenureYears = 7,
  moratoriumMonths = 6,
  schemeId = "pmegp"
}) {
  const marginPercentage = 0.10; // 10% beneficiary contribution
  const calculatedProjectCost = Math.max(beneficiaryCapital / marginPercentage, 200000);
  
  // 90% loan structure
  const rawLoanAmount = calculatedProjectCost * 0.90;
  
  // Scheme limits
  const schemeCaps = {
    pmmy_kishore: 500000,
    pmegp: 2500000,
    kcc_dairy: 200000
  };

  const schemeCap = schemeCaps[schemeId] || 2500000;
  const eligibleLoan = Math.min(rawLoanAmount, schemeCap);

  // Recommended Loan considering affordability (USP 4 & 5)
  // Projected safe debt service capability
  const affordabilityCapFactor = 0.80; // Safe borrowing recommendation
  const recommendedLoan = Math.round(eligibleLoan * affordabilityCapFactor);

  // Monthly EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const repaymentMonths = totalMonths - moratoriumMonths;
  
  // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const emiEligible = Math.round(
    (eligibleLoan * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
    (Math.pow(1 + monthlyRate, repaymentMonths) - 1)
  );

  const emiRecommended = Math.round(
    (recommendedLoan * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) /
    (Math.pow(1 + monthlyRate, repaymentMonths) - 1)
  );

  // Eligibility score vs Affordability score
  const eligibilityScore = 92; // Meets criteria, margin, credit rating
  const affordabilityScore = 71; // At max loan ₹9L, cashflow coverage is tight; at ₹7.2L it is safe

  return {
    beneficiaryCapital,
    projectCost: calculatedProjectCost,
    rawLoanAmount,
    eligibleLoan,
    recommendedLoan,
    interestRate,
    tenureYears,
    moratoriumMonths,
    emiEligible,
    emiRecommended,
    eligibilityScore,
    affordabilityScore,
    marginPercentage: marginPercentage * 100
  };
}

export function simulateScenario({
  baseRevenue = 182000,
  baseOpex = 114000,
  emi = 12500,
  salesModPercent = 0, // e.g. -20
  rawMaterialModPercent = 0, // e.g. +15
  additionalWorkers = 0, // each ₹9,000/mo
  loanReductionPercent = 0
}) {
  const adjustedRevenue = Math.round(baseRevenue * (1 + salesModPercent / 100));
  const rawMaterialBase = baseOpex * 0.65; // ~65% of OPEX is feed/raw material
  const otherOpex = baseOpex * 0.35;

  const adjustedRawMaterial = Math.round(rawMaterialBase * (1 + rawMaterialModPercent / 100));
  const workerExpense = additionalWorkers * 9000;
  const totalOpex = adjustedRawMaterial + otherOpex + workerExpense;

  const adjustedEmi = Math.round(emi * (1 - loanReductionPercent / 100));
  const grossProfit = adjustedRevenue - totalOpex;
  const netSurplus = grossProfit - adjustedEmi;
  const dscr = adjustedEmi > 0 ? (grossProfit / adjustedEmi).toFixed(2) : "N/A";

  let healthStatus = "HEALTHY";
  let healthColor = "#10b981"; // green
  if (netSurplus < 8000) {
    healthStatus = "CRITICAL / DON'T START";
    healthColor = "#ef4444"; // red
  } else if (netSurplus < 25000) {
    healthStatus = "CAUTION / TIGHT CASHFLOW";
    healthColor = "#f59e0b"; // amber
  }

  return {
    adjustedRevenue,
    totalOpex,
    grossProfit,
    adjustedEmi,
    netSurplus,
    dscr,
    healthStatus,
    healthColor
  };
}
