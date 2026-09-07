import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Bot,
  MessageSquare,
  Volume2,
  VolumeX
} from 'lucide-react';

// Helper: Pre-process text so Hindi TTS engine speaks numbers, symbols, and schemes fluently
const prepareSpeechText = (rawText) => {
  if (!rawText) return "";
  let text = rawText;

  // Convert Currency: ₹1 लाख -> 1 लाख रुपये, ₹12,320 -> 12320 रुपये
  text = text.replace(/₹\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*लाख/g, '$1 लाख रुपये');
  text = text.replace(/₹\s*(\d+(?:,\d+)*(?:\.\d+)?)/g, '$1 रुपये');

  // Convert Percentage: 20% -> 20 प्रतिशत
  text = text.replace(/(\d+)\s*%/g, '$1 प्रतिशत');

  // Convert Scores/Fractions: 82/100 -> 82 में से 100
  text = text.replace(/(\d+)\s*\/\s*(\d+)/g, '$1 में से $2');

  // Convert Scheme Acronyms and slashes to clear Hindi phonetics:
  text = text.replace(/PMEGP\/मुद्रा/gi, 'पी एम ई जी पी या मुद्रा योजना');
  text = text.replace(/PMEGP/gi, 'पी.एम.ई.जी.पी.');
  text = text.replace(/मुद्रा/gi, 'मुद्रा योजना');
  text = text.replace(/EMI/gi, 'मासिक किस्त');
  text = text.replace(/\bvs\b/gi, 'बनाम');

  // Clean symbols that make TTS glitch or pause awkwardly
  text = text.replace(/[\*\#\_\[\]\(\)]/g, ' ');
  text = text.replace(/\+/g, ' और ');
  text = text.replace(/\s+/g, ' ').trim();

  return text;
};

export default function GramAIDrawer({ isOpen, onClose, onOpen, lang }) {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: lang === 'hi' 
        ? "नमस्ते! मैं आपका डिजिटल व्यापार सहायक हूँ। आप अपने गाँव के व्यापार, लोन पात्रता, या मुनाफे के नए मौकों के बारे में कुछ भी पूछ सकते हैं।"
        : "Namaste! I am your rural business AI assistant. Ask me anything about village demand, competitor density, or safe borrowing."
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const messagesEndRef = useRef(null);

  // Load and cache voices when browser initializes them
  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v && v.length > 0) {
        setAvailableVoices(v);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop speech when drawer closes
  useEffect(() => {
    if (!isOpen && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isOpen]);

  // Auto scroll messages to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Find the best authentic Hindi voice available on the device
  const getHindiVoice = () => {
    const voices = availableVoices.length > 0 
      ? availableVoices 
      : (('speechSynthesis' in window) ? window.speechSynthesis.getVoices() : []);

    if (!voices || voices.length === 0) return null;

    // 1. First priority: Pure Hindi voices (Google हिन्दी, Microsoft Kalpana, Microsoft Hemant, Swara, etc.)
    const pureHindi = voices.find(v => {
      const langCode = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return langCode === 'hi-in' || 
             langCode === 'hi_in' || 
             langCode.startsWith('hi') || 
             name.includes('hindi') || 
             name.includes('हिन्दी') || 
             name.includes('kalpana') || 
             name.includes('hemant') || 
             name.includes('swara');
    });
    if (pureHindi) return pureHindi;

    // 2. Second priority: Indian-accented voice (Google English India, Microsoft Ravi, Microsoft Heera)
    const indianVoice = voices.find(v => {
      const langCode = (v.lang || '').toLowerCase();
      const name = (v.name || '').toLowerCase();
      return langCode === 'en-in' || 
             langCode === 'en_in' || 
             name.includes('india') || 
             name.includes('ravi') || 
             name.includes('heera');
    });
    if (indianVoice) return indianVoice;

    return null;
  };

  // Speak text with authentic Hindi phonetics and natural pacing
  const speakText = (text) => {
    if (!('speechSynthesis' in window) || isMuted) return;

    try {
      window.speechSynthesis.cancel(); // Cancel any current speech

      const isHindi = /[\u0900-\u097F]/.test(text) || lang === 'hi';
      const spokenText = isHindi ? prepareSpeechText(text) : text;
      const utterance = new SpeechSynthesisUtterance(spokenText);

      if (isHindi) {
        utterance.lang = 'hi-IN'; // Force Hindi language code
        const hindiVoice = getHindiVoice();
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }
        utterance.rate = 0.88;
        utterance.pitch = 1.0;
      } else {
        utterance.lang = 'en-IN';
        utterance.rate = 0.95;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("Speech synthesis error:", err);
      setIsSpeaking(false);
    }
  };

  // Instant replies for quick suggestion buttons (no API call needed)
  const QUICK_REPLIES = {
    "मेरे लिए सुरक्षित लोन कितना है?": "आपकी पूँजी पर PMEGP या मुद्रा योजना में 35% तक सब्सिडी और सुरक्षित लोन मिल सकता है। सलाह है कि मासिक किस्त आपके अनुमानित शुद्ध मुनाफे के 30% से कम रहे, ताकि किसी भी विपरीत परिस्थिति में कोई दबाव न आए। उदाहरण: 1 लाख की पूँजी पर PMEGP से 35,000 रुपए सब्सिडी मिल सकती है और 1.5 लाख तक लोन सुरक्षित रहता है।",
    "गाँव में सबसे ज़्यादा मुनाफे का क्या मौका है?": "गाँव में सबसे बड़े मुनाफे के मौके: 1. डेयरी व्यवसाय — रोजाना नकद आमदनी, सुरक्षा स्कोर 82/100. 2. घर-घर ताज़ा दूध/दही डिलीवरी — सुबह नियमित ग्राहक, कम पूँजी. 3. मिनी आटा/तेल मिल — पूरे साल नकद कमाई. 4. सिलाई केंद्र — त्योहारों में अच्छी कमाई. 5. CSC सेंटर — सरकारी सेवाएँ और नियमित आमदनी. सबसे ज़्यादा सुरक्षित: डेयरी!",
    "अगर बिक्री 20% घट जाए तो क्या होगा?": "यदि विपरीत मौसम में बिक्री 20% घट भी जाए, तब सुरक्षित व्यवसाय मॉडल में आपकी शुद्ध मासिक बचत पर्याप्त रहेगी और किस्त आसानी से निकल जाएगी! इसीलिए DSCR अनुपात 1.3 से ऊपर रखना ज़रूरी है — अर्थात आपकी कमाई किस्त से कम-से-कम 1.3 गुना होनी चाहिए। GramVenture का बजट सिमुलेटर यही जांचता है कि विपरीत परिस्थिति में भी आपका व्यवसाय टिका रहे!",
    "डेयरी और सिलाई में कौन बेहतर है?": "डेयरी व्यवसाय: रोजाना नकद आमदनी, सुरक्षा स्कोर 82/100, लेकिन पूँजी ज़्यादा (1-3 लाख+) और तकनीकी ज्ञान चाहिए। सिलाई: कम पूँजी (20-50 हज़ार), त्योहारों में अच्छी कमाई, लेकिन पूरे साल नियमित आमदनी नहीं। अगर आपके पास ज़मीन और पशु हैं तो डेयरी स्पष्ट विजेता है; वरना सिलाई कम पूँजी में शुरुआत करने का सही विकल्प है।"
  };

  // REAL AI: Generative reasoning with Google Gemini & Live Knowledge Engine
  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isThinking) return;

    const userMsg = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');

    // Check if this is a quick suggestion button query — reply instantly without API call
    if (QUICK_REPLIES[query]) {
      setMessages(prev => [...prev, { sender: 'ai', text: QUICK_REPLIES[query] }]);
      speakText(QUICK_REPLIES[query]);
      return;
    }

    setIsThinking(true);

    let reply = "";
    const activeKey = (import.meta.env.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' ? localStorage.getItem('gv_gemini_api_key') : '') || '').trim();

    try {
      // 1. Direct Call to Google Gemini (real AI)
      if (activeKey) {
        const models = ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-2.5-flash-lite'];
        for (const m of models) {
          try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${activeKey}`;
            const res = await fetch(url, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                system_instruction: {
                  parts: [{
                    text: `You are "GramVenture AI" (ग्रामवेंचर एआई) — an intelligent rural entrepreneurship advisor built specifically for the GramVenture platform.

IMPORTANT RULES:
1. GramVenture Site Topics (PRIMARY PURPOSE): When user asks about village businesses, dairy farming, poultry, mini mill, tailoring, grocery, solar, CSC center, PMEGP, Mudra loans, NABARD, subsidies, EMI, competitor gap, market demand, rural entrepreneurship — answer from BUILT-IN KNOWLEDGE ONLY. Do NOT use internet. Give COMPLETE, detailed answers. NEVER stop mid-sentence.
2. Off-Topic Questions: If user asks something outside GramVenture scope (general knowledge, science, history, geography, tech, math, etc.), answer it FULLY and COMPLETELY, then add ONE line: "(नोट: मैं मुख्य रूप से ग्रामीण व्यापार सलाह के लिए बनाई गई हूँ, लेकिन इस सवाल का जवाब भी दे दिया!)" if Hindi, or "(Note: I am built for GramVenture rural business advice, but happy to answer this too!)" if English.
3. Language: Hindi questions → pure Hindi (Devanagari). English/Hinglish → English. No asterisks, no markdown, no incomplete sentences.`
                  }]
                },
                contents: updatedMessages.slice(-6).map(msg => ({
                  role: msg.sender === 'user' ? 'user' : 'model',
                  parts: [{ text: msg.text }]
                })),
                generationConfig: {
                  temperature: 0.7,
                  maxOutputTokens: 900
                }
              })
            });

            if (res.ok) {
              const data = await res.json();
              const genText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (genText) {
                reply = genText.replace(/\*\*/g, '').trim();
                break;
              }
            }
          } catch (e) {
            console.warn(`Direct Gemini ${m} call failed:`, e);
          }
        }
      }

      // 2. Try Backend API endpoint if direct Gemini was not used or failed
      if (!reply) {
        try {
          const apiEndpoint = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/ai/chat';
          const res = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: query,
              history: updatedMessages.slice(-6),
              lang,
              apiKey: activeKey || null
            })
          });
          if (res.ok) {
            const data = await res.json();
            if (data?.reply) {
              reply = data.reply;
            }
          }
        } catch (e) {
          // Backend might not be running, continue to live knowledge engine
        }
      }

      // 3. Live Knowledge Search for ANY question outside the project (Wikipedia API)
      if (!reply) {
        const isHi = lang === 'hi' || /[\u0900-\u097F]/.test(query);
        let searchTerm = query
          .replace(/[?|।|,|!]/g, '')
          .replace(/(क्या है|कौन है|कहाँ है|बताओ|जानकारी दो|what is|who is|where is|tell me about)/gi, '')
          .trim();

        if (searchTerm.length > 1) {
          try {
            const wikiLang = isHi ? 'hi' : 'en';
            const wikiRes = await fetch(`https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`);
            if (wikiRes.ok) {
              const wikiData = await wikiRes.json();
              if (wikiData.extract) {
                reply = wikiData.extract;
              }
            }
          } catch (e) {}
        }
      }

      // 4. Intelligent Contextual Advisor Fallback
      if (!reply) {
        const lower = query.toLowerCase();
        if (lower.includes("loan") || lower.includes("कर्ज") || lower.includes("पैसा") || lower.includes("afford") || lower.includes("लोन")) {
          reply = "आपकी पूँजी पर PMEGP या मुद्रा योजना में 35% तक सब्सिडी और सुरक्षित लोन मिल सकता है। सलाह है कि मासिक किस्त आपके अनुमानित शुद्ध मुनाफे के 30% से कम रहे, ताकि किसी भी विपरीत परिस्थिति में कोई दबाव न आए।";
        } else if (lower.includes("opportunity") || lower.includes("gap") || lower.includes("अवसर") || lower.includes("मौका")) {
          reply = "गाँव में सबसे बड़ा मौका: घर-घर सुबह ताज़ा पैक दूध, पनीर, शुद्ध दही पहुँचाना, या मिनी आटा/तेल मिल है जहाँ पूरे साल नकद आमदनी होती है!";
        } else if (lower.includes("compare") || lower.includes("तुलना")) {
          reply = "डेयरी व्यवसाय में रोजाना नकद आमदनी होती है और इसका सुरक्षा स्कोर 82/100 है, जबकि सिलाई में कम पूँजी लगती है पर लगन और त्योहारों में ही बिक्री बढ़ती है।";
        } else if (lower.includes("simulate") || lower.includes("risk") || lower.includes("जोखिम") || lower.includes("घट")) {
          reply = "यदि विपरीत मौसम में बिक्री 20% घट भी जाए, तब भी सुरक्षित व्यवसाय मॉडल में आपकी शुद्ध मासिक बचत पर्याप्त रहेगी और किस्त आसानी से निकल जाएगी!";
        } else {
          reply = lang === 'hi'
            ? "मैं ग्रामवेंचर AI सहायक हूँ। आप मुझसे अपने गाँव के व्यापार, लोन योजनाओं, बाज़ार की मांग या किसी भी विषय पर पूछ सकते हैं!"
            : "I am GramVenture AI. Ask me about rural businesses, loans, market demand, or any general topic!";
        }
      }
    } catch (err) {
      console.error("AI Generation error:", err);
      reply = lang === 'hi' ? "क्षमा करें, उत्तर प्राप्त करने में समस्या हुई। कृपया पुनः प्रयास करें।" : "Sorry, an error occurred. Please try again.";
    } finally {
      setIsThinking(false);
      setMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      speakText(reply);
    }
  };

  const toggleMic = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition is simulated. Asking sample query...");
      handleSend("गाँव में सबसे ज़्यादा मुनाफे का क्या मौका है?");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        handleSend(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <>
      {/* Floating AI Chatbot Icon Trigger at Bottom Right (Text removed, sleek bot icon) */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="animate-pulse-glow"
          style={{
            position: 'fixed',
            bottom: '26px',
            right: '26px',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #15803d, #166534)',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(21, 128, 61, 0.45)',
            zIndex: 999,
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          title={lang === 'hi' ? 'AI चैटबॉट से पूछें' : 'Ask AI Chatbot'}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
        >
          <Bot size={28} color="#ffffff" />
          
          {/* Active green status dot */}
          <div style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: '#22c55e',
            border: '2px solid #ffffff'
          }} />
        </button>
      )}

      {/* Floating Chat Drawer Fixed at Bottom Right */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '26px',
          right: '26px',
          width: '380px',
          height: '540px',
          background: '#ffffff',
          borderRadius: '22px',
          boxShadow: '0 16px 45px rgba(0,0,0,0.22)',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }} className="animate-fade-in">
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #15803d, #14532d)',
            padding: '14px 18px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="#ffffff" />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.94rem' }}>AI व्यापार सहायक</h4>
                <span style={{ fontSize: '0.68rem', color: isSpeaking ? '#fef08a' : '#bbf7d0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {isSpeaking ? (
                    <>
                      <span style={{ color: '#22c55e', fontWeight: 800 }}>●</span>
                      <span>{lang === 'hi' ? 'हिंदी में बोल रहा है...' : 'Speaking in Hindi...'}</span>
                    </>
                  ) : (
                    <span>{lang === 'hi' ? 'ऑनलाइन • बोलकर या लिखकर पूछें' : 'Online • Ask via voice or text'}</span>
                  )}
                </span>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>

              <button
                onClick={() => {
                  if (isSpeaking) {
                    window.speechSynthesis?.cancel();
                    setIsSpeaking(false);
                  }
                  setIsMuted(!isMuted);
                }}
                style={{
                  background: isMuted ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255,255,255,0.2)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.7rem',
                  fontWeight: 600
                }}
                title={isMuted ? (lang === 'hi' ? "आवाज़ चालू करें" : "Unmute voice") : (lang === 'hi' ? "आवाज़ बंद करें" : "Mute voice")}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? (lang === 'hi' ? "म्यूट" : "Muted") : (lang === 'hi' ? "आवाज़" : "Voice")}</span>
              </button>

              <button 
                onClick={onClose} 
                style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '4px' }}
                title="बंद करें"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div style={{ padding: '8px 12px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {[
              { label: "सुरक्षित लोन कितना?", prompt: "मेरे लिए सुरक्षित लोन कितना है?" },
              { label: "मुनाफे का मौका", prompt: "गाँव में सबसे ज़्यादा मुनाफे का क्या मौका है?" },
              { label: "बिक्री घट जाए तो?", prompt: "अगर बिक्री 20% घट जाए तो क्या होगा?" },
              { label: "डेयरी vs सिलाई", prompt: "डेयरी और सिलाई में कौन बेहतर है?" }
            ].map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.prompt)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, idx) => {
              const isAi = m.sender === 'ai';
              return (
                <div 
                  key={idx}
                  style={{
                    alignSelf: isAi ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    background: isAi ? '#f0fdf4' : '#15803d',
                    color: isAi ? '#14532d' : '#ffffff',
                    border: isAi ? '1px solid #bbf7d0' : 'none',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    fontSize: '0.82rem',
                    lineHeight: 1.45,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
                  }}
                >
                  <div>{m.text}</div>
                  {isAi && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                      <button
                        onClick={() => speakText(m.text)}
                        style={{
                          background: 'rgba(21, 128, 61, 0.08)',
                          border: '1px solid rgba(21, 128, 61, 0.2)',
                          borderRadius: '6px',
                          padding: '2px 7px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#15803d',
                          fontSize: '0.68rem',
                          fontWeight: 600
                        }}
                        title={lang === 'hi' ? "हिंदी में दोबारा सुनें" : "Listen in Hindi"}
                      >
                        <Volume2 size={12} />
                        <span>{lang === 'hi' ? 'दोबारा सुनें' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Real AI indicator */}
            {isThinking && (
              <div style={{
                alignSelf: 'flex-start',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '14px',
                padding: '8px 14px',
                fontSize: '0.78rem',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={14} className="animate-spin" color="#15803d" />
                <span>AI सोच रहा है...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>



          {/* Input Box */}
          <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', background: '#ffffff' }}>
            <button
              onClick={toggleMic}
              style={{
                background: isListening ? '#ef4444' : '#f1f5f9',
                color: isListening ? '#ffffff' : '#15803d',
                border: 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isListening ? "Listening..." : "बोलकर पूछें"}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'hi' ? "गाँव या व्यापार के बारे में पूछें..." : "Ask AI about demand, loan or gaps..."}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />

            <button
              onClick={() => handleSend()}
              style={{
                background: '#15803d',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
