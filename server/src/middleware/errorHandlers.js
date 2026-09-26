import logger from '../utils/logger.js'

export function notFound(req, res) {
  res.status(404).json({ success: false, message: 'Not found.' })
}

/** Final error handler. Visitors only ever see a safe message, never a stack trace. */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Malformed JSON or a body that is too large
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid request body.' })
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Your message is too large.' })
  }
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ success: false, message: 'Request not allowed.' })
  }

  logger.error(`${req.method} ${req.originalUrl} failed: ${err.message}`)
  return res.status(500).json({ success: false, message: 'Something went wrong on our side. Please try again later.' })
}
