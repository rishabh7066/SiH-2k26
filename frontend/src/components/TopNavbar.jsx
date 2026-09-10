import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Languages, 
  LogOut, 
  User, 
  Sparkles,
  PlayCircle
} from 'lucide-react';

export default function TopNavbar({
  activeTab,
  onToggleSidebar,
  onOpenAlerts,
  onOpenWhatsApp,
  onStartAssessment,
  onTriggerDemo,
  lang,
  setLang,
  user,
  onLogout,
  onNavigate
}) {
  const isHi = lang === 'hi';
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Dynamic titles matching UdyamSaathi views
  const getPageTitle = () => {
    switch (activeTab) {
      case 'landing':
        return isHi ? 'गाँव स्तर पर व्यापार सलाह' : 'Village Business Advisory';
      case 'finder':
        return isHi ? 'एआई बिजनेस फाइंडर' : 'AI Business Finder';
      case 'gap_map':
        return isHi ? 'ग्राम गैप मैप' : 'Village Gap Map';
      case 'simulator':
        return isHi ? 'सिम्युलेटर व बिजनेस प्लानर' : 'Simulator & Planner';
      case 'loan_schemes':
        return isHi ? 'सुरक्षित EMI व सरकारी योजनाएं' : 'Safe EMI & Schemes';
      case 'health_resources':
        return isHi ? 'ग्राम स्वास्थ्य व सप्लायर नेटवर्क' : 'Village Health & Network';
      case 'dashboard':
        return isHi ? 'व्यापार विश्लेषण डैशबोर्ड' : 'Business Feasibility Dashboard';
      case 'profile':
        return isHi ? 'उपयोगकर्ता प्रोफ़ाइल' : 'User Profile';
      case 'wizard':
        return isHi ? 'नया व्यापार मूल्यांकन' : 'Business Assessment Wizard';
      default:
        return isHi ? '𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊' : '𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊';
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('map') || q.includes('gap') || q.includes('मैप')) onNavigate('gap_map');
    else if (q.includes('loan') || q.includes('emi') || q.includes('योजना') || q.includes('लोन')) onNavigate('loan_schemes');
    else if (q.includes('sim') || q.includes('बजट') || q.includes('प्लानर')) onNavigate('simulator');
    else if (q.includes('health') || q.includes('hub') || q.includes('सप्लायर') || q.includes('गांव')) onNavigate('health_resources');
    else if (q.includes('dash') || q.includes('रिपोर्ट') || q.includes('डैशबोर्ड')) onNavigate('dashboard');
    else if (q.includes('home') || q.includes('होम')) onNavigate('landing');
    else onNavigate('finder');
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid #F0E6E4',
      padding: '12px clamp(14px, 2.5vw, 28px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '14px',
      boxSizing: 'border-box'
    }}>
      {/* Left: Mobile Toggle + Dynamic Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: '#FAF5F4',
            border: '1px solid #EFE4E2',
            borderRadius: '10px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#15803d'
          }}
          className="top-hamburger-btn"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h2 style={{
            fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
            fontWeight: 800,
            color: '#14532d',
            margin: 0,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif"
          }}>
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Middle: Rounded Search Bar (inspired by reference image 1) */}
      <form 
        onSubmit={handleSearchSubmit}
        style={{
          flex: '1',
          maxWidth: '420px',
          margin: '0 12px',
          position: 'relative'
        }}
        className="top-search-form"
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#FAF5F4',
          border: '1px solid #EFE4E2',
          borderRadius: '9999px',
          padding: '7px 14px',
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
        }}>
          <Search size={15} color="#64748b" style={{ flexShrink: 0 }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isHi ? "गाँव, व्यवसाय, या योजना खोजें..." : "Search village, business, or scheme..."}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: '0.84rem',
              color: '#334155',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </form>

      {/* Right Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        {/* Live Alerts Bell */}
        <button
          onClick={onOpenAlerts}
          title={isHi ? 'लाइव व्यापार अलर्ट' : 'Live Alerts'}
          style={{
            position: 'relative',
            background: '#fef3c7',
            border: '1px solid #fde68a',
            borderRadius: '10px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#b45309'
          }}
        >
          <Bell size={17} />
          <span style={{
            position: 'absolute',
            top: '-3px',
            right: '-3px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#ef4444',
            color: '#ffffff',
            fontSize: '0.62rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            3
          </span>
        </button>

        {/* WhatsApp AI Button */}
        <button
          onClick={onOpenWhatsApp}
          title="WhatsApp AI Advisor"
          style={{
            background: '#25d366',
            color: '#ffffff',
            border: 'none',
            padding: '7px 12px',
            borderRadius: '10px',
            fontSize: '0.8rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)'
          }}
          className="desktop-only"
        >
          <span>💬</span>
          <span>WhatsApp AI</span>
        </button>

        {/* Start Assessment CTA Button */}
        <button 
          onClick={onStartAssessment}
          style={{
            background: 'linear-gradient(135deg, #15803d, #166534)',
            color: '#ffffff',
            border: 'none',
            padding: '7px 14px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(21, 128, 61, 0.28)'
          }}
        >
          <Sparkles size={14} />
          <span>{isHi ? 'जाँच करें' : 'Start'}</span>
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
          style={{
            background: '#FAF5F4',
            border: '1px solid #EFE4E2',
            borderRadius: '10px',
            padding: '6px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#15803d'
          }}
          title={isHi ? 'Switch to English' : 'हिन्दी में बदलें'}
        >
          <Languages size={14} color="#15803d" />
          <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
        </button>

        {/* User Profile Avatar / Dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #15803d, #166534)',
                border: '2px solid #FFFFFF',
                boxShadow: '0 2px 6px rgba(21, 128, 61, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '0.84rem'
              }}
              title={user.name || user.email || 'User Profile'}
            >
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '44px',
                right: '0',
                width: '200px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                zIndex: 1000
              }}>
                <div style={{ paddingBottom: '8px', borderBottom: '1px solid #F1F5F9', marginBottom: '6px' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1E293B' }}>
                    {user.name || user.username || 'User'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.email || ''}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onNavigate('profile');
                    setIsUserMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 10px',
                    border: 'none',
                    background: 'transparent',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    color: '#334155',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <User size={14} color="#15803d" />
                  <span>{isHi ? 'मेरी प्रोफ़ाइल' : 'My Profile'}</span>
                </button>

                {onLogout && (
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onLogout();
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 10px',
                      border: 'none',
                      background: '#FEE2E2',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: '#DC2626',
                      cursor: 'pointer',
                      textAlign: 'left',
                      marginTop: '4px'
                    }}
                  >
                    <LogOut size={14} color="#DC2626" />
                    <span>{isHi ? 'लॉगआउट' : 'Log Out'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
