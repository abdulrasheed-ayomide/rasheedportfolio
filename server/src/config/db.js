import mongoose from 'mongoose'
import env from './env.js'
import logger from '../utils/logger.js'

// Fail fast instead of queueing queries while the database is down.
mongoose.set('bufferCommands', false)
mongoose.set('strictQuery', true)

export function isDbConnected() {
  return mongoose.connection.readyState === 1
}

export async function connectDB(uri = env.mongoUri) {
  if (!uri) {
    logger.warn('MONGODB_URI is not set. The API will run, but contact messages cannot be saved.')
    return false
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
    logger.info('Connected to MongoDB')
    return true
  } catch (err) {
    // Log the reason without printing the connection string (it contains the password).
    logger.error(`Could not connect to MongoDB: ${err.message.replace(uri, '[MONGODB_URI]')}`)
    return false
  }
}

mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'))
mongoose.connection.on('reconnected', () => logger.info('MongoDB reconnected'))

export async function disconnectDB() {
  await mongoose.disconnect()
}
