import SectionHeader from '../SectionHeader'
import Reveal from '../Reveal'
import technologies, { technologyGroups } from '../../data/technologies'

export default function Technologies({ label = 'Skills' }) {
  const groups = technologyGroups
    .map((g) => ({ ...g, items: technologies.filter((t) => t.category === g.id) }))
    .filter((g) => g.items.length)

  return (
    <section className="section" id="technologies" aria-labelledby="tech-title">
      <div className="container">
        <SectionHeader
          id="tech-title"
          label={label}
          title={
            <>
              Technologies I <span className="text-accent">Work With</span>
            </>
          }
        />
        <Reveal className="tech-card">
          {groups.map((g) => (
            <div key={g.id} className={`tech-group ${g.id === 'expanding' ? 'tech-group--expanding' : ''}`}>
              <h3 className="tech-group__title">{g.label}</h3>
              {g.note && <p className="tech-group__note">{g.note}</p>}
              <ul className="tech-list">
                {g.items.map(({ name, icon: Icon, color }) => (
                  <li key={name} className="tech-item" style={color ? { '--brand': color } : undefined}>
                    <Icon aria-hidden="true" className="tech-icon" />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
