import { type ReactNode } from 'react'
import type { Project, ProjectImage } from '@/types'
import { Badge, Button, ProjectGallery } from '@/components/common'
import styles from './FeaturedProjectCard.module.css'

interface FeaturedProjectCardProps {
  project: Project
  index: number
  visual?: ReactNode
  reversed?: boolean
  onOpenGallery?: (images: ProjectImage[], index: number, title: string) => void
}

export function FeaturedProjectCard({
  project,
  index,
  visual,
  reversed = false,
  onOpenGallery,
}: FeaturedProjectCardProps) {
  const indexStr = index < 10 ? `0${index}` : `${index}`
  const gallery = project.assets?.gallery || []
  const hasScreenshots = !!project.assets?.hasRealScreenshots && gallery.length > 0

  return (
    <article
      className={`${styles.featuredCard} ${reversed ? styles.reversed : ''}`}
      aria-labelledby={`featured-${project.id}-title`}
    >
      {/* Information Column */}
      <div className={styles.infoCol}>
        <div className={styles.headerMeta}>
          <span className={styles.indexTag}>{indexStr} // FLAGSHIP ARCHITECTURE</span>
          <span className={styles.categoryTag}>{project.category}</span>
          {project.links?.repoStatus && (
            <span
              className={`${styles.statusBadge} ${
                project.links.repoStatus === 'public'
                  ? styles.statusPublic
                  : styles.statusPrivate
              }`}
            >
              {project.links.repoStatus === 'public' ? '● Public Repo' : '○ Private / Local Build'}
            </span>
          )}
        </div>

        <h3 id={`featured-${project.id}-title`} className={styles.title}>
          {project.title}
        </h3>

        <p className={styles.subtitle}>{project.subtitle}</p>

        {project.platforms && (
          <div className={styles.platformsList} aria-label="Target Platforms">
            {project.platforms.map((platform) => (
              <span key={platform} className={styles.platformBadge}>
                {platform}
              </span>
            ))}
          </div>
        )}

        <p className={styles.description}>{project.description}</p>

        {/* Verified Key Architectural Features */}
        {project.features && project.features.length > 0 && (
          <div className={styles.featuresSection}>
            <span className={styles.featuresHeading}>Core Engineering Highlights</span>
            <ul className={styles.featuresList}>
              {project.features.map((feature) => (
                <li key={feature} className={styles.featureItem}>
                  <span className={styles.featureDot} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Technology Tag Badges */}
        <div className={styles.tags} aria-label="Core technologies">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="moss">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Side-by-Side Action Buttons: GitHub Repository & Demo / Lightbox */}
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
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                style={{ marginRight: '6px' }}
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
            <button
              type="button"
              className={styles.galleryTriggerBtn}
              onClick={() => onOpenGallery(gallery, 0, project.title)}
              data-cursor-text="EXPAND"
            >
              <span>View Gallery ({gallery.length}) ⛶</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Column with Reusable ProjectGallery */}
      <div className={styles.visualCol}>
        <ProjectGallery
          project={project}
          onOpenLightbox={onOpenGallery}
          customSchematicVisual={visual}
        />
      </div>
    </article>
  )
}
