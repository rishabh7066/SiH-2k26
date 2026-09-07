import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  AlertTriangle, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  Calculator,
  Sliders,
  Building2
} from 'lucide-react';
import { SCHEMES_EXPANDED } from '../data/mockData';

export default function LoanSchemeMatcher({ lang, onStartWizard }) {
  const isHi = lang === 'hi';

  // Safe EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(300000);
  const [tenureYears, setTenureYears] = useState(5);
  const [interestRate, setInterestRate] = useState(9.0);
  const [monthlyNetProfit, setMonthlyNetProfit] = useState(38000);

  // Scheme Matcher Profile State
  const [applicantCategory, setApplicantCategory] = useState('special'); // 'general' | 'special' (women/sc/st/obc/minority)
  const [educationLevel, setEducationLevel] = useState('8th_pass'); // 'below_8th' | '8th_pass' | 'graduate'
  const [isRural, setIsRural] = useState(true);

  // EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const calculatedEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  // Safe EMI threshold = 35% of monthly profit
  const safeEmiLimit = Math.round(monthlyNetProfit * 0.35);
  const dscrRatio = (monthlyNetProfit / (calculatedEmi || 1)).toFixed(2);
  const emiPercentageOfProfit = Math.round((calculatedEmi / (monthlyNetProfit || 1)) * 100);

  // Loan Readiness Score (0 - 100)
  let loanReadinessScore = 88;
  if (dscrRatio < 1.3) loanReadinessScore = 45;
  else if (dscrRatio < 1.8) loanReadinessScore = 68;
  else if (dscrRatio >= 2.5) loanReadinessScore = 95;

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 24px) 70px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 36px auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(220, 252, 231, 0.9)',
          color: '#15803d',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '0.84rem',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          <ShieldCheck size={16} />
          <span>{isHi ? 'फीचर 6 व 7: सुरक्षित EMI कैलकुलेटर व सरकारी योजना मैचर' : 'Features 6 & 7: Safe EMI Calculator & Govt Scheme Matcher'}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
          {isHi ? 'बैंक कितना लोन देगा नहीं — आप कितना सुरक्षित चुका सकते हैं?' : 'How Much Loan Can You Safely Repay Without Stress?'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)', marginTop: '10px' }}>
          {isHi 
            ? 'कर्ज के जाल से बचें। जानिए अपनी सुरक्षित EMI सीमा और PMEGP व मुद्रा योजना में 35% तक सरकारी सब्सिडी पात्रता।'
            : 'Avoid predatory debt stress. Calculate your safe EMI buffer and discover 25%-35% government capital subsidies.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '28px', alignItems: 'start' }}>
        
        {/* Left: Safe Loan & EMI Calculator */}
        <div className="spacy-card" style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={20} color="#15803d" />
            <span>{isHi ? 'सुरक्षित लोन व EMI कैलकुलेटर' : 'Safe Loan & Repayment Calculator'}</span>
          </h3>

          {/* Loan Amount Slider */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#334155' }}>💰 {isHi ? 'लोन की राशि (Loan Amount)' : 'Required Loan Amount'}</span>
              <span style={{ color: '#15803d', fontWeight: 800 }}>₹{loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="2000000" 
              step="25000"
              value={loanAmount} 
              onChange={e => setLoanAmount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
            />
          </div>

          {/* Tenure Slider */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#334155' }}>⏳ {isHi ? 'लोन की अवधि (Tenure)' : 'Tenure (Years)'}</span>
              <span style={{ color: '#0f172a', fontWeight: 800 }}>{tenureYears} {isHi ? 'वर्ष' : 'years'}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="7" 
              value={tenureYears} 
              onChange={e => setTenureYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
            />
          </div>

          {/* Interest Rate */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#334155' }}>📈 {isHi ? 'ब्याज दर (Interest Rate %)' : 'Interest Rate %'}</span>
              <span style={{ color: '#0f172a', fontWeight: 800 }}>{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="6.5" 
              max="14.0" 
              step="0.25"
              value={interestRate} 
              onChange={e => setInterestRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#d97706', cursor: 'pointer' }}
            />
          </div>

          {/* Expected Business Profit */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#334155' }}>💵 {isHi ? 'दुकान से अपेक्षित मासिक मुनाफा (Net Profit)' : 'Expected Monthly Business Profit'}</span>
              <span style={{ color: '#15803d', fontWeight: 800 }}>₹{monthlyNetProfit.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="15000" 
              max="150000" 
              step="2000"
              value={monthlyNetProfit} 
              onChange={e => setMonthlyNetProfit(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
            />
          </div>

          {/* SAFE EMI COMPARISON BOX */}
          <div style={{
            background: calculatedEmi <= safeEmiLimit ? '#f0fdf4' : '#fef2f2',
            border: `2px solid ${calculatedEmi <= safeEmiLimit ? '#86efac' : '#fca5a5'}`,
            borderRadius: '16px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isHi ? 'मासिक बैंक किस्त (EMI)' : 'Monthly EMI'}
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: calculatedEmi <= safeEmiLimit ? '#15803d' : '#b91c1c' }}>
                  ₹{calculatedEmi.toLocaleString('en-IN')}<span style={{ fontSize: '0.8rem', color: '#64748b' }}>/माह</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                  {isHi ? 'आपकी सुरक्षित EMI सीमा' : 'Safe EMI Limit (35%)'}
                </span>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                  ₹{safeEmiLimit.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: calculatedEmi <= safeEmiLimit ? '#15803d' : '#b91c1c'
            }}>
              {calculatedEmi <= safeEmiLimit ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>{isHi ? '✓ सुरक्षित: मुनाफा किस्त का 2.5 गुना है। घर का खर्च सुरक्षित रहेगा।' : '✓ Safe: Net profit comfortably covers EMI.'}</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  <span>{isHi ? '⚠️ जोखिम: किस्त आपकी सुरक्षित सीमा से अधिक है! लोन राशि घटाएं।' : '⚠️ Risky: EMI exceeds 35% of net profit!'}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Government Scheme Matcher */}
        <div>
          <div className="spacy-card" style={{ padding: 'clamp(20px, 3vw, 32px)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="#d97706" />
              <span>{isHi ? 'सरकारी योजना मैचिंग (Govt Scheme Matcher)' : 'Government Scheme Matcher'}</span>
            </h3>

            {/* Profile filters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                  {isHi ? 'आवेदक श्रेणी (Category)' : 'Applicant Category'}
                </label>
                <select 
                  value={applicantCategory}
                  onChange={e => setApplicantCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                  <option value="special">महिला / SC / ST / OBC (35% सब्सिडी)</option>
                  <option value="general">सामान्य वर्ग पुरुष (25% सब्सिडी)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '4px' }}>
                  {isHi ? 'शिक्षा स्तर (Education)' : 'Education Level'}
                </label>
                <select 
                  value={educationLevel}
                  onChange={e => setEducationLevel(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                >
                  <option value="8th_pass">8वीं पास या अधिक (8th Pass+)</option>
                  <option value="below_8th">8वीं से कम (Below 8th)</option>
                </select>
              </div>
            </div>

            {/* Scheme Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {SCHEMES_EXPANDED.map(scheme => {
                const isTopMatch = scheme.id === 'pmegp';
                const subsidyRate = applicantCategory === 'special' ? scheme.subsidyRuralSpecial : scheme.subsidyRuralGeneral;

                return (
                  <div 
                    key={scheme.id}
                    style={{
                      background: isTopMatch ? '#f0fdf4' : '#ffffff',
                      border: isTopMatch ? '2px solid #86efac' : '1px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '18px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        {isTopMatch && (
                          <span style={{ background: '#15803d', color: '#ffffff', fontSize: '0.68rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '4px' }}>
                            ⭐ 98% MATCH
                          </span>
                        )}
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '2px 0 4px 0' }}>
                          {isHi ? scheme.nameHi : scheme.name}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                          {scheme.category}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>{isHi ? 'सब्सिडी' : 'Subsidy'}</span>
                        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803d' }}>{subsidyRate}</span>
                      </div>
                    </div>

                    {/* Required Documents Mini Checklist */}
                    <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1' }}>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                        📋 {isHi ? 'आवश्यक दस्तावेज (Required Documents):' : 'Key Documents:'}
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.75rem', color: '#64748b' }}>
                        {scheme.documents.slice(0, 4).map((doc, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={12} color="#15803d" />
                            <span>{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
