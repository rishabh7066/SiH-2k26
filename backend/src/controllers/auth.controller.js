import { supabaseAdmin } from '../config/supabase.js';

// ─── SIGN UP (Email + Password) ────────────────────────────────────────────────
export const signup = async (req, res, next) => {
  try {
    const { email, password, full_name, phone, village, state } = req.body;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      phone: phone || undefined,
      email_confirm: true, // auto-confirm for now (set false to require email verify)
      user_metadata: { full_name, village, state }
    });

    if (authError) {
      return res.status(400).json({ success: false, error: authError.message });
    }

    // Insert into profiles table
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: authData.user.id,
        full_name,
        phone: phone || null,
        village: village || null,
        state: state || null
      });

    if (profileError) {
      console.warn('Profile insert error (non-fatal):', profileError.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name,
        village,
        state
      }
    });
  } catch (err) {
    next(err);
  }
};

// ─── LOGIN (Email + Password) ──────────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ success: false, error: error.message });
    }

    // Fetch profile data
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at
      },
      user: {
        id: data.user.id,
        email: data.user.email,
        full_name: profile?.full_name || data.user.user_metadata?.full_name,
        phone: profile?.phone,
        village: profile?.village,
        state: profile?.state
      }
    });
  } catch (err) {
    next(err);
  }
};

// ─── LOGOUT ────────────────────────────────────────────────────────────────────
export const logout = async (req, res, next) => {
  try {
    // Supabase session invalidation happens client-side primarily.
    // We just confirm the action server-side.
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};

// ─── GET CURRENT USER ──────────────────────────────────────────────────────────
export const getMe = async (req, res, next) => {
  try {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    return res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        full_name: profile?.full_name,
        phone: profile?.phone,
        village: profile?.village,
        state: profile?.state,
        created_at: profile?.created_at
      }
    });
  } catch (err) {
    next(err);
  }
};

// ─── SEND OTP (Phone) ──────────────────────────────────────────────────────────
export const sendOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    // Supabase phone OTP — requires Phone Auth enabled in Supabase dashboard
    const { error } = await supabaseAdmin.auth.signInWithOtp({ phone });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: `OTP sent to ${phone}`
    });
  } catch (err) {
    next(err);
  }
};

// ─── VERIFY OTP (Phone) ────────────────────────────────────────────────────────
export const verifyOtp = async (req, res, next) => {
  try {
    const { phone, token } = req.body;

    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });

    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }

    return res.status(200).json({
      success: true,
      message: 'Phone verified successfully',
      session: {
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token
      },
      user: {
        id: data.user?.id,
        phone: data.user?.phone
      }
    });
  } catch (err) {
    next(err);
  }
};

// ─── REFRESH TOKEN ─────────────────────────────────────────────────────────────
export const refreshToken = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token });

    if (error) {
      return res.status(401).json({ success: false, error: 'Token refresh failed. Please login again.' });
    }

    return res.status(200).json({
      success: true,
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at
      }
    });
  } catch (err) {
    next(err);
  }
};
