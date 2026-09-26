/**
 * Run with: npm test
 * Tests that need a database run only when TEST_MONGODB_URI is set, e.g.
 *   TEST_MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_test npm test
 * Never point TEST_MONGODB_URI at your real database: the test collection is cleared.
 */
process.env.NODE_ENV = 'test'
process.env.CONTACT_RATE_MAX = '3'
process.env.CLIENT_URL = 'http://localhost:5173'
process.env.MAIL_PROVIDER = ''

import { test, describe, before, after } from 'node:test'
import assert from 'node:assert/strict'
import request from 'supertest'
import { validateContact } from '../src/validation/contactValidation.js'
import { cleanText } from '../src/utils/sanitize.js'

const { createApp } = await import('../src/app.js')

const valid = () => ({
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello, I would like to discuss a project with you.',
  website: '',
  startedAt: Date.now() - 10000,
})

describe('validation', () => {
  test('accepts a valid message and trims it', () => {
    const r = validateContact({ ...valid(), name: '  Ada   Lovelace ' })
    assert.equal(r.ok, true)
    assert.equal(r.data.name, 'Ada Lovelace')
  })

  test('rejects missing and invalid fields', () => {
    const r = validateContact({ name: 'A', email: 'nope', message: 'short' })
    assert.equal(r.ok, false)
    assert.ok(r.errors.name && r.errors.email && r.errors.message)
  })

  test('rejects object values (NoSQL injection attempt)', () => {
    const r = validateContact({ ...valid(), email: { $gt: '' } })
    assert.equal(r.ok, false)
    assert.ok(r.errors.email)
  })

  test('rejects messages over the maximum length', () => {
    const r = validateContact({ ...valid(), message: 'a'.repeat(2001) })
    assert.equal(r.ok, false)
  })

  test('flags honeypot and too-fast submissions as spam', () => {
    assert.equal(validateContact({ ...valid(), website: 'http://spam' }).spam, true)
    assert.equal(validateContact({ ...valid(), startedAt: Date.now() }).spam, true)
  })

  test('rejects link-stuffed messages', () => {
    const msg = 'buy http://a.com http://b.com http://c.com http://d.com now'
    assert.equal(validateContact({ ...valid(), message: msg }).ok, false)
  })

  test('strips HTML tags and control characters', () => {
    assert.equal(cleanText('<script>alert(1)</script>Hi\u0000 there'), 'alert(1)Hi there')
  })
})

describe('API without a database', () => {
  const app = createApp()

  test('GET /api/health responds', async () => {
    const res = await request(app).get('/api/health')
    assert.equal(res.status, 200)
    assert.equal(res.body.status, 'ok')
  })

  test('invalid body returns 400 with field errors', async () => {
    const res = await request(app).post('/api/contact').send({ name: '', email: 'x', message: '' })
    assert.equal(res.status, 400)
    assert.ok(res.body.errors.email)
  })

  test('malformed JSON returns a safe 400', async () => {
    const res = await request(app).post('/api/contact').set('Content-Type', 'application/json').send('{"name":')
    assert.equal(res.status, 400)
    assert.equal(res.body.stack, undefined)
  })

  test('honeypot submission gets a fake success', async () => {
    const res = await request(app).post('/api/contact').send({ ...valid(), website: 'filled' })
    assert.equal(res.status, 200)
  })

  test('valid message returns 503 when the database is down', async () => {
    const res = await request(app).post('/api/contact').send(valid())
    assert.equal(res.status, 503)
  })

  test('rate limit returns 429 after the configured number of requests', async () => {
    const limited = createApp()
    let last
    for (let i = 0; i < 4; i++) last = await request(limited).post('/api/contact').send({})
    assert.equal(last.status, 429)
  })

  test('disallowed origin is rejected', async () => {
    const res = await request(app).post('/api/contact').set('Origin', 'https://evil.example').send(valid())
    assert.equal(res.status, 403)
  })

  test('unknown routes return 404 JSON', async () => {
    const res = await request(app).get('/api/nope')
    assert.equal(res.status, 404)
  })
})

describe('API with a database', { skip: !process.env.TEST_MONGODB_URI && 'set TEST_MONGODB_URI to run' }, () => {
  let app, ContactMessage, disconnectDB

  before(async () => {
    const db = await import('../src/config/db.js')
    disconnectDB = db.disconnectDB
    await db.connectDB(process.env.TEST_MONGODB_URI)
    ContactMessage = (await import('../src/models/ContactMessage.js')).default
    await ContactMessage.deleteMany({})
    app = createApp()
  })

  after(async () => {
    await ContactMessage.deleteMany({})
    await disconnectDB()
  })

  test('saves a valid message with status "new" and a timestamp', async () => {
    const res = await request(app).post('/api/contact').send(valid())
    assert.equal(res.status, 201)
    const doc = await ContactMessage.findOne({ email: 'ada@example.com' }).lean()
    assert.equal(doc.status, 'new')
    assert.ok(doc.createdAt instanceof Date)
  })

  test('rejects an identical duplicate with 409', async () => {
    const res = await request(app).post('/api/contact').send(valid())
    assert.equal(res.status, 409)
  })
})
