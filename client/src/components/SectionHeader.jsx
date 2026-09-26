import Reveal from './Reveal'

/** Consistent section label + heading + optional intro. */
export default function SectionHeader({ label, title, intro, id, align = 'left', as: Heading = 'h2' }) {
  return (
    <Reveal className={`section-header section-header--${align}`}>
      {label && <p className="section-label">{label}</p>}
      <Heading className="section-title" id={id}>
        {title}
      </Heading>
      {intro && <p className="section-intro">{intro}</p>}
    </Reveal>
  )
}
