/**
 * Centralized API utility for UdyamSaathi frontend.
 * Automatically attaches Supabase JWT token to all requests.
 * 
 * Usage:
 *   import api from './utils/api';
 *   const data = await api.post('/auth/login', { email, password });
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/** Get the stored session token */
const getToken = () => {
  try {
    const session = localStorage.getItem('gv_session');
    if (session) return JSON.parse(session).access_token;
  } catch {
    return null;
  }
  return null;
};

/** Core fetch wrapper */
const request = async (method, endpoint, body = null, options = {}) => {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    method: method.toUpperCase(),
    headers,
    ...(body ? { body: JSON.stringify(body) } : {})
  };

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `HTTP ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const api = {
  get:    (endpoint, opts)       => request('GET',    endpoint, null, opts),
  post:   (endpoint, body, opts) => request('POST',   endpoint, body, opts),
  put:    (endpoint, body, opts) => request('PUT',    endpoint, body, opts),
  patch:  (endpoint, body, opts) => request('PATCH',  endpoint, body, opts),
  delete: (endpoint, opts)       => request('DELETE', endpoint, null, opts),

  /** Save session tokens to localStorage */
  saveSession: (session) => {
    try {
      localStorage.setItem('gv_session', JSON.stringify(session));
    } catch {}
  },

  /** Clear session */
  clearSession: () => {
    try {
      localStorage.removeItem('gv_session');
      localStorage.removeItem('gv_auth_user');
    } catch {}
  },

  /** Health check — test if backend is reachable */
  healthCheck: () => request('GET', '/health'),
};

export default api;
