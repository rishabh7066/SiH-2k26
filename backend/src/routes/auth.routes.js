import { Router } from 'express';
import { body } from 'express-validator';
import {
  signup,
  login,
  logout,
  getMe,
  sendOtp,
  verifyOtp,
  refreshToken
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';
import { supabaseAdmin } from '../config/supabase.js';

const router = Router();

// ── Validation rules ──────────────────────────────────────────────────────────
const signupValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('full_name').notEmpty().withMessage('Full name is required')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const otpValidation = [
  body('phone')
    .matches(/^\+91[6-9]\d{9}$/)
    .withMessage('Valid Indian phone number required (e.g. +919876543210)')
];

// ── Routes ────────────────────────────────────────────────────────────────────
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);

// OTP routes (phone auth)
router.post('/otp/send', otpValidation, sendOtp);
router.post('/otp/verify', [
  ...otpValidation,
  body('token').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
], verifyOtp);

// Token refresh
router.post('/refresh', [
  body('refresh_token').notEmpty().withMessage('Refresh token is required')
], refreshToken);

// Auto-confirm user endpoint (verifies user instantly without requiring SMTP email)
router.post('/confirm', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, error: 'Email required' });
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;
    const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
    if (user) {
      await supabaseAdmin.auth.admin.updateUserById(user.id, { email_confirm: true });
      return res.json({ success: true, message: 'User confirmed successfully' });
    }
    return res.status(404).json({ success: false, error: 'User not found' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
