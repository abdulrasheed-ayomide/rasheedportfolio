import SmartImage from './SmartImage'
import ProjectLinks from './ProjectLinks'
import TechBadges from './TechBadges'
import Reveal from './Reveal'

/** Compact horizontal card used for Selected Projects. */
export default function ProjectRow({ project, index = 0 }) {
  return (
    <Reveal as="article" className="project-row" delay={index * 80} aria-labelledby={`${project.id}-row-title`}>
      <div className="project-row__media">
        <SmartImage src={project.image} alt={project.imageAlt} fallbackLabel={project.name} width="960" height="450" />
      </div>
      <div className="project-row__body">
        <p className="project-category">{project.category}</p>
        <h3 id={`${project.id}-row-title`} className="project-name">
          {project.name}
        </h3>
        <p className="project-desc">{project.description}</p>
        <TechBadges items={project.technologies} />
        <ProjectLinks project={project} />
      </div>
    </Reveal>
  )
}
