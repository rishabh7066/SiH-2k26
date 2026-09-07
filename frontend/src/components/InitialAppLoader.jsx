import React, { useEffect, useState } from 'react';

export default function InitialAppLoader({ onFinished }) {
  const [phase, setPhase] = useState('roaming'); // 'roaming' | 'centered' | 'expanding'

  useEffect(() => {
    // 1.8s: Shape finishes moving and settles in exact center
    const centerTimer = setTimeout(() => {
      setPhase('centered');
    }, 1800);

    // 2.1s: Shape starts expanding at constant speed
    const expandTimer = setTimeout(() => {
      setPhase('expanding');
    }, 2100);

    // 2.9s: Full expansion complete, handover full interactivity to Login Page
    const finishTimer = setTimeout(() => {
      onFinished();
    }, 2900);

    return () => {
      clearTimeout(centerTimer);
      clearTimeout(expandTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      // Transparent frosted glass overlay so Login Page is visible underneath!
      background: 'rgba(255, 255, 255, 0.45)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      opacity: phase === 'expanding' ? 0 : 1,
      transition: 'opacity 0.75s ease',
      pointerEvents: phase === 'expanding' ? 'none' : 'auto'
    }}>
      <style>{`
        /* 1. Roaming trajectory across the login screen */
        @keyframes roamPlayfullyAcrossScreen {
          0% {
            left: 15%;
            top: 20%;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          22% {
            left: 80%;
            top: 25%;
            transform: translate(-50%, -50%) rotate(90deg);
          }
          45% {
            left: 20%;
            top: 75%;
            transform: translate(-50%, -50%) rotate(180deg);
          }
          68% {
            left: 80%;
            top: 70%;
            transform: translate(-50%, -50%) rotate(270deg);
          }
          88%, 100% {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /* 2. Shape morphing: Small Solid Circle <-> Rounded Rectangle <-> Pill */
        @keyframes morphCircleRectangle {
          0% {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #15803d;
          }
          25% {
            width: 62px;
            height: 40px;
            border-radius: 12px;
            background: #0f172a;
          }
          50% {
            width: 46px;
            height: 46px;
            border-radius: 16px;
            background: #16a34a;
          }
          75% {
            width: 64px;
            height: 38px;
            border-radius: 20px;
            background: #047857;
          }
          100% {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #15803d;
          }
        }

        /* 3. TRULY CONSTANT SPEED EXPANSION */
        @keyframes expandAtConstantSpeed {
          0% {
            width: 50px;
            height: 50px;
            border-width: 4px;
            background: #15803d;
          }
          15% {
            background: rgba(255, 255, 255, 0.75);
            border-width: 5px;
          }
          100% {
            width: 3200px;
            height: 3200px;
            border-width: 6px;
            background: rgba(255, 255, 255, 0.95);
          }
        }

        /* The Moving & Morphing Shape */
        .gv-solid-morphing-shape {
          position: absolute;
          box-shadow: 0 8px 24px rgba(21, 128, 61, 0.35);
          animation: 
            roamPlayfullyAcrossScreen 1.8s cubic-bezier(0.35, 0, 0.2, 1) forwards,
            morphCircleRectangle 1.8s ease-in-out infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          pointer-events: none;
        }

        /* When expanding at constant speed */
        .gv-solid-morphing-shape.expanding {
          left: 50% !important;
          top: 50% !important;
          border-radius: 50% !important;
          transform: translate(-50%, -50%) !important;
          border: 4px solid #15803d;
          box-shadow: none !important;
          animation: expandAtConstantSpeed 0.8s linear forwards !important;
        }

        /* Subtle Center Text Fade-in */
        @keyframes centerTextFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .gv-center-text {
          position: absolute;
          top: calc(50% + 46px);
          text-align: center;
          animation: centerTextFadeIn 0.3s ease forwards;
          z-index: 20;
          pointer-events: none;
          background: rgba(255, 255, 255, 0.85);
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
      `}</style>

      {/* The Small Solid Shape that morphs (Circle <-> Rectangle) and expands at CONSTANT SPEED */}
      <div className={`gv-solid-morphing-shape ${phase === 'expanding' ? 'expanding' : ''}`}>
        {/* Subtle white center ring when not expanding */}
        {phase !== 'expanding' && (
          <div style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.85)',
            transition: 'opacity 0.2s ease'
          }} />
        )}
      </div>

      {/* Minimalist Center Label when shape reaches center */}
      {phase === 'centered' && (
        <div className="gv-center-text">
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#14532d',
            margin: '0 0 2px 0',
            letterSpacing: '-0.02em'
          }}>
            GramVenture <span style={{ color: '#15803d' }}>AI</span>
          </h3>
          <p style={{
            fontSize: '0.78rem',
            color: '#64748b',
            margin: 0,
            fontWeight: 600
          }}>
            लोड हो रहा है...
          </p>
        </div>
      )}

      {/* Quick Skip Button */}
      <button 
        type="button"
        onClick={onFinished}
        style={{
          position: 'absolute',
          bottom: '22px',
          right: '26px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(10px)',
          border: '1px solid #e2e8f0',
          borderRadius: '999px',
          padding: '6px 14px',
          fontSize: '0.76rem',
          fontWeight: 600,
          color: '#64748b',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          zIndex: 9999,
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#0f172a';
          e.currentTarget.style.borderColor = '#cbd5e1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#64748b';
          e.currentTarget.style.borderColor = '#e2e8f0';
        }}
      >
        Skip →
      </button>

    </div>
  );
}
