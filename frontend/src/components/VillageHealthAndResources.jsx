import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  MapPin, 
  Phone, 
  Truck, 
  Users, 
  Building2, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  VILLAGE_HEALTH_SCORE, 
  LOCAL_RESOURCES_DATA, 
  MARKET_LADDER, 
  BUSINESS_PARTNERS 
} from '../data/mockData';

export default function VillageHealthAndResources({ lang }) {
  const isHi = lang === 'hi';
  const [activeSubTab, setActiveSubTab] = useState('health'); // 'health' | 'resources' | 'market_ladder' | 'partners'
  const [liveHealthData, setLiveHealthData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/villages/default/health-score`)
      .then(r => r.json())
      .then(d => {
        if (d?.success && d?.health_score) {
          setLiveHealthData(d.health_score);
        }
      })
      .catch(e => console.warn('Live health score fetch fallback:', e));
  }, []);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 24px) 70px' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 32px auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(240, 253, 244, 0.9)',
          color: '#15803d',
          padding: '6px 16px',
          borderRadius: '999px',
          fontSize: '0.84rem',
          fontWeight: 700,
          marginBottom: '12px'
        }}>
          <BarChart3 size={16} />
          <span>{isHi ? 'फीचर 9, 11, 12, 13: ग्राम स्वास्थ्य स्कोर, सप्लायर व बाज़ार विस्तार' : 'Features 9, 11, 12, 13: Village Health, Resources & Market Ladder'}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.6rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
          {isHi ? 'गाँव की व्यापार क्षमता और सप्लायर नेटवर्क' : 'Village Business Health & Local Ecosystem'}
        </h1>
        <p style={{ color: '#64748b', fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)', marginTop: '10px' }}>
          {isHi 
            ? 'गाँव का समग्र स्वास्थ्य स्कोर, स्थानीय सप्लायर व ट्रांसपोर्टर सूची और गाँव से राष्ट्रीय बाज़ार तक पहुँचने की सीढ़ी।'
            : 'Explore village readiness score, local supplier contacts, verified partners, and your local-to-national expansion path.'}
        </p>

        {/* Sub-Tab Navigation */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '22px' }}>
          {[
            { id: 'health', labelHi: '📊 ग्राम स्वास्थ्य स्कोर', labelEn: 'Village Health Score' },
            { id: 'resources', labelHi: '📦 लोकल सप्लायर व बैंक', labelEn: 'Local Resources' },
            { id: 'market_ladder', labelHi: '📈 गाँव से राष्ट्रीय बाज़ार', labelEn: 'Market Ladder' },
            { id: 'partners', labelHi: '🤝 पार्टनर व SHG खोजें', labelEn: 'Partner Finder' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                border: activeSubTab === tab.id ? '2px solid #15803d' : '1px solid #cbd5e1',
                background: activeSubTab === tab.id ? '#dcfce7' : '#ffffff',
                color: activeSubTab === tab.id ? '#14532d' : '#475569',
                fontSize: '0.86rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isHi ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* SUB-VIEW 1: VILLAGE BUSINESS HEALTH SCORE (7 INDICATORS) */}
      {activeSubTab === 'health' && (
        <div>
          {/* Top Score Banner */}
          <div className="spacy-card" style={{
            padding: '32px',
            marginBottom: '28px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
            border: '2px solid #86efac',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase' }}>
                {isHi ? 'समग्र ग्राम व्यापार स्वास्थ्य स्कोर' : 'Village Business Health Score'}
              </span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#0f172a', fontWeight: 900, margin: '6px 0' }}>
                आदमपुर (Adampur) — {VILLAGE_HEALTH_SCORE.tier}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b', margin: 0 }}>
                {isHi ? '7 वैज्ञानिक पैमानों पर आधारित निष्पक्ष मूल्यांकन' : 'Evaluated across 7 real-time economic indicators'}
              </p>
            </div>

            <div style={{
              background: '#15803d',
              color: '#ffffff',
              padding: '16px 28px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 24px rgba(21, 128, 61, 0.25)'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>
                {VILLAGE_HEALTH_SCORE.overallScore}
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '4px' }}>
                {isHi ? '100 में से अंक' : 'Out of 100'}
              </div>
            </div>
          </div>

          {/* 7 Indicators Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '18px' }}>
            {VILLAGE_HEALTH_SCORE.indicators.map((ind, i) => (
              <div key={i} className="spacy-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                    {isHi ? ind.nameHi : ind.nameEn}
                  </span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 800, color: ind.score >= 80 ? '#15803d' : '#b45309' }}>
                    {ind.score}/100
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                  <div style={{
                    width: `${ind.score}%`,
                    height: '100%',
                    background: ind.score >= 80 ? 'linear-gradient(90deg, #16a34a, #22c55e)' : '#f59e0b',
                    borderRadius: '999px'
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                  <span>{isHi ? `महत्व: ${ind.weight}` : `Weight: ${ind.weight}`}</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{ind.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: LOCAL RESOURCES FINDER */}
      {activeSubTab === 'resources' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {LOCAL_RESOURCES_DATA.map((sec, i) => (
            <div key={i} className="spacy-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
                {sec.category}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '14px' }}>
                {sec.items.map((item, idx) => (
                  <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#15803d', fontWeight: 600, marginBottom: '8px' }}>
                      🏷️ {item.type} • 📍 {item.dist}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '10px' }}>
                      💰 {item.rate}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#0284c7', fontWeight: 700 }}>
                      <Phone size={14} />
                      <span>{item.contact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-VIEW 3: LOCAL-TO-NATIONAL MARKET ADVISOR */}
      {activeSubTab === 'market_ladder' && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
              {isHi ? 'गाँव से राष्ट्रीय स्तर तक 5-चरणीय विकास सीढ़ी' : '5-Stage Market Growth Ladder'}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
              Village → Nearby Haats → District Market → State Network → National E-Commerce
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MARKET_LADDER.map((step, idx) => (
              <div key={idx} className="spacy-card" style={{ padding: '22px', borderLeft: `6px solid ${idx === 0 ? '#15803d' : (idx === 4 ? '#7c3aed' : '#0284c7')}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ background: '#0f172a', color: '#ffffff', fontSize: '0.74rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px' }}>
                      {step.stage}
                    </span>
                    <h4 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                      {step.level}
                    </h4>
                  </div>
                  <span style={{ background: '#dcfce7', color: '#15803d', fontWeight: 800, fontSize: '0.82rem', padding: '3px 10px', borderRadius: '6px' }}>
                    {isHi ? 'अपेक्षित मार्जिन:' : 'Margin:'} {step.margin}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '12px', fontSize: '0.82rem', color: '#475569' }}>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', display: 'block' }}>📍 {isHi ? 'दायरा:' : 'Radius:'}</span>
                    <span>{step.radius}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', display: 'block' }}>👥 {isHi ? 'लक्षित ग्राहक:' : 'Target Customers:'}</span>
                    <span>{step.targetCustomers}</span>
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: '#0f172a', display: 'block' }}>📦 {isHi ? 'उपयुक्त उत्पाद:' : 'Products:'}</span>
                    <span>{step.products}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 4: BUSINESS PARTNER FINDER */}
      {activeSubTab === 'partners' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '20px' }}>
            {BUSINESS_PARTNERS.map(p => (
              <div key={p.id} className="spacy-card" style={{ padding: '24px' }}>
                <span style={{ background: '#eff6ff', color: '#1e40af', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', display: 'inline-block', marginBottom: '8px' }}>
                  🤝 {p.type}
                </span>
                <h4 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 6px 0' }}>
                  {p.name}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 14px 0' }}>
                  📍 {p.location}
                </p>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', fontSize: '0.82rem', marginBottom: '14px' }}>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>🛠️ {isHi ? 'कौशल:' : 'Skills:'}</span> {p.skills}
                  </div>
                  <div style={{ marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: '#15803d' }}>💰 {isHi ? 'उपलब्ध पूँजी/संसाधन:' : 'Capital/Assets:'}</span> {p.capitalAvailable}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: '#b45309' }}>🎯 {isHi ? 'क्या तलाश रहे हैं:' : 'Seeking:'}</span> {p.lookingFor}
                  </div>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid #15803d',
                    background: '#ffffff',
                    color: '#15803d',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  💬 {isHi ? 'भागीदारी हेतु संपर्क करें' : 'Connect for Partnership'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
