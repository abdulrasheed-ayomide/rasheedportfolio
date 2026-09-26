import { useEffect, useState } from 'react'
import { FiDownload, FiExternalLink, FiFileText } from 'react-icons/fi'
import usePageMeta from '../hooks/usePageMeta'
import Reveal from '../components/Reveal'
import portfolio from '../config/portfolio'

export default function CV() {
  const { cv, name, title } = portfolio
  usePageMeta({ title: 'CV', description: `Curriculum Vitae of ${name}, ${title}. View online or download as PDF.` })

  // Check that the CV file exists so we can show a friendly message if it is missing.
  const [available, setAvailable] = useState(cv?.file ? null : false) // null = checking
  useEffect(() => {
    if (!cv?.file) return
    let cancelled = false
    fetch(cv.file, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') || ''
        if (!cancelled) setAvailable(r.ok && !type.includes('text/html'))
      })
      .catch(() => !cancelled && setAvailable(false))
    return () => {
      cancelled = true
    }
  }, [cv?.file])

  return (
    <section className="page-hero cv-page" aria-labelledby="cv-title">
      <div className="container">
        <Reveal className="cv-header">
          <p className="section-label">Curriculum Vitae</p>
          <h1 id="cv-title" className="section-title">
            {name}
          </h1>
          <p className="cv-role">{title}</p>
          {cv?.lastUpdated && <p className="muted">Last updated {cv.lastUpdated}</p>}

          {available !== false && (
            <div className="hero-actions">
              <a href={cv.file} download={cv.downloadName} className="btn btn-primary" aria-disabled={available === null}>
                <FiDownload aria-hidden="true" /> Download CV
              </a>
              <a href={cv.file} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <FiExternalLink aria-hidden="true" /> View Online
              </a>
            </div>
          )}
        </Reveal>

        {available === false ? (
          <div className="cv-missing" role="status">
            <FiFileText aria-hidden="true" />
            <h2>CV coming soon</h2>
            <p>The latest CV is being updated. In the meantime, feel free to get in touch.</p>
            <a href="/#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        ) : (
          <Reveal className="cv-viewer">
            <object data={`${cv.file}#view=FitH`} type="application/pdf" aria-label={`${name} CV (PDF)`}>
              <div className="cv-fallback">
                <FiFileText aria-hidden="true" />
                <p>Your browser cannot show the PDF here.</p>
                <a href={cv.file} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Open the CV
                </a>
              </div>
            </object>
          </Reveal>
        )}
      </div>
    </section>
  )
}
