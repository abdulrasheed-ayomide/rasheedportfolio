import { FaGithub, FaLinkedinIn, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import portfolio from '../config/portfolio'

/** Builds the list of social links from config, skipping any that are not set. */
export function getSocialLinks({ includeWhatsapp = false } = {}) {
  const { socialLinks, email, whatsapp } = portfolio
  return [
    socialLinks.github && { key: 'github', label: 'GitHub', href: socialLinks.github, icon: FaGithub, external: true },
    socialLinks.linkedin && {
      key: 'linkedin',
      label: 'LinkedIn',
      href: socialLinks.linkedin,
      icon: FaLinkedinIn,
      external: true,
    },
    socialLinks.x && { key: 'x', label: 'X', href: socialLinks.x, icon: FaXTwitter, external: true },
    email && { key: 'email', label: 'Email', href: `mailto:${email}`, icon: HiOutlineMail, external: false },
    includeWhatsapp &&
      whatsapp && { key: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${whatsapp}`, icon: FaWhatsapp, external: true },
  ].filter(Boolean)
}

export default function SocialLinks({ className = '' }) {
  const links = getSocialLinks()
  return (
    <ul className={`social-links ${className}`}>
      {links.map(({ key, label, href, icon: Icon, external }) => (
        <li key={key}>
          <a
            href={href}
            aria-label={`${label}${external ? ' (opens in a new tab)' : ''}`}
            title={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
