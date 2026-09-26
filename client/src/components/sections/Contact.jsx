import { useEffect, useRef, useState } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { FiCheckCircle, FiAlertCircle, FiSend } from 'react-icons/fi'
import Reveal from '../Reveal'
import SectionHeader from '../SectionHeader'
import { getSocialLinks } from '../SocialLinks'
import { sendContactMessage } from '../../services/api'
import portfolio from '../../config/portfolio'

// Keep these limits in sync with server/src/validation/contactValidation.js
const LIMITS = { name: { min: 2, max: 80 }, message: { min: 10, max: 2000 }, email: { max: 254 } }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const empty = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()
  if (name.length < LIMITS.name.min) errors.name = 'Please enter your full name.'
  else if (name.length > LIMITS.name.max) errors.name = `Name must be ${LIMITS.name.max} characters or fewer.`
  if (!email) errors.email = 'Please enter your email address.'
  else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (message.length < LIMITS.message.min) errors.message = `Please write at least ${LIMITS.message.min} characters.`
  else if (message.length > LIMITS.message.max) errors.message = `Message must be ${LIMITS.message.max} characters or fewer.`
  return errors
}

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | sending | success | error
  const honeypotRef = useRef(null)
  const startedAt = useRef(0)
  const lastSent = useRef('')
  const sending = status.state === 'sending'

  // Time the form was shown; the server uses it to spot instant bot submissions.
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
    if (status.state === 'error' || status.state === 'success') setStatus({ state: 'idle', message: '' })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return // prevents double submits

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0]
      document.getElementById(`contact-${first}`)?.focus()
      return
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      website: honeypotRef.current?.value || '', // honeypot, should stay empty
      startedAt: startedAt.current,
    }

    const signature = `${payload.email}|${payload.message}`
    if (signature === lastSent.current) {
      setStatus({ state: 'error', message: 'You have already sent this message. I will reply as soon as I can.' })
      return
    }

    setStatus({ state: 'sending', message: '' })
    try {
      const res = await sendContactMessage(payload)
      lastSent.current = signature
      setValues(empty)
      setStatus({
        state: 'success',
        message: res?.message || 'Thank you! Your message has been sent. I will get back to you soon.',
      })
    } catch (err) {
      if (err.fields) setErrors(err.fields)
      setStatus({ state: 'error', message: err.message })
    }
  }

  const contactItems = getSocialLinks({ includeWhatsapp: true })
  // <wbr> lets a long email wrap at the "@" instead of mid-word on narrow screens.
  const emailValue = () => {
    const [user, domain] = portfolio.email.split('@')
    return (
      <>
        {user}
        <wbr />@{domain}
      </>
    )
  }

  return (
    <section className="section contact-section" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-info">
          <SectionHeader
            id="contact-title"
            label={portfolio.contact.subheading}
            title={portfolio.contact.heading}
            intro={portfolio.contact.text}
          />
          <Reveal as="ul" className="contact-methods">
            {contactItems.map(({ key, label, href, icon: Icon, external }) => (
              <li key={key}>
                <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="contact-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    <span className="contact-method-label">{label}</span>
                    <span className="contact-method-value">
                      {key === 'email' ? emailValue() : key === 'whatsapp' ? 'Chat on WhatsApp' : 'View profile'}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="contact-form-card">
          <form className="contact-form" onSubmit={onSubmit} noValidate aria-describedby="form-status">
            <div className={`field ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="contact-name">Full Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={LIMITS.name.max}
                value={values.name}
                onChange={onChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                placeholder="Your full name"
                required
              />
              {errors.name && (
                <p className="field-error" id="contact-name-error">
                  <FiAlertCircle aria-hidden="true" /> {errors.name}
                </p>
              )}
            </div>

            <div className={`field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="contact-email">Email Address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={LIMITS.email.max}
                value={values.email}
                onChange={onChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                placeholder="you@example.com"
                required
              />
              {errors.email && (
                <p className="field-error" id="contact-email-error">
                  <FiAlertCircle aria-hidden="true" /> {errors.email}
                </p>
              )}
            </div>

            <div className={`field ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                maxLength={LIMITS.message.max}
                value={values.message}
                onChange={onChange}
                aria-invalid={!!errors.message}
                aria-describedby={`contact-message-count${errors.message ? ' contact-message-error' : ''}`}
                placeholder="Tell me about your project"
                required
              />
              <div className="field-meta">
                {errors.message ? (
                  <p className="field-error" id="contact-message-error">
                    <FiAlertCircle aria-hidden="true" /> {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <span className="char-count" id="contact-message-count">
                  {values.message.length}/{LIMITS.message.max}
                </span>
              </div>
            </div>

            {/* Honeypot: hidden from people, often filled by spam bots. */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input ref={honeypotRef} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={sending} aria-busy={sending}>
              {sending ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  Send Message <FiSend aria-hidden="true" />
                </>
              )}
            </button>

            <div id="form-status" role="status" aria-live="polite">
              {status.state === 'success' && (
                <p className="form-alert form-alert--success">
                  <FiCheckCircle aria-hidden="true" /> {status.message}
                </p>
              )}
              {status.state === 'error' && (
                <p className="form-alert form-alert--error">
                  <FiAlertCircle aria-hidden="true" />
                  <span>
                    {status.message}
                    {portfolio.email && (
                      <>
                        {' '}
                        You can also email me at{' '}
                        <a href={`mailto:${portfolio.email}`}>
                          <HiOutlineMail aria-hidden="true" /> {portfolio.email}
                        </a>
                        .
                      </>
                    )}
                  </span>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
