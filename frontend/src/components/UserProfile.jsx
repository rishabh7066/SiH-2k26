import React from 'react';
import udyamLogo from '../images/Udyam (3).png';
import { 
  User, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  LogOut, 
  Briefcase, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  Award
} from 'lucide-react';

export default function UserProfile({ user, onLogout, onNavigate, lang = 'hi' }) {
  const isHi = lang === 'hi';

  const defaultUser = {
    name: user?.name || user?.user_metadata?.full_name || 'UdyamSaathi User',
    email: user?.email || 'user@udyamsaathi.ai',
    username: user?.username || (user?.email ? user.email.split('@')[0] : 'user'),
    avatar: user?.avatar || null,
    created: 'Active Member'
  };

  return (
    <div style={{
      maxWidth: '1080px',
      margin: '0 auto',
      padding: '36px 20px 80px',
      width: '100%',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* Top Banner Card */}
      <div style={{
        background: 'linear-gradient(135deg, #14532d 0%, #15803d 60%, #16a34a 100%)',
        borderRadius: '24px',
        padding: '36px 32px',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(21, 128, 61, 0.35)',
        marginBottom: '32px'
      }}>
        {/* Decorative background circle */}
        <div style={{
          position: 'absolute',
          right: '-40px',
          top: '-40px',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '84px',
              height: '84px',
              borderRadius: '20px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              flexShrink: 0
            }}>
              {defaultUser.avatar ? (
                <img 
                  src={defaultUser.avatar} 
                  alt={defaultUser.name} 
                  style={{ width: '100%', height: '100%', borderRadius: '20px', objectFit: 'cover' }} 
                />
              ) : (
                <img 
                  src={udyamLogo} 
                  alt={defaultUser.name} 
                  style={{ width: '65%', height: '65%', objectFit: 'contain' }} 
                />
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 800 }}>
                  {defaultUser.name}
                </h1>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(4px)',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={13} /> {isHi ? 'प्रमाणित उद्यमी' : 'Verified Entrepreneur'}
                </span>
              </div>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={15} /> {defaultUser.email}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => onNavigate('/dashboard')}
              style={{
                background: '#ffffff',
                color: '#15803d',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 20px',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <TrendingUp size={16} />
              <span>{isHi ? 'मेरा डैशबोर्ड' : 'My Dashboard'}</span>
            </button>

            {onLogout && (
              <button
                onClick={onLogout}
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.3)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
              >
                <LogOut size={16} />
                <span>{isHi ? 'लॉगआउट' : 'Log Out'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {/* Profile Details Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="#15803d" />
            {isHi ? 'गाँव एवं क्षेत्र विवरण' : 'Village & Regional Profile'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.88rem' }}>{isHi ? 'चयनित गाँव' : 'Target Village'}</span>
              <span style={{ fontWeight: 700, color: '#1e293b' }}>Ganeshpur (गणेशपुर)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.88rem' }}>{isHi ? 'विकास खंड (Block)' : 'Block'}</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Basti Sadar</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.88rem' }}>{isHi ? 'जिला एवं राज्य' : 'District & State'}</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Basti, Uttar Pradesh</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
              <span style={{ color: '#64748b', fontSize: '0.88rem' }}>{isHi ? 'पिनकोड' : 'Pincode'}</span>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>272002</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '4px' }}>
              <span style={{ color: '#64748b', fontSize: '0.88rem' }}>{isHi ? 'बिजली आपूर्ति' : 'Power Reliability'}</span>
              <span style={{ fontWeight: 600, color: '#15803d' }}>20 hrs / day</span>
            </div>
          </div>
        </div>

        {/* Quick Launchpad Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '28px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#15803d" />
            {isHi ? 'त्वरित विकल्प' : 'Quick Actions'}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={() => onNavigate('/business')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.3rem' }}>🔍</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {isHi ? 'नया व्यवसाय खोजें' : 'AI Business Finder'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {isHi ? 'गाँव की माँग अनुसार आइडियाज़' : 'Top local high-demand opportunities'}
                  </div>
                </div>
              </div>
              <ArrowRight size={16} color="#64748b" />
            </button>

            <button
              onClick={() => onNavigate('/schemes')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.3rem' }}>🛡️</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {isHi ? 'सरकारी लोन और सब्सिडी' : 'Safe Loans & Govt Schemes'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {isHi ? 'PMEGP, Mudra, NABARD योजनाएं' : 'PMEGP, Mudra and Subsidies'}
                  </div>
                </div>
              </div>
              <ArrowRight size={16} color="#64748b" />
            </button>

            <button
              onClick={() => onNavigate('/gap-map')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '12px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.3rem' }}>🗺️</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b' }}>
                    {isHi ? 'गाँव गैप मैप' : 'Village Gap Map'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    {isHi ? 'प्रतियोगी और माँग का नक्शा' : 'Live competitor density visualization'}
                  </div>
                </div>
              </div>
              <ArrowRight size={16} color="#64748b" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
