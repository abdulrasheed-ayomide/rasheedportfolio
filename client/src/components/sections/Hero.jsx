import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'
import SocialLinks from '../SocialLinks'
import portfolio from '../../config/portfolio'

export default function Hero() {
  const { firstName, lastName, title, description, profileImage, profileImageCutout, profileImageAlt } = portfolio
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-greeting">Hi, I&rsquo;m</p>
          <h1 id="hero-title" className="hero-name">
            <span>{firstName}</span> <span className="text-accent">{lastName}</span>
          </h1>
          <p className="hero-role">
            <span className="hero-role-line" aria-hidden="true" />
            {title}
          </p>
          <p className="hero-desc">{description}</p>

          <div className="hero-actions">
            <Link to="/portfolio" className="btn btn-primary">
              View Projects <FiArrowRight aria-hidden="true" />
            </Link>
            <Link to="/#contact" className="btn btn-outline">
              Contact Me
            </Link>
          </div>

          <SocialLinks className="hero-social" />
        </div>

        <div className="hero-visual">
          <div className={`hero-photo ${profileImageCutout ? 'hero-photo--cutout' : ''}`}>
            <img src={profileImage} alt={profileImageAlt} width="640" height="800" fetchPriority="high" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
}
