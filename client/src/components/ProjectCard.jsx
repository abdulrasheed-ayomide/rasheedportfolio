import SmartImage from './SmartImage'
import ProjectLinks from './ProjectLinks'
import TechBadges from './TechBadges'
import Reveal from './Reveal'
import { STATUS_LABELS } from '../data/projects'

/** Large card used for Featured Projects. */
export default function ProjectCard({ project, index = 0 }) {
  return (
    <Reveal as="article" className="project-card" delay={index * 80} aria-labelledby={`${project.id}-title`}>
      <div className="project-card__media">
        <SmartImage src={project.image} alt={project.imageAlt} fallbackLabel={project.name} width="960" height="600" />
        {project.status && <span className={`status-badge status-${project.status}`}>{STATUS_LABELS[project.status]}</span>}
      </div>
      <div className="project-card__body">
        <p className="project-category">{project.category}</p>
        <h3 id={`${project.id}-title`} className="project-name">
          {project.name}
        </h3>
        <p className="project-desc">{project.description}</p>
        <TechBadges items={project.technologies} max={5} />
        <ProjectLinks project={project} />
      </div>
    </Reveal>
  )
}
