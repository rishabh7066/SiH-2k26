import React, { useState, useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Circle, 
  useMap 
} from 'react-leaflet';
import { 
  Menu,
  X,
  MapPin, 
  Store, 
  FileText, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  RefreshCw,
  Sliders,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight,
  Navigation
} from 'lucide-react';
import { 
  COMPETITORS_MOCK, 
  OPPORTUNITY_Gaps, 
  SEASONAL_DATA, 
  SCHEMES 
} from '../data/mockData';
import { calculateProjectFinance, simulateScenario } from '../utils/financeEngine';
import { createPinIcon } from '../utils/leafletIcons';

// Helper component to fix Leaflet size recalculation inside tabs
function DashboardMapFix({ center }) {
  const map = useMap();
  useEffect(() => {
    const handleResize = () => {
      try { map.invalidateSize(); } catch (e) {}
    };
    handleResize();
    const t1 = setTimeout(handleResize, 150);
    const t2 = setTimeout(handleResize, 600);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
    };
  }, [map, center]);
  return null;
}

const TABS = [
  { id: 'overview', number: '1', label: 'व्यापार सारांश', sub: 'Overview & Viability', icon: 'Sparkles' },
  { id: 'market', number: '2', label: 'आस-पास की दुकानें व बाज़ार', sub: '10km Radius Mapping', icon: 'Store' },
  { id: 'opportunity', number: '3', label: 'ज़्यादा मुनाफे के नए मौके', sub: 'Untapped Opportunity', icon: 'TrendingUp' },
  { id: 'finance', number: '4', label: 'लोन व सरकारी सब्सिडी योजना', sub: 'PMEGP / Mudra Scheme', icon: 'DollarSign' },
  { id: 'simulator', number: '5', label: 'बिक्री घटने-बढ़ने की जाँच', sub: 'What-If Stress Test', icon: 'Sliders' },
  { id: 'risks', number: '6', label: 'मौसम व सप्लायर का जोखिम', sub: 'Seasonal Calendar', icon: 'Calendar' },
  { id: 'compare', number: '7', label: 'दूसरे व्यवसायों से तुलना', sub: 'Multi-trade Comparison', icon: 'Layers' },
  { id: 'report', number: '8', label: 'बैंक प्रोजेक्ट रिपोर्ट', sub: 'Feasibility Report & PDF', icon: 'FileText' }
];

export default function FeasibilityDashboard({ 
  assessmentData, 
  onReset, 
  onOpenGramAI, 
  onTriggerDemo 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // default open on desktop, togglable
  const [financeScheme, setFinanceScheme] = useState('pmegp');
  
  // Financial calculations
  const finance = calculateProjectFinance({
    beneficiaryCapital: assessmentData.capital || 100000,
    schemeId: financeScheme
  });

  // What-If Simulator state
  const [salesMod, setSalesMod] = useState(0);
  const [costMod, setCostMod] = useState(0);
  const [workers, setWorkers] = useState(0);
  const [loanMod, setLoanMod] = useState(0);

  const simulation = simulateScenario({
    baseRevenue: 182000,
    baseOpex: 114000,
    emi: finance.emiRecommended,
    salesModPercent: salesMod,
    rawMaterialModPercent: costMod,
    additionalWorkers: workers,
    loanReductionPercent: loanMod
  });

  // Action plan checklist
  const [completedActions, setCompletedActions] = useState([false, false, false, false, false]);

  const toggleAction = (index) => {
    const next = [...completedActions];
    next[index] = !next[index];
    setCompletedActions(next);
  };

  const currentVillage = assessmentData.village || "Ganeshpur";
  const currentBlock = assessmentData.block || "Basti Sadar";
  const currentDistrict = assessmentData.district || "Basti";

  const currentTabObj = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(10px, 2vw, 16px) clamp(10px, 2vw, 20px)' }}>
      {/* Top Banner Status */}
      <div className="glass-panel" style={{
        padding: 'clamp(12px, 2vw, 18px) clamp(14px, 2vw, 24px)',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Hamburger Three Lines Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              color: '#15803d'
            }}
            title={isSidebarOpen ? "साइड मेन्यू छिपाएँ" : "साइड मेन्यू खोलें"}
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Circular Score Gauge */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'conic-gradient(#15803d 0% 78%, #e2e8f0 78% 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#15803d', lineHeight: 1 }}>78</span>
              <span style={{ fontSize: '0.55rem', color: '#64748b', fontWeight: 600 }}>/100</span>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span className="rural-badge success" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                शर्तों के साथ सुरक्षित
              </span>
              <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                • व्यवसाय: <strong>डेयरी एवं दुग्ध उत्पाद</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.2rem', color: '#0f172a', margin: 0 }}>
              {currentVillage}, ब्लॉक {currentBlock} ({currentDistrict})
            </h2>
          </div>
        </div>

        {/* Quick Top Stats (Hidden on mobile to save space) */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', fontWeight: 600 }}>लोन पात्रता</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#15803d' }}>{finance.eligibilityScore}/100</span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', fontWeight: 600 }}>किस्त क्षमता</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#d97706' }}>{finance.affordabilityScore}/100</span>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block', fontWeight: 600 }}>सुरक्षित लोन</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>₹{(finance.recommendedLoan / 100000).toFixed(1)} लाख</span>
          </div>

          <button onClick={onReset} className="btn-secondary" style={{ padding: '7px 12px', fontSize: '0.78rem' }}>
            <RefreshCw size={13} /> नई जाँच
          </button>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Content Area */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}>
        {/* Left Side Navigation Panel (3-Lines Hamburger Drawer) */}
        {isSidebarOpen && (
          <aside style={{
            width: 'min(320px, 85vw)',
            flexShrink: 0,
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            position: window.innerWidth <= 768 ? 'fixed' : 'sticky',
            top: window.innerWidth <= 768 ? '64px' : '80px',
            left: window.innerWidth <= 768 ? '8px' : 'auto',
            zIndex: window.innerWidth <= 768 ? 500 : 'auto',
            maxHeight: window.innerWidth <= 768 ? 'calc(100vh - 80px)' : 'auto',
            overflowY: 'auto'
          }} className="animate-fade-in">
            {/* Sidebar Title */}
            <div style={{
              padding: '16px 20px',
              background: '#f8fafc',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  मेन्यू चयन
                </span>
                <h4 style={{ margin: '2px 0 0 0', fontSize: '0.96rem', color: '#0f172a' }}>
                  रिपोर्ट के सभी 8 खंड
                </h4>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                title="मेन्यू बंद करें"
              >
                <X size={18} />
              </button>
            </div>

            {/* Vertical Tab List */}
            <div style={{ padding: '10px' }}>
              {TABS.map((t) => {
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: isActive ? '#15803d' : 'transparent',
                      color: isActive ? '#ffffff' : '#334155',
                      cursor: 'pointer',
                      marginBottom: '4px',
                      transition: 'all 0.15s ease',
                      boxShadow: isActive ? '0 4px 12px rgba(21, 128, 61, 0.25)' : 'none'
                    }}
                  >
                    {/* Step badge */}
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: isActive ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#15803d',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {t.number}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ display: 'block', fontSize: '0.86rem', lineHeight: 1.25, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t.label}
                      </strong>
                      <span style={{ fontSize: '0.7rem', color: isActive ? '#dcfce7' : '#94a3b8' }}>
                        {t.sub}
                      </span>
                    </div>

                    <ChevronRight size={16} color={isActive ? '#ffffff' : '#cbd5e1'} />
                  </button>
                );
              })}
            </div>

            {/* Bottom Quick Help Prompt */}
            <div style={{ padding: '14px 16px', background: '#f0fdf4', borderTop: '1px solid #dcfce7', margin: '6px' }}>
              <span style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 700, display: 'block' }}>
                💡 किसी भी सवाल के लिए:
              </span>
              <button
                onClick={onOpenGramAI}
                style={{
                  marginTop: '6px',
                  width: '100%',
                  background: '#15803d',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                🎙️ GramAI से बोलकर पूछें
              </button>
            </div>
          </aside>
        )}

        {/* Right Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Active section indicator bar if sidebar closed */}
          {!isSidebarOpen && (
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '10px 16px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  style={{
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    color: '#15803d'
                  }}
                >
                  <Menu size={16} /> मेन्यू खोलें
                </button>
                <span style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 700 }}>
                  {currentTabObj.number}. {currentTabObj.label}
                </span>
              </div>

              {/* Quick prev/next buttons */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {TABS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '6px',
                      border: '1px solid',
                      borderColor: activeTab === t.id ? '#15803d' : '#e2e8f0',
                      background: activeTab === t.id ? '#15803d' : '#ffffff',
                      color: activeTab === t.id ? '#ffffff' : '#64748b',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {t.number}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
              <div style={{ gridColumn: 'span 8' }}>
                <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#14532d', marginBottom: '12px' }}>
                    व्यापार की स्थिति और मुख्य सलाह
                  </h3>
                  <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.6, marginBottom: '16px' }}>
                    <strong>{currentVillage}</strong> और आस-पास के 10 किमी क्षेत्र में डेयरी व्यवसाय के लिए दूध की दैनिक घरेलू मांग और पास के हाईवे ढाबों से अच्छी बिक्री की संभावना है (स्कोर 78/100)। हालांकि, इस इलाके में पहले से ही 15 पारंपरिक दूध विक्रेता सक्रिय हैं।
                  </p>
                  
                  <div style={{ background: '#ecfdf5', borderLeft: '4px solid #15803d', padding: '14px 18px', borderRadius: '6px', marginBottom: '18px' }}>
                    <strong style={{ color: '#166534', fontSize: '0.9rem' }}>💡 सबसे महत्वपूर्ण सलाह:</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.84rem', color: '#166534', lineHeight: 1.5 }}>
                      केवल कच्चा दूध बेचने की साधारण दुकान मत खोलिए। <strong>घर-घर सुबह पैक दूध पहुँचाने और ताज़ा पनीर व दही</strong> की सेवा शुरू करें। इसमें आम दूध के मुकाबले 40% ज़्यादा बचत होती है और मुकाबला भी नहीं है।
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>स्थानीय मांग</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#15803d' }}>82/100</div>
                      <span style={{ fontSize: '0.68rem', color: '#10b981' }}>दैनिक व शादी के मौसम में</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>दुकानों की भीड़</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#d97706' }}>64/100</div>
                      <span style={{ fontSize: '0.68rem', color: '#f59e0b' }}>मध्यम से ज़्यादा</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>मुनाफे की गुंजाइश</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#15803d' }}>80/100</div>
                      <span style={{ fontSize: '0.68rem', color: '#10b981' }}>₹50,000+ बचत / माह</span>
                    </div>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>चारे की निर्भरता</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ef4444' }}>58/100</div>
                      <span style={{ fontSize: '0.68rem', color: '#ef4444' }}>सूखे चारे पर ध्यान दें</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setActiveTab('market')} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    आस-पास का नक्शा देखें ➔
                  </button>
                  <button onClick={() => setActiveTab('simulator')} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    मुनाफे की जाँच करें ➔
                  </button>
                  <button onClick={() => setActiveTab('report')} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                    बैंक रिपोर्ट तैयार करें ➔
                  </button>
                </div>
              </div>

              <div style={{ gridColumn: 'span 4' }}>
                <div className="glass-panel" style={{ padding: '24px', background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px' }}>⚠️</span>
                    <h4 style={{ fontSize: '1rem', color: '#92400e', margin: 0 }}>
                      सावधानी: जितना लोन मिले, उतना मत लें!
                    </h4>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.55, marginBottom: '16px' }}>
                    आपकी ₹1 लाख की पूँजी पर सरकारी नियमों के अनुसार बैंक आपको <strong>₹9,00,000</strong> तक का लोन दे सकता है। लेकिन पूरा 9 लाख उधार लेना खतरनाक हो सकता है:
                  </p>

                  <div style={{ background: '#ffffff', borderRadius: '10px', padding: '12px', border: '1px solid #fef3c7', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                      <span style={{ color: '#64748b' }}>अधिकतम लोन:</span>
                      <span style={{ fontWeight: 700, color: '#b91c1c' }}>₹9,00,000 (किस्त: ₹15,400)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                      <span style={{ color: '#64748b' }}>सुरक्षित लोन:</span>
                      <span style={{ fontWeight: 700, color: '#15803d' }}>₹7,20,000 (किस्त: ₹12,320)</span>
                    </div>
                  </div>

                  <div style={{ background: '#fef3c7', padding: '10px 12px', borderRadius: '8px', fontSize: '0.78rem', color: '#92400e', lineHeight: 1.45 }}>
                    🌱 <strong>सलाह:</strong> ₹7.2 लाख लोन लेने पर हर महीने ₹3,080 की बचत बचेगी, जिससे गर्मियों में मवेशी कम दूध देने पर भी आपकी किस्त आसानी से निकल जाएगी।
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MARKET & SATURATION MAP */}
          {activeTab === 'market' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
              <div style={{ gridColumn: 'span 8' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', color: '#14532d', margin: 0 }}>
                        🗺️ 10 किमी के दायरे में लाइव बाज़ार व दुकानें ({currentVillage}, बस्ती)
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0' }}>
                        गणेशपुर, बस्ती सदर मंडी और NH-28 लखनऊ-गोरखपुर हाईवे के आस-पास का लाइव OpenStreetMap नज़ारा
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span className="rural-badge success">4 मुख्य दूध विक्रेता</span>
                      <span className="rural-badge warning">3 हाईवे ढाबे (ग्राहक)</span>
                    </div>
                  </div>

                  {/* Interactive Leaflet Map for Tab 2 */}
                  <div style={{
                    height: '420px',
                    width: '100%',
                    background: '#f8fafc',
                    borderRadius: '16px',
                    border: '1.5px solid #cbd5e1',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <MapContainer
                      center={[26.8105, 82.7214]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <DashboardMapFix center={[26.8105, 82.7214]} />
                      
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />

                      {/* 5km Radius Buffer */}
                      <Circle
                        center={[26.8105, 82.7214]}
                        radius={4000}
                        pathOptions={{
                          color: '#15803d',
                          fillColor: '#86efac',
                          fillOpacity: 0.08,
                          weight: 2,
                          dashArray: '4, 6'
                        }}
                      />

                      {/* Village Center Pin */}
                      <Marker position={[26.8105, 82.7214]} icon={createPinIcon('center')}>
                        <Popup>
                          <div style={{ padding: '4px' }}>
                            <strong style={{ fontSize: '0.92rem', color: '#1e3a8a' }}>📍 {currentVillage} चौपाल</strong>
                            <p style={{ margin: '3px 0 0 0', fontSize: '0.78rem', color: '#475569' }}>
                              ब्लॉक {currentBlock}, जिला {currentDistrict} (उ.प्र.)
                            </p>
                          </div>
                        </Popup>
                      </Marker>

                      {/* Competitor Pins */}
                      {COMPETITORS_MOCK.map((c) => (
                        <Marker
                          key={c.id}
                          position={[26.8105 + (c.latOffset || 0.01), 82.7214 + (c.lngOffset || 0.01)]}
                          icon={createPinIcon('shop')}
                        >
                          <Popup>
                            <div style={{ padding: '4px', minWidth: '150px' }}>
                              <span style={{ background: '#fee2e2', color: '#b91c1c', fontSize: '0.68rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>
                                प्रतिस्पर्धी दुकान
                              </span>
                              <h4 style={{ margin: '4px 0 2px 0', fontSize: '0.86rem', color: '#0f172a' }}>{c.name}</h4>
                              <p style={{ margin: 0, fontSize: '0.76rem', color: '#64748b' }}>
                                मॉडल: {c.type} • भाव: <strong>{c.pricePerLtr}</strong>
                              </p>
                            </div>
                          </Popup>
                        </Marker>
                      ))}

                      {/* Untapped Opportunity Pin */}
                      <Marker position={[26.8160, 82.7280]} icon={createPinIcon('gap', true)}>
                        <Popup>
                          <div style={{ padding: '4px', minWidth: '180px' }}>
                            <span style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.7rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
                              ★ खाली व्यापारिक अवसर (Score: 89/100)
                            </span>
                            <h4 style={{ margin: '6px 0 3px 0', fontSize: '0.9rem', color: '#14532d' }}>
                              चिल्ड मिल्क डिलीवरी व ताज़ा पनीर यूनिट
                            </h4>
                            <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155' }}>
                              NH-28 ढाबों व आवासीय कॉलोनियों में कोई प्रतिद्वंदी नहीं।
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>

                    {/* Bottom floating legend */}
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      right: '10px',
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      padding: '6px 12px',
                      borderRadius: '10px',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 1000,
                      flexWrap: 'wrap',
                      gap: '6px'
                    }}>
                      <span style={{ color: '#b91c1c', fontWeight: 700 }}>● प्रतिस्पर्धी दुकानें (4)</span>
                      <span style={{ color: '#15803d', fontWeight: 800 }}>✨ AI नया अवसर (पनीर व डिलीवरी)</span>
                      <span style={{ color: '#1e40af', fontWeight: 700 }}>📍 आपका गाँव केंद्र</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: 'span 4' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '14px' }}>
                    आस-पास के दूध विक्रेताओं की सूची
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {COMPETITORS_MOCK.map((c) => (
                      <div key={c.id} style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{c.name}</strong>
                          <span className="rural-badge info" style={{ fontSize: '0.62rem' }}>
                            {c.distKm} किमी दूर
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b' }}>
                          <span>मॉडल: {c.type}</span>
                          <span style={{ fontWeight: 600, color: '#15803d' }}>{c.pricePerLtr}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '16px', background: '#ecfdf5', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0', fontSize: '0.78rem', color: '#166534', lineHeight: 1.45 }}>
                    💡 <strong>काम की बात:</strong> इन चारों दुकानों में से कोई भी ताज़ा पैक पनीर या सुबह-सुबह घर पर बोतल में दूध नहीं पहुँचाता। यही आपकी सबसे बड़ी ताकत बन सकती है!
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: OPPORTUNITY GAPS */}
          {activeTab === 'opportunity' && (
            <div className="animate-fade-in">
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#14532d', margin: '0 0 4px 0' }}>
                  गाँव में किन चीज़ों की कमी है? (ज़्यादा मुनाफे के अवसर)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
                  दूसरे लोगों की नकल करने के बजाय उन चीज़ों पर काम करें जिनकी ग्राहकों को ज़रूरत है
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {OPPORTUNITY_Gaps.map((gap) => (
                  <div 
                    key={gap.id} 
                    className="glass-panel" 
                    style={{ 
                      padding: '24px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between',
                      borderTop: gap.score > 85 ? '4px solid #15803d' : '1px solid #e2e8f0'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span className="rural-badge success" style={{ fontSize: '0.7rem' }}>
                          {gap.badge}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#15803d' }}>{gap.score}</span>
                          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>/100</span>
                        </div>
                      </div>

                      <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '8px' }}>
                        {gap.title}
                      </h4>
                      <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.5, marginBottom: '16px' }}>
                        {gap.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                          <span style={{ color: '#64748b' }}>संभावित बाज़ार बिक्री:</span>
                          <strong style={{ color: '#0f172a' }}>{gap.addressableDemand}</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                          <span style={{ color: '#64748b' }}>सुझाई गई कीमत:</span>
                          <strong style={{ color: '#15803d' }}>{gap.recommendedPricing}</strong>
                        </div>
                      </div>

                      <button 
                        onClick={() => setActiveTab('finance')}
                        className="btn-primary" 
                        style={{ width: '100%', justifyContent: 'center', fontSize: '0.84rem', padding: '10px' }}
                      >
                        इस मॉडल के लिए लोन योजना देखें ➔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FINANCIAL PLANNER & SCHEMES */}
          {activeTab === 'finance' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
              <div style={{ gridColumn: 'span 8' }}>
                <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#14532d', margin: 0 }}>
                      परियोजना लागत और लोन का हिसाब-किताब
                    </h3>
                    <span className="rural-badge info">10% अपनी पूँजी मॉडल</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '24px' }}>
                    <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b' }}>आपकी अपनी पूँजी</span>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                        ₹{Number(finance.beneficiaryCapital).toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#15803d' }}>10% योगदान</span>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '0.74rem', color: '#64748b' }}>कुल प्रोजेक्ट खर्च</span>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>
                        ₹{Number(finance.projectCost).toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#64748b' }}>शेड, गायें व मशीनें</span>
                    </div>

                    <div style={{ background: '#fef2f2', padding: '14px', borderRadius: '12px', border: '1px solid #fecaca' }}>
                      <span style={{ fontSize: '0.74rem', color: '#991b1b' }}>अधिकतम लोन (जोखिम भरा)</span>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#b91c1c' }}>
                        ₹{Number(finance.eligibleLoan).toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#991b1b' }}>किस्त: ₹{finance.emiEligible.toLocaleString('en-IN')}</span>
                    </div>

                    <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                      <span style={{ fontSize: '0.74rem', color: '#166534' }}>सुरक्षित सुझाई गई राशि</span>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#15803d' }}>
                        ₹{Number(finance.recommendedLoan).toLocaleString('en-IN')}
                      </div>
                      <span style={{ fontSize: '0.68rem', color: '#15803d' }}>किस्त: ₹{finance.emiRecommended.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '18px', border: '1px solid #e2e8f0' }}>
                    <h4 style={{ fontSize: '0.92rem', color: '#0f172a', marginBottom: '10px' }}>
                      किस्त (EMI) की मुख्य शर्तें:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ color: '#64748b' }}>ब्याज दर:</span>
                        <strong style={{ display: 'block', color: '#0f172a' }}>{finance.interestRate}% प्रति वर्ष (घटते मूलधन पर)</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>वापसी अवधि:</span>
                        <strong style={{ display: 'block', color: '#0f172a' }}>{finance.tenureYears} वर्ष (84 महीने)</strong>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>शुरुआती छूट (Moratorium):</span>
                        <strong style={{ display: 'block', color: '#15803d' }}>पहले {finance.moratoriumMonths} महीने केवल ब्याज दें</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: 'span 4' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '14px' }}>
                    सरकारी योजनाएं और सब्सिडी
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {SCHEMES.map((s) => {
                      const isSelected = financeScheme === s.id;
                      return (
                        <div
                          key={s.id}
                          onClick={() => setFinanceScheme(s.id)}
                          style={{
                            background: isSelected ? '#f0fdf4' : '#ffffff',
                            border: isSelected ? '2px solid #15803d' : '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '0.86rem', color: '#0f172a' }}>{s.name}</strong>
                            {isSelected && <CheckCircle2 size={16} color="#15803d" />}
                          </div>
                          <p style={{ fontSize: '0.76rem', color: '#15803d', fontWeight: 600, margin: '2px 0 6px 0' }}>
                            {s.subsidy}
                          </p>
                          <p style={{ fontSize: '0.72rem', color: '#64748b', margin: 0 }}>
                            {s.bestFor}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
              <div style={{ gridColumn: 'span 7' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '1.15rem', color: '#14532d', margin: 0 }}>
                      अगर बाज़ार में उतार-चढ़ाव आए, तो क्या होगा?
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
                      नीचे दिए गए बटन या स्लाइडर दबाकर देखें कि बुरे वक्त में भी आपकी कितनी बचत रहेगी
                    </p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '8px' }}>
                      एक क्लिक में स्थिति की जाँच करें:
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => { setSalesMod(-20); setCostMod(0); setWorkers(0); setLoanMod(0); }}
                        style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        🚨 बिक्री 20% घट जाए
                      </button>
                      <button
                        onClick={() => { setSalesMod(0); setCostMod(15); setWorkers(0); setLoanMod(0); }}
                        style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        📈 चारा 15% महँगा हो जाए
                      </button>
                      <button
                        onClick={() => { setSalesMod(0); setCostMod(0); setWorkers(1); setLoanMod(0); }}
                        style={{ background: '#e0f2fe', color: '#075985', border: '1px solid #bae6fd', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        👥 एक हेल्पर रखें (+₹9,000)
                      </button>
                      <button
                        onClick={() => { setSalesMod(0); setCostMod(0); setWorkers(0); setLoanMod(0); }}
                        style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '7px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        🔄 सामान्य स्थिति
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: '#334155', fontWeight: 600 }}>मासिक दूध बिक्री में बदलाव:</span>
                      <strong style={{ color: salesMod >= 0 ? '#15803d' : '#b91c1c' }}>{salesMod > 0 ? `+${salesMod}%` : `${salesMod}%`}</strong>
                    </div>
                    <input 
                      type="range" 
                      min="-40" 
                      max="40" 
                      value={salesMod}
                      onChange={(e) => setSalesMod(Number(e.target.value))}
                      style={{ width: '100%', accentColor: salesMod >= 0 ? '#15803d' : '#ef4444' }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: '#334155', fontWeight: 600 }}>पशु चारे की कीमत में बदलाव:</span>
                      <strong style={{ color: costMod > 0 ? '#b91c1c' : '#15803d' }}>{costMod > 0 ? `+${costMod}%` : `${costMod}%`}</strong>
                    </div>
                    <input 
                      type="range" 
                      min="-20" 
                      max="30" 
                      value={costMod}
                      onChange={(e) => setCostMod(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#f59e0b' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                      <span style={{ color: '#334155', fontWeight: 600 }}>लोन राशि में कटौती (कम कर्ज लेना):</span>
                      <strong style={{ color: '#15803d' }}>-{loanMod}%</strong>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="50" 
                      step="5"
                      value={loanMod}
                      onChange={(e) => setLoanMod(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#15803d' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: 'span 5' }}>
                <div className="glass-panel" style={{ padding: '24px', background: '#ffffff', border: `2px solid ${simulation.healthColor}` }}>
                  <span style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                    व्यापार की स्थिति (वर्तमान हिसाब से)
                  </span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: simulation.healthColor, margin: '6px 0 16px 0' }}>
                    {simulation.healthStatus === 'HEALTHY' ? 'सुरक्षित और मुनाफेमंद' : simulation.healthStatus === 'CRITICAL / DON\'T START' ? 'खतरे में — अभी शुरू न करें' : 'सतर्क रहें — कम बचत'}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ color: '#64748b' }}>महीने की कुल बिक्री:</span>
                      <strong>₹{simulation.adjustedRevenue.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ color: '#64748b' }}>चारे व संचालन का खर्च:</span>
                      <strong style={{ color: '#b91c1c' }}>₹{simulation.totalOpex.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ color: '#64748b' }}>सकल मुनाफा:</span>
                      <strong>₹{simulation.grossProfit.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ color: '#64748b' }}>बैंक की किस्त (EMI):</span>
                      <strong style={{ color: '#d97706' }}>₹{simulation.adjustedEmi.toLocaleString('en-IN')}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', paddingTop: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>घर ले जाने वाली शुद्ध बचत:</span>
                      <strong style={{ color: simulation.netSurplus > 15000 ? '#15803d' : '#b91c1c' }}>
                        ₹{simulation.netSurplus.toLocaleString('en-IN')} / माह
                      </strong>
                    </div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem', color: '#475569' }}>
                    📊 <strong>बैंक किस्त सुरक्षा अनुपात (DSCR):</strong> <span style={{ fontWeight: 700, color: Number(simulation.dscr) >= 1.5 ? '#15803d' : '#b91c1c' }}>{simulation.dscr}x</span> (बैंक का नियम: 1.40x से ज़्यादा होना चाहिए)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: RISKS */}
          {activeTab === 'risks' && (
            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px' }}>
              <div style={{ gridColumn: 'span 8' }}>
                <div className="glass-panel" style={{ padding: '24px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#14532d', marginBottom: '6px' }}>
                    साल के 12 महीनों में मांग का उतार-चढ़ाव
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '20px' }}>
                    जानिए कब सबसे ज़्यादा दूध बिकेगा और किन महीनों में खर्च के लिए पहले से बचत रखनी होगी
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '6px', alignItems: 'flex-end', height: '180px', marginBottom: '16px' }}>
                    {SEASONAL_DATA.map((m) => {
                      const isLow = m.demand < 60;
                      const isPeak = m.demand >= 85;
                      return (
                        <div key={m.month} style={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: isPeak ? '#15803d' : isLow ? '#ef4444' : '#64748b' }}>
                            {m.demand}%
                          </span>
                          <div style={{
                            height: `${m.demand * 1.4}px`,
                            background: isPeak ? 'linear-gradient(180deg, #22c55e, #15803d)' : isLow ? '#f87171' : '#94a3b8',
                            borderRadius: '4px 4px 0 0',
                            marginTop: '4px'
                          }} />
                          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#334155', marginTop: '6px' }}>
                            {m.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '12px 16px', fontSize: '0.8rem', color: '#1e40af', lineHeight: 1.5 }}>
                    🗓️ <strong>मौसम की सलाह:</strong> सबसे ज़्यादा कमाई <strong>अक्टूबर से दिसंबर (दिवाली और लगन का मौसम)</strong> में होगी। मई-जून की भीषण गर्मी में दूध कम होता है, इसलिए अप्रैल में ही ₹25,000 की अलग बचत तैयार रखें।
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: 'span 4' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '14px' }}>
                    ज़रूरी सावधानियाँ (जोखिम से बचाव)
                  </h4>

                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <AlertTriangle size={16} color="#dc2626" />
                      <strong style={{ fontSize: '0.84rem', color: '#991b1b' }}>एक ही चारे वाले पर निर्भर न रहें</strong>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#7f1d1d', margin: '0 0 6px 0', lineHeight: 1.45 }}>
                      मंडी का एक ही व्यापारी 70% सूखा चारा बेचता है। यदि वह दाम बढ़ा दे तो आपका नुकसान हो सकता है।
                    </p>
                    <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 600 }}>
                      बचाव: आस-पास के 2 किसानों से हरे चारे की सीधी आपूर्ति तय करें।
                    </span>
                  </div>

                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <AlertTriangle size={16} color="#d97706" />
                      <strong style={{ fontSize: '0.84rem', color: '#92400e' }}>केवल एक बड़े ग्राहक पर निर्भर न रहें</strong>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#78350f', margin: '0 0 6px 0', lineHeight: 1.45 }}>
                      सारा दूध किसी एक चिलिंग प्लांट या मिठाई वाले को न दें। यदि वे भुगतान में देरी करें तो किस्त रुक सकती है।
                    </p>
                    <span style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 600 }}>
                      बचाव: आधा दूध सीधे घरों में और आधा ढाबों को बाँटें।
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: COMPARISON */}
          {activeTab === 'compare' && (
            <div className="animate-fade-in">
              <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#14532d', marginBottom: '16px' }}>
                  अन्य व्यवसायों से सीधी तुलना
                </h3>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
                      <th style={{ padding: '12px 16px', borderRadius: '8px 0 0 8px' }}>पैमाना</th>
                      <th style={{ padding: '12px 16px', color: '#15803d', fontWeight: 800 }}>डेयरी उत्पाद (प्रस्तावित)</th>
                      <th style={{ padding: '12px 16px' }}>कपड़ा व सिलाई बुटीक</th>
                      <th style={{ padding: '12px 16px', borderRadius: '0 8px 8px 0' }}>पोल्ट्री फार्मिंग (मुर्गी पालन)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>गाँव में मांग</td>
                      <td style={{ padding: '12px 16px', color: '#15803d', fontWeight: 700 }}>82 / 100 (रोजाना की ज़रूरत)</td>
                      <td style={{ padding: '12px 16px' }}>71 / 100 (त्योहारों में)</td>
                      <td style={{ padding: '12px 16px' }}>79 / 100 (साप्ताहिक)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>बीमारी या नुकसान का जोखिम</td>
                      <td style={{ padding: '12px 16px', color: '#d97706', fontWeight: 700 }}>मध्यम (टीकाकरण ज़रूरी)</td>
                      <td style={{ padding: '12px 16px', color: '#15803d' }}>बहुत कम</td>
                      <td style={{ padding: '12px 16px', color: '#ef4444' }}>ज़्यादा (संक्रमण का खतरा)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>मासिक शुद्ध बचत</td>
                      <td style={{ padding: '12px 16px', color: '#15803d', fontWeight: 700 }}>₹52,000 - ₹91,000</td>
                      <td style={{ padding: '12px 16px' }}>₹28,000 - ₹42,000</td>
                      <td style={{ padding: '12px 16px' }}>₹45,000 - ₹75,000</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>₹1 लाख बजट में उपयुक्तता</td>
                      <td style={{ padding: '12px 16px', color: '#15803d', fontWeight: 700 }}>सर्वोत्तम (PMEGP में 25% सब्सिडी)</td>
                      <td style={{ padding: '12px 16px' }}>उत्तम (कम पूँजी चाहिए)</td>
                      <td style={{ padding: '12px 16px' }}>मध्यम</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', fontWeight: 800 }}>अंतिम निर्णय</td>
                      <td style={{ padding: '12px 16px', color: '#15803d', fontWeight: 800, fontSize: '1.05rem' }}>78 / 100 (सबसे उपयुक्त)</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>74 / 100</td>
                      <td style={{ padding: '12px 16px', fontWeight: 700 }}>76 / 100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: REPORT */}
          {activeTab === 'report' && (
            <div className="animate-fade-in">
              <div className="glass-panel" style={{ padding: '32px', background: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '2px solid #15803d', paddingBottom: '16px' }}>
                  <div>
                    <span className="rural-badge success" style={{ marginBottom: '4px' }}>बैंक आवेदन के लिए तैयार दस्तावेज़</span>
                    <h2 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '4px 0 0 0' }}>
                      उद्यम व्यवहार्यता एवं लोन प्रोजेक्ट रिपोर्ट
                    </h2>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      स्थान: ग्राम पंचायत {currentVillage}, ब्लॉक {currentBlock}, {currentDistrict}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      onClick={() => window.print()}
                      className="btn-primary" 
                      style={{ fontSize: '0.84rem', padding: '8px 18px' }}
                    >
                      <Download size={15} /> रिपोर्ट प्रिंट / सेव करें
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '32px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
                  <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '8px' }}>
                    बैंक में आवेदन करने से पहले ये 5 काम अवश्य पूरा करें:
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '14px' }}>
                    इन तैयारियों से आपका लोन बिना किसी अड़चन के तुरंत स्वीकृत होगा:
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      "गाँव के 10 परिवारों से सुबह ताज़ा दूध और पनीर पहुँचाने की बात तय करें।",
                      "हाईवे के 3 ढाबों से नियमित दूध सप्लाई का मौखिक या लिखित समझौता करें।",
                      "2 स्थानीय किसानों से हरे चारे की सप्लाई का दाम पक्का करें।",
                      "पशु शेड की जगह और पानी की सुविधा की जाँच पूरी करें।",
                      "आधार कार्ड, पैन कार्ड, ज़मीन की खतौनी और 6 महीने की बैंक पासबुक तैयार रखें।"
                    ].map((act, idx) => (
                      <div 
                        key={idx}
                        onClick={() => toggleAction(idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: completedActions[idx] ? '#ecfdf5' : '#ffffff',
                          border: completedActions[idx] ? '1px solid #10b981' : '1px solid #e2e8f0',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.84rem',
                          color: completedActions[idx] ? '#065f46' : '#334155'
                        }}
                      >
                        <input type="checkbox" checked={completedActions[idx]} onChange={() => {}} style={{ accentColor: '#15803d' }} />
                        <span style={{ textDecoration: completedActions[idx] ? 'line-through' : 'none' }}>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#64748b', display: 'block' }}>व्यापार स्कोर</strong>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d' }}>78 / 100</span>
                    <p style={{ fontSize: '0.74rem', color: '#64748b', margin: '4px 0 0 0' }}>स्थानीय मांग और पूँजी के अनुसार उत्तम</p>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#64748b', display: 'block' }}>सुझाई गई लोन राशि</strong>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>₹7,20,000</span>
                    <p style={{ fontSize: '0.74rem', color: '#15803d', margin: '4px 0 0 0' }}>PMEGP योजना में 25% सब्सिडी योग्य</p>
                  </div>

                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '14px' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#64748b', display: 'block' }}>मासिक शुद्ध बचत</strong>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d' }}>₹52,600 / माह</span>
                    <p style={{ fontSize: '0.74rem', color: '#15803d', margin: '4px 0 0 0' }}>किस्त चुकाने के बाद सुरक्षित लाभ</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
