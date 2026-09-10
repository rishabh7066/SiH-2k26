import React from 'react';
import dashboardHeroImg from '../images/dashboard_hero.svg';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Coins, 
  Store,
  Users,
  Compass, 
  CheckCircle2,
  PlayCircle,
  Mic,
  Award,
  BarChart3,
  BadgeCheck,
  ChevronRight
} from 'lucide-react';

export default function HeroLanding({ 
  lang, 
  onStartAssessment, 
  onTriggerDemo, 
  onOpenGramAI,
  onNavigate,
  onOpenWhatsApp
}) {
  const isHi = lang === 'hi';

  const categories = [
    {
      titleHi: 'डेयरी व पशुपालन',
      titleEn: 'Dairy & Animal Husbandry',
      subHi: 'दूध, पनीर, घी और दैनिक आपूर्ति',
      subEn: 'Milk collection, paneer & dairy value-add',
      tagHi: 'सर्वाधिक मांग',
      tagEn: 'High Demand',
      color: '#15803d',
      img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80'
    },
    {
      titleHi: 'कृषि प्रसंस्करण व चक्की',
      titleEn: 'Agro-Processing & Flour Mill',
      subHi: 'आटा, मसाला पिसाई व तेल निष्कर्षण',
      subEn: 'Flour milling, spice grinding & mini oil expeller',
      tagHi: 'उच्च मुनाफा',
      tagEn: 'Strong Margins',
      color: '#d97706',
      img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80'
    },
    {
      titleHi: 'सोलर व कृषि तकनीक',
      titleEn: 'Solar & Clean Tech',
      subHi: 'सोलर पंप, कोल्ड स्टोरेज व बैटरी सर्विस',
      subEn: 'Solar farm pumping, cold storage & equipment',
      tagHi: 'सरकारी अनुदान',
      tagEn: 'Govt Subsidy',
      color: '#7c3aed',
      img: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      titleHi: 'पोल्ट्री व जैविक खाद यूनिट',
      titleEn: 'Poultry & Organic Manure',
      subHi: 'ब्रायलर/देसी पालन व त्वरित नकदी चक्र',
      subEn: 'Broiler/Desi poultry & high turnover cycle',
      tagHi: 'तुरंत नकदी चक्र',
      tagEn: 'Fast Cashflow',
      color: '#ea580c',
      img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80',
      mobileOnly: true
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: 'clamp(36px, 5vw, 64px) clamp(16px, 3.5vw, 36px) 96px',
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(56px, 7vw, 90px)'
    }}>
      
      {/* =========================================================
          SECTION 1: SPACIOUS HERO BANNER & PITCH
          ========================================================= */}
      <section style={{ textAlign: 'center', maxWidth: '1020px', margin: '0 auto', width: '100%' }}>
        
        {/* Top Tagline Pill */}
        <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(220, 252, 231, 0.9)',
            border: '1px solid rgba(134, 239, 172, 0.8)',
            color: '#14532d',
            padding: '10px 22px',
            borderRadius: '999px',
            fontSize: 'clamp(0.82rem, 1.8vw, 0.94rem)',
            fontWeight: 700,
            boxShadow: '0 4px 16px rgba(34, 197, 94, 0.12)',
            letterSpacing: '0.01em'
          }}>
            <span style={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              background: '#22c55e', 
              boxShadow: '0 0 10px #22c55e' 
            }} />
            <span>
              {isHi 
                ? 'कर्ज लेने से पहले जानें — क्या यह व्यापार आपके गाँव में सच में मुनाफा देगा?' 
                : 'Know Before You Borrow — Will this business actually profit in your village?'}
            </span>
          </div>
        </div>

        {/* Large Elegant Headline */}
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5.2vw, 3.8rem)', 
          fontWeight: 800, 
          color: '#0f172a', 
          lineHeight: 1.18, 
          letterSpacing: '-0.03em',
          marginBottom: '26px' 
        }}>
          {isHi ? 'आपका गाँव। आपकी जमा पूँजी।' : 'Your Village. Your Hard-Earned Savings.'} <br />
          <span style={{ 
            background: 'linear-gradient(135deg, #15803d 0%, #16a34a 50%, #22c55e 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            {isHi ? 'सही और सुरक्षित व्यापार का चुनाव।' : 'The Right, Profitable Business.'}
          </span>
        </h1>

        {/* Spacious Subtitle */}
        <p style={{ 
          fontSize: 'clamp(1rem, 2.2vw, 1.25rem)', 
          color: '#475569', 
          lineHeight: 1.75, 
          maxWidth: '820px', 
          margin: '0 auto 40px auto',
          fontWeight: 400
        }}>
          {isHi 
            ? 'बिना सोचे-समझे किसी की देखा-देखी दुकान न खोलें। अपने गाँव की मांग, आस-पास की दुकानों, सरकारी सब्सिडी योजनाओं और अपनी सुरक्षित लोन किस्त (EMI) की सटीक और निष्पक्ष जानकारी पाएँ।'
            : 'Don’t blindly copy nearby shops. Get instant, honest intelligence on local customer demand, nearby competition, government scheme subsidies, and safe monthly loan repayment before investing.'}
        </p>

        {/* Primary CTA Buttons with Breathing Space */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '16px', 
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          <button 
            onClick={onStartAssessment} 
            className="btn-primary" 
            style={{ 
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', 
              padding: 'clamp(14px, 2.2vw, 18px) clamp(28px, 4vw, 42px)', 
              borderRadius: '16px' 
            }}
          >
            <span>{isHi ? 'अपने व्यापार की जाँच करें' : 'Check Business Feasibility'}</span>
            <ArrowRight size={22} />
          </button>

          <button 
            onClick={onTriggerDemo} 
            className="btn-secondary" 
            style={{ 
              fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', 
              padding: 'clamp(13px, 2vw, 17px) clamp(22px, 3vw, 32px)', 
              borderRadius: '16px' 
            }}
          >
            <PlayCircle size={20} color="#15803d" />
            <span>{isHi ? 'उदाहरण देखें (डेमो)' : 'View Sample Evaluation'}</span>
          </button>

          <button 
            onClick={onOpenGramAI} 
            className="btn-secondary" 
            style={{ 
              fontSize: 'clamp(0.92rem, 2vw, 1.05rem)', 
              padding: 'clamp(13px, 2vw, 17px) clamp(20px, 3vw, 28px)', 
              borderRadius: '16px' 
            }}
          >
            <Mic size={20} color="#0284c7" />
            <span>{isHi ? 'बोलकर पूछें' : 'Voice Assistant'}</span>
          </button>
        </div>

        {/* 4 Trust Badges with generous spacing */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 'clamp(14px, 3vw, 32px)', 
          flexWrap: 'wrap',
          padding: '16px 20px',
          background: 'rgba(255, 255, 255, 0.65)',
          borderRadius: '999px',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          width: 'fit-content',
          margin: '0 auto'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#1e293b', fontWeight: 600 }}>
            <MapPin size={17} color="#15803d" /> {isHi ? 'गाँव की असली मांग' : 'Village Demand'}
          </span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#1e293b', fontWeight: 600 }}>
            <Store size={17} color="#0284c7" /> {isHi ? 'दुकानों की जाँच' : 'Competition Mapping'}
          </span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#1e293b', fontWeight: 600 }}>
            <Coins size={17} color="#d97706" /> {isHi ? 'सुरक्षित लोन व EMI' : 'Safe Loan & EMI'}
          </span>
          <span style={{ color: '#cbd5e1' }}>•</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#1e293b', fontWeight: 600 }}>
            <ShieldCheck size={17} color="#16a34a" /> {isHi ? 'ईमानदार सलाह' : 'Responsible Advice'}
          </span>
        </div>
      </section>


      {/* =========================================================
          SECTION 2: HERO VISUAL SHOWCASE WITH REAL INTERNET IMAGE
          ========================================================= */}
      <section style={{ position: 'relative', width: '100%' }}>
        <div className="hero-image-frame" style={{ height: 'clamp(320px, 45vw, 520px)' }}>
          {/* Authentic Unsplash Image of Indian Rural Enterprise Landscape */}
          <img 
            src={dashboardHeroImg} 
            alt="UdyamSaathi Rural Indian Entrepreneurship"
            loading="lazy"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />

          {/* Elegant Dark-To-Transparent Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.4) 60%, rgba(15, 23, 42, 0.85) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Overlay Bottom Details */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(20px, 4vw, 36px)',
            left: 'clamp(20px, 4vw, 36px)',
            right: 'clamp(20px, 4vw, 36px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '10px'
              }}>
                <MapPin size={14} color="#4ade80" />
                <span>{isHi ? 'वाराणसी • सेवापुरी ब्लॉक • आदमपुर' : 'Varanasi • Sewapuri Block • Adampur'}</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: '#ffffff', fontWeight: 800, margin: 0 }}>
                {isHi ? 'गाँव स्तर पर डेटा-आधारित व्यापार निर्णय' : 'Data-Driven Village Enterprise Decisions'}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', margin: '6px 0 0 0' }}>
                {isHi ? 'लोकल मांग, नजदीकी प्रतिस्पर्धा और बैंक-अनुमोदित वित्तीय रिपोर्ट' : 'Local customer demand, competitor mapping & bankable financial reports'}
              </p>
            </div>

            <button
              onClick={onTriggerDemo}
              style={{
                background: '#ffffff',
                color: '#15803d',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
            >
              <span>{isHi ? 'लाइव डेमो देखें' : 'View Live Demo'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Floating Metric Pill 1 (Top Left) */}
          <div 
            className="floating-stat-badge desktop-only"
            style={{ top: '28px', left: '28px' }}
          >
            <div style={{ width: 42, height: 42, borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={22} color="#15803d" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                {isHi ? 'मासिक राजस्व क्षमता' : 'Projected Monthly Sales'}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
                ₹1,25,000 <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>+28% Net Margin</span>
              </div>
            </div>
          </div>

          {/* Floating Metric Pill 2 (Top Right) */}
          <div 
            className="floating-stat-badge desktop-only"
            style={{ top: '28px', right: '28px' }}
          >
            <div style={{ width: 42, height: 42, borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={22} color="#d97706" />
            </div>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                {isHi ? 'सरकारी योजना सब्सिडी' : 'Govt Subsidy Eligibility'}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b45309' }}>
                35% PMEGP <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>(₹3.15 Lakh)</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          SECTION 3: REAL RURAL ENTERPRISE CATEGORIES WITH IMAGES
          ========================================================= */}
      <section>
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px auto' }}>
          <span style={{ 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            color: '#15803d', 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            {isHi ? 'लोकप्रिय ग्रामीण उद्योग' : 'High-Potential Rural Enterprises'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2.4rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
            {isHi ? 'आपके क्षेत्र के लिए शीर्ष व्यापार अवसर' : 'Proven Opportunities Tailored for Your Village'}
          </h2>
          <p style={{ fontSize: 'clamp(0.92rem, 2vw, 1.08rem)', color: '#64748b', marginTop: '12px', lineHeight: 1.6 }}>
            {isHi 
              ? 'बिना सोचे समझे किसी भी काम में पूँजी न फंसाएँ। जानें किन क्षेत्रों में सबसे कम जोखिम और स्थायी मुनाफा है।'
              : 'Don’t risk your savings without validation. Explore verified business models with strong rural demand.'}
          </p>
        </div>

        {/* Category Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
          gap: '24px'
        }}>
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`category-img-card ${cat.mobileOnly ? 'biz-mobile-card' : ''}`}
              onClick={onStartAssessment}
              title={isHi ? 'इस व्यापार की जाँच करें' : 'Evaluate this business'}
            >
              <img 
                src={cat.img} 
                alt={isHi ? cat.titleHi : cat.titleEn} 
                loading="lazy" 
              />
              <div className="category-img-overlay">
                <span style={{
                  alignSelf: 'flex-start',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: cat.color,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  marginBottom: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                }}>
                  {isHi ? cat.tagHi : cat.tagEn}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>
                  {isHi ? cat.titleHi : cat.titleEn}
                </h3>
                <p style={{ fontSize: '0.86rem', color: '#e2e8f0', margin: '0 0 14px 0', lineHeight: 1.45 }}>
                  {isHi ? cat.subHi : cat.subEn}
                </p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  fontSize: '0.84rem', 
                  fontWeight: 700, 
                  color: '#4ade80' 
                }}>
                  <span>{isHi ? 'संभाव्यता जाँचें' : 'Check Feasibility'}</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* =========================================================
          SECTION 3.5: 15 ALL-NEW AI FEATURES SUITE (New_Features.md)
          ========================================================= */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)',
        border: '1px solid #bbf7d0',
        borderRadius: '32px',
        padding: 'clamp(28px, 5vw, 56px)',
        boxShadow: '0 8px 32px rgba(21, 128, 61, 0.05)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto clamp(28px, 4vw, 44px) auto' }}>
          <span style={{ 
            fontSize: '0.82rem', 
            fontWeight: 800, 
            color: '#15803d', 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            ⚡ {isHi ? 'नए उन्नत टूल्स' : '15 All-New AI Tools'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3.8vw, 2.3rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
            {isHi ? 'हर गाँव के लिए संपूर्ण AI बिजनेस इंटेलिजेंस' : 'Complete Rural Business Intelligence Suite'}
          </h2>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: '#64748b', marginTop: '10px', lineHeight: 1.6 }}>
            {isHi 
              ? 'बिज़नेस आइडिया से लेकर निवेश, प्रॉफिट सिमुलेशन, सुरक्षित EMI और व्हाट्सएप एडवाइजर तक — सभी नए टूल्स आज़माएँ।'
              : 'From business idea to investment, profit simulation, safe loan repayment and WhatsApp AI advisor.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))',
          gap: '20px'
        }}>
          {/* Tool 1: AI Business Finder */}
          <div 
            className="spacy-card"
            onClick={() => onNavigate && onNavigate('finder')}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d', marginBottom: '14px' }}>
              🔍
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isHi ? '1. एआई बिजनेस फाइंडर' : '1. AI Business Finder'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {isHi 
                ? 'गाँव, पूँजी, कौशल व संसाधनों के आधार पर सटीक अवसर स्कोर (Opportunity Score / 100)।'
                : 'Top business recommendations tailored to village demand, skills, and exact budget.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: 700, fontSize: '0.84rem' }}>
              <span>{isHi ? 'फाइंडर खोलें' : 'Open Finder'}</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Tool 2: Village Gap Map */}
          <div 
            className="spacy-card"
            onClick={() => onNavigate && onNavigate('gap_map')}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '14px' }}>
              🗺️
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isHi ? '2. ग्राम बिजनेस गैप मैप' : '2. Village Business Gap Map'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {isHi 
                ? 'नक्शे पर देखें कि गाँव में किन दुकानों की भरमार है और कौन सा काम बिल्कुल शून्य है।'
                : 'Interactive map displaying existing shop density and high-potential missing trade gaps.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563eb', fontWeight: 700, fontSize: '0.84rem' }}>
              <span>{isHi ? 'नक्शा देखें' : 'View Gap Map'}</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Tool 3: Budget Planner & Simulator */}
          <div 
            className="spacy-card"
            onClick={() => onNavigate && onNavigate('simulator')}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', marginBottom: '14px' }}>
              🎛️
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isHi ? '3. बिजनेस सिम्युलेटर & What-If' : '3. Business Simulator & What-If'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {isHi 
                ? 'ग्राहक 20% घट जाएँ या किराया बढ़ जाए तो क्या होगा? लाइव स्लाइडर से मुनाफा जाँचें।'
                : 'Adjust footfall, pricing, and rent. Test stress scenarios before spending real money.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d97706', fontWeight: 700, fontSize: '0.84rem' }}>
              <span>{isHi ? 'सिम्युलेटर चलाएं' : 'Launch Simulator'}</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Tool 4: Safe EMI & Schemes */}
          <div 
            className="spacy-card"
            onClick={() => onNavigate && onNavigate('loan_schemes')}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '14px' }}>
              🛡️
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isHi ? '4. सुरक्षित लोन EMI व योजनाएं' : '4. Safe Loan EMI & Govt Schemes'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {isHi 
                ? 'कितना लोन सुरक्षित है? 35% PMEGP सब्सिडी पात्रता और आवश्यक कागजातों की सूची।'
                : 'Recommends safe loan limits based on profit, plus 35% PMEGP & Mudra scheme matching.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#db2777', fontWeight: 700, fontSize: '0.84rem' }}>
              <span>{isHi ? 'सुरक्षित EMI जाँचें' : 'Check Safe Loan'}</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Tool 5: Village Health & Resources */}
          <div 
            className="spacy-card"
            onClick={() => onNavigate && onNavigate('health_resources')}
            style={{ padding: '24px', cursor: 'pointer' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', marginBottom: '14px' }}>
              📊
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isHi ? '5. ग्राम स्वास्थ्य व सप्लायर नेटवर्क' : '5. Village Health & Resource Finder'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {isHi 
                ? 'गाँव का 7-पैमानों पर स्वास्थ्य स्कोर (82/100), स्थानीय ट्रांसपोर्टर, सप्लायर व पार्टनर खोजें।'
                : '7-indicator village readiness score, local suppliers, transporters, and partner SHGs.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7c3aed', fontWeight: 700, fontSize: '0.84rem' }}>
              <span>{isHi ? 'नेटवर्क देखें' : 'Explore Network'}</span>
              <ArrowRight size={15} />
            </div>
          </div>

          {/* Tool 6: WhatsApp AI Advisor */}
          <div 
            className="spacy-card"
            onClick={() => onOpenWhatsApp && onOpenWhatsApp()}
            style={{ padding: '24px', cursor: 'pointer', background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', border: '2px solid #86efac' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '14px', fontSize: '20px' }}>
              💬
            </div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0' }}>
              {isHi ? '6. व्हाट्सएप एआई सलाहकार' : '6. WhatsApp AI Advisor'}
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, margin: '0 0 16px 0' }}>
              {isHi 
                ? 'वेबसाइट खोले बिना सीधे व्हाट्सएप पर अपने गाँव का नाम भेजें और तुरंत सलाह पाएँ।'
                : 'Instant rural business advisory directly on WhatsApp without opening the website.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontWeight: 700, fontSize: '0.84rem' }}>
              <span>{isHi ? 'व्हाट्सएप चैट खोलें' : 'Open WhatsApp Chat'}</span>
              <ArrowRight size={15} />
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          SECTION 4: 4 CORE QUESTIONS (SPACIOUS 2X2 GRID)
          ========================================================= */}
      <section style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(226, 232, 240, 0.9)',
        borderRadius: '32px',
        padding: 'clamp(28px, 5vw, 56px)',
        boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto clamp(32px, 5vw, 48px) auto' }}>
          <span style={{ 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            color: '#15803d', 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            {isHi ? 'सटीक और निष्पक्ष विश्लेषण' : 'Comprehensive Pre-Investment Analysis'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.45rem, 3.5vw, 2.3rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
            {isHi ? 'यह प्लेटफ़ॉर्म आपके 4 सबसे बड़े सवालों का जवाब देता है' : '4 Critical Questions Answered Before You Invest'}
          </h2>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: '#64748b', marginTop: '12px', lineHeight: 1.6 }}>
            {isHi ? 'सही जगह, सही व्यापार, सुरक्षित बजट और स्पष्ट निर्णय' : 'Clear answers for location, business model, budget, and real-world viability'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(min(280px, 100%), 1fr))',
          gap: '24px'
        }}>
          {/* Question 1 */}
          <div className="spacy-card" style={{ padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#ecfdf5', color: '#15803d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MapPin size={26} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d', opacity: 0.35 }}>01</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {isHi ? 'सवाल 1: कहाँ?' : 'Question 1: WHERE?'}
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#14532d', margin: '4px 0 8px 0', fontWeight: 700 }}>
                {isHi ? 'गाँव में ग्राहक हैं या नहीं?' : 'Is there a real local market?'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                {isHi 
                  ? 'क्या आपके गाँव और आस-पास के 5-10 किमी क्षेत्र में पर्याप्त खरीदार हैं, या बाज़ार में पहले से ही बहुत दुकानें खुली हुई हैं?'
                  : 'Determine if there is real customer demand in your specific village or block, or if the local market is already saturated with competitors.'}
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="spacy-card" style={{ padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={26} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#2563eb', opacity: 0.35 }}>02</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {isHi ? 'सवाल 2: क्या?' : 'Question 2: WHAT?'}
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#1e40af', margin: '4px 0 8px 0', fontWeight: 700 }}>
                {isHi ? 'कौन सा काम सबसे बेहतर रहेगा?' : 'Which business to start?'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                {isHi 
                  ? 'पुरानी तरह की वही दुकान खोलने के बजाय ऐसा काम चुनें जिसकी गाँव में कमी है (जैसे कच्चा दूध बेचने के बजाय घर-घर डिलीवरी और पनीर)।'
                  : 'Identify missing, high-margin services (like packaged home delivery & paneer value-add) instead of opening another generic shop.'}
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="spacy-card" style={{ padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coins size={26} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706', opacity: 0.35 }}>03</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {isHi ? 'सवाल 3: कितना?' : 'Question 3: HOW MUCH?'}
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#b45309', margin: '4px 0 8px 0', fontWeight: 700 }}>
                {isHi ? 'कितना लोन लेना सुरक्षित है?' : 'How much to borrow safely?'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                {isHi 
                  ? 'बैंक भले ही 9 लाख का लोन दे दे, पर क्या आपका व्यापार हर महीने 15,000 की किस्त चुका पाएगा? जानें सुरक्षित लोन और आसान EMI सीमा।'
                  : 'Understand the critical difference between how much loan the bank allows vs how much your business can comfortably repay without debt stress.'}
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div className="spacy-card" style={{ padding: 'clamp(24px, 3.5vw, 36px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ width: 50, height: 50, borderRadius: '14px', background: '#fdf2f8', color: '#db2777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={26} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#db2777', opacity: 0.35 }}>04</span>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#db2777', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {isHi ? 'सवाल 4: शुरू करें या नहीं?' : 'Question 4: SHOULD I START?'}
              </span>
              <h3 style={{ fontSize: '1.25rem', color: '#9d174d', margin: '4px 0 8px 0', fontWeight: 700 }}>
                {isHi ? 'व्यापार चलेगा या नुकसान होगा?' : 'Is it viable or risky?'}
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                {isHi 
                  ? 'सख्त जाँच: अगर बिक्री 20% घट जाए या कच्चा माल महँगा हो जाए, तो भी क्या घर का खर्च और मुनाफा बचेगा? सही समय पर सही निर्णय।'
                  : 'Test conservative scenarios: If sales drop 20% in off-season, do you still make a profit? If not, the system honestly advises against starting.'}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================
          SECTION 5: HOW IT WORKS (3 SIMPLE STEPS)
          ========================================================= */}
      <section style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '32px',
        padding: 'clamp(32px, 6vw, 60px) clamp(20px, 4vw, 48px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto clamp(32px, 5vw, 48px) auto' }}>
          <span style={{ 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            color: '#15803d', 
            letterSpacing: '0.08em', 
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '10px'
          }}>
            {isHi ? 'सरल 3 चरण' : 'Simple 3-Step Process'}
          </span>
          <h2 style={{ fontSize: 'clamp(1.45rem, 3.5vw, 2.2rem)', color: '#0f172a', fontWeight: 800, lineHeight: 1.25 }}>
            {isHi ? 'काम करने का आसान तरीका' : 'How UdyamSaathi Works in 3 Simple Steps'}
          </h2>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: '#64748b', marginTop: '10px', lineHeight: 1.6 }}>
            {isHi ? 'गाँव चुनिए, अपनी पूँजी बताइए, और पूरी वित्तीय रिपोर्ट तुरंत पाइए' : 'Select your village, enter your margin budget, and receive an instant bankable action report'}
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(270px, 100%), 1fr))', 
          gap: '28px',
          marginBottom: '48px'
        }}>
          {/* Step 1 */}
          <div style={{ 
            background: '#f8fafc', 
            padding: 'clamp(24px, 3vw, 32px)', 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: '12px', 
              background: '#dcfce7', 
              color: '#15803d', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.2rem', 
              fontWeight: 800 
            }}>
              01
            </div>
            <h4 style={{ fontSize: '1.18rem', color: '#0f172a', fontWeight: 700, margin: 0 }}>
              {isHi ? 'गाँव और बजट दर्ज करें' : 'Enter Village & Budget'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              {isHi 
                ? 'अपना राज्य, जिला, ब्लॉक और गाँव चुनें। अपनी बचत से लगाने वाली पूँजी (जैसे ₹1 लाख) दर्ज करें।'
                : 'Select your state, district, block, and village. Enter your available margin savings (e.g. ₹1 Lakh).'}
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ 
            background: '#f8fafc', 
            padding: 'clamp(24px, 3vw, 32px)', 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: '12px', 
              background: '#eff6ff', 
              color: '#2563eb', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.2rem', 
              fontWeight: 800 
            }}>
              02
            </div>
            <h4 style={{ fontSize: '1.18rem', color: '#0f172a', fontWeight: 700, margin: 0 }}>
              {isHi ? 'बाज़ार और दुकानों का नक्शा देखें' : 'See Demand & Competition'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              {isHi 
                ? 'देखें कि 10 किमी में कितनी दुकानें हैं, कौन सा इलाका खाली है, और कौन से काम में सबसे ज़्यादा मुनाफा है।'
                : 'View competitor locations within 10 km, underserved customer zones, and untapped service gaps.'}
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ 
            background: '#f8fafc', 
            padding: 'clamp(24px, 3vw, 32px)', 
            borderRadius: '20px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: '12px', 
              background: '#fef3c7', 
              color: '#d97706', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: '1.2rem', 
              fontWeight: 800 
            }}>
              03
            </div>
            <h4 style={{ fontSize: '1.18rem', color: '#0f172a', fontWeight: 700, margin: 0 }}>
              {isHi ? 'बैंक रिपोर्ट और लोन योजना पाएँ' : 'Get Bank-Ready Project Plan'}
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              {isHi 
                ? 'PMEGP या मुद्रा योजना में कितनी सब्सिडी मिलेगी, मासिक बचत कितनी होगी, और बैंक जाने से पहले क्या तैयार करना है।'
                : 'Receive exact government scheme subsidies, monthly cash flow projections, and an actionable loan checklist.'}
            </p>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div style={{ 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, rgba(240, 253, 244, 0.8) 0%, rgba(220, 252, 231, 0.6) 100%)',
          borderRadius: '24px',
          padding: 'clamp(28px, 4vw, 44px)',
          border: '1px solid rgba(187, 247, 208, 0.8)'
        }}>
          <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.8rem)', color: '#14532d', fontWeight: 800, marginBottom: '12px' }}>
            {isHi ? 'क्या आप अपने व्यापार की पूरी रिपोर्ट तैयार करना चाहते हैं?' : 'Ready to evaluate your business opportunity?'}
          </h3>
          <p style={{ color: '#475569', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
            {isHi 
              ? 'केवल 2 मिनट में अपने गाँव का सटीक डेटा, प्रतिस्पर्धी विश्लेषण और सब्सिडी गणना प्राप्त करें।'
              : 'Takes less than 2 minutes to generate localized feasibility metrics, competitor density, and loan feasibility.'}
          </p>
          <button 
            onClick={onStartAssessment} 
            className="btn-primary" 
            style={{ 
              padding: 'clamp(14px, 2.2vw, 18px) clamp(32px, 4vw, 44px)', 
              fontSize: 'clamp(0.95rem, 2vw, 1.08rem)', 
              borderRadius: '16px' 
            }}
          >
            <span>{isHi ? 'अभी अपनी जाँच शुरू करें ➔' : 'Start Your Business Assessment Now ➔'}</span>
          </button>
        </div>
      </section>

    </div>
  );
}
