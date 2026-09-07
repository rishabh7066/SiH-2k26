import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
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
import AuthPage from './components/AuthPage';
import { supabase } from './supabaseClient';

export default function App() {
  const [lang, setLang] = useState('hi'); // Default Hindi
  const [viewState, setViewState] = useState('landing'); 
  // 'landing' | 'finder' | 'gap_map' | 'simulator' | 'loan_schemes' | 'health_resources' | 'wizard' | 'analyzing' | 'dashboard'
  
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
      // Remove any dummy or mock users saved from older sessions
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
    setIsInitialLoading(true); // Trigger smooth entrance animation when Home Page appears
    setViewState('landing');
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
    setViewState('landing');
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

  // Start fresh wizard
  const handleStartWizard = () => {
    setViewState('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select business from Finder and launch wizard
  const handleSelectBusinessFromFinder = (biz) => {
    setAssessmentData(prev => ({
      ...prev,
      businessCategory: biz.id.includes('dairy') ? 'dairy' : (biz.id.includes('csc') ? 'tailoring' : 'food_proc'),
      capital: biz.capex
    }));
    setViewState('wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete wizard -> show loader -> show dashboard
  const handleWizardComplete = (data) => {
    setAssessmentData(data);
    setViewState('analyzing');
  };

  // After loader finishes
  const handleAnalysisFinished = () => {
    setViewState('dashboard');
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
    setViewState('analyzing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Gatekeeper: Without login, no home page or dashboard can be opened!
  // Transparent Loading Screen plays over Auth Page on entrance.
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Website Entrance Loading Screen Animation if logged in */}
      {isInitialLoading && (
        <InitialAppLoader onFinished={() => setIsInitialLoading(false)} />
      )}

      {/* Global Transparent Glass Header with 15 Features Nav */}
      <Header 
        lang={lang}
        setLang={setLang}
        onStartAssessment={handleStartWizard}
        onTriggerDemo={handleTriggerDemo}
        activeTab={viewState}
        setActiveTab={(tab) => {
          setViewState(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
        user={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* Landing View */}
        {viewState === 'landing' && (
          <HeroLanding 
            lang={lang}
            onStartAssessment={handleStartWizard}
            onTriggerDemo={handleTriggerDemo}
            onOpenGramAI={() => setIsGramAIOpen(true)}
            onNavigate={(tab) => {
              setViewState(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
          />
        )}

        {/* Feature 1 & 3: AI Business Finder & Opportunity Score */}
        {viewState === 'finder' && (
          <AIBusinessFinder 
            lang={lang}
            onSelectBusiness={handleSelectBusinessFromFinder}
            onStartWizard={handleStartWizard}
          />
        )}

        {/* Feature 2 & 10: Village Gap Map & Competitor Intelligence */}
        {viewState === 'gap_map' && (
          <VillageGapMap 
            lang={lang}
            onStartAssessment={handleStartWizard}
          />
        )}

        {/* Feature 4 & 5: Budget Business Planner & Live Simulator */}
        {viewState === 'simulator' && (
          <BudgetPlannerSimulator 
            lang={lang}
            onStartWizard={handleStartWizard}
          />
        )}

        {/* Feature 6 & 7: Safe Loan & EMI Calculator + Govt Scheme Matcher */}
        {viewState === 'loan_schemes' && (
          <LoanSchemeMatcher 
            lang={lang}
            onStartWizard={handleStartWizard}
          />
        )}

        {/* Feature 9, 11, 12, 13: Village Health, Resources, Ladder & Partners */}
        {viewState === 'health_resources' && (
          <VillageHealthAndResources 
            lang={lang}
          />
        )}

        {/* Assessment Wizard */}
        {viewState === 'wizard' && (
          <AssessmentWizard 
            initialState={assessmentData}
            onComplete={handleWizardComplete}
            onCancel={() => setViewState('landing')}
          />
        )}

        {/* Loader Simulation */}
        {viewState === 'analyzing' && (
          <AnalysisLoader 
            onFinished={handleAnalysisFinished}
          />
        )}

        {/* Comprehensive Feasibility Dashboard */}
        {viewState === 'dashboard' && (
          <FeasibilityDashboard 
            assessmentData={assessmentData}
            onReset={handleStartWizard}
            onOpenGramAI={() => setIsGramAIOpen(true)}
            onTriggerDemo={handleTriggerDemo}
          />
        )}
      </main>

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

      {/* Sleek, Slim Transparent Footer */}
      <Footer 
        lang={lang}
        onStartAssessment={handleStartWizard}
        onTriggerDemo={handleTriggerDemo}
        setActiveTab={(tab) => {
          setViewState(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
