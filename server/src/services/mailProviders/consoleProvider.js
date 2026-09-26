import logger from '../../utils/logger.js'

/** Development provider: prints the email to the terminal instead of sending it. */
export function createConsoleProvider() {
  return {
    name: 'console',
    isConfigured: () => true,
    async send({ to, subject, text }) {
      logger.info(`[mail:console] To: ${to}\nSubject: ${subject}\n\n${text}\n`)
    },
  }
}
