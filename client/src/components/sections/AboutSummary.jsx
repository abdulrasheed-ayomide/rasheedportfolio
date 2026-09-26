import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import SectionHeader from '../SectionHeader'
import Reveal from '../Reveal'
import portfolio from '../../config/portfolio'

export default function AboutSummary() {
  const { about } = portfolio
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <SectionHeader id="about-title" label="About Me" title={about.statement} />
        <Reveal className="about-body">
          {about.summary.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <ul className="focus-list" aria-label="Areas of focus">
            {about.focus.map((f) => (
              <li key={f}>
                <FiCheck aria-hidden="true" /> {f}
              </li>
            ))}
          </ul>
          <Link to="/about" className="text-link">
            More about me <FiArrowRight aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
