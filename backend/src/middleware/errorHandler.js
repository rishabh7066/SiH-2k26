/**
 * Global error handler middleware.
 * Must be registered LAST in Express middleware chain.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.path}:`, err);

  // Validation errors from express-validator
  if (err.type === 'validation') {
    return res.status(422).json({
      success: false,
      error: 'Validation failed',
      details: err.errors
    });
  }

  // Supabase / known API errors
  if (err.status) {
    return res.status(err.status).json({
      success: false,
      error: err.message || 'Request failed'
    });
  }

  // Default: internal server error
  const isDev = process.env.NODE_ENV === 'development';
  return res.status(500).json({
    success: false,
    error: isDev ? err.message : 'Internal server error',
    ...(isDev && { stack: err.stack })
  });
};

/**
 * 404 handler — for unknown routes.
 */
export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.path}`
  });
};
