import { FiCheck, FiInfo } from 'react-icons/fi'
import usePageMeta from '../hooks/usePageMeta'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import TechBadges from '../components/TechBadges'
import ProjectLinks from '../components/ProjectLinks'
import SelectedProjects from '../components/sections/SelectedProjects'
import { featuredProjects, STATUS_LABELS } from '../data/projects'

function CaseStudy({ project, index }) {
  const reversed = index % 2 === 1
  return (
    <Reveal
      as="article"
      id={project.id}
      className={`case-study ${reversed ? 'case-study--reverse' : ''}`}
      aria-labelledby={`${project.id}-case`}
    >
      <div className="case-study__media">
        <SmartImage
          src={project.image}
          alt={project.imageAlt}
          fallbackLabel={project.name}
          width="960"
          height="600"
          eager={index === 0}
        />
      </div>

      <div className="case-study__body">
        <div className="case-study__meta">
          <p className="project-category">{project.category}</p>
          {project.status && <span className={`status-badge status-${project.status}`}>{STATUS_LABELS[project.status]}</span>}
        </div>
        <h2 id={`${project.id}-case`} className="case-study__title">
          {project.name}
        </h2>
        <p className="case-study__overview">{project.description}</p>
        {project.overview && <p className="muted">{project.overview}</p>}

        {project.highlights?.length > 0 && (
          <div className="case-block">
            <h3>Key features</h3>
            <ul className="check-list">
              {project.highlights.map((h) => (
                <li key={h}>
                  <FiCheck aria-hidden="true" /> {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.technicalDecisions?.length > 0 && (
          <div className="case-block">
            <h3>Technical decisions</h3>
            <ul className="decision-list">
              {project.technicalDecisions.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="case-block">
          <h3>Technologies</h3>
          <TechBadges items={project.technologies} />
        </div>

        {project.role && (
          <p className="case-note">
            <strong>Role:</strong> {project.role}
          </p>
        )}
        {project.note && (
          <p className="case-note">
            <FiInfo aria-hidden="true" /> {project.note}
          </p>
        )}

        <ProjectLinks project={project} size="md" />
      </div>
    </Reveal>
  )
}

export default function Portfolio() {
  usePageMeta({
    title: 'Portfolio',
    description:
      'Featured and selected projects by Rasheed Ayomide: full-stack platforms, a banking application and e-commerce storefronts.',
  })

  return (
    <>
      <section className="page-hero page-hero--compact" aria-labelledby="portfolio-title">
        <div className="container">
          <SectionHeader
            as="h1"
            id="portfolio-title"
            label="Portfolio"
            title={
              <>
                Featured <span className="text-accent">Work</span>
              </>
            }
            intro="A closer look at the projects I have built: what they do, the technology behind them and the decisions that shaped them."
          />
        </div>
      </section>

      <section className="section section--flush-top" aria-label="Featured projects">
        <div className="container case-studies">
          {featuredProjects.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      <SelectedProjects
        title={
          <>
            More <span className="text-accent">Projects</span>
          </>
        }
      />
    </>
  )
}
