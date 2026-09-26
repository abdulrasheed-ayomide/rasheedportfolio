import { rateLimit } from 'express-rate-limit'
import env from '../config/env.js'

const json = (message) => ({ success: false, message })

/** General limit for every /api route. */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: json('Too many requests. Please slow down and try again shortly.'),
})

/** Stricter limit for sending contact messages. */
export const contactLimiter = rateLimit({
  windowMs: env.rateLimit.windowMinutes * 60 * 1000,
  limit: env.rateLimit.max,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: json('Too many messages were sent from your connection. Please wait a few minutes and try again.'),
})
