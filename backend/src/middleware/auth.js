import { supabaseAdmin } from '../config/supabase.js';

/**
 * Middleware to verify Supabase JWT token from Authorization header.
 * Sets req.user with the authenticated user's data.
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization token missing or invalid format'
      });
    }

    const token = authHeader.split(' ')[1];

    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid or expired token. Please login again.'
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({
      success: false,
      error: 'Authentication service error'
    });
  }
};

/**
 * Optional auth — attaches user if token present, but doesn't block if missing.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const { data: { user } } = await supabaseAdmin.auth.getUser(token);
    req.user = user || null;
    next();
  } catch {
    req.user = null;
    next();
  }
};
