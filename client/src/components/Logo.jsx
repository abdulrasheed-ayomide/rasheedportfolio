import { Link } from 'react-router-dom'
import portfolio from '../config/portfolio'

export default function Logo({ onClick }) {
  return (
    <Link to="/" className="logo" onClick={onClick} aria-label={`${portfolio.name}, home`}>
      <span className="logo-mark" aria-hidden="true">
        {portfolio.initials}
      </span>
      <span className="logo-name">{portfolio.name}</span>
    </Link>
  )
}
