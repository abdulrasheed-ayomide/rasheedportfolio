import nodemailer from 'nodemailer'

/** Sends mail through any SMTP server (Gmail app password, Zoho, Brevo, Mailgun SMTP...). */
export function createSmtpProvider({ host, port, secure, user, pass }) {
  let transporter = null
  const getTransporter = () => {
    if (!transporter) {
      transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user ? { user, pass } : undefined,
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 20000,
      })
    }
    return transporter
  }

  return {
    name: 'smtp',
    isConfigured: () => Boolean(host),
    async send({ from, to, subject, text, html, replyTo }) {
      await getTransporter().sendMail({ from, to, subject, text, html, replyTo })
    },
  }
}
