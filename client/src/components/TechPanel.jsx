import technologies, { technologyGroups } from '../data/technologies'

const EXPANDING = 'expanding'

function TechTile({ tech }) {
  const { name, icon: Icon, color } = tech
  return (
    <li className="tech-tile" style={color ? { '--brand': color } : undefined}>
      <span className="tech-tile__icon" aria-hidden="true">
        <Icon />
      </span>
      <span className="tech-tile__name">{name}</span>
    </li>
  )
}

/**
 * Grouped technology icons, driven entirely by data/technologies.js.
 * `title` shows a heading inside the card (used in the Home hero).
 * `headingLevel` keeps the heading order correct wherever it is placed.
 */
export default function TechPanel({ title, headingLevel = 2, className = '' }) {
  const H = `h${headingLevel}`
  const Sub = `h${Math.min(headingLevel + 1, 6)}`
  const groups = technologyGroups
    .map((g) => ({ ...g, items: technologies.filter((t) => t.category === g.id) }))
    .filter((g) => g.items.length)
  const main = groups.filter((g) => g.id !== EXPANDING)
  const expanding = groups.find((g) => g.id === EXPANDING)

  return (
    <div className={`tech-panel ${className}`.trim()}>
      <div className="panel-card">
        {title && (
          <H className="panel-title">
            <span className="panel-bar" aria-hidden="true" />
            {title}
          </H>
        )}
        <div className="tech-groups">
          {main.map(({ id, label, icon: GroupIcon, items }) => (
            <div key={id} className="tech-group">
              <Sub className="tech-group__title">
                {GroupIcon && <GroupIcon aria-hidden="true" />}
                {label}
              </Sub>
              <ul className="tech-grid">
                {items.map((t) => (
                  <TechTile key={`${id}-${t.name}`} tech={t} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {expanding && (
        <div className="panel-card panel-card--expanding">
          <H className="panel-title">
            <span className="panel-bar" aria-hidden="true" />
            {expanding.label}
          </H>
          {expanding.note && <p className="panel-note">{expanding.note}</p>}
          <ul className="tech-chips">
            {expanding.items.map(({ name, icon: Icon, color }) => (
              <li key={name} className="tech-chip" style={color ? { '--brand': color } : undefined}>
                <Icon aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
