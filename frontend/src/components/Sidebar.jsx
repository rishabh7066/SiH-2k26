import React from 'react';
import udyamLogo from '../images/Udyam (3).png';
import { 
  PlayCircle,
  X,
  Languages,
  LogOut
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  onNavigate, 
  isOpen, 
  onClose,
  lang = 'hi',
  setLang,
  onOpenAlerts,
  onOpenWhatsApp,
  onTriggerDemo,
  user,
  onLogout
}) {
  const isHi = lang === 'hi';

  // Primary navigation items matching Image 2
  const navItems = [
    { id: 'landing', label: isHi ? 'होम पेज' : 'Home', emoji: '🏡' },
    { id: 'finder', label: isHi ? 'एआई बिजनेस फाइंडर' : 'AI Business Finder', emoji: '🔍' },
    { id: 'gap_map', label: isHi ? 'ग्राम गैप मैप' : 'Village Gap Map', emoji: '🗺️' },
    { id: 'simulator', label: isHi ? 'सिम्युलेटर व प्लानर' : 'Simulator & Planner', emoji: '🎛️' },
    { id: 'loan_schemes', label: isHi ? 'सुरक्षित EMI व योजनाएं' : 'Safe EMI & Schemes', emoji: '🛡️' },
    { id: 'health_resources', label: isHi ? 'ग्राम स्वास्थ्य व सप्लायर' : 'Village Health & Network', emoji: '📊' },
    { id: 'dashboard', label: isHi ? 'व्यापार डैशबोर्ड' : 'Business Dashboard', emoji: '📈' }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 998,
            display: 'block'
          }}
          className="mobile-backdrop"
        />
      )}

      {/* Left Sidebar Container */}
      <aside 
        style={{
          width: '260px',
          minWidth: '260px',
          height: '100vh',
          position: 'sticky',
          top: 0,
          background: '#FAF5F4',
          borderRight: '1px solid #F0E6E4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px 14px 16px 14px',
          zIndex: 999,
          boxSizing: 'border-box',
          overflowY: 'auto',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className={`dashboard-sidebar ${isOpen ? 'sidebar-open' : ''}`}
      >
        <div>
          {/* Top Branding Section matching reference format */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            padding: '4px 6px'
          }}>
            <div 
              onClick={() => { onNavigate('landing'); if (onClose) onClose(); }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', minWidth: 0 }}
            >
              <img 
                src={udyamLogo} 
                alt="UdyamSaathi Logo" 
                style={{
                  height: '46px',
                  width: 'auto',
                  objectFit: 'contain',
                  flexShrink: 0
                }} 
              />
              <div style={{ minWidth: 0 }}>
                <h1 style={{
                  fontSize: '1.28rem',
                  fontWeight: 800,
                  color: '#14532d',
                  lineHeight: 1.15,
                  margin: 0,
                  letterSpacing: '-0.01em',
                  fontFamily: "'Playfair Display', 'Georgia', serif",
                  whiteSpace: 'nowrap'
                }}>
                  𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊
                </h1>
                <span style={{
                  display: 'block',
                  marginTop: '2px',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: '#64748b',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {isHi ? 'ग्रामीण व्यापार सलाहकार' : 'VILLAGE ADVISORY'}
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                padding: '4px',
                display: 'none'
              }}
              className="sidebar-close-btn"
              title="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Navigation Links (from Image 2) */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    if (onClose) onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#FFFFFF' : '#334155',
                    background: isActive ? '#15803d' : 'transparent',
                    boxShadow: isActive ? '0 4px 14px rgba(21, 128, 61, 0.3)' : 'none',
                    transition: 'all 0.16s ease',
                    textAlign: 'left',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f0fdf4';
                      e.currentTarget.style.color = '#15803d';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#334155';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.05rem', lineHeight: 1 }}>{item.emoji}</span>
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.label}
                  </span>
                </button>
              );
            })}

            {/* Separator */}
            <div style={{ height: '1px', background: '#EFE4E2', margin: '8px 4px' }} />

            {/* 1. Live Alerts Button (Image 2 item) */}
            <button
              onClick={() => {
                if (onOpenAlerts) onOpenAlerts();
                if (onClose) onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '9px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.84rem',
                fontWeight: 700,
                background: '#fef3c7',
                color: '#b45309',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span>🔔</span>
              <span style={{ flex: 1 }}>{isHi ? 'लाइव व्यापार अलर्ट' : 'Live Alerts'}</span>
              <span style={{
                background: '#ef4444',
                color: '#ffffff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}>
                3
              </span>
            </button>

            {/* 2. WhatsApp AI Advisor (Image 2 item) */}
            <button
              onClick={() => {
                if (onOpenWhatsApp) onOpenWhatsApp();
                if (onClose) onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '9px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.84rem',
                fontWeight: 700,
                background: '#dcfce7',
                color: '#15803d',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <span>💬</span>
              <span>WhatsApp AI Advisor</span>
            </button>

            {/* 3. Sample Demo Button (Image 2 item) */}
            <button
              onClick={() => {
                if (onTriggerDemo) onTriggerDemo();
                if (onClose) onClose();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                width: '100%',
                padding: '9px 14px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.84rem',
                fontWeight: 600,
                background: '#f8fafc',
                color: '#15803d',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
            >
              <PlayCircle size={16} color="#15803d" />
              <span>{isHi ? 'उदाहरण देखें (डेमो)' : 'View Sample Demo'}</span>
            </button>

            {/* 4. User Profile (Image 2 item) */}
            {user && (
              <button
                onClick={() => {
                  onNavigate('profile');
                  if (onClose) onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '9px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.84rem',
                  fontWeight: activeTab === 'profile' ? 700 : 500,
                  background: activeTab === 'profile' ? '#f0fdf4' : 'transparent',
                  color: activeTab === 'profile' ? '#15803d' : '#334155',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>👤</span>
                <span>{isHi ? 'मेरी प्रोफ़ाइल' : 'My Profile'}</span>
              </button>
            )}
          </nav>
        </div>

        {/* Bottom Section (User Logout + Language Switcher matching Image 2) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
          {/* Logout Button */}
          {user && onLogout && (
            <button
              onClick={() => {
                if (onClose) onClose();
                onLogout();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '9px 12px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                background: '#fee2e2',
                color: '#dc2626',
                textAlign: 'left'
              }}
            >
              <LogOut size={15} color="#dc2626" />
              <div style={{ minWidth: 0, flex: 1 }}>
                <span style={{ display: 'block', fontWeight: 700 }}>
                  {isHi ? 'लॉगआउट करें' : 'Log Out'}
                </span>
                <span style={{ fontSize: '0.68rem', color: '#991b1b', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                  ({user.username || user.name || user.email?.split('@')[0] || 'user'})
                </span>
              </div>
            </button>
          )}

          {/* Switch to English / हिन्दी toggle button */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '8px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
              background: '#ffffff',
              color: '#334155'
            }}
          >
            <Languages size={14} color="#475569" />
            <span>{isHi ? 'Switch to English' : 'हिन्दी में बदलें'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
