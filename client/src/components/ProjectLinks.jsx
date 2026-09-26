import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { STATUS_LABELS } from '../data/projects'

/**
 * "View Project" + "GitHub" buttons. Missing links are simply not shown;
 * if a project has no links at all, its status label is shown instead.
 */
export default function ProjectLinks({ project, size = 'sm' }) {
  const { liveUrl, githubUrl, name, status } = project
  if (!liveUrl && !githubUrl) {
    return <p className="project-no-links">{STATUS_LABELS[status] || 'Links coming soon'}</p>
  }
  return (
    <div className="project-links">
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary btn-${size}`}
          aria-label={`View ${name} live (opens in a new tab)`}
        >
          View Project <FiArrowUpRight aria-hidden="true" />
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-outline btn-${size}`}
          aria-label={`${name} source code on GitHub (opens in a new tab)`}
        >
          <FiGithub aria-hidden="true" /> GitHub
        </a>
      )}
    </div>
  )
}
