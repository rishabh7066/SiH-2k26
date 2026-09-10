import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

const ANALYSIS_STEPS = [
  { id: 1, title: "Understanding Village Geospatial Demographics", detail: "Resolving Census 2011 + local Panchayat data for household density..." },
  { id: 2, title: "Mapping Competitors & Vendor Density", detail: "Querying milk points, retail shops & mandi routes within 5km - 10km..." },
  { id: 3, title: "Estimating Local Purchasing Power & Demand", detail: "Evaluating rural income indicators, wedding season index & haat volumes..." },
  { id: 4, title: "Detecting High-Margin Opportunity Gaps", detail: "Cross-referencing unmet service needs (Home delivery & fresh paneer)..." },
  { id: 5, title: "Structuring Loan & Verifying Scheme Eligibility", detail: "Applying 90% debt structure, PMEGP subsidy caps & moratorium..." },
  { id: 6, title: "Stress-Testing Affordability & Cash Flow Covenants", detail: "Verifying DSCR coverage (Eligibility Score vs Affordability Score)..." }
];

export default function AnalysisLoader({ onFinished }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onFinished, 600);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onFinished]);

  return (
    <div style={{
      maxWidth: '650px',
      margin: '60px auto',
      padding: '36px',
      background: '#ffffff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
      textAlign: 'center'
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ecfdf5, #dcfce7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px auto',
        border: '2px solid #bbf7d0'
      }}>
        <Sparkles size={32} color="#15803d" className="animate-pulse-glow" />
      </div>

      <h2 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '8px' }}>
        UdyamSaathi Decision Engine Running...
      </h2>
      <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '30px' }}>
        Synthesizing hyper-local market signals into a bank-ready feasibility score
      </p>

      {/* Steps checklist */}
      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {ANALYSIS_STEPS.map((s, idx) => {
          const isDone = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <div 
              key={s.id} 
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                background: isCurrent ? '#f0fdf4' : isDone ? '#ffffff' : '#f8fafc',
                border: isCurrent ? '1px solid #86efac' : '1px solid #f1f5f9',
                opacity: idx > currentStep ? 0.45 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ marginTop: '2px' }}>
                {isDone ? (
                  <CheckCircle2 size={18} color="#15803d" />
                ) : isCurrent ? (
                  <Loader2 size={18} color="#15803d" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.86rem', color: isCurrent ? '#166534' : '#1e293b', display: 'block' }}>
                  {s.title}
                </strong>
                <p style={{ margin: 0, fontSize: '0.74rem', color: '#64748b' }}>
                  {s.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
