import { useState } from 'react'

/**
 * Image with lazy loading and a graceful fallback when the file is missing.
 * The fallback shows the project initials instead of a broken image icon.
 */
export default function SmartImage({ src, alt, fallbackLabel = '', className = '', eager = false, width, height }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    const initials = fallbackLabel
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase()
    return (
      <div className={`img-fallback ${className}`} role="img" aria-label={alt || fallbackLabel}>
        <span aria-hidden="true">{initials || '•'}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={width}
      height={height}
      onError={() => setFailed(true)}
    />
  )
}
