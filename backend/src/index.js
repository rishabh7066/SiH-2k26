import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.routes.js';
import villageRoutes from './routes/village.routes.js';
import businessRoutes from './routes/business.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ── Security Middleware ────────────────────────────────────────────────────────
app.use(helmet());

// CORS — allow frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: Number(process.env.RATE_LIMIT_MAX) || 100,
  message: { success: false, error: 'Too many requests. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Stricter limit on auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, error: 'Too many auth attempts. Try again in 15 minutes.' }
});
app.use('/api/auth/', authLimiter);

// ── Body Parsing ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logging (dev only) ─────────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ── Health Check ───────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: 'GramVenture AI Backend is running 🚀',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ── API Routes ─────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/villages', villageRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/ai', aiRoutes);

// ── 404 & Error Handlers ───────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  ┌─────────────────────────────────────────┐');
  console.log(`  │  🌾 GramVenture AI Backend               │`);
  console.log(`  │  🚀 Running on http://localhost:${PORT}    │`);
  console.log(`  │  🔗 Health: /api/health                  │`);
  console.log(`  │  🌍 Env: ${(process.env.NODE_ENV || 'development').padEnd(30)}│`);
  console.log('  └─────────────────────────────────────────┘');
  console.log('');
});

export default app;
