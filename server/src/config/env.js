import dotenv from 'dotenv'

dotenv.config({ quiet: true })

const bool = (v, fallback = false) => (v === undefined || v === '' ? fallback : ['1', 'true', 'yes'].includes(String(v).toLowerCase()))
const int = (v, fallback) => {
  const n = Number.parseInt(v, 10)
  return Number.isFinite(n) ? n : fallback
}

/**
 * All configuration comes from environment variables (see .env.example).
 * Secrets are never hardcoded and never sent to the browser.
 */
const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: int(process.env.PORT, 5000),
  mongoUri: process.env.MONGODB_URI || '',
  // Comma-separated list of allowed frontend origins.
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim().replace(/\/+$/, ''))
    .filter(Boolean),
  // Number of proxies in front of the app (1 on Render/Railway/Heroku). Needed for correct IP rate limiting.
  trustProxy: int(process.env.TRUST_PROXY, 0),

  rateLimit: {
    windowMinutes: int(process.env.CONTACT_RATE_WINDOW_MINUTES, 15),
    max: int(process.env.CONTACT_RATE_MAX, 5),
  },

  mail: {
    provider: (process.env.MAIL_PROVIDER || '').toLowerCase(), // 'resend' | 'smtp' | 'console' | ''
    to: process.env.CONTACT_TO_EMAIL || '',
    from: process.env.MAIL_FROM || '',
    resendApiKey: process.env.RESEND_API_KEY || '',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: int(process.env.SMTP_PORT, 587),
      secure: bool(process.env.SMTP_SECURE, false),
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },
}

env.isProduction = env.nodeEnv === 'production'

export default env
