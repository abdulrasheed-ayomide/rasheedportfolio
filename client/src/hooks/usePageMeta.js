import { useEffect } from 'react'
import portfolio from '../config/portfolio'

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector)
  if (el && value) el.setAttribute(attr, value)
}

/** Sets a page-specific <title>, meta description and Open Graph tags. */
export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${portfolio.seo.siteName}` : portfolio.seo.defaultTitle
    const desc = description || portfolio.seo.defaultDescription
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', window.location.href)
  }, [title, description])
}
