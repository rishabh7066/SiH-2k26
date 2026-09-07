import React, { useState } from 'react';
import { 
  X, 
  Send, 
  MessageCircle, 
  CheckCheck, 
  Share2, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

export default function WhatsAppAIModal({ isOpen, onClose, lang }) {
  const isHi = lang === 'hi';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: isHi 
        ? 'नमस्ते! 🙏 मैं ग्रामवेंचर एआई (GramVenture AI) हूँ। आप अपने गाँव का नाम और अपनी पूँजी बताकर किसी भी व्यापार, लोन सब्सिडी या मुनाफे के बारे में तुरंत पूछ सकते हैं।'
        : 'Namaste! 🙏 I am GramVenture AI. Ask me anything about village businesses, safe loan EMI, or government subsidies directly on WhatsApp.',
      time: '12:00 PM'
    }
  ]);

  const [inputVal, setInputVal] = useState('');

  const samplePrompts = [
    isHi ? 'मेरे पास 1 लाख रुपये हैं, आदमपुर में क्या खोलूँ?' : 'I have ₹1 Lakh budget, what to open in village?',
    isHi ? 'PMEGP में 35% सब्सिडी कैसे मिलेगी?' : 'How to get 35% PMEGP subsidy?',
    isHi ? 'क्या 10,000 की मासिक किस्त चुकाना सुरक्षित है?' : 'Is ₹10,000 monthly EMI safe for me?'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Generate intelligent AI reply
    setTimeout(() => {
      let botReply = isHi 
        ? 'आदमपुर गाँव के बाज़ार विश्लेषण के अनुसार: 12 पारंपरिक किराना दुकानें पहले से मौजूद हैं, इसलिए सामान्य दुकान के बजाय "पनीर, दही व सुबह घर-घर दूध डिलीवरी" शुरू करें। इसमें मासिक ₹73,000 शुद्ध मुनाफा अनुमानित है और PMEGP के तहत 35% सरकारी सब्सिडी उपलब्ध है।'
        : 'Based on Adampur village data: 12 generic grocery shops already exist. Starting a "Chilled Milk & Paneer Hub" yields ₹73,000 net monthly profit and qualifies for 35% PMEGP rural subsidy.';

      if (text.includes('सब्सिडी') || text.includes('subsidy')) {
        botReply = isHi
          ? 'PMEGP योजना में ग्रामीण क्षेत्र के लिए 25% से 35% तक मार्जिन मनी सब्सिडी मिलती है। यदि आवेदक महिला, SC, ST, OBC या अल्पसंख्यक हैं, तो 35% सब्सिडी मान्य है। अपना आधार व Udyam रजिस्ट्रेशन तैयार रखें।'
          : 'Under PMEGP, rural units receive 25% to 35% capital subsidy. Women, SC/ST, and OBC applicants qualify for 35%. Have your Aadhaar and Udyam registration ready.';
      } else if (text.includes('किस्त') || text.includes('EMI')) {
        botReply = isHi
          ? 'सुरक्षित लोन का नियम: आपकी मासिक EMI आपके व्यापार के शुद्ध मुनाफे के 35% से अधिक नहीं होनी चाहिए। अगर आपकी दुकान ₹35,000 शुद्ध कमाती है, तो अधिकतम ₹12,000 तक की EMI सुरक्षित है।'
          : 'Safe EMI Rule: Your monthly installment must never exceed 35% of net profit to maintain a safe living cushion.';
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    }, 650);
  };

  if (!isOpen) return null;

  return (
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
      <div 
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '620px',
          background: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid #cbd5e1'
        }}
      >
        {/* WhatsApp Header */}
        <div style={{
          background: '#075e54',
          color: '#ffffff',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 800 }}>
              🌾
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>GramVenture AI WhatsApp</div>
              <div style={{ fontSize: '0.74rem', color: '#dcfce7' }}>
                🟢 {isHi ? 'ऑनलाइन • 24x7 ग्रामीण सलाहकार' : 'Online • 24x7 Rural Advisor'}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Chat Messages Area */}
        <div style={{
          flex: 1,
          background: '#ece5dd',
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                background: msg.sender === 'user' ? '#dcf8c6' : '#ffffff',
                padding: '10px 14px',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                fontSize: '0.88rem',
                color: '#0f172a',
                lineHeight: 1.45
              }}
            >
              <div>{msg.text}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', fontSize: '0.68rem', color: '#64748b', marginTop: '4px' }}>
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck size={14} color="#34b7f1" />}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Question Chips */}
        <div style={{ background: '#f8fafc', padding: '8px 12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '4px 10px',
                borderRadius: '999px',
                fontSize: '0.74rem',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                color: '#334155'
              }}
            >
              💬 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ padding: '10px 14px', background: '#f0f2f5', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isHi ? 'यहाँ संदेश लिखें...' : 'Type message here...'}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '20px',
              border: '1px solid #cbd5e1',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            onClick={() => handleSend()}
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: '#075e54',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={18} />
          </button>
        </div>

        {/* Open in real WhatsApp CTA */}
        <a 
          href="https://wa.me/?text=GramVenture%20AI%20Village%20Business%20Report"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#25d366',
            color: '#ffffff',
            textAlign: 'center',
            padding: '10px',
            fontSize: '0.84rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            textDecoration: 'none'
          }}
        >
          <ExternalLink size={16} />
          <span>{isHi ? 'असली WhatsApp पर चैट खोलें' : 'Open in Real WhatsApp'}</span>
        </a>
      </div>
    </div>
  );
}
