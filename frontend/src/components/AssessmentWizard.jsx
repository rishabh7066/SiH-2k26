import React, { useState } from 'react';
import { 
  MapPin, 
  Coins, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Sliders, 
  HelpCircle,
  Award,
  Crosshair,
  UserCheck,
  Target,
  Lock,
  RefreshCw,
  Navigation
} from 'lucide-react';
import { LOCATIONS, BUSINESS_CATEGORIES } from '../data/mockData';

export default function AssessmentWizard({ 
  onComplete, 
  onCancel, 
  initialState = {} 
}) {
  const [step, setStep] = useState(1);

  // Form State (Locked strictly to Uttar Pradesh, District Basti)
  const [selectedState, setSelectedState] = useState("Uttar Pradesh");
  const [selectedDistrict, setSelectedDistrict] = useState("Basti");
  const [selectedBlock, setSelectedBlock] = useState(initialState.block || "Basti Sadar");
  const [selectedVillage, setSelectedVillage] = useState(initialState.village || "Ganeshpur");
  const [capital, setCapital] = useState(initialState.capital || 100000);
  const [businessCategory, setBusinessCategory] = useState(initialState.businessCategory || "dairy");
  const [experience, setExperience] = useState(initialState.experience || "some");
  const [resources, setResources] = useState(initialState.resources || ["land", "livestock"]);
  const [goals, setGoals] = useState(initialState.goals || ["viability", "loan", "opportunity"]);
  const [suggestedMode, setSuggestedMode] = useState(false);

  // GPS Geolocation state
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsBanner, setGpsBanner] = useState(null);

  // Available options
  const currentStateObj = LOCATIONS[0];
  const currentVillages = currentStateObj.villages;

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsBanner({ 
        type: 'warning', 
        text: 'आपके ब्राउज़र में जीपीएस सपोर्ट नहीं है। बस्ती (गणेशपुर) स्थान चुना गया।' 
      });
      return;
    }

    setGpsLoading(true);
    setGpsBanner({ 
      type: 'info', 
      text: 'उपग्रह से लाइव जीपीएस सिग्नल खोजा जा रहा है (Detecting live GPS coordinates)...' 
    });

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGpsLoading(false);
        const { latitude, longitude, accuracy } = pos.coords;
        setSelectedState("Uttar Pradesh");
        setSelectedDistrict("Basti");

        // Find nearest village in Basti
        let closest = currentVillages[0];
        let minDist = 999999;
        currentVillages.forEach(v => {
          if (v.lat && v.lng) {
            const d = Math.hypot(v.lat - latitude, v.lng - longitude);
            if (d < minDist) {
              minDist = d;
              closest = v;
            }
          }
        });

        setSelectedVillage(closest.name);
        setSelectedBlock(closest.block || "Basti Sadar");
        setGpsBanner({
          type: 'success',
          text: `🎯 जीपीएस मिला (${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E, ±${Math.round(accuracy)}m) ➔ सबसे नज़दीकी गाँव चुना गया: ${closest.name}, ब्लॉक ${closest.block || 'बस्ती सदर'}`
        });
      },
      (err) => {
        console.warn('GPS error in wizard:', err);
        setGpsLoading(false);
        setSelectedState("Uttar Pradesh");
        setSelectedDistrict("Basti");
        setSelectedBlock("Basti Sadar");
        setSelectedVillage("Ganeshpur");
        setGpsBanner({
          type: 'warning',
          text: `जीपीएस अनुमति नहीं मिली या सिग्नल अनुपलब्ध है। डिफ़ॉल्ट: गणेशपुर, ब्लॉक बस्ती सदर (उत्तर प्रदेश) चुना गया।`
        });
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  };

  const handleResourceToggle = (res) => {
    if (resources.includes(res)) {
      setResources(resources.filter(r => r !== res));
    } else {
      setResources([...resources, res]);
    }
  };

  const handleGoalToggle = (goal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleFinish = () => {
    onComplete({
      state: selectedState,
      district: selectedDistrict,
      block: selectedBlock,
      village: selectedVillage,
      capital,
      businessCategory,
      experience,
      resources,
      goals
    });
  };

  return (
    <div style={{ maxWidth: '840px', margin: '30px auto', padding: '0 20px' }}>
      {/* Wizard Progress Bar */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '20px 24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step {step} of 5
            </span>
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', margin: '2px 0 0 0' }}>
              {step === 1 && "Select Village Location (स्थान चयन)"}
              {step === 2 && "Available Margin Capital (अपनी जमा पूंजी)"}
              {step === 3 && "Select Proposed Business (उद्यम का चयन)"}
              {step === 4 && "Experience & Resources (अनुभव और साधन)"}
              {step === 5 && "Primary Assessment Goals (प्राथमिक उद्देश्य)"}
            </h3>
          </div>
          <button 
            onClick={onCancel} 
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.85rem' }}
          >
            Cancel
          </button>
        </div>

        {/* 5 Step Indicator */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                background: s <= step ? '#15803d' : '#e2e8f0',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Wizard Content Card */}
      <div className="glass-panel" style={{ padding: '32px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* STEP 1: Location */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <p style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.96rem', margin: 0 }}>
                  📍 लक्षित ग्राम पंचायत व ब्लॉक चयन (Target Location)
                </p>
                <p style={{ color: '#64748b', fontSize: '0.82rem', margin: '2px 0 0 0' }}>
                  राज्य: <strong>उत्तर प्रदेश</strong> व ज़िला: <strong>बस्ती</strong> प्राथमिक विश्लेषण के लिए लॉक किया गया है।
                </p>
              </div>
              <button 
                onClick={handleDetectGPS}
                disabled={gpsLoading}
                className="btn-primary" 
                style={{ 
                  padding: '8px 16px', 
                  fontSize: '0.82rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  background: 'linear-gradient(135deg, #15803d 0%, #166534 100%)',
                  cursor: gpsLoading ? 'wait' : 'pointer'
                }}
              >
                {gpsLoading ? (
                  <>
                    <RefreshCw size={15} className="animate-spin" />
                    <span>जीपीएस खोज रहे हैं...</span>
                  </>
                ) : (
                  <>
                    <Navigation size={15} />
                    <span>🎯 GPS से मेरा गाँव खोजें (Auto GPS)</span>
                  </>
                )}
              </button>
            </div>

            {/* GPS Feedback Banner */}
            {gpsBanner && (
              <div style={{
                background: gpsBanner.type === 'success' ? '#f0fdf4' : (gpsBanner.type === 'warning' ? '#fffbeb' : '#eff6ff'),
                border: `1px solid ${gpsBanner.type === 'success' ? '#bbf7d0' : (gpsBanner.type === 'warning' ? '#fde68a' : '#bfdbfe')}`,
                borderRadius: '10px',
                padding: '10px 14px',
                marginBottom: '18px',
                fontSize: '0.82rem',
                color: gpsBanner.type === 'success' ? '#166534' : (gpsBanner.type === 'warning' ? '#92400e' : '#1e40af'),
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>{gpsBanner.type === 'success' ? '✅' : (gpsBanner.type === 'warning' ? 'ℹ️' : '📡')}</span>
                <span>{gpsBanner.text}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {/* State (LOCKED) */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <Lock size={13} color="#15803d" />
                  <span>राज्य (State) — लॉक है</span>
                </label>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #86efac',
                  background: '#f0fdf4',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Uttar Pradesh (उत्तर प्रदेश)</span>
                  <span style={{ fontSize: '0.7rem', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px', color: '#15803d' }}>
                    🔒 Locked
                  </span>
                </div>
              </div>

              {/* District (LOCKED) */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                  <Lock size={13} color="#15803d" />
                  <span>जिला (District) — लॉक है</span>
                </label>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1.5px solid #86efac',
                  background: '#f0fdf4',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>Basti (बस्ती)</span>
                  <span style={{ fontSize: '0.7rem', background: '#dcfce7', padding: '2px 8px', borderRadius: '6px', color: '#15803d' }}>
                    🔒 Locked
                  </span>
                </div>
              </div>

              {/* Block */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  विकास खंड (Block)
                </label>
                <input 
                  type="text" 
                  value={selectedBlock} 
                  onChange={(e) => setSelectedBlock(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', fontWeight: 600, background: '#ffffff' }}
                />
              </div>

              {/* Village / Gram Panchayat */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                  गाँव / ग्राम पंचायत (Village)
                </label>
                <select 
                  value={selectedVillage} 
                  onChange={(e) => {
                    const villageName = e.target.value;
                    setSelectedVillage(villageName);
                    const match = currentVillages.find(v => v.name === villageName);
                    if (match && match.block) {
                      setSelectedBlock(match.block);
                    }
                  }}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid #cbd5e1', fontSize: '0.92rem', fontWeight: 700, background: '#ffffff', cursor: 'pointer' }}
                >
                  {currentVillages.map(v => (
                    <option key={v.name} value={v.name}>
                      {v.name} (ब्लॉक: {v.block || 'बस्ती सदर'}, आबादी: {v.pop})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Selected Location Card */}
            <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={22} color="#15803d" />
              </div>
              <div>
                <strong style={{ color: '#166534', fontSize: '0.96rem' }}>
                  चुना गया क्षेत्र: {selectedVillage}, ब्लॉक {selectedBlock}, जिला बस्ती (उत्तर प्रदेश)
                </strong>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#475569' }}>
                  ✓ सेंसस डेटा व ओपनस्ट्रीटमैप लाइव मैपिंग सक्रिय • 10 किमी दायरे में प्रतिस्पर्धी विश्लेषण उपलब्ध
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Capital */}
        {step === 2 && (
          <div className="animate-fade-in">
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '24px' }}>
              Enter the own contribution (margin money) you can invest from personal savings or family:
            </p>

            <div style={{ textAlign: 'center', margin: '24px 0' }}>
              <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>Your Available Capital (Margin Money)</span>
              <div style={{ fontSize: '2.8rem', fontWeight: 800, color: '#15803d', margin: '8px 0' }}>
                ₹ {Number(capital).toLocaleString('en-IN')}
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                At a 10% promoter contribution, this can support a project up to <strong>₹{(capital * 10).toLocaleString('en-IN')}</strong> under PMEGP/Mudra!
              </p>
            </div>

            <div style={{ margin: '30px 20px' }}>
              <input 
                type="range" 
                min="25000" 
                max="500000" 
                step="10000"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                style={{ width: '100%', height: '8px', borderRadius: '4px', accentColor: '#15803d', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
                <span>₹25,000</span>
                <span>₹1,00,000 (Recommended)</span>
                <span>₹2,50,000</span>
                <span>₹5,00,000</span>
              </div>
            </div>

            {/* Quick preset buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              {[50000, 100000, 150000, 200000].map(amt => (
                <button
                  key={amt}
                  onClick={() => setCapital(amt)}
                  style={{
                    background: capital === amt ? '#15803d' : '#f1f5f9',
                    color: capital === amt ? '#ffffff' : '#334155',
                    border: 'none',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Business Selection */}
        {step === 3 && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <p style={{ color: '#475569', fontSize: '0.92rem', margin: 0 }}>
                Choose a proposed enterprise or let AI suggest based on village gap:
              </p>
              
              <button 
                onClick={() => {
                  setSuggestedMode(true);
                  setBusinessCategory("dairy");
                }}
                className="btn-secondary" 
                style={{
                  background: '#fef3c7',
                  borderColor: '#fde68a',
                  color: '#b45309',
                  padding: '6px 12px',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}
              >
                ✨ I Don't Know — Suggest a Business
              </button>
            </div>

            {suggestedMode && (
              <div style={{ background: '#ecfdf5', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '12px 16px', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={20} color="#15803d" />
                <span style={{ fontSize: '0.84rem', color: '#166534', fontWeight: 600 }}>
                  AI Suggestion for {selectedVillage}: Dairy & Milk Products has highest opportunity gap (89/100) due to proximity to Highway 19 dhabas!
                </span>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}>
              {BUSINESS_CATEGORIES.map((b) => {
                const isSelected = businessCategory === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => setBusinessCategory(b.id)}
                    style={{
                      background: isSelected ? '#f0fdf4' : '#ffffff',
                      border: isSelected ? '2px solid #15803d' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(21, 128, 61, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '1.4rem' }}>
                        {b.id === 'dairy' ? '🥛' : b.id === 'poultry' ? '🥚' : b.id === 'food_proc' ? '🌾' : b.id === 'tailoring' ? '✂️' : b.id === 'agro_retail' ? '🌱' : '🔧'}
                      </span>
                      <span className="rural-badge success" style={{ fontSize: '0.65rem' }}>
                        {b.viabilityBase}/100 Fit
                      </span>
                    </div>
                    <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                      {b.name}
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.74rem', color: '#64748b' }}>
                      Peak: {b.demandHigh}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Experience & Resources */}
        {step === 4 && (
          <div className="animate-fade-in">
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '20px' }}>
              Your existing skills and physical assets reduce operational risk:
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '10px' }}>
                Prior Experience in this Trade:
              </label>
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                {[
                  { id: "none", label: "No prior experience (First-time)" },
                  { id: "some", label: "Some experience / Family business" },
                  { id: "extensive", label: "Extensive (3+ years working)" }
                ].map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => setExperience(exp.id)}
                    style={{
                      background: experience === exp.id ? '#15803d' : '#f8fafc',
                      color: experience === exp.id ? '#ffffff' : '#334155',
                      border: '1px solid',
                      borderColor: experience === exp.id ? '#15803d' : '#cbd5e1',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: '10px' }}>
                Existing Available Assets / Infrastructure (Select all that apply):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                {[
                  { id: "shop", label: "Own Commercial Shop / Shed" },
                  { id: "land", label: "Available Agricultural Land" },
                  { id: "equipment", label: "Machinery / Tools" },
                  { id: "livestock", label: "Existing Livestock (Cows/Buffaloes)" },
                  { id: "vehicle", label: "Transport Vehicle (Pickup / Bike)" },
                  { id: "customers", label: "Established Local Contacts" }
                ].map((r) => {
                  const checked = resources.includes(r.id);
                  return (
                    <div
                      key={r.id}
                      onClick={() => handleResourceToggle(r.id)}
                      style={{
                        background: checked ? '#ecfdf5' : '#ffffff',
                        border: checked ? '1px solid #10b981' : '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '12px 14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        color: checked ? '#065f46' : '#475569'
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={checked} 
                        onChange={() => {}} 
                        style={{ accentColor: '#15803d' }} 
                      />
                      <span>{r.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Goal Selection */}
        {step === 5 && (
          <div className="animate-fade-in">
            <p style={{ color: '#475569', fontSize: '0.92rem', marginBottom: '20px' }}>
              What insights are most important to your decision today?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '28px' }}>
              {[
                { id: "viability", title: "Business Viability & Feasibility", desc: "Is there enough local purchasing power & demand?" },
                { id: "loan", title: "Loan Eligibility vs Affordability", desc: "How much loan can I get without cashflow stress?" },
                { id: "opportunity", title: "Discover Opportunity Gaps", desc: "Find underserved customer niches instead of cloning competitors." },
                { id: "compare", title: "Compare with Alternative Trades", desc: "Compare Dairy vs Tailoring vs Food Processing." }
              ].map((g) => {
                const checked = goals.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => handleGoalToggle(g.id)}
                    style={{
                      background: checked ? '#f0fdf4' : '#ffffff',
                      border: checked ? '2px solid #15803d' : '1px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{g.title}</strong>
                      <input type="checkbox" checked={checked} onChange={() => {}} style={{ accentColor: '#15803d' }} />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>{g.desc}</p>
                  </div>
                );
              })}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Target size={20} color="#15803d" />
              <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0 }}>
                Clicking <strong>Generate My Analysis</strong> will run our 6-phase hyper-local decision engine to build your personalized Feasibility Report!
              </p>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #f1f5f9'
        }}>
          {step > 1 ? (
            <button 
              onClick={() => setStep(step - 1)} 
              className="btn-secondary"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button 
              onClick={() => setStep(step + 1)} 
              className="btn-primary"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              onClick={handleFinish} 
              className="btn-primary"
              style={{ background: 'linear-gradient(135deg, #15803d, #166534)', padding: '12px 28px' }}
            >
              <Sparkles size={16} />
              Generate My Analysis ➔
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
