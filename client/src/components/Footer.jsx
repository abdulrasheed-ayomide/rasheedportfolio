import { Link } from 'react-router-dom'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import navLinks, { contactLink } from './navLinks'
import portfolio from '../config/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p className="footer-title">{portfolio.title}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer-links">
            {[...navLinks, contactLink].map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks className="footer-social" />
      </div>
      <div className="container footer-bottom">
        <p>
          © {year} {portfolio.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
