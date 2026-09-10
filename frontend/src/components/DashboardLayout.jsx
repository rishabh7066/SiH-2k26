import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import Footer from './Footer';

export default function DashboardLayout({
  children,
  activeTab,
  onNavigate,
  user,
  onLogout,
  lang,
  setLang,
  onOpenAlerts,
  onOpenWhatsApp,
  onStartAssessment,
  onTriggerDemo
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#FAF6F5',
      color: '#1E293B',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* 1. Left Side Menu (Sidebar) */}
      <Sidebar 
        activeTab={activeTab}
        onNavigate={onNavigate}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        lang={lang}
        setLang={setLang}
        onOpenAlerts={onOpenAlerts}
        onOpenWhatsApp={onOpenWhatsApp}
        onTriggerDemo={onTriggerDemo}
        user={user}
        onLogout={onLogout}
      />

      {/* 2. Main Area (Upper Nav + Content Body) */}
      <div style={{
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}>
        {/* Upper Side (Top Header) */}
        <TopNavbar 
          activeTab={activeTab}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenAlerts={onOpenAlerts}
          onOpenWhatsApp={onOpenWhatsApp}
          onStartAssessment={onStartAssessment}
          onTriggerDemo={onTriggerDemo}
          lang={lang}
          setLang={setLang}
          user={user}
          onLogout={onLogout}
          onNavigate={onNavigate}
        />

        {/* Dynamic Page Content */}
        <main style={{
          flex: 1,
          padding: '20px clamp(14px, 2.5vw, 28px)',
          boxSizing: 'border-box'
        }}>
          {children}
        </main>

        {/* Compact Footer */}
        <Footer 
          lang={lang}
          onStartAssessment={onStartAssessment}
          onTriggerDemo={onTriggerDemo}
          setActiveTab={onNavigate}
        />
      </div>
    </div>
  );
}
