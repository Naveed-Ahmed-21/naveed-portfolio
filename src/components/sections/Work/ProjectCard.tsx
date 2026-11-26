import { useState } from 'react'
import type { Project, ProjectImage } from '@/types'
import { Badge, Button } from '@/components/common'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  index: number
  onOpenGallery?: (images: ProjectImage[], index: number, title: string) => void
}

export function ProjectCard({ project, index, onOpenGallery }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false)
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
  const indexStr = index < 10 ? `0${index}` : `${index}`

  const hasScreenshots = !!project.assets?.hasRealScreenshots && (project.assets.gallery?.length || 0) > 0
  const coverSrc = project.assets?.cover
    ? project.assets.cover.startsWith('http')
      ? project.assets.cover
      : `${baseUrl}${project.assets.cover.startsWith('/') ? '' : '/'}${project.assets.cover}`
    : ''
  const folder = project.assets?.folder || project.slug

  const handleImageClick = () => {
    if (hasScreenshots && project.assets?.gallery && onOpenGallery) {
      onOpenGallery(project.assets.gallery, 0, project.title)
    }
  }

  return (
    <article
      className={styles.card}
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Media Top: Real Screenshot or Architecture Staging Placeholder */}
      {hasScreenshots && coverSrc && !imgError ? (
        <div
          className={styles.mediaFrame}
          onClick={handleImageClick}
          data-cursor-text="EXPAND ⛶"
          role="button"
          tabIndex={0}
          aria-label={`Open screenshot gallery for ${project.title}`}
          onKeyDown={(e) => e.key === 'Enter' && handleImageClick()}
        >
          <img
            src={coverSrc}
            alt={project.title}
            className={styles.mediaImg}
            onError={() => setImgError(true)}
          />
          <div className={styles.mediaBadge}>
            <span>{project.assets?.gallery?.length || 1} Screenshots · Click to Expand ⛶</span>
          </div>
        </div>
      ) : project.assets?.assetChecklist ? (
        <div className={styles.checklistFrame}>
          <div className={styles.checklistHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className={styles.checklistDot} />
              <span className={styles.checklistLabel}>Architecture Schematic</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#D9BFA3' }}>
              public/assets/projects/{folder}/
            </span>
          </div>
          <ul className={styles.checklistItems}>
            {project.assets.assetChecklist.map((item) => (
              <li key={item} className={styles.checklistItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Card Header Metadata */}
      <div className={styles.cardHeader}>
        <div className={styles.metaRow}>
          <span className={styles.index}>{indexStr} // SYS</span>
          <span className={styles.category}>{project.category}</span>
        </div>

        {project.platforms && project.platforms.length > 0 && (
          <div className={styles.platforms}>
            {project.platforms.map((p) => (
              <span key={p} className={styles.platformPill}>
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className={styles.body}>
        <h4 id={`project-${project.id}-title`} className={styles.title}>
          {project.title}
        </h4>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <p className={styles.description}>{project.description}</p>

        {project.features && project.features.length > 0 && (
          <ul className={styles.featuresList}>
            {project.features.map((feature) => (
              <li key={feature} className={styles.featureItem}>
                <span className={styles.featureDot} aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Card Footer with Tags and Action Buttons */}
      <div className={styles.cardFooter}>
        <div className={styles.tags} aria-label="Technologies used">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="moss">
              {tag}
            </Badge>
          ))}
        </div>

        <div className={styles.actions}>
          {project.links?.github && (
            <Button
              href={project.links.github}
              variant="primary"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} GitHub repository`}
              data-cursor-text="GITHUB"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ marginRight: '5px' }}
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub Repository ↗
            </Button>
          )}

          {project.links?.live && (
            <Button
              href={project.links.live}
              variant="outline"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-text="LIVE DEMO"
            >
              Live Demo ↗
            </Button>
          )}

          {hasScreenshots && onOpenGallery && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleImageClick}
              data-cursor-text="EXPAND"
            >
              Gallery ⛶
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
