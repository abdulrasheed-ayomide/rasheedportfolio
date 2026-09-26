import { cleanText } from '../utils/sanitize.js'

// Keep in sync with client/src/components/sections/Contact.jsx
export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
  maxLinks: 3, // messages stuffed with links are almost always spam
  minFillMs: 3000, // a real person needs more than 3 seconds to fill the form
}

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i
const LINK_RE = /(https?:\/\/|www\.)/gi

/**
 * Validates and sanitises a contact submission.
 * Returns { ok, data, errors, spam }. Never trusts the frontend.
 */
export function validateContact(body) {
  const errors = {}
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, errors: { form: 'Invalid request.' } }
  }

  const { name, email, message, website, startedAt } = body

  // Honeypot + timing checks. Bots are told "success" but nothing is stored.
  const honeypotFilled = typeof website === 'string' ? website.trim() !== '' : website != null && website !== ''
  const started = Number(startedAt)
  const tooFast = Number.isFinite(started) && started > 0 && Date.now() - started < LIMITS.minFillMs
  if (honeypotFilled || tooFast) return { ok: false, spam: true }

  for (const [field, value] of Object.entries({ name, email, message })) {
    if (typeof value !== 'string') errors[field] = `Please enter a valid ${field}.`
  }
  if (Object.keys(errors).length) return { ok: false, errors }

  const data = {
    name: cleanText(name),
    email: cleanText(email).toLowerCase(),
    message: cleanText(message, { multiline: true }),
  }

  if (data.name.length < LIMITS.name.min) errors.name = 'Please enter your full name.'
  else if (data.name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`

  if (!data.email) errors.email = 'Please enter your email address.'
  else if (data.email.length > LIMITS.email.max || !EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.'

  if (data.message.length < LIMITS.message.min) errors.message = `Please write at least ${LIMITS.message.min} characters.`
  else if (data.message.length > LIMITS.message.max) errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`
  else if ((data.message.match(LINK_RE) || []).length > LIMITS.maxLinks) {
    errors.message = `Please include no more than ${LIMITS.maxLinks} links.`
  }

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data }
}
