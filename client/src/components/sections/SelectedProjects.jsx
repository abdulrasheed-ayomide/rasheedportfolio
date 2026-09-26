import { FiGithub, FiArrowUpRight } from 'react-icons/fi'
import SectionHeader from '../SectionHeader'
import ProjectRow from '../ProjectRow'
import Reveal from '../Reveal'
import { selectedProjects } from '../../data/projects'
import portfolio from '../../config/portfolio'

export default function SelectedProjects({ title }) {
  if (!selectedProjects.length) return null
  return (
    <section className="section section--tight" aria-labelledby="selected-title">
      <div className="container">
        <SectionHeader
          id="selected-title"
          label="More work"
          title={
            title || (
              <>
                Selected <span className="text-accent">Projects</span>
              </>
            )
          }
        />
        <div className="project-rows">
          {selectedProjects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
        {portfolio.moreProjectsUrl && (
          <Reveal className="more-projects">
            <a
              href={portfolio.moreProjectsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              aria-label="View more projects on GitHub (opens in a new tab)"
            >
              <FiGithub aria-hidden="true" /> View More Projects <FiArrowUpRight aria-hidden="true" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
