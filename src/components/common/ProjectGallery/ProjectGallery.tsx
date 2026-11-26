import { useState, type ReactNode } from 'react'
import type { Project, ProjectImage } from '@/types'
import styles from './ProjectGallery.module.css'

export interface ProjectGalleryProps {
  project: Project
  onOpenLightbox?: (images: ProjectImage[], index: number, title: string) => void
  customSchematicVisual?: ReactNode
  className?: string
}

export function ProjectGallery({
  project,
  onOpenLightbox,
  customSchematicVisual,
  className = '',
}: ProjectGalleryProps) {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
  const gallery = project.assets?.gallery || []
  const hasScreenshots = !!project.assets?.hasRealScreenshots && gallery.length > 0

  const [activeTab, setActiveTab] = useState<'screenshots' | 'schematic'>(
    hasScreenshots ? 'screenshots' : 'schematic',
  )
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  const activeScreenshot = gallery[activeImageIndex] || gallery[0]
  const currentImgSrc = activeScreenshot?.src
  const isCurrentImgFailed = currentImgSrc ? failedImages[currentImgSrc] : false

  const resolveUrl = (path: string) => {
    if (path.startsWith('http')) return path
    return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`
  }

  const handleImageClick = () => {
    if (!hasScreenshots || isCurrentImgFailed || gallery.length === 0) return
    onOpenLightbox?.(gallery, activeImageIndex, project.title)
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveImageIndex((prev) => (prev + 1) % gallery.length)
  }

  return (
    <div className={`${styles.galleryRoot} ${className}`}>
      {/* Media View Tab Switcher (Visible when screenshots and custom schematic both exist) */}
      {hasScreenshots && customSchematicVisual && (
        <div className={styles.tabBar} role="tablist" aria-label="Media view options">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'screenshots'}
            className={`${styles.tabBtn} ${activeTab === 'screenshots' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('screenshots')}
          >
            Real Screenshots ({gallery.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'schematic'}
            className={`${styles.tabBtn} ${activeTab === 'schematic' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('schematic')}
          >
            Interactive Preview
          </button>
        </div>
      )}

      {/* Active Media Container */}
      {activeTab === 'screenshots' && hasScreenshots && !isCurrentImgFailed && activeScreenshot ? (
        <div className={styles.screenshotFrame}>
          {/* Interactive Clickable Frame with Lightbox Overlay */}
          <div
            className={styles.imageInteractiveWrap}
            onClick={handleImageClick}
            data-cursor-text="EXPAND ⛶"
            tabIndex={0}
            role="button"
            aria-label={`Open fullscreen view of ${activeScreenshot.alt}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleImageClick()
              }
            }}
          >
            <img
              src={resolveUrl(activeScreenshot.src)}
              alt={activeScreenshot.alt}
              className={styles.screenshotImg}
              loading="lazy"
              decoding="async"
              onError={() => {
                if (currentImgSrc) {
                  setFailedImages((prev) => ({ ...prev, [currentImgSrc]: true }))
                }
              }}
            />
            <div className={styles.imageOverlayBadge}>
              <span className={styles.overlayText}>Click to Expand Lightbox ⛶</span>
            </div>
          </div>

          {/* Screenshot Caption, Navigation Dots, and Expand Trigger */}
          <div className={styles.screenshotMeta}>
            <div className={styles.screenshotTitleRow}>
              <span className={styles.screenshotName}>{activeScreenshot.alt}</span>
              <span className={styles.screenshotCounter}>
                0{activeImageIndex + 1} / 0{gallery.length}
              </span>
            </div>

            <div className={styles.screenshotControlsRow}>
              {/* Prev / Next Arrows */}
              {gallery.length > 1 ? (
                <div className={styles.navArrows}>
                  <button
                    type="button"
                    className={styles.navArrowBtn}
                    onClick={handlePrev}
                    aria-label="Previous screenshot"
                    data-cursor-text="PREV"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className={styles.navArrowBtn}
                    onClick={handleNext}
                    aria-label="Next screenshot"
                    data-cursor-text="NEXT"
                  >
                    →
                  </button>
                </div>
              ) : <div />}

              {/* Dot Indicators */}
              {gallery.length > 1 && (
                <div className={styles.dotsList} role="tablist" aria-label="Screenshots">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeImageIndex}
                      aria-label={`Go to screenshot ${idx + 1}`}
                      className={`${styles.dotBtn} ${
                        idx === activeImageIndex ? styles.dotActive : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveImageIndex(idx)
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Direct Fullscreen Button */}
              <button
                type="button"
                className={styles.expandBtn}
                onClick={handleImageClick}
                data-cursor-text="EXPAND"
              >
                Fullscreen ⛶
              </button>
            </div>
          </div>
        </div>
      ) : activeTab === 'schematic' && customSchematicVisual ? (
        <div className={styles.placeholderFrame}>
          {customSchematicVisual}
        </div>
      ) : (
        /* Editorial Architectural Schematic Placeholder (For projects without screenshots or missing files) */
        <div className={styles.placeholderFrame}>
          {/* Header Bar */}
          <div className={styles.placeholderHeader}>
            <span className={styles.badgePending}>
              <span className={styles.pulseDot} aria-hidden="true" />
              ARCHITECTURAL SCHEMATIC // PREVIEW
            </span>
            <span className={styles.pathTag}>{project.category}</span>
          </div>

          {/* Central Architecture Schematic Stage */}
          <div className={styles.schematicStage}>
            <svg
              className={styles.schematicSvg}
              viewBox="0 0 440 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`grad-${project.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#52745A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D9BFA3" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Background Grid Pattern */}
              <g opacity="0.15" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="3 3">
                <line x1="20" y1="20" x2="420" y2="20" />
                <line x1="20" y1="70" x2="420" y2="70" />
                <line x1="20" y1="120" x2="420" y2="120" />
                <line x1="20" y1="170" x2="420" y2="170" />
                <line x1="40" y1="10" x2="40" y2="190" />
                <line x1="140" y1="10" x2="140" y2="190" />
                <line x1="240" y1="10" x2="240" y2="190" />
                <line x1="340" y1="10" x2="340" y2="190" />
              </g>

              {/* Layer 1: Client Node */}
              <rect x="25" y="65" width="105" height="70" rx="8" fill="#1C2319" stroke="#52745A" strokeWidth="1.5" />
              <text x="77" y="93" fill="#D9BFA3" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                CLIENT LAYER
              </text>
              <text x="77" y="112" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" textAnchor="middle" opacity="0.85">
                {project.platforms?.[0] || 'Mobile / Web'}
              </text>

              {/* Vector Connection 1 */}
              <path d="M 130 100 L 165 100" stroke="#52745A" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="165" cy="100" r="3" fill="#D9BFA3" />

              {/* Layer 2: Transport & Logic Controller Node */}
              <rect x="170" y="55" width="115" height="90" rx="8" fill={`url(#grad-${project.id})`} stroke="#D9BFA3" strokeWidth="1.5" />
              <text x="227" y="88" fill="#FFFFFF" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                CORE SYSTEM
              </text>
              <text x="227" y="106" fill="#D9BFA3" fontSize="8.5" fontFamily="monospace" textAnchor="middle">
                {project.tags[0] || 'Logic Loop'}
              </text>
              <text x="227" y="124" fill="#FFFFFF" fontSize="8" fontFamily="sans-serif" textAnchor="middle" opacity="0.8">
                {project.category}
              </text>

              {/* Vector Connection 2 */}
              <path d="M 285 100 L 320 100" stroke="#52745A" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="320" cy="100" r="3" fill="#52745A" />

              {/* Layer 3: Persistence / Sync Layer */}
              <rect x="325" y="65" width="95" height="70" rx="8" fill="#1C2319" stroke="#52745A" strokeWidth="1.5" />
              <text x="372" y="93" fill="#D9BFA3" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                DATA / API
              </text>
              <text x="372" y="112" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif" textAnchor="middle" opacity="0.85">
                {project.tags[1] || 'State & Storage'}
              </text>
            </svg>
          </div>

          {/* Staging Architecture Checklist */}
          {project.assets?.assetChecklist && project.assets.assetChecklist.length > 0 && (
            <div className={styles.stagingSection}>
              <span className={styles.stagingTitle}>Interactive Showcase Checklist</span>
              <ul className={styles.stagingList}>
                {project.assets.assetChecklist.map((item, idx) => (
                  <li key={idx} className={styles.stagingItem}>
                    <span className={styles.stagingIcon} aria-hidden="true">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Directory Guidance Footer */}
          <div className={styles.placeholderFooter}>
            <span className={styles.folderNote}>
              System Architecture Diagram // <span className={styles.folderPath}>{project.title}</span>
            </span>
            <span className={styles.statusIndicator}>● Blueprint Ready</span>
          </div>
        </div>
      )}
    </div>
  )
}

