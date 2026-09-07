import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Coins, 
  Wrench, 
  CheckCircle2, 
  TrendingUp, 
  ArrowRight, 
  ShieldAlert, 
  Store, 
  Layers, 
  Star,
  Sliders,
  Award
} from 'lucide-react';
import { BUDGET_PLANS } from '../data/mockData';

export default function AIBusinessFinder({ lang, onSelectBusiness, onStartWizard }) {
  const isHi = lang === 'hi';

  // State inputs
  const [budget, setBudget] = useState(100000);
  const [village, setVillage] = useState('Adampur');
  const [skills, setSkills] = useState(['dairy', 'retail']);
  const [resources, setResources] = useState(['land', 'livestock']);
  const [experience, setExperience] = useState('some');

  const skillOptions = [
    { id: 'dairy', labelHi: 'दूध व पशुपालन', labelEn: 'Dairy & Livestock' },
    { id: 'retail', labelHi: 'दुकानदारी व ग्राहक सेवा', labelEn: 'Retail & Customer Handling' },
    { id: 'agro', labelHi: 'खेती व कृषि प्रसंस्करण', labelEn: 'Farming & Agro-Processing' },
    { id: 'tech', labelHi: 'डिजिटल व मोबाइल', labelEn: 'Digital & Mobile Tech' },
    { id: 'tailoring', labelHi: 'सिलाई व कढ़ाई', labelEn: 'Tailoring & Garments' },
    { id: 'mechanic', labelHi: 'मोटर व बिजली रिपेयर', labelEn: 'Electrical & Motor Repair' }
  ];

  const resourceOptions = [
    { id: 'land', labelHi: 'निजी ज़मीन / खेत', labelEn: 'Own Land/Farm' },
    { id: 'livestock', labelHi: 'गाय / भैंस', labelEn: 'Cattle/Livestock' },
    { id: 'shop', labelHi: 'सड़क किनारे खाली कमरा / दुकान', labelEn: 'Roadside Room/Shop' },
    { id: 'vehicle', labelHi: 'मोटरसाइकिल / ई-रिक्शा', labelEn: 'Bike/E-Rickshaw' },
    { id: 'power', labelHi: '3-फेज बिजली कनेक्शन', labelEn: '3-Phase Electricity' }
  ];

  const toggleSkill = (id) => {
    setSkills(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleResource = (id) => {
    setResources(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Find recommendations based on budget and skills
  let matchingBusinesses = [];
  BUDGET_PLANS.forEach(tier => {
    if (tier.tier <= budget * 1.3) {
      matchingBusinesses.push(...tier.businesses);
    }
  });

  // Calculate Opportunity Score (Demand, Competition, Profit, Resources)
  const recommendations = matchingBusinesses.map(biz => {
    let opp = biz.oppScore;
    if (resources.includes('livestock') && biz.id.includes('dairy')) opp += 4;
    if (resources.includes('land') && biz.id.includes('poultry')) opp += 3;
    if (resources.includes('shop') && biz.id.includes('csc')) opp += 5;
    if (skills.includes('tech') && biz.id.includes('csc')) opp += 4;
    return {
      ...biz,
      calculatedOppScore: Math.min(99, opp)
    };
  }).sort((a, b) => b.calculatedOppScore - a.calculatedOppScore).slice(0, 4);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 24px) 70px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 36px auto' }}>
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
          <Sparkles size={16} />
          <span>{isHi ? 'फीचर 1 व 3: एआई बिजनेस फाइंडर व अवसर स्कोर' : 'Features 1 & 3: AI Business Finder & Opportunity Score'}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
          {isHi ? 'अपने गाँव और बजट के अनुसार सबसे सही व्यापार खोजें' : 'Find The Most Profitable Village Business'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)', marginTop: '10px' }}>
          {isHi 
            ? 'अपनी पूँजी, अनुभव और उपलब्ध संसाधनों के आधार पर वैज्ञानिक अवसर स्कोर (Opportunity Score / 100) प्राप्त करें।'
            : 'Get an AI opportunity score based on your exact budget, existing skills, village demand and resources.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '28px', alignItems: 'start' }}>
        {/* Left Form: Parameters */}
        <div className="spacy-card" style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#15803d" />
            <span>{isHi ? 'आपकी जानकारी (Profile Inputs)' : 'Your Profile Inputs'}</span>
          </h3>

          {/* Location */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              📍 {isHi ? 'गाँव का नाम (Village)' : 'Village Name'}
            </label>
            <select 
              value={village} 
              onChange={e => setVillage(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.92rem', background: '#ffffff' }}
            >
              <option value="Adampur">आदमपुर (Adampur, Sewapuri)</option>
              <option value="Kapsethi">कपसेठी (Kapsethi, Varanasi)</option>
              <option value="Baraki">बराकी (Baraki, Sewapuri)</option>
            </select>
          </div>

          {/* Budget */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>
                💰 {isHi ? 'लगाने योग्य पूँजी (Budget)' : 'Available Budget'}
              </label>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#15803d' }}>
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input 
              type="range" 
              min="20000" 
              max="500000" 
              step="10000" 
              value={budget} 
              onChange={e => setBudget(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#15803d', cursor: 'pointer' }}
            />
            {/* Quick Budget Chips */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              {[25000, 50000, 100000, 300000, 500000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setBudget(amt)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: budget === amt ? '2px solid #15803d' : '1px solid #e2e8f0',
                    background: budget === amt ? '#dcfce7' : '#f8fafc',
                    color: budget === amt ? '#14532d' : '#475569',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ₹{(amt / 1000)}k
                </button>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              🛠️ {isHi ? 'आपकी रुचि व कौशल (Skills)' : 'Your Skills & Interests'}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skillOptions.map(s => {
                const active = skills.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSkill(s.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: active ? '1px solid #15803d' : '1px solid #cbd5e1',
                      background: active ? '#f0fdf4' : '#ffffff',
                      color: active ? '#15803d' : '#475569',
                      fontSize: '0.82rem',
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {active ? '✓ ' : '+ '}{isHi ? s.labelHi : s.labelEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Available Resources */}
          <div style={{ marginBottom: '22px' }}>
            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
              🏡 {isHi ? 'उपलब्ध संसाधन (Available Resources)' : 'Available Resources'}
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {resourceOptions.map(r => {
                const active = resources.includes(r.id);
                return (
                  <button
                    key={r.id}
                    onClick={() => toggleResource(r.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: active ? '1px solid #2563eb' : '1px solid #cbd5e1',
                      background: active ? '#eff6ff' : '#ffffff',
                      color: active ? '#2563eb' : '#475569',
                      fontSize: '0.82rem',
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer'
                    }}
                  >
                    {active ? '✓ ' : '+ '}{isHi ? r.labelHi : r.labelEn}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Recommendations Output with Opportunity Score */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a', fontWeight: 800, margin: 0 }}>
              {isHi ? `शीर्ष अनुशंसित व्यापार (${recommendations.length})` : `Top AI Recommendations (${recommendations.length})`}
            </h3>
            <span style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 700, background: '#dcfce7', padding: '4px 10px', borderRadius: '999px' }}>
              📍 {village}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recommendations.map((biz, idx) => (
              <div 
                key={biz.id} 
                className="spacy-card" 
                style={{ 
                  padding: '20px', 
                  borderLeft: idx === 0 ? '5px solid #15803d' : '1px solid rgba(226, 232, 240, 0.9)',
                  background: idx === 0 ? 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)' : '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    {idx === 0 && (
                      <span style={{ background: '#15803d', color: '#ffffff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '6px', display: 'inline-block' }}>
                        ⭐ {isHi ? 'सर्वोत्तम चुनाव (Top Match)' : 'Best Overall Match'}
                      </span>
                    )}
                    <h4 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 6px 0' }}>
                      {isHi ? biz.nameHi : biz.nameEn}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                      💡 {biz.bestFor}
                    </p>
                  </div>

                  {/* Big Opportunity Score Badge */}
                  <div style={{
                    background: biz.calculatedOppScore >= 90 ? '#dcfce7' : '#eff6ff',
                    border: `1px solid ${biz.calculatedOppScore >= 90 ? '#86efac' : '#bfdbfe'}`,
                    padding: '8px 14px',
                    borderRadius: '14px',
                    textAlign: 'center',
                    minWidth: '90px'
                  }}>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                      {isHi ? 'अवसर स्कोर' : 'Opp. Score'}
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900, color: biz.calculatedOppScore >= 90 ? '#15803d' : '#1e40af' }}>
                      {biz.calculatedOppScore}<span style={{ fontSize: '0.85rem', color: '#64748b' }}>/100</span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Pills */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px', marginTop: '16px', background: '#f8fafc', padding: '12px', borderRadius: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{isHi ? 'मांग (Demand)' : 'Demand Score'}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{biz.demandScore}/100</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{isHi ? 'प्रतिस्पर्धा' : 'Competition'}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: biz.compScore < 50 ? '#15803d' : '#b45309' }}>
                      {biz.compScore < 50 ? (isHi ? 'कम (अनुकूल)' : 'Low (Good)') : (isHi ? 'मध्यम' : 'Medium')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{isHi ? 'अनुमानित मुनाफा' : 'Monthly Profit'}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#15803d' }}>₹{biz.expectedProfit.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{isHi ? 'लागत वापसी' : 'Break-Even'}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{biz.breakEvenMonths} {isHi ? 'माह' : 'months'}</div>
                  </div>
                </div>

                {/* Action CTA */}
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      if (onSelectBusiness) onSelectBusiness(biz);
                      if (onStartWizard) onStartWizard();
                    }}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.84rem', borderRadius: '10px' }}
                  >
                    <span>{isHi ? 'इसकी पूरी फिजिबिलिटी देखें' : 'Detailed Feasibility'}</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
