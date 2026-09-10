import React, { useState } from 'react';
import udyamLogo from '../images/Udyam (3).png';
import { 
  Sparkles, 
  Languages, 
  PlayCircle,
  MoreVertical,
  X,
  Compass,
  FileCheck,
  LogIn
} from 'lucide-react';

export default function Header({ 
  lang, 
  setLang, 
  onStartAssessment, 
  onTriggerDemo,
  activeTab,
  setActiveTab,
  onOpenAlerts,
  onOpenWhatsApp,
  user,
  onLogout
}) {
  const isHi = lang === 'hi';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      padding: '14px clamp(16px, 4vw, 36px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 16px rgba(0, 0, 0, 0.03)'
    }}>
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('landing')}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', minWidth: 0 }}
      >
        <img 
          src={udyamLogo} 
          alt="UdyamSaathi Logo" 
          style={{
            height: '48px',
            width: 'auto',
            objectFit: 'contain',
            flexShrink: 0
          }} 
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '1.32rem', fontWeight: 800, color: '#14532d', letterSpacing: '-0.01em', whiteSpace: 'nowrap', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
              𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊
            </span>
          </div>
          <p className="desktop-only" style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {isHi ? 'गाँव स्तर पर व्यापार सलाह और वित्तीय योजना' : 'Village-Level Business Advisory'}
          </p>
        </div>
      </div>

      {/* Desktop Center Nav */}
      <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <button 
          onClick={() => setActiveTab('landing')}
          style={{
            background: activeTab === 'landing' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'landing' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'landing' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          {isHi ? 'होम' : 'Home'}
        </button>

        <button 
          onClick={() => setActiveTab('finder')}
          style={{
            background: activeTab === 'finder' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'finder' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'finder' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          🔍 {isHi ? 'बिजनेस फाइंडर' : 'AI Finder'}
        </button>

        <button 
          onClick={() => setActiveTab('gap_map')}
          style={{
            background: activeTab === 'gap_map' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'gap_map' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'gap_map' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          🗺️ {isHi ? 'गैप मैप' : 'Gap Map'}
        </button>

        <button 
          onClick={() => setActiveTab('simulator')}
          style={{
            background: activeTab === 'simulator' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'simulator' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'simulator' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          🎛️ {isHi ? 'सिम्युलेटर' : 'Simulator'}
        </button>

        <button 
          onClick={() => setActiveTab('loan_schemes')}
          style={{
            background: activeTab === 'loan_schemes' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'loan_schemes' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'loan_schemes' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          🛡️ {isHi ? 'सुरक्षित EMI' : 'Safe EMI'}
        </button>

        <button 
          onClick={() => setActiveTab('health_resources')}
          style={{
            background: activeTab === 'health_resources' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'health_resources' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'health_resources' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          📊 {isHi ? 'ग्राम नेटवर्क' : 'Village Hub'}
        </button>

        <button 
          onClick={() => setActiveTab('dashboard')}
          style={{
            background: activeTab === 'dashboard' ? 'rgba(21, 128, 61, 0.12)' : 'transparent',
            color: activeTab === 'dashboard' ? '#15803d' : '#475569',
            fontWeight: activeTab === 'dashboard' ? 700 : 500,
            border: 'none',
            padding: '7px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.84rem'
          }}
        >
          📈 {isHi ? 'डैशबोर्ड' : 'Dashboard'}
        </button>
      </nav>

      {/* Desktop Right Actions (Hidden on Mobile) */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Live Alerts Bell */}
        <button
          onClick={onOpenAlerts}
          title={isHi ? 'लाइव एआई अलर्ट्स' : 'AI Business Alerts'}
          style={{
            position: 'relative',
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#b45309'
          }}
        >
          🔔
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#ef4444',
            color: '#ffffff',
            fontSize: '0.65rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            3
          </span>
        </button>

        {/* WhatsApp AI Advisor Button */}
        <button
          onClick={onOpenWhatsApp}
          title="WhatsApp AI Advisor"
          style={{
            background: '#25d366',
            color: '#ffffff',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
          }}
        >
          <span>💬</span>
          <span>WhatsApp AI</span>
        </button>

        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(203, 213, 225, 0.9)',
            borderRadius: '10px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.84rem',
            fontWeight: 600,
            color: '#1e293b'
          }}
        >
          <Languages size={15} color="#475569" />
          <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
        </button>

        {/* User Account & Logout */}
        {user && onLogout && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: activeTab === 'profile' ? 'rgba(21, 128, 61, 0.12)' : '#f8fafc',
                border: activeTab === 'profile' ? '1px solid #15803d' : '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '7px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: activeTab === 'profile' ? '#15803d' : '#334155',
                transition: 'all 0.2s ease'
              }}
              title={isHi ? 'प्रोफ़ाइल देखें' : 'View Profile'}
            >
              <span style={{ 
                width: '8px', 
                height: '8px', 
                borderRadius: '50%', 
                background: '#15803d', 
                display: 'inline-block' 
              }} />
              <span>{user.username || user.name || 'User'}</span>
            </button>
            <button
              onClick={onLogout}
              style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                padding: '7px 10px',
                cursor: 'pointer',
                fontSize: '0.76rem',
                fontWeight: 600,
                color: '#dc2626'
              }}
              title={isHi ? 'लॉगआउट करें' : 'Log Out'}
            >
              ⎋
            </button>
          </div>
        )}

        <button 
          onClick={onStartAssessment}
          className="btn-primary"
          style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: '10px' }}
        >
          <Sparkles size={15} />
          <span>{isHi ? 'जाँच शुरू करें' : 'Assessment'}</span>
        </button>
      </div>

      {/* MOBILE ONLY CONTROLS (Compact Primary CTA + Three Dots Button) */}
      <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={onStartAssessment}
          className="btn-primary"
          style={{ padding: '7px 12px', fontSize: '0.78rem', borderRadius: '8px' }}
        >
          <Sparkles size={14} />
          <span>{isHi ? 'जाँच करें' : 'Start'}</span>
        </button>

        {/* Three Dots (⋮) Button for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #cbd5e1',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#334155'
          }}
          title="More options"
        >
          {isMobileMenuOpen ? <X size={18} /> : <MoreVertical size={18} />}
        </button>
      </div>

      {/* MOBILE THREE-DOT DROPDOWN MODAL */}
      {isMobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: '58px',
            right: '16px',
            width: '240px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(203, 213, 225, 0.8)',
            borderRadius: '16px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.15)',
            padding: '12px',
            zIndex: 1000
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={() => { setActiveTab('landing'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'landing' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'landing' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'landing' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🏡 {isHi ? 'होम पेज' : 'Home'}
            </button>

            <button
              onClick={() => { setActiveTab('finder'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'finder' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'finder' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'finder' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🔍 {isHi ? 'एआई बिजनेस फाइंडर' : 'AI Business Finder'}
            </button>

            <button
              onClick={() => { setActiveTab('gap_map'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'gap_map' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'gap_map' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'gap_map' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🗺️ {isHi ? 'ग्राम गैप मैप' : 'Village Gap Map'}
            </button>

            <button
              onClick={() => { setActiveTab('simulator'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'simulator' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'simulator' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'simulator' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🎛️ {isHi ? 'सिम्युलेटर व प्लानर' : 'Simulator & Planner'}
            </button>

            <button
              onClick={() => { setActiveTab('loan_schemes'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'loan_schemes' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'loan_schemes' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'loan_schemes' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              🛡️ {isHi ? 'सुरक्षित EMI व योजनाएं' : 'Safe EMI & Schemes'}
            </button>

            <button
              onClick={() => { setActiveTab('health_resources'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'health_resources' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'health_resources' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'health_resources' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              📊 {isHi ? 'ग्राम स्वास्थ्य व सप्लायर' : 'Village Health & Network'}
            </button>

            <button
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'dashboard' ? '#f0fdf4' : 'transparent',
                color: activeTab === 'dashboard' ? '#15803d' : '#334155',
                fontWeight: activeTab === 'dashboard' ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              📈 {isHi ? 'व्यापार डैशबोर्ड' : 'Business Dashboard'}
            </button>

            <button
              onClick={() => { if (onOpenAlerts) onOpenAlerts(); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: '#fef3c7',
                color: '#b45309',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔔 {isHi ? 'लाइव व्यापार अलर्ट' : 'Live Alerts (3)'}
            </button>

            <button
              onClick={() => { if (onOpenWhatsApp) onOpenWhatsApp(); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: '#dcfce7',
                color: '#15803d',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              💬 WhatsApp AI Advisor
            </button>

            <button
              onClick={() => { onTriggerDemo(); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: '#f8fafc',
                color: '#15803d',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <PlayCircle size={15} color="#15803d" />
              <span>{isHi ? 'उदाहरण देखें (डेमो)' : 'View Sample Demo'}</span>
            </button>

            {user && (
              <button
                onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === 'profile' ? '#f0fdf4' : 'transparent',
                  color: activeTab === 'profile' ? '#15803d' : '#334155',
                  fontWeight: activeTab === 'profile' ? 700 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>👤</span>
                <span>{isHi ? 'मेरी प्रोफ़ाइल' : 'My Profile'}</span>
              </button>
            )}

            {user && onLogout && (
              <button
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#fef2f2',
                  color: '#b91c1c',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🚪</span>
                <span>{isHi ? 'लॉगआउट करें' : 'Log Out'} ({user.username || 'Account'})</span>
              </button>
            )}

            <div style={{ height: '1px', background: '#e2e8f0', margin: '4px 0' }} />

            <button
              onClick={() => { setLang(lang === 'en' ? 'hi' : 'en'); setIsMobileMenuOpen(false); }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '9px 12px',
                borderRadius: '8px',
                border: 'none',
                background: '#f1f5f9',
                color: '#0f172a',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Languages size={15} color="#475569" />
              <span>{lang === 'en' ? 'हिन्दी में बदलें' : 'Switch to English'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
