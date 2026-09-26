import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import Logo from './Logo'
import navLinks, { contactLink } from './navLinks'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const toggleRef = useRef(null)

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => setOpen(false), [location.pathname, location.hash])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Escape closes the menu; closing the menu at desktop width resets it.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const mq = window.matchMedia('(min-width: 861px)')
    const onResize = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener?.('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener?.('change', onResize)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="nav container" aria-label="Main">
        <Logo onClick={close} />

        <ul className="nav-links">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className="nav-link">
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to={contactLink.to} className="btn btn-primary btn-sm">
              {contactLink.label}
            </Link>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX aria-hidden="true" /> : <HiOutlineMenuAlt3 aria-hidden="true" />}
        </button>
      </nav>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <ul className="container">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} end={l.to === '/'} className="mobile-link" onClick={close}>
                {l.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to={contactLink.to} className="btn btn-primary btn-block" onClick={close}>
              {contactLink.label}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
