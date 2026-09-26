/* Minimal logger. Never pass secrets (API keys, passwords, connection strings) to it. */
const stamp = () => new Date().toISOString()
const silent = process.env.NODE_ENV === 'test'

const logger = {
  info: (...a) => !silent && console.log(`[${stamp()}] INFO `, ...a),
  warn: (...a) => !silent && console.warn(`[${stamp()}] WARN `, ...a),
  error: (...a) => !silent && console.error(`[${stamp()}] ERROR`, ...a),
}

export default logger
