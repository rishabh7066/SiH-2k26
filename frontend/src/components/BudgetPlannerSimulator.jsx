import React, { useState } from 'react';
import { 
  Coins, 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  DollarSign,
  Users,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { BUDGET_PLANS } from '../data/mockData';

export default function BudgetPlannerSimulator({ lang, onStartWizard }) {
  const isHi = lang === 'hi';
  const [activeTab, setActiveTab] = useState('simulator'); // 'planner' | 'simulator'

  // Planner State
  const [selectedTier, setSelectedTier] = useState(100000);

  // Simulator Interactive Inputs
  const [investment, setInvestment] = useState(120000);
  const [customersPerDay, setCustomersPerDay] = useState(45);
  const [avgTicketPrice, setAvgTicketPrice] = useState(120);
  const [monthlyRent, setMonthlyRent] = useState(4500);
  const [employeeCost, setEmployeeCost] = useState(6000);
  const [cogsPercent, setCogsPercent] = useState(55); // Cost of goods sold %
  const [otherOpex, setOtherOpex] = useState(3500); // Electricity, packaging

  // What-If Modifiers
  const [whatIfStress, setWhatIfStress] = useState('normal'); // 'normal' | 'low_footfall' | 'rent_hike' | 'cost_spike'

  // Calculate dynamic simulator metrics
  let effectiveCustomers = customersPerDay;
  let effectiveRent = monthlyRent;
  let effectiveCogs = cogsPercent;

  if (whatIfStress === 'low_footfall') {
    effectiveCustomers = Math.round(customersPerDay * 0.8); // 20% drop
  } else if (whatIfStress === 'rent_hike') {
    effectiveRent = Math.round(monthlyRent * 1.35); // 35% rent surge
  } else if (whatIfStress === 'cost_spike') {
    effectiveCogs = Math.min(85, cogsPercent + 12); // 12% raw material spike
  }

  const monthlyRevenue = effectiveCustomers * avgTicketPrice * 30;
  const productCost = Math.round(monthlyRevenue * (effectiveCogs / 100));
  const totalMonthlyExpenses = productCost + effectiveRent + employeeCost + otherOpex;
  const monthlyProfit = monthlyRevenue - totalMonthlyExpenses;
  const profitMargin = monthlyRevenue > 0 ? Math.round((monthlyProfit / monthlyRevenue) * 100) : 0;
  const breakEvenMonths = monthlyProfit > 0 ? (investment / monthlyProfit).toFixed(1) : '∞ (घाटा / Loss)';

  const currentTierPlan = BUDGET_PLANS.find(p => p.tier === selectedTier) || BUDGET_PLANS[2];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 24px) 70px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(254, 243, 199, 0.9)',
          color: '#b45309',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '0.84rem',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          <Sliders size={16} />
          <span>{isHi ? 'फीचर 4 व 5: बजट बिजनेस प्लानर व बिजनेस सिम्युलेटर' : 'Features 4 & 5: Budget Business Planner & Simulator'}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
          {isHi ? 'पैसा लगाने से पहले कंप्यूटर पर चलाकर देखें व्यापार' : 'Simulate Business Performance Before You Invest'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)', marginTop: '10px' }}>
          {isHi 
            ? 'ग्राहक घटे या किराया बढ़ा तो क्या होगा? अपनी लागत, बिक्री और मुनाफे की लाइव जाँच करें।'
            : 'Adjust footfall, pricing, and expenses in real-time. Test stress scenarios like -20% customer drops or raw material price spikes.'}
        </p>

        {/* Tab switcher */}
        <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: '4px', borderRadius: '12px', marginTop: '20px' }}>
          <button
            onClick={() => setActiveTab('simulator')}
            style={{
              padding: '8px 20px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'simulator' ? '#ffffff' : 'transparent',
              color: activeTab === 'simulator' ? '#15803d' : '#64748b',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'simulator' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            🎛️ {isHi ? 'बिजनेस सिम्युलेटर (What-If)' : 'Live Business Simulator'}
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            style={{
              padding: '8px 20px',
              borderRadius: '9px',
              border: 'none',
              background: activeTab === 'planner' ? '#ffffff' : 'transparent',
              color: activeTab === 'planner' ? '#15803d' : '#64748b',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              boxShadow: activeTab === 'planner' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            💰 {isHi ? 'बजट प्लानर (₹25k - ₹5L+)' : 'Budget Business Planner'}
          </button>
        </div>
      </div>

      {/* VIEW 1: LIVE SIMULATOR & WHAT-IF ANALYSIS */}
      {activeTab === 'simulator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '28px', alignItems: 'start' }}>
          
          {/* Sliders Input Panel */}
          <div className="spacy-card" style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={20} color="#15803d" />
              <span>{isHi ? 'दुकान के दैनिक व मासिक आंकड़े' : 'Operating Cost & Revenue Sliders'}</span>
            </h3>

            {/* Customers Per Day */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#334155' }}>👥 {isHi ? 'दैनिक ग्राहक संख्या (Customers/Day)' : 'Daily Customers'}</span>
                <span style={{ color: '#15803d', fontWeight: 800 }}>{effectiveCustomers} {isHi ? 'लोग' : 'customers'}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="200" 
                value={customersPerDay} 
                onChange={e => setCustomersPerDay(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
              />
            </div>

            {/* Average Selling Ticket */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#334155' }}>🏷️ {isHi ? 'औसत प्रति ग्राहक बिल (Avg Bill)' : 'Avg Order Value'}</span>
                <span style={{ color: '#15803d', fontWeight: 800 }}>₹{avgTicketPrice}</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="500" 
                step="5"
                value={avgTicketPrice} 
                onChange={e => setAvgTicketPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
              />
            </div>

            {/* Product Cost % */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#334155' }}>📦 {isHi ? 'माल की खरीद लागत % (Cost of Goods)' : 'Product Raw Cost %'}</span>
                <span style={{ color: '#b45309', fontWeight: 800 }}>{effectiveCogs}%</span>
              </div>
              <input 
                type="range" 
                min="25" 
                max="80" 
                value={cogsPercent} 
                onChange={e => setCogsPercent(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#b45309', cursor: 'pointer' }}
              />
            </div>

            {/* Monthly Rent */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#334155' }}>🏠 {isHi ? 'दुकान का किराया (Monthly Rent)' : 'Monthly Rent'}</span>
                <span style={{ color: '#0f172a', fontWeight: 800 }}>₹{effectiveRent.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="25000" 
                step="500"
                value={monthlyRent} 
                onChange={e => setMonthlyRent(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
              />
            </div>

            {/* Employee Cost */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#334155' }}>👷 {isHi ? 'कर्मचारी वेतन (Helper Wage)' : 'Employee Wage'}</span>
                <span style={{ color: '#0f172a', fontWeight: 800 }}>₹{employeeCost.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20000" 
                step="500"
                value={employeeCost} 
                onChange={e => setEmployeeCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#0284c7', cursor: 'pointer' }}
              />
            </div>

            {/* Initial Investment */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: '#334155' }}>💰 {isHi ? 'शुरुआती पूँजी (Capex)' : 'Total Investment'}</span>
                <span style={{ color: '#15803d', fontWeight: 800 }}>₹{investment.toLocaleString('en-IN')}</span>
              </div>
              <input 
                type="range" 
                min="30000" 
                max="500000" 
                step="10000"
                value={investment} 
                onChange={e => setInvestment(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
              />
            </div>

            {/* 1-CLICK WHAT-IF SCENARIOS */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} color="#d97706" />
                <span>{isHi ? 'AI व्हाट-इफ तनाव परीक्षण (Stress Testing)' : 'AI What-If Stress Scenarios'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => setWhatIfStress('normal')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: whatIfStress === 'normal' ? '2px solid #15803d' : '1px solid #cbd5e1',
                    background: whatIfStress === 'normal' ? '#dcfce7' : '#ffffff',
                    color: whatIfStress === 'normal' ? '#14532d' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ✓ {isHi ? 'सामान्य स्थिति' : 'Normal Conditions'}
                </button>

                <button
                  onClick={() => setWhatIfStress('low_footfall')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: whatIfStress === 'low_footfall' ? '2px solid #b91c1c' : '1px solid #cbd5e1',
                    background: whatIfStress === 'low_footfall' ? '#fee2e2' : '#ffffff',
                    color: whatIfStress === 'low_footfall' ? '#b91c1c' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ {isHi ? 'ग्राहक 20% घट जाएँ' : '-20% Customers Drop'}
                </button>

                <button
                  onClick={() => setWhatIfStress('rent_hike')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: whatIfStress === 'rent_hike' ? '2px solid #d97706' : '1px solid #cbd5e1',
                    background: whatIfStress === 'rent_hike' ? '#fef3c7' : '#ffffff',
                    color: whatIfStress === 'rent_hike' ? '#b45309' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  📈 {isHi ? 'किराया 35% बढ़ जाए' : '+35% Rent Increase'}
                </button>

                <button
                  onClick={() => setWhatIfStress('cost_spike')}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: whatIfStress === 'cost_spike' ? '2px solid #d97706' : '1px solid #cbd5e1',
                    background: whatIfStress === 'cost_spike' ? '#fef3c7' : '#ffffff',
                    color: whatIfStress === 'cost_spike' ? '#b45309' : '#334155',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ⚠️ {isHi ? 'कच्चा माल 12% महंगा' : '+12% Cost Spike'}
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Live Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Top Highlight Card */}
            <div className="spacy-card" style={{
              padding: '24px',
              background: monthlyProfit > 0 ? 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' : '#fee2e2',
              border: `2px solid ${monthlyProfit > 0 ? '#86efac' : '#fca5a5'}`
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: monthlyProfit > 0 ? '#15803d' : '#b91c1c', textTransform: 'uppercase' }}>
                    {isHi ? 'मासिक शुद्ध मुनाफा (Net Monthly Profit)' : 'Net Monthly Profit'}
                  </span>
                  <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: monthlyProfit > 0 ? '#14532d' : '#991b1b', margin: '6px 0' }}>
                    ₹{monthlyProfit.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
                    {isHi ? `मुनाफा मार्जिन: ${profitMargin}%` : `Profit Margin: ${profitMargin}%`}
                  </div>
                </div>

                <div style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: monthlyProfit > 20000 ? '#dcfce7' : (monthlyProfit > 0 ? '#fef3c7' : '#fecaca'),
                  color: monthlyProfit > 20000 ? '#15803d' : (monthlyProfit > 0 ? '#b45309' : '#991b1b'),
                  fontWeight: 800,
                  fontSize: '0.85rem'
                }}>
                  {monthlyProfit > 20000 ? (isHi ? 'सुरक्षित व टिकाऊ' : 'Safe & Viable') : (monthlyProfit > 0 ? (isHi ? 'कम मार्जिन' : 'Tight Margin') : (isHi ? 'घाटे का जोखिम!' : 'High Loss Risk!'))}
                </div>
              </div>

              {whatIfStress !== 'normal' && (
                <div style={{ marginTop: '14px', padding: '8px 12px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', fontSize: '0.82rem', color: '#b45309', fontWeight: 600 }}>
                  ⚡ {isHi ? `तनाव टेस्ट लागू है: ${whatIfStress === 'low_footfall' ? '20% ग्राहक घटे हैं' : (whatIfStress === 'rent_hike' ? 'किराया बढ़ा है' : 'कच्चा माल महंगा हुआ है')}` : `Stress applied: ${whatIfStress}`}
                </div>
              )}
            </div>

            {/* Financial Breakdown Grid */}
            <div className="spacy-card" style={{ padding: '24px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                📊 {isHi ? 'वित्तीय विवरण (Financial Summary)' : 'Financial Breakdown'}
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{isHi ? 'मासिक कुल बिक्री (Revenue)' : 'Monthly Sales'}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>₹{monthlyRevenue.toLocaleString('en-IN')}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{isHi ? 'मासिक कुल खर्च (Total Opex)' : 'Total Monthly Cost'}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>₹{totalMonthlyExpenses.toLocaleString('en-IN')}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{isHi ? 'कच्चे माल की लागत' : 'Product Purchase Cost'}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#b45309' }}>₹{productCost.toLocaleString('en-IN')}</div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{isHi ? 'पूँजी वापसी समय' : 'Break-Even Period'}</div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#15803d' }}>
                    {breakEvenMonths} {monthlyProfit > 0 ? (isHi ? 'माह' : 'mo') : ''}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={onStartWizard}
                  className="btn-primary"
                  style={{ padding: '10px 22px', fontSize: '0.88rem', borderRadius: '12px' }}
                >
                  <span>{isHi ? 'बैंक प्रोजेक्ट रिपोर्ट तैयार करें' : 'Generate Bank Report'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BUDGET BUSINESS PLANNER (₹25k, ₹50k, ₹1L, ₹5L+) */}
      {activeTab === 'planner' && (
        <div>
          {/* Budget Tier Selector Chips */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {BUDGET_PLANS.map(plan => (
              <button
                key={plan.tier}
                onClick={() => setSelectedTier(plan.tier)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '14px',
                  border: selectedTier === plan.tier ? '2px solid #15803d' : '1px solid #cbd5e1',
                  background: selectedTier === plan.tier ? '#dcfce7' : '#ffffff',
                  color: selectedTier === plan.tier ? '#14532d' : '#334155',
                  fontSize: '1rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: selectedTier === plan.tier ? '0 4px 14px rgba(21, 128, 61, 0.15)' : 'none'
                }}
              >
                {isHi ? plan.labelHi : plan.label}
              </button>
            ))}
          </div>

          {/* Business Cards for Selected Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '24px' }}>
            {currentTierPlan.businesses.map(b => (
              <div key={b.id} className="spacy-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    {isHi ? b.nameHi : b.nameEn}
                  </h4>
                  <span style={{
                    background: b.risk === 'Low' ? '#dcfce7' : '#fef3c7',
                    color: b.risk === 'Low' ? '#15803d' : '#b45309',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {isHi ? `${b.risk} जोखिम` : `${b.risk} Risk`}
                  </span>
                </div>

                <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '16px' }}>
                  💡 {b.bestFor}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#f8fafc', padding: '14px', borderRadius: '12px', fontSize: '0.84rem', marginBottom: '16px' }}>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem' }}>{isHi ? 'शुरुआती निवेश:' : 'Capex:'}</span>
                    <strong style={{ color: '#0f172a' }}>₹{b.capex.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem' }}>{isHi ? 'मासिक खर्च:' : 'Monthly Opex:'}</span>
                    <strong style={{ color: '#0f172a' }}>₹{b.opex.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem' }}>{isHi ? 'मासिक बिक्री:' : 'Monthly Sales:'}</span>
                    <strong style={{ color: '#0f172a' }}>₹{b.expectedRev.toLocaleString('en-IN')}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748b', display: 'block', fontSize: '0.74rem' }}>{isHi ? 'अपेक्षित मुनाफा:' : 'Net Profit:'}</span>
                    <strong style={{ color: '#15803d' }}>₹{b.expectedProfit.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {isHi ? `लागत वापसी: ${b.breakEvenMonths} माह` : `Break-even: ${b.breakEvenMonths} mo`}
                  </span>
                  <button
                    onClick={onStartWizard}
                    className="btn-primary"
                    style={{ padding: '6px 14px', fontSize: '0.8rem', borderRadius: '8px' }}
                  >
                    <span>{isHi ? 'जाँच शुरू करें' : 'Start Plan'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
