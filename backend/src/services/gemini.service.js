// backend/src/services/gemini.service.js
// Universal Conversational AI Service powered by Google Gemini

const SYSTEM_PROMPT = `You are "GramVenture AI" (ग्रामवेंचर एआई) — an intelligent, friendly rural entrepreneurship mentor built specifically for the GramVenture platform.

IMPORTANT RULES:
1. GramVenture Site Topics (PRIMARY PURPOSE): When the user asks about village business ideas, dairy farming, poultry, mini dal/flour mill, tailoring, grocery, solar setups, CSC center, PMEGP loans, Mudra Shishu/Kishor/Tarun, Stand-Up India, NABARD, subsidies, EMI calculations, competitor gap analysis, market demand, rural entrepreneurship — answer from your BUILT-IN KNOWLEDGE ONLY. Do NOT fetch from internet. Give complete, detailed, helpful answers. NEVER cut the answer short.
2. Off-Topic Questions: If the user asks something OUTSIDE the GramVenture scope (general knowledge, science, history, geography, tech, math, etc.), first answer the question fully, then add ONE short line at the end: "(नोट: मैं मुख्य रूप से ग्रामीण व्यापार सलाह के लिए बनाई गई हूँ, लेकिन इस सवाल का जवाब भी दे दिया!)" — in Hindi if user spoke Hindi, or "(Note: I am primarily built for GramVenture rural business advice, but happy to help with this too!)" in English.
3. Language & Tone:
   - If the user talks or asks in Hindi, answer in pure, warm, natural Hindi (Devanagari script).
   - If the user asks in English or Hinglish, respond appropriately.
   - Keep answers complete, conversational, and easy to understand. Never stop mid-sentence.
   - Avoid asterisks, markdown symbols, or tables that sound awkward in Text-To-Speech (TTS).`;

/**
 * Call Gemini 1.5 Flash REST API
 */
export async function getGeminiChatReply({ message, history = [], apiKey, lang = 'hi' }) {
  const activeKey = apiKey || process.env.GEMINI_API_KEY;

  if (!activeKey) {
    // If no key provided, call smart fallback
    return await getSmartKnowledgeFallback(message, lang);
  }

  try {
    // Sanitize and structure message turns for Gemini
    const allTurns = [
      ...(history || []).filter(m => m.text && m.text.trim()).map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text.trim() }]
      })),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    // Ensure strictly alternating roles and starts with 'user'
    const contents = [];
    for (const turn of allTurns) {
      if (contents.length === 0) {
        if (turn.role === 'user') contents.push(turn);
      } else {
        const prev = contents[contents.length - 1];
        if (prev.role === turn.role) {
          prev.parts[0].text += '\n' + turn.parts[0].text;
        } else {
          contents.push(turn);
        }
      }
    }
    if (contents.length === 0) {
      contents.push({ role: 'user', parts: [{ text: message }] });
    }

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents.slice(-6),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 900
      }
    };

    const models = [
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite',
      'gemini-flash-lite-latest',
      'gemini-flash-latest',
      'gemini-3.7-flash'
    ];
    let lastError = null;

    for (const model of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${activeKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-goog-api-key': activeKey
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return {
              reply: replyText.trim(),
              model,
              source: 'gemini_api'
            };
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          lastError = errData?.error?.message || `HTTP ${response.status}`;
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    console.warn('Gemini API call failed with all models:', lastError);
    return await getSmartKnowledgeFallback(message, lang);
  } catch (error) {
    console.error('Error in getGeminiChatReply:', error);
    return await getSmartKnowledgeFallback(message, lang);
  }
}

/**
 * Intelligent Fallback Engine: Uses Wikipedia knowledge search for general queries outside project
 */
async function getSmartKnowledgeFallback(message, lang = 'hi') {
  const isHi = lang === 'hi' || /[\u0900-\u097F]/.test(message);
  const cleanMsg = (message || '').trim();
  // Try Wikipedia Instant Summary ONLY for simple topic lookups (never for relational/distance questions)
  const isQuestion = /(कितना|दूर|दूरी|राजधानी|मुद्रा|कैसे|क्यों|कब|कहाँ|क्या|बताओ|कौन|how|what|why|when|where|distance|capital|currency|far|cost|price|difference|tulan)/i.test(cleanMsg);

  if (!isQuestion) {
    try {
      const wikiLang = isHi ? 'hi' : 'en';
      let searchTerm = cleanMsg
        .replace(/[?|।|,|!]/g, '')
        .trim();

      if (searchTerm.length > 2 && searchTerm.length < 30) {
        // 1. Direct Page Summary
        const wikiUrl = `https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchTerm)}`;
        const wikiRes = await fetch(wikiUrl);
        if (wikiRes.ok) {
          const wikiData = await wikiRes.json();
          if (wikiData.extract && wikiData.type === 'standard') {
            return {
              reply: wikiData.extract,
              model: 'knowledge_engine',
              source: 'wikipedia'
            };
          }
        }
      }
    } catch (e) {
      // ignore wiki error
    }
  }

  // Rural Project Heuristics fallback
  const lower = cleanMsg.toLowerCase();
  if (lower.includes('loan') || lower.includes('कर्ज') || lower.includes('पैसा') || lower.includes('लोन')) {
    return {
      reply: isHi 
        ? "ग्रामीण व्यापार के लिए PMEGP (35% तक सरकारी सब्सिडी) और मुद्रा योजना सबसे बेहतरीन विकल्प हैं। आप अपनी पूँजी का 3 से 4 गुना तक सुरक्षित लोन ले सकते हैं, जिससे मासिक किस्त (EMI) आपके मुनाफे के 30% से कम रहे।"
        : "For rural businesses, PMEGP (up to 35% subsidy) and Mudra loans are best. Aim to keep monthly EMI under 30% of your projected net profit.",
      model: 'smart_advisor',
      source: 'heuristic'
    };
  }

  return {
    reply: isHi
      ? "मैं आपका ग्रामवेंचर AI सहायक हूँ। आप मुझसे अपने गाँव के व्यापार, लोन योजनाओं, बाज़ार के अवसरों या किसी भी विषय पर पूछ सकते हैं!"
      : "I am your GramVenture AI assistant. You can ask me about rural businesses, loan feasibility, market gaps, or any general topic!",
    model: 'smart_advisor',
    source: 'heuristic'
  };
}
