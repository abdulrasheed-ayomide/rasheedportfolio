import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import env from './config/env.js'
import { isDbConnected } from './config/db.js'
import contactRoutes from './routes/contactRoutes.js'
import { apiLimiter } from './middleware/rateLimiters.js'
import { notFound, errorHandler } from './middleware/errorHandlers.js'

export function createApp() {
  const app = express()

  app.disable('x-powered-by')
  if (env.trustProxy) app.set('trust proxy', env.trustProxy)

  app.use(helmet())
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / server-to-server requests (no Origin header) and configured frontends.
        if (!origin || env.clientUrls.includes(origin)) return cb(null, true)
        return cb(new Error('Not allowed by CORS'))
      },
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type'],
      maxAge: 600,
    }),
  )
  app.use(express.json({ limit: '10kb' }))

  app.use('/api', apiLimiter)

  app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'ok', database: isDbConnected() ? 'connected' : 'disconnected' })
  })

  app.use('/api/contact', contactRoutes)

  app.use(notFound)
  app.use(errorHandler)

  return app
}

export default createApp
