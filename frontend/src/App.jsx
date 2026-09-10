import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import DashboardLayout from './components/DashboardLayout';
import HeroLanding from './components/HeroLanding';
import AssessmentWizard from './components/AssessmentWizard';
import AnalysisLoader from './components/AnalysisLoader';
import FeasibilityDashboard from './components/FeasibilityDashboard';
import GramAIDrawer from './components/GramAIDrawer';
import Footer from './components/Footer';
import InitialAppLoader from './components/InitialAppLoader';

// 15 New Features Suite Components (docs/New_Features.md)
import AIBusinessFinder from './components/AIBusinessFinder';
import VillageGapMap from './components/VillageGapMap';
import BudgetPlannerSimulator from './components/BudgetPlannerSimulator';
import LoanSchemeMatcher from './components/LoanSchemeMatcher';
import VillageHealthAndResources from './components/VillageHealthAndResources';
import AIBusinessAlerts from './components/AIBusinessAlerts';
import WhatsAppAIModal from './components/WhatsAppAIModal';
import UserProfile from './components/UserProfile';
import AuthPage from './components/AuthPage';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import { supabase } from './supabaseClient';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [lang, setLang] = useState('hi'); // Default Hindi
  const [isGramAIOpen, setIsGramAIOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Entrance loading animation
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false); // Feature 15: WhatsApp AI
  const [isAlertsOpen, setIsAlertsOpen] = useState(false); // Feature 14: AI Live Alerts

  // Authenticated User State (strictly requires valid email/id from Supabase)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gv_auth_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (!parsed || !parsed.email || !parsed.id) {
        localStorage.removeItem('gv_auth_user');
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  });

  // Sync Supabase Auth state (handles Google OAuth redirects and active sessions)
  useEffect(() => {
    // 1. Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const u = session.user;
        const userObj = {
          id: u.id,
          email: u.email,
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'User',
          username: u.email ? u.email.split('@')[0] : 'user',
          avatar: u.user_metadata?.avatar_url || null,
        };
        setCurrentUser(userObj);
        try {
          localStorage.setItem('gv_auth_user', JSON.stringify(userObj));
        } catch (e) {}
      }
    });

    // 2. Listen for auth changes (e.g. OAuth callback, sign in, sign out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const u = session.user;
        const userObj = {
          id: u.id,
          email: u.email,
          name: u.user_metadata?.full_name || u.user_metadata?.name || u.email?.split('@')[0] || 'User',
          username: u.email ? u.email.split('@')[0] : 'user',
          avatar: u.user_metadata?.avatar_url || null,
        };
        setCurrentUser(userObj);
        try {
          localStorage.setItem('gv_auth_user', JSON.stringify(userObj));
        } catch (e) {}
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
        try {
          localStorage.removeItem('gv_auth_user');
        } catch (e) {}
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('gv_auth_user', JSON.stringify(user));
    } catch (e) {}
    setIsInitialLoading(true);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('gv_auth_user');
    } catch (e) {}
    setIsInitialLoading(true);
    navigate('/');
  };

  // Active Assessment State (Locked to Uttar Pradesh, District Basti)
  const [assessmentData, setAssessmentData] = useState({
    state: "Uttar Pradesh",
    district: "Basti",
    block: "Basti Sadar",
    village: "Ganeshpur",
    capital: 100000,
    businessCategory: "dairy",
    experience: "some",
    resources: ["land", "livestock"],
    goals: ["viability", "loan", "opportunity"]
  });

  // Calculate active navigation tab from current URL pathname
  const getActiveTab = () => {
    const p = location.pathname.toLowerCase();
    if (p.startsWith('/dashboard')) return 'dashboard';
    if (p.startsWith('/business') || p.startsWith('/finder')) return 'finder';
    if (p.startsWith('/gap-map') || p.startsWith('/map')) return 'gap_map';
    if (p.startsWith('/simulator')) return 'simulator';
    if (p.startsWith('/schemes') || p.startsWith('/loans')) return 'loan_schemes';
    if (p.startsWith('/village-hub') || p.startsWith('/health')) return 'health_resources';
    if (p.startsWith('/profile')) return 'profile';
    if (p.startsWith('/wizard')) return 'wizard';
    if (p.startsWith('/terms') || p.startsWith('/privacy')) return 'terms';
    return 'landing';
  };

  // Centralized navigation handler
  const handleNavigate = (tab) => {
    if (tab === 'landing') navigate('/');
    else if (tab === 'finder' || tab === 'business') navigate('/business');
    else if (tab === 'gap_map' || tab === 'map') navigate('/gap-map');
    else if (tab === 'simulator') navigate('/simulator');
    else if (tab === 'loan_schemes' || tab === 'schemes' || tab === 'loans') navigate('/schemes');
    else if (tab === 'health_resources' || tab === 'village-hub' || tab === 'health') navigate('/village-hub');
    else if (tab === 'dashboard') navigate('/dashboard');
    else if (tab === 'profile') navigate('/profile');
    else if (tab === 'wizard') navigate('/wizard');
    else if (tab === 'terms') navigate('/terms');
    else if (tab === 'privacy') navigate('/privacy');
    else navigate(tab.startsWith('/') ? tab : `/${tab}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start fresh wizard
  const handleStartWizard = () => {
    navigate('/wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select business from Finder and launch wizard
  const handleSelectBusinessFromFinder = (biz) => {
    setAssessmentData(prev => ({
      ...prev,
      businessCategory: biz.id.includes('dairy') ? 'dairy' : (biz.id.includes('csc') ? 'tailoring' : 'food_proc'),
      capital: biz.capex
    }));
    navigate('/wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete wizard -> show loader -> show dashboard
  const handleWizardComplete = (data) => {
    setAssessmentData(data);
    navigate('/analyzing');
  };

  // After loader finishes
  const handleAnalysisFinished = () => {
    navigate('/dashboard');
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch(e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Trigger Sample Evaluation Demo Shortcut
  const handleTriggerDemo = () => {
    setAssessmentData({
      state: "Uttar Pradesh",
      district: "Basti",
      block: "Basti Sadar",
      village: "Ganeshpur",
      capital: 100000,
      businessCategory: "dairy",
      experience: "some",
      resources: ["land", "livestock", "shop"],
      goals: ["viability", "loan", "opportunity", "compare"]
    });
    navigate('/analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gatekeeper: Without login, no home page or dashboard can be opened!
  if (!currentUser) {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
        {isInitialLoading && (
          <InitialAppLoader onFinished={() => setIsInitialLoading(false)} />
        )}
        <AuthPage 
          initialMode="login"
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={getActiveTab()}
      onNavigate={handleNavigate}
      user={currentUser}
      onLogout={handleLogout}
      lang={lang}
      setLang={setLang}
      onOpenAlerts={() => setIsAlertsOpen(true)}
      onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
      onStartAssessment={handleStartWizard}
      onTriggerDemo={handleTriggerDemo}
    >
      {/* Website Entrance Loading Screen Animation if logged in */}
      {isInitialLoading && (
        <InitialAppLoader onFinished={() => setIsInitialLoading(false)} />
      )}

      {/* Main Content Area with React Router Routes */}
      <Routes>
          {/* 1. Landing View / Home */}
          <Route 
            path="/" 
            element={
              <HeroLanding 
                lang={lang}
                onStartAssessment={handleStartWizard}
                onTriggerDemo={handleTriggerDemo}
                onOpenGramAI={() => setIsGramAIOpen(true)}
                onNavigate={handleNavigate}
                onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
              />
            } 
          />

          {/* 2. Feature 1 & 3: AI Business Finder */}
          <Route 
            path="/business" 
            element={
              <AIBusinessFinder 
                lang={lang}
                onSelectBusiness={handleSelectBusinessFromFinder}
                onStartWizard={handleStartWizard}
              />
            } 
          />
          <Route path="/finder" element={<Navigate to="/business" replace />} />

          {/* 3. Comprehensive Feasibility Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <FeasibilityDashboard 
                assessmentData={assessmentData}
                onReset={handleStartWizard}
                onOpenGramAI={() => setIsGramAIOpen(true)}
                onTriggerDemo={handleTriggerDemo}
              />
            } 
          />

          {/* 4. Feature 2 & 10: Village Gap Map */}
          <Route 
            path="/gap-map" 
            element={
              <VillageGapMap 
                lang={lang}
                onStartAssessment={handleStartWizard}
              />
            } 
          />
          <Route path="/map" element={<Navigate to="/gap-map" replace />} />

          {/* 5. Feature 4 & 5: Budget Business Planner & Simulator */}
          <Route 
            path="/simulator" 
            element={
              <BudgetPlannerSimulator 
                lang={lang}
                onStartWizard={handleStartWizard}
              />
            } 
          />

          {/* 6. Feature 6 & 7: Safe Loan EMI & Govt Schemes */}
          <Route 
            path="/schemes" 
            element={
              <LoanSchemeMatcher 
                lang={lang}
                onStartWizard={handleStartWizard}
              />
            } 
          />
          <Route path="/loans" element={<Navigate to="/schemes" replace />} />

          {/* 7. Feature 9, 11, 12, 13: Village Health & Resources Hub */}
          <Route 
            path="/village-hub" 
            element={
              <VillageHealthAndResources 
                lang={lang}
              />
            } 
          />
          <Route path="/health" element={<Navigate to="/village-hub" replace />} />

          {/* 8. User Profile */}
          <Route 
            path="/profile" 
            element={
              <UserProfile 
                user={currentUser}
                onLogout={handleLogout}
                onNavigate={handleNavigate}
                lang={lang}
              />
            } 
          />

          {/* 9. Assessment Wizard */}
          <Route 
            path="/wizard" 
            element={
              <AssessmentWizard 
                initialState={assessmentData}
                onComplete={handleWizardComplete}
                onCancel={() => handleNavigate('landing')}
              />
            } 
          />

          {/* 10. Loader Simulation */}
          <Route 
            path="/analyzing" 
            element={
              <AnalysisLoader 
                onFinished={handleAnalysisFinished}
              />
            } 
          />

          {/* 11. Terms of Service & Privacy Policy */}
          <Route 
            path="/terms" 
            element={
              <TermsAndPrivacy 
                initialTab="terms" 
                lang={lang} 
                onClose={() => handleNavigate('landing')} 
              />
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <TermsAndPrivacy 
                initialTab="privacy" 
                lang={lang} 
                onClose={() => handleNavigate('landing')} 
              />
            } 
          />

          {/* Fallback to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      {/* Feature 14: AI Business Alerts Modal */}
      {isAlertsOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            maxWidth: '780px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)'
          }}>
            <AIBusinessAlerts 
              lang={lang} 
              onClose={() => setIsAlertsOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* Feature 15: WhatsApp AI Advisor Modal */}
      <WhatsAppAIModal 
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        lang={lang}
      />

      {/* Feature 8: AI Chatbot & Voice Rural Advisor Fixed at Bottom Right */}
      <GramAIDrawer 
        isOpen={isGramAIOpen}
        onOpen={() => setIsGramAIOpen(true)}
        onClose={() => setIsGramAIOpen(false)}
        lang={lang}
      />
    </DashboardLayout>
  );
}
