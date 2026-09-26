/** Small technology tags. `max` limits how many show, with a "+N" counter. */
export default function TechBadges({ items = [], max }) {
  const shown = max ? items.slice(0, max) : items
  const extra = items.length - shown.length
  return (
    <ul className="tech-badges" aria-label="Technologies used">
      {shown.map((t) => (
        <li key={t} className="tech-badge">
          {t}
        </li>
      ))}
      {extra > 0 && (
        <li className="tech-badge tech-badge--more" title={items.slice(shown.length).join(', ')}>
          +{extra} more
        </li>
      )}
    </ul>
  )
}
