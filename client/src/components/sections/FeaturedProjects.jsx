import SectionHeader from '../SectionHeader'
import ProjectCard from '../ProjectCard'
import { featuredProjects } from '../../data/projects'

export default function FeaturedProjects({ label = 'Portfolio', title, intro }) {
  return (
    <section className="section" id="projects" aria-labelledby="featured-title">
      <div className="container">
        <SectionHeader
          id="featured-title"
          label={label}
          title={
            title || (
              <>
                Featured <span className="text-accent">Projects</span>
              </>
            )
          }
          intro={intro || 'A few of the applications I have built, from full-stack platforms to production storefronts.'}
        />
        <div className="project-grid">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
