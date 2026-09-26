/** Sends mail through the Resend HTTP API (https://resend.com). No SDK needed. */
export function createResendProvider({ apiKey }) {
  return {
    name: 'resend',
    isConfigured: () => Boolean(apiKey),
    async send({ from, to, subject, text, html, replyTo }) {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 15000)
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to: [to], subject, text, html, reply_to: replyTo }),
          signal: controller.signal,
        })
        if (!res.ok) {
          // Only the status is reported; the API key is never included in errors.
          throw new Error(`Resend responded with status ${res.status}`)
        }
      } finally {
        clearTimeout(timer)
      }
    },
  }
}
