/**
 * Input sanitising helpers.
 * - Only plain strings are accepted (objects like { "$gt": "" } are rejected
 *   by validation, which blocks NoSQL operator injection).
 * - HTML tags and control characters are stripped before saving.
 */

// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
const TAGS = /<\/?[a-z][^>]*>/gi

export function cleanText(value, { multiline = false } = {}) {
  if (typeof value !== 'string') return ''
  let out = value.normalize('NFC').replace(CONTROL_CHARS, '').replace(TAGS, '')
  out = multiline
    ? out.replace(/\r\n?/g, '\n').replace(/[ \t]+\n/g, '\n').replace(/\n{4,}/g, '\n\n\n')
    : out.replace(/\s+/g, ' ')
  return out.trim()
}

/** Escapes text for safe inclusion in an HTML email. */
export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
