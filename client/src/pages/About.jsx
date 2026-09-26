import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiBookOpen } from 'react-icons/fi'
import usePageMeta from '../hooks/usePageMeta'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import Technologies from '../components/sections/Technologies'
import portfolio from '../config/portfolio'

export default function About() {
  const { about, name, title } = portfolio
  usePageMeta({ title: 'About', description: `About ${name}, ${title}. Development approach, technologies and education.` })

  return (
    <>
      <section className="page-hero" aria-labelledby="about-page-title">
        <div className="container page-hero__grid">
          <SectionHeader as="h1" id="about-page-title" label="About Me" title={about.statement} />
          <Reveal className="about-body">
            <p className="lead">
              I&rsquo;m {name}, a {title}.
            </p>
            {about.summary.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeader id="approach-title" label="How I work" title="Development approach" />
          <ol className="approach-grid">
            {about.approach.map((a, i) => (
              <Reveal as="li" key={a.title} className="approach-card" delay={i * 80}>
                <span className="approach-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="focus-title">
        <div className="container about-grid">
          <SectionHeader id="focus-title" label="Professional focus" title="What I concentrate on" />
          <Reveal>
            <ul className="focus-list">
              {about.focus.map((f) => (
                <li key={f}>
                  <FiCheck aria-hidden="true" /> {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Technologies label="Toolkit" />

      {about.education?.length > 0 && (
        <section className="section section--tight" aria-labelledby="education-title">
          <div className="container">
            <SectionHeader id="education-title" label="Education" title="Education" />
            <div className="education-list">
              {about.education.map((e) => (
                <Reveal as="article" key={e.school + e.qualification} className="education-card">
                  <span className="education-icon" aria-hidden="true">
                    <FiBookOpen />
                  </span>
                  <div>
                    <h3>{e.qualification}</h3>
                    <p className="education-school">{e.school}</p>
                    {e.period && <p className="education-period">{e.period}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--tight">
        <div className="container">
          <Reveal className="cta-card">
            <h2>Have a project in mind?</h2>
            <div className="cta-actions">
              <Link to="/#contact" className="btn btn-primary">
                Contact Me <FiArrowRight aria-hidden="true" />
              </Link>
              <Link to="/portfolio" className="btn btn-outline">
                View Portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
