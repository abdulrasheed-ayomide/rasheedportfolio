import crypto from 'node:crypto'
import ContactMessage from '../models/ContactMessage.js'
import { validateContact } from '../validation/contactValidation.js'
import { sendContactNotification } from '../services/mailService.js'
import { isDbConnected } from '../config/db.js'
import logger from '../utils/logger.js'

const SUCCESS_MESSAGE = 'Thank you! Your message has been sent. I will get back to you soon.'
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000 // identical messages within 10 minutes are ignored

export async function createContactMessage(req, res, next) {
  try {
    const result = validateContact(req.body)

    if (result.spam) {
      // Pretend it worked so bots get no signal, but store nothing.
      logger.warn('Contact form spam blocked (honeypot or timing check)')
      return res.status(200).json({ success: true, message: SUCCESS_MESSAGE })
    }

    if (!result.ok) {
      return res.status(400).json({
        success: false,
        message: 'Please correct the highlighted fields and try again.',
        errors: result.errors,
      })
    }

    if (!isDbConnected()) {
      return res.status(503).json({
        success: false,
        message: 'The message service is temporarily unavailable. Please try again later.',
      })
    }

    const { name, email, message } = result.data
    const fingerprint = crypto.createHash('sha256').update(`${email}\n${message}`).digest('hex')

    const duplicate = await ContactMessage.exists({
      fingerprint,
      createdAt: { $gte: new Date(Date.now() - DUPLICATE_WINDOW_MS) },
    })
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: 'This message was already received. I will reply as soon as I can.',
      })
    }

    const saved = await ContactMessage.create({ name, email, message, fingerprint })

    // Email is sent in the background: a mail problem never loses the message or slows the reply.
    sendContactNotification(saved.toObject()).catch(() => {})

    return res.status(201).json({ success: true, message: SUCCESS_MESSAGE })
  } catch (err) {
    return next(err)
  }
}
