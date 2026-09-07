// backend/src/routes/ai.routes.js
import { Router } from 'express';
import { getGeminiChatReply } from '../services/gemini.service.js';

const router = Router();

/**
 * POST /api/ai/chat
 * Body: { message, history, lang, apiKey }
 */
router.post('/chat', async (req, res) => {
  try {
    const { message, history, lang, apiKey } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Message string is required'
      });
    }

    const result = await getGeminiChatReply({
      message: message.trim(),
      history: history || [],
      apiKey: apiKey || null,
      lang: lang || 'hi'
    });

    return res.status(200).json({
      success: true,
      reply: result.reply,
      model: result.model,
      source: result.source
    });
  } catch (err) {
    console.error('AI chat route error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process AI chat request'
    });
  }
});

export default router;
