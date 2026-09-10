import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Eye, 
  Database, 
  HelpCircle,
  X
} from 'lucide-react';
import udyamLogo from '../images/Udyam (3).png';

export default function TermsAndPrivacy({ 
  initialTab = 'terms', 
  onClose, 
  lang = 'hi' 
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'terms' | 'privacy'
  const isHi = lang === 'hi';

  return (
    <div style={{
      position: 'relative',
      maxWidth: '960px',
      margin: '0 auto',
      padding: 'clamp(20px, 4vw, 40px) clamp(16px, 3vw, 28px)',
      color: '#0f172a',
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif"
    }}>
      {/* Top Header Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        padding: '24px 28px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img 
            src={udyamLogo} 
            alt="UdyamSaathi" 
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }} 
          />
          <div>
            <h1 style={{
              margin: 0,
              fontSize: '1.35rem',
              fontWeight: 800,
              color: '#14532d',
              fontFamily: "'Playfair Display', 'Georgia', serif"
            }}>
              𝑼𝒅𝒚𝒂𝒎𝑺𝒂𝒂𝒕𝒉𝒊
            </h1>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
              {isHi ? 'कानूनी शर्तें एवं गोपनीयता नीति' : 'Terms of Service & Privacy Policy'}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '12px',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                color: '#334155',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} />
              <span>{isHi ? 'वापस जाएं' : 'Back'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        borderBottom: '2px solid #e2e8f0',
        paddingBottom: '12px'
      }}>
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.94rem',
            background: activeTab === 'terms' ? '#15803d' : '#f8fafc',
            color: activeTab === 'terms' ? '#ffffff' : '#475569',
            boxShadow: activeTab === 'terms' ? '0 4px 12px rgba(21, 128, 61, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Scale size={18} />
          <span>{isHi ? 'सेवा की शर्तें (Terms of Service)' : 'Terms of Service'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.94rem',
            background: activeTab === 'privacy' ? '#15803d' : '#f8fafc',
            color: activeTab === 'privacy' ? '#ffffff' : '#475569',
            boxShadow: activeTab === 'privacy' ? '0 4px 12px rgba(21, 128, 61, 0.25)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Lock size={18} />
          <span>{isHi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}</span>
        </button>
      </div>

      {/* Main Content Box */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        padding: 'clamp(24px, 4vw, 40px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.03)',
        lineHeight: 1.7
      }}>
        {activeTab === 'terms' ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <FileText size={24} color="#15803d" />
              <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                {isHi ? 'सेवा की शर्तें (Terms of Service)' : 'Terms of Service'}
              </h2>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.86rem', marginBottom: '24px' }}>
              {isHi ? 'अंतिम संशोधन: 10 सितंबर 2026 | लागू: सभी UdyamSaathi उपयोगकर्ता' : 'Last Updated: September 10, 2026 | Applicable to all UdyamSaathi users'}
            </p>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '1. मंच का उद्देश्य एवं उपयोग (Platform Scope)' : '1. Platform Scope & Permitted Use'}
              </h3>
              <p style={{ color: '#334155', fontSize: '0.92rem' }}>
                {isHi 
                  ? 'UdyamSaathi ग्रामीण भारत में नए व इच्छुक सूक्ष्म उद्यमियों, स्वयं सहायता समूहों (SHGs) और किसानों को डेटा-आधारित व्यापार सलाह, बाजार मांग विश्लेषण, सुरक्षित लोन ईएमआई (Safe EMI) और सरकारी सब्सिडी योजनाओं (PMEGP, मुद्रा, KCC) की जानकारी प्रदान करता है।'
                  : 'UdyamSaathi provides data-driven rural enterprise feasibility analysis, local market demand mapping, Safe EMI recommendations, and government subsidy scheme guidance for aspiring rural entrepreneurs, SHGs, and farmers.'}
              </p>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '2. वित्तीय व व्यवहार्यता अस्वीकरण (Financial Feasibility Disclaimer)' : '2. Financial Feasibility & Loan Disclaimer'}
              </h3>
              <div style={{
                background: '#fffbeb',
                border: '1px solid #fef3c7',
                borderLeft: '4px solid #f59e0b',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '12px',
                display: 'flex',
                gap: '12px'
              }}>
                <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#92400e' }}>
                  {isHi 
                    ? 'महत्वपूर्ण सूचना: UdyamSaathi द्वारा प्रदर्शित लाभ अनुमान, व्यवहार्यता स्कोर (0-100), और सुरक्षित लोन सीमा सरकारी जनगणना (Census 2011), ओपनस्ट्रीटमैप (OSM) डेटा और मानक वित्तीय सूत्रों पर आधारित कम्प्यूटर एल्गोरिदम अनुमान हैं। यह किसी बैंक द्वारा लोन स्वीकृति की प्रत्यक्ष कानूनी गारंटी नहीं है।'
                    : 'Important Notice: Profit simulations, opportunity scores (0-100), and safe EMI thresholds are algorithmic estimates based on Census 2011 benchmarks and local geospatial data. They do not constitute a formal banking guarantee or mandatory loan approval.'}
                </p>
              </div>
              <p style={{ color: '#334155', fontSize: '0.92rem' }}>
                {isHi 
                  ? 'बैंक लोन व सब्सिडी का अंतिम निर्णय संबंधित बैंक शाखा प्रबंधक, जिला उद्योग केंद्र (DIC), अथवा केवीआईसी (KVIC) के नियमों एवं दस्तावेजों की पुष्टि के बाद ही मान्य होगा।'
                  : 'Final loan sanctions and subsidies depend entirely on official field verification by the respective lending bank branch, District Industries Centre (DIC), or KVIC authorities.'}
              </p>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '3. सुरक्षित लोन का 35% नियम (Safe EMI 35% Guideline)' : '3. Safe EMI 35% Guideline'}
              </h3>
              <p style={{ color: '#334155', fontSize: '0.92rem' }}>
                {isHi 
                  ? 'ग्रामीण परिवारों को कर्ज के चक्रव्यूह से बचाने हेतु UdyamSaathi सख्त अनुशंसा करता है कि किसी भी व्यवसाय की मासिक लोन किस्त (EMI) उस व्यापार के अनुमानित शुद्ध मासिक लाभ के 35% से अधिक नहीं होनी चाहिए। उपयोगकर्ता अपनी वास्तविक वित्तीय स्थिति का स्वयं आकलन करें।'
                  : 'To protect rural households from debt stress, UdyamSaathi strictly advises that monthly loan repayment installments (EMI) must not exceed 35% of conservative projected net profits.'}
              </p>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '4. उपयोगकर्ता आचरण एवं सत्यनिष्ठा (User Responsibilities)' : '4. User Responsibilities & Integrity'}
              </h3>
              <p style={{ color: '#334155', fontSize: '0.92rem' }}>
                {isHi 
                  ? 'उपयोगकर्ता सहमत हैं कि वे पोर्टल पर सटीक व सत्य जानकारी दर्ज करेंगे। किसी अन्य व्यक्ति के नाम पर धोखाधड़ी, गलत आधार या फर्जी सब्सिडी आवेदन तैयार करने पर खाता तुरंत निलंबित किया जा सकता है।'
                  : 'Users agree to provide accurate and truthful details. Impersonation, falsifying information, or creating fraudulent subsidy applications will result in immediate termination of account access.'}
              </p>
            </section>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <ShieldCheck size={24} color="#15803d" />
              <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                {isHi ? 'गोपनीयता नीति (Privacy Policy)' : 'Privacy Policy'}
              </h2>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.86rem', marginBottom: '24px' }}>
              {isHi ? 'अंतिम संशोधन: 10 सितंबर 2026 | डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) एक्ट 2023 के अनुरूप' : 'Last Updated: September 10, 2026 | Compliant with India DPDP Act 2023'}
            </p>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '1. डेटा सुरक्षा की हमारी प्रतिज्ञा (Zero Data Commercialization)' : '1. Zero Data Commercialization Guarantee'}
              </h3>
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderLeft: '4px solid #16a34a',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '12px',
                display: 'flex',
                gap: '12px'
              }}>
                <CheckCircle2 size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#14532d' }}>
                  {isHi 
                    ? 'हम ग्रामीण उद्यमियों, किसानों और युवाओं का डेटा किसी भी तीसरे पक्ष या विज्ञापन कंपनी को नहीं बेचते हैं। आपका डेटा केवल आपकी व्यापार रिपोर्ट तैयार करने और सुरक्षित रखने के लिए उपयोग होता है।'
                    : 'We NEVER sell, trade, or monetize rural citizen data to third-party ad networks. Your information is strictly used to generate your personalized enterprise feasibility reports.'}
                </p>
              </div>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '2. हम कौन सा डेटा एकत्र करते हैं (Data Collected)' : '2. Information We Collect'}
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#334155', fontSize: '0.92rem' }}>
                <li style={{ marginBottom: '6px' }}>
                  <strong>{isHi ? 'खाता जानकारी:' : 'Account Details:'}</strong> {isHi ? 'नाम, मोबाइल नंबर, ईमेल और पासवर्ड (पासवर्ड salted bcrypt एन्क्रिप्शन से सुरक्षित रहता है)।' : 'Name, mobile number, email, and password (passwords are protected with bcrypt cryptographic hashing).'}
                </li>
                <li style={{ marginBottom: '6px' }}>
                  <strong>{isHi ? 'भौगोलिक स्थान (GPS):' : 'Geographic Location:'}</strong> {isHi ? 'जीपीएस का उपयोग केवल आपके निकटतम गाँव व ब्लॉक का पता लगाने के लिए ब्राउज़र स्तर पर किया जाता है। आपकी लाइव ट्रैकिंग नहीं की जाती।' : 'GPS is accessed only on-device to pinpoint the nearest village cluster. Continuous live location tracking is never conducted.'}
                </li>
                <li style={{ marginBottom: '6px' }}>
                  <strong>{isHi ? 'व्यापार प्राथमिकताएं:' : 'Business Inputs:'}</strong> {isHi ? 'निवेश बजट, कौशल, चयनित गाँव, और मूल्यांकन रिपोर्ट (Supabase Postgres में Row Level Security से सुरक्षित)।' : 'Margin capital, selected sector, village, and feasibility outputs (secured with Postgres Row Level Security).'}
                </li>
              </ul>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '3. डेटा भंडारण एवं एन्क्रिप्शन (Storage & Encryption)' : '3. Data Storage & Security Standards'}
              </h3>
              <p style={{ color: '#334155', fontSize: '0.92rem' }}>
                {isHi 
                  ? 'सभी सर्वर संचार HTTPS TLS 1.3 एन्क्रिप्शन के तहत होते हैं। डेटाबेस में प्रत्येक नागरिक की रिपोर्ट Row-Level Security (RLS) द्वारा सुरक्षित है, जिससे कोई अन्य व्यक्ति आपकी वित्तीय रिपोर्ट नहीं देख सकता।'
                  : 'All client-server exchanges use HTTPS TLS 1.3 encryption. Tenant database rows are strictly guarded with Row-Level Security (RLS) policies ensuring total privacy.'}
              </p>
            </section>

            <section style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#15803d', marginBottom: '8px' }}>
                {isHi ? '4. डेटा डिलीट करने का अधिकार (Your Right to Erasure)' : '4. Your Right to Erasure'}
              </h3>
              <p style={{ color: '#334155', fontSize: '0.92rem' }}>
                {isHi 
                  ? 'डिजिटल पर्सनल डेटा प्रोटेक्शन (DPDP) एक्ट के तहत, कोई भी नागरिक किसी भी समय अपनी प्रोफ़ाइल और सेव किए गए मूल्यांकनों को स्थायी रूप से मिटाने का अनुरोध कर सकता है।'
                  : 'Under the Indian Digital Personal Data Protection (DPDP) Act, you possess full rights to request complete deletion of your account and saved feasibility records at any time.'}
              </p>
            </section>
          </div>
        )}

        {/* Bottom Help Contact Box */}
        <div style={{
          marginTop: '32px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          color: '#64748b',
          fontSize: '0.84rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={16} color="#15803d" />
            <span>
              {isHi 
                ? 'कानूनी सहायता या डेटा सुधार हेतु संपर्क: privacy@udyamsaathi.gov.in' 
                : 'Legal inquiries & data protection: privacy@udyamsaathi.gov.in'}
            </span>
          </div>
          <span>टोल-फ्री ग्रामीण हेल्पलाइन: 1800-180-1551</span>
        </div>
      </div>
    </div>
  );
}
