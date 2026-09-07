import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Sun, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';
import { AI_BUSINESS_ALERTS } from '../data/mockData';

export default function AIBusinessAlerts({ lang, onClose }) {
  const isHi = lang === 'hi';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(20px, 3vw, 32px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309' }}>
            <Bell size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              {isHi ? 'लाइव एआई व्यापार अलर्ट (Live Alerts)' : 'Live AI Business Alerts'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>
              {isHi ? 'मौसम, आगामी मेले, त्योहारी मांग व मंडी के ताज़ा रुझान' : 'Weather, festival surge, and local commodity price shifts'}
            </p>
          </div>
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {AI_BUSINESS_ALERTS.map(alert => (
          <div 
            key={alert.id}
            className="spacy-card"
            style={{ 
              padding: '20px', 
              borderLeft: `5px solid ${alert.urgency === 'High' ? '#ef4444' : (alert.urgency === 'Opportunity' ? '#15803d' : '#f59e0b')}` 
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  background: alert.urgency === 'High' ? '#fee2e2' : (alert.urgency === 'Opportunity' ? '#dcfce7' : '#fef3c7'),
                  color: alert.urgency === 'High' ? '#b91c1c' : (alert.urgency === 'Opportunity' ? '#15803d' : '#b45309'),
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px'
                }}>
                  {alert.urgency === 'High' ? (isHi ? 'उच्च प्राथमिकता' : 'High Urgency') : (alert.urgency === 'Opportunity' ? (isHi ? 'मुनाफे का मौका' : 'Profit Opportunity') : (isHi ? 'मध्यम' : 'Notice'))}
                </span>
                <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  {isHi ? alert.titleHi : alert.titleEn}
                </h4>
              </div>

              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b' }}>
                {alert.impactTrade}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '6px 0 12px 0' }}>
              {isHi ? alert.descHi : alert.descEn}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem' }}>
              <span style={{ color: '#0f172a', fontWeight: 700 }}>
                💡 {isHi ? 'अनुशंसित कदम:' : 'Recommended Action:'} {alert.action}
              </span>
              <span style={{ color: '#15803d', fontWeight: 700 }}>
                {isHi ? 'सक्रिय' : 'Active Now'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
