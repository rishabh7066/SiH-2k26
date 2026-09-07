import React from 'react';
import { 
  ShieldCheck, 
  Heart,
  Phone,
  Sparkles
} from 'lucide-react';

export default function Footer({ onStartAssessment, onTriggerDemo, setActiveTab, lang }) {
  const isHi = lang === 'hi';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#0f172a',
      color: '#f8fafc',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: 'auto',
      padding: '22px clamp(16px, 4vw, 36px)',
      fontSize: '0.84rem'
    }}>
      <div style={{
        maxWidth: '1360px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left: Brand & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: '7px',
            background: 'linear-gradient(135deg, #15803d, #22c55e)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            flexShrink: 0
          }}>
            🌾
          </div>
          <div style={{ minWidth: 0 }}>
            <span style={{ fontWeight: 800, color: '#ffffff', fontSize: '0.88rem' }}>
              GramVenture <span style={{ color: '#4ade80' }}>AI</span>
            </span>
            <span className="desktop-only" style={{ color: '#64748b', margin: '0 8px' }}>|</span>
            <span className="desktop-only" style={{ color: '#94a3b8', fontSize: '0.75rem' }}>
              {isHi ? 'गाँव के सूक्ष्म उद्यमियों के लिए वित्तीय सलाहकार' : 'Rural Micro-Enterprise Advisory'}
            </span>
          </div>
        </div>

        {/* Center: Sleek Navigation Chips (Desktop Only) */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <span 
            onClick={() => { setActiveTab('landing'); scrollToTop(); }}
            style={{ color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#4ade80'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            {isHi ? 'होम' : 'Home'}
          </span>
          <span style={{ color: '#334155' }}>•</span>
          <span 
            onClick={() => { onStartAssessment(); scrollToTop(); }}
            style={{ color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#4ade80'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            {isHi ? 'जाँच शुरू करें' : 'Start Assessment'}
          </span>
          <span style={{ color: '#334155' }}>•</span>
          <span 
            onClick={() => { onTriggerDemo(); scrollToTop(); }}
            style={{ color: '#cbd5e1', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onMouseEnter={(e) => e.target.style.color = '#4ade80'}
            onMouseLeave={(e) => e.target.style.color = '#cbd5e1'}
          >
            {isHi ? 'डेमो रिपोर्ट' : 'Sample Demo'}
          </span>
          <span style={{ color: '#334155' }}>•</span>
          <span style={{ color: '#94a3b8', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <Phone size={13} color="#4ade80" /> 1800-180-1551 (टोल-फ्री)
          </span>
        </div>

        {/* Mobile: Compact footer with only phone & copyright */}
        <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.72rem' }}>
          <Phone size={12} color="#4ade80" />
          <span>1800-180-1551</span>
        </div>

        {/* Right: Copyright & Made with Love */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '0.72rem' }}>
          <span>© {new Date().getFullYear()} GramVenture AI</span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {isHi ? 'आत्मनिर्भर भारत' : 'Made with'} <Heart size={10} color="#ef4444" fill="#ef4444" />
          </span>
        </div>
      </div>
    </footer>
  );
}
