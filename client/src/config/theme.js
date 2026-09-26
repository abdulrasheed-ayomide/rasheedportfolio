/**
 * THEME CONFIGURATION
 * -------------------
 * Change the values here to re-skin the whole portfolio.
 * Every component reads colours, fonts and sizes from CSS variables that
 * are generated from this object, so nothing else needs to be edited.
 *
 * To reuse this portfolio for another developer, the usual change is just:
 *   accent: "#4F46E5"
 */
const theme = {
  colors: {
    bg: '#0A0A0A', // page background
    surface: '#121212', // cards
    surfaceRaised: '#181818', // hovered cards, inputs
    text: '#F5F5F5', // primary text
    muted: '#A3A3A3', // secondary text
    subtle: '#737373', // labels, captions
    border: '#262626', // card and divider borders
    borderStrong: '#3A3A3A',
    accent: '#FFB900', // brand accent
    accentText: '#0A0A0A', // text shown ON the accent colour (buttons)
    success: '#4ADE80',
    danger: '#F87171',
  },
  fonts: {
    body: "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    heading: "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '999px',
  },
  shadows: {
    card: '0 1px 0 rgba(255,255,255,0.03) inset',
    raised: '0 12px 32px rgba(0,0,0,0.45)',
  },
  layout: {
    maxWidth: '1200px',
    gutter: 'clamp(1rem, 4vw, 2rem)',
    sectionSpace: 'clamp(4rem, 9vw, 7rem)',
  },
}

/** Converts "#FFB900" into "255, 185, 0" so we can build translucent tints. */
function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const num = parseInt(full, 16)
  return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`
}

const toKebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)

/** Writes the theme into CSS custom properties on <html>. Called once in main.jsx. */
export function applyTheme(t = theme) {
  const root = document.documentElement.style
  Object.entries(t.colors).forEach(([k, v]) => root.setProperty(`--color-${toKebab(k)}`, v))
  root.setProperty('--color-accent-rgb', hexToRgb(t.colors.accent))
  Object.entries(t.fonts).forEach(([k, v]) => root.setProperty(`--font-${k}`, v))
  Object.entries(t.radius).forEach(([k, v]) => root.setProperty(`--radius-${k}`, v))
  Object.entries(t.shadows).forEach(([k, v]) => root.setProperty(`--shadow-${k}`, v))
  Object.entries(t.layout).forEach(([k, v]) => root.setProperty(`--${toKebab(k)}`, v))
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t.colors.bg)
}

export default theme
