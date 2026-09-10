import React, { useState, useEffect } from 'react';
import udyamLogo from '../images/Udyam (3).png';
import authIllustration from '../images/illustration.svg';
import { 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  X 
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import TermsAndPrivacy from './TermsAndPrivacy';
import './AuthPage.css';

// Rotating context shown under the (static) meditation figure
const ILLUSTRATION_SLIDES = [
  {
    title: 'Local Insights',
    meta: '10 Task',
    percent: 84,
    tag: 'Market',
    headline: (
      <>Discover What Your Village Needs with <strong style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: '#14532d' }}>𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊</strong></>
    ),
  },
  {
    title: 'Business Roadmap',
    meta: '14 Task',
    percent: 92,
    tag: 'Business',
    headline: (
      <>Discover the right business opportunities in your village with <strong style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: '#14532d' }}>𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊</strong></>
    ),
  },
  {
    title: 'Micro Finance',
    meta: '5 Schemes',
    percent: 87,
    tag: 'Funding',
    headline: (
      <>Access loans and schemes with <strong style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: '#14532d' }}>𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊</strong></>
    ),
  },
];

const RING_CIRCUMFERENCE = 2 * Math.PI * 16;

// SVG illustration imported from file.
function MeditationArt() {
  return (
    <img
      className="meditation-svg"
      src={authIllustration}
      width="513"
      height="477"
      alt="Illustration"
      style={{ objectFit: 'contain' }}
    />
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage({ 
  initialMode = 'login', 
  onBack, 
  onSuccess 
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [termsModalTab, setTermsModalTab] = useState(null);

  // Rotating illustration context
  const [slideIndex, setSlideIndex] = useState(0);
  const [isSlideFading, setIsSlideFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSlideFading(true);
      setTimeout(() => {
        setSlideIndex(prev => (prev + 1) % ILLUSTRATION_SLIDES.length);
        setIsSlideFading(false);
      }, 320);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Check if redirected back with an OAuth error from Supabase
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('error=')) {
      const params = new URLSearchParams(hash.replace(/^#/, ''));
      const errorDesc = params.get('error_description') || params.get('error');
      if (errorDesc) {
        let cleanMsg = decodeURIComponent(errorDesc.replace(/\+/g, ' '));
        if (cleanMsg.toLowerCase().includes('provider is not enabled')) {
          cleanMsg = 'Google Provider is not enabled in Supabase Dashboard (Auth -> Providers -> Google). Please enable it or sign in with Email & Password.';
        }
        setToastMessage({ type: 'error', text: cleanMsg });
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, []);

  const slide = ILLUSTRATION_SLIDES[slideIndex];

  // Form State - strictly email based
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Real Social Login Handler (Active Google, Apple, Facebook OAuth)
  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setToastMessage(null);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase(),
        options: {
          redirectTo: window.location.origin,
        }
      });

      if (error) throw error;
      // Browser automatically redirects to provider's auth screen
    } catch (err) {
      setIsLoading(false);
      console.error(`${provider} OAuth Error:`, err);
      let msg = err.message || `${provider} authentication failed`;
      if (msg.toLowerCase().includes('provider is not enabled') || msg.toLowerCase().includes('unsupported provider')) {
        msg = `${provider} login is not enabled yet in Supabase Dashboard (Auth -> Providers -> ${provider}). Please sign in with Email & Password or enable ${provider}.`;
      }
      setToastMessage({
        type: 'error',
        text: msg
      });
    }
  };

  // Email/Password Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToastMessage(null);

    const cleanEmail = (formData.email || '').trim().toLowerCase();

    // 1. Validation
    if (!cleanEmail) {
      setToastMessage({ type: 'error', text: 'Please enter your email address' });
      return;
    }
    if (!EMAIL_REGEX.test(cleanEmail)) {
      setToastMessage({ type: 'error', text: 'Please enter a valid email address (e.g. name@example.com)' });
      return;
    }
    if (!formData.password) {
      setToastMessage({ type: 'error', text: 'Please enter your password' });
      return;
    }
    if (formData.password.length < 6) {
      setToastMessage({ type: 'error', text: 'Password must be at least 6 characters long' });
      return;
    }

    // 2. Sign Up flow
    if (mode === 'register') {
      if (!formData.name?.trim()) {
        setToastMessage({ type: 'error', text: 'Please enter your full name' });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setToastMessage({ type: 'error', text: 'Passwords do not match' });
        return;
      }
      if (!formData.agreeTerms) {
        setToastMessage({ type: 'error', text: 'Please agree to the Terms of Service & Privacy Policy' });
        return;
      }

      setIsLoading(true);
      try {
        // Try backend signup first (pre-confirms email so user is never blocked)
        let createdViaBackend = false;
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: cleanEmail,
              password: formData.password,
              full_name: formData.name.trim(),
            }),
          });
          const signupRes = await res.json();
          if (signupRes.success) {
            createdViaBackend = true;
          }
        } catch (e) {
          console.warn('Backend signup error, using Supabase direct:', e);
        }

        if (!createdViaBackend) {
          const { data: sbData, error: sbError } = await supabase.auth.signUp({
            email: cleanEmail,
            password: formData.password,
            options: {
              data: {
                full_name: formData.name.trim(),
              }
            }
          });
          if (sbError) throw sbError;
          // Auto confirm if session wasn't created immediately
          try {
            await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/confirm`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: cleanEmail })
            });
          } catch (e) {}
        }

        // Log in immediately
        const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: formData.password
        });

        setIsLoading(false);
        if (!loginErr && loginData?.user) {
          const user = {
            id: loginData.user.id,
            email: loginData.user.email,
            name: formData.name.trim() || loginData.user.email.split('@')[0],
            username: loginData.user.email.split('@')[0]
          };
          setToastMessage({
            type: 'success',
            text: 'Account created successfully! Logging you in...'
          });
          if (onSuccess) {
            setTimeout(() => onSuccess(user), 600);
          }
        } else {
          setToastMessage({
            type: 'success',
            text: 'Account created! Please log in with your password.'
          });
          setMode('login');
        }
      } catch (err) {
        setIsLoading(false);
        console.error('Sign up error:', err);
        setToastMessage({
          type: 'error',
          text: err.message || 'Registration failed. Please check details and try again.'
        });
      }
      return;
    }

    // 3. Login flow
    setIsLoading(true);
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: formData.password
      });

      // If email was not confirmed, auto-confirm via backend and retry
      if (error && error.message && error.message.toLowerCase().includes('email not confirmed')) {
        try {
          await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: cleanEmail })
          });
          const retry = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: formData.password
          });
          data = retry.data;
          error = retry.error;
        } catch (confirmErr) {
          console.error('Auto-confirm retry error:', confirmErr);
        }
      }

      if (error) throw error;

      setIsLoading(false);
      const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email.split('@')[0],
        username: data.user.email.split('@')[0],
        avatar: data.user.user_metadata?.avatar_url || null
      };

      setToastMessage({
        type: 'success',
        text: `Welcome back, ${user.name}!`
      });

      if (onSuccess) {
        setTimeout(() => onSuccess(user), 600);
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Login error:', err);
      let msg = err.message || 'Login failed';
      if (msg.toLowerCase().includes('invalid login credentials')) {
        msg = 'Invalid email or password. Please check your credentials or create a new account.';
      } else if (msg.toLowerCase().includes('email not confirmed')) {
        msg = 'Please verify your email address via the link sent to your inbox before logging in.';
      }
      setToastMessage({
        type: 'error',
        text: msg
      });
    }
  };

  // Handle forgot password
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = (forgotEmail || '').trim().toLowerCase();
    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      setToastMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }

    setForgotSent(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: window.location.origin
      });

      if (error) throw error;

      setForgotSent(false);
      setIsForgotModalOpen(false);
      setToastMessage({
        type: 'success',
        text: 'Password reset link sent! Please check your email inbox.'
      });
    } catch (err) {
      setForgotSent(false);
      console.error('Password reset error:', err);
      setToastMessage({
        type: 'error',
        text: err.message || 'Could not send reset email. Please try again.'
      });
    }
  };

  return (
    <div className="auth-page-root">
      
      {/* Top Minimal Navigation Bar */}
      <header className="auth-top-bar">
        <div 
          className="auth-brand-logo"
          style={{ cursor: onBack ? 'pointer' : 'default' }}
          onClick={onBack ? onBack : undefined}
          title={onBack ? 'Back to App' : "UdyamSaathi"}
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
            <div className="auth-brand-name">
              𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊
            </div>
            <span className="auth-brand-sub">
              ग्रामीण उद्यम सलाहकार
            </span>
          </div>
        </div>

        {onBack && (
          <button onClick={onBack} className="auth-exit-btn">
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        )}
      </header>

      {/* Main Two-Column Content Grid */}
      <main className="auth-main-layout">
        
        {/* Left Column: Form Controls */}
        <section className="auth-form-column">
          <div className="auth-form-inner">
            
            {/* Mode Switcher Tabs */}
            <div className="auth-mode-switch-wrapper">
              <div className="auth-mode-switch">
                <button
                  type="button"
                  className={`auth-mode-tab ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => {
                    setMode('login');
                    setToastMessage(null);
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className={`auth-mode-tab ${mode === 'register' ? 'active' : ''}`}
                  onClick={() => {
                    setMode('register');
                    setToastMessage(null);
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {toastMessage && (
              <div className={`auth-alert-toast ${toastMessage.type}`}>
                {toastMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                <span>{toastMessage.text}</span>
              </div>
            )}

            {/* Header Title & Subtitle */}
            <div className="auth-header-block">
              <h1 className="auth-title">
                {mode === 'login' ? 'Welcome back!' : 'Create an account'}
              </h1>
              <p className="auth-subtitle">
                Simplify your workflow and boost your productivity with <strong style={{ fontFamily: "'Playfair Display', 'Georgia', serif", color: '#14532d' }}>𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊</strong>. Get started for free.
              </p>
            </div>

            {/* Auth Form (Email & Password) */}
            <form onSubmit={handleSubmit} className="auth-form" noValidate>
              
              {/* Full Name field in Register mode */}
              {mode === 'register' && (
                <div className="auth-input-field">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="auth-pill-input no-icon"
                    required
                  />
                </div>
              )}

              {/* Email address field */}
              <div className="auth-input-field">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address (e.g. name@example.com)"
                  className="auth-pill-input no-icon"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password field with Show/Hide Toggle */}
              <div className="auth-input-field">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={mode === 'register' ? 'Create password (min 6 characters)' : 'Password'}
                  className="auth-pill-input"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                </button>
              </div>

              {/* Confirm Password in Register mode */}
              {mode === 'register' && (
                <div className="auth-input-field">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="auth-pill-input"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle-btn"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <Eye size={19} /> : <EyeOff size={19} />}
                  </button>
                </div>
              )}

              {/* Forgot Password Link (in Login mode) */}
              {mode === 'login' ? (
                <div className="auth-extra-row">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(formData.email || '');
                      setIsForgotModalOpen(true);
                    }}
                    className="forgot-password-link"
                  >
                    Forgot Password?
                  </button>
                </div>
              ) : (
                <div className="auth-terms-row">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    name="agreeTerms" 
                    checked={formData.agreeTerms} 
                    onChange={handleChange} 
                    required 
                  />
                  <label htmlFor="terms">
                    I agree to UdyamSaathi's{' '}
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); setTermsModalTab('terms'); }}
                      style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); setTermsModalTab('privacy'); }}
                      style={{ background: 'none', border: 'none', color: '#15803d', fontWeight: 600, textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>
              )}

              {/* Black Solid Pill Submit Button */}
              <button 
                type="submit" 
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>{mode === 'login' ? 'Logging in...' : 'Creating account...'}</span>
                ) : (
                  <span>{mode === 'login' ? 'Login' : 'Create Account'}</span>
                )}
              </button>
            </form>

            {/* "or continue with" Divider */}
            <div className="auth-divider-line">
              <span>or continue with</span>
            </div>

            {/* Social Authentication Row - Round circular buttons as requested */}
            <div className="auth-social-row">
              {/* Google Circular Button (Actively connects to real Google OAuth) */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className="auth-social-btn"
                title="Continue with Google"
                aria-label="Continue with Google"
                disabled={isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#ffffff" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#ffffff" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.57.38-2.29V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.13z" fill="#ffffff" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#ffffff" />
                </svg>
              </button>

              {/* Apple Circular Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="auth-social-btn"
                title="Continue with Apple"
                aria-label="Continue with Apple"
                disabled={isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.62-.75 1.04-1.8 1.01-2.84-.96.04-2.13.64-2.79 1.4-.58.67-1.1 1.74-1.01 2.78 1.08.08 2.17-.59 2.79-1.34z" fill="#ffffff" />
                </svg>
              </button>

              {/* Facebook Circular Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="auth-social-btn"
                title="Continue with Facebook"
                aria-label="Continue with Facebook"
                disabled={isLoading}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#ffffff" />
                </svg>
              </button>
            </div>

            {/* Bottom Toggle Text */}
            <div className="auth-bottom-switch">
              {mode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => {
                      setMode('register');
                      setToastMessage(null);
                    }}
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => {
                      setMode('login');
                      setToastMessage(null);
                    }}
                  >
                    Log in
                  </button>
                </p>
              )}
            </div>

          </div>
        </section>

        {/* Right Column: Illustration Art */}
        <section className="auth-illustration-column">
          <div className="auth-illustration-card">
            <div className="auth-illustration-art-wrap">
              <div className="central-meditation-art">
                <MeditationArt />
              </div>

              {/* Floating progress card - content rotates */}
              <div className={`floating-task-card ${isSlideFading ? 'sliding-transparent' : ''}`}>
                <div className="task-card-header">
                  <div className="task-text-group">
                    <p className="task-title">{slide.title}</p>
                    <span className="task-subtitle">{slide.meta}</span>
                  </div>
                  <div className="task-progress-ring">
                    <svg className="ring-svg" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                      <circle
                        className="progress-arc"
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        stroke="#15803d"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={RING_CIRCUMFERENCE}
                        strokeDashoffset={RING_CIRCUMFERENCE * (1 - slide.percent / 100)}
                        transform="rotate(-90 20 20)"
                      />
                    </svg>
                    <span className="ring-percentage">{slide.percent}%</span>
                  </div>
                </div>
                <div className="task-card-footer">
                  <span className="task-tag-badge">{slide.tag}</span>
                </div>
              </div>
            </div>

            {/* Carousel dots */}
            <div className="carousel-dots-row">
              {ILLUSTRATION_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${i === slideIndex ? 'active' : ''}`}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Show slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Rotating headline */}
            <div className={`auth-illustration-footer ${isSlideFading ? 'sliding-transparent' : ''}`}>
              <p className="auth-footer-headline">{slide.headline}</p>
            </div>
          </div>
        </section>

      </main>

      {/* Forgot Password Dialog Modal */}
      {isForgotModalOpen && (
        <div className="forgot-modal-backdrop" onClick={() => setIsForgotModalOpen(false)}>
          <div className="forgot-modal-box" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Reset Password</h3>
              <button 
                onClick={() => setIsForgotModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '20px', textAlign: 'left' }}>
              Enter your email address and we'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleForgotSubmit}>
              <div className="auth-input-field" style={{ marginBottom: '16px' }}>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="auth-pill-input no-icon"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="auth-submit-btn" 
                disabled={forgotSent}
              >
                {forgotSent ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Terms & Privacy Policy Dialog Modal */}
      {termsModalTab && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            overflowY: 'auto',
            padding: '24px 14px'
          }}
          onClick={() => setTermsModalTab(null)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <TermsAndPrivacy 
              initialTab={termsModalTab} 
              onClose={() => setTermsModalTab(null)} 
            />
          </div>
        </div>
      )}

    </div>
  );
}
