/**
 * MAIL SERVICE
 * ------------
 * The rest of the app calls sendContactNotification() and does not care which
 * provider is used. Choose one with MAIL_PROVIDER in .env:
 *   resend   -> RESEND_API_KEY
 *   smtp     -> SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
 *   console  -> prints emails in the terminal (development)
 *   (empty)  -> notifications are switched off; messages are still saved
 *
 * To add another provider, create a file in ./mailProviders that returns
 * { name, isConfigured(), send({ from, to, subject, text, html, replyTo }) }
 * and register it in `providers` below.
 */
import env from '../config/env.js'
import logger from '../utils/logger.js'
import { escapeHtml } from '../utils/sanitize.js'
import { createResendProvider } from './mailProviders/resendProvider.js'
import { createSmtpProvider } from './mailProviders/smtpProvider.js'
import { createConsoleProvider } from './mailProviders/consoleProvider.js'

const providers = {
  resend: () => createResendProvider({ apiKey: env.mail.resendApiKey }),
  smtp: () => createSmtpProvider(env.mail.smtp),
  console: () => createConsoleProvider(),
}

let provider = null
let warned = false

function getProvider() {
  if (provider !== null) return provider
  const factory = providers[env.mail.provider]
  provider = factory ? factory() : false
  return provider
}

/** Returns why mail is disabled, or null if it is ready. */
export function mailStatus() {
  const p = getProvider()
  if (!env.mail.provider) return 'MAIL_PROVIDER is not set'
  if (!p) return `Unknown MAIL_PROVIDER "${env.mail.provider}"`
  if (!p.isConfigured()) return `${p.name} provider is missing credentials`
  if (!env.mail.to) return 'CONTACT_TO_EMAIL is not set'
  if (p.name !== 'console' && !env.mail.from) return 'MAIL_FROM is not set'
  return null
}

function buildEmail({ name, email, message, createdAt }) {
  const date = new Date(createdAt || Date.now()).toUTCString()
  const subject = `New portfolio message from ${name}`
  const text = `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nDate: ${date}\n\nMessage:\n${message}\n`
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;color:#111">
    <h2 style="margin:0 0 16px">New portfolio message</h2>
    <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
    <p style="margin:0 0 16px;color:#555"><strong>Date:</strong> ${escapeHtml(date)}</p>
    <div style="padding:16px;background:#f6f6f6;border-left:4px solid #FFB900;white-space:pre-wrap">${escapeHtml(message)}</div>
  </div>`
  return { subject, text, html }
}

/**
 * Sends the owner a notification about a new contact message.
 * Never throws: failures are logged (without secrets) and reported as false.
 */
export async function sendContactNotification(contact) {
  const reason = mailStatus()
  if (reason) {
    if (!warned) {
      logger.warn(`Email notifications are off (${reason}). Messages are still saved to MongoDB.`)
      warned = true
    }
    return false
  }
  try {
    const { subject, text, html } = buildEmail(contact)
    await getProvider().send({
      from: env.mail.from || 'Portfolio <no-reply@localhost>',
      to: env.mail.to,
      replyTo: contact.email,
      subject,
      text,
      html,
    })
    return true
  } catch (err) {
    logger.error(`Email notification failed via ${getProvider().name}: ${err.message}`)
    return false
  }
}
