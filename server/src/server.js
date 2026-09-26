import env from './config/env.js'
import { connectDB, disconnectDB } from './config/db.js'
import { mailStatus } from './services/mailService.js'
import { createApp } from './app.js'
import logger from './utils/logger.js'

const app = createApp()

// The server starts even if MongoDB is unavailable, so /api/health still answers
// and the contact route can return a clear "temporarily unavailable" message.
await connectDB()

const mailReason = mailStatus()
if (mailReason) logger.warn(`Email notifications are off: ${mailReason}.`)
else logger.info(`Email notifications enabled (${env.mail.provider}).`)

const server = app.listen(env.port, () => {
  logger.info(`API running on http://localhost:${env.port}/api (${env.nodeEnv})`)
  logger.info(`Allowed frontend origins: ${env.clientUrls.join(', ')}`)
})

async function shutdown(signal) {
  logger.info(`${signal} received, shutting down`)
  server.close(async () => {
    await disconnectDB().catch(() => {})
    process.exit(0)
  })
  setTimeout(() => process.exit(1), 10000).unref()
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('unhandledRejection', (err) => logger.error(`Unhandled rejection: ${err?.message || err}`))
