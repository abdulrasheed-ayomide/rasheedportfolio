/**
 * API client. The base URL comes from VITE_API_URL (see .env.example),
 * so no server address is hardcoded in components.
 */
const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '')
const TIMEOUT_MS = 15000

export class ApiError extends Error {
  constructor(message, { status = 0, fields = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fields = fields
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  let res
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new ApiError('The request took too long. Please check your connection and try again.')
    }
    throw new ApiError('Could not reach the server. Please check your connection or try again shortly.')
  } finally {
    clearTimeout(timer)
  }

  let data = null
  try {
    data = await res.json()
  } catch {
    // Non-JSON response (e.g. a proxy error page). Handled below.
  }

  if (!res.ok) {
    const fallback =
      res.status === 429
        ? 'Too many messages were sent from your connection. Please wait a few minutes and try again.'
        : res.status >= 500
          ? 'The message service is temporarily unavailable. Please try again later.'
          : 'Something went wrong. Please check the form and try again.'
    throw new ApiError(data?.message || fallback, { status: res.status, fields: data?.errors || null })
  }

  return data
}

export function sendContactMessage(payload) {
  return request('/contact', { method: 'POST', body: payload })
}
