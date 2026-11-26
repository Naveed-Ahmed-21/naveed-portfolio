import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap, ScrollTrigger, useGSAP, useSmoothScroll } from '@/animations'
import type { Project, ProjectImage } from '@/types'
import { Badge, ProjectGallery } from '@/components/common'
import { LinkBridgeVisual } from './LinkBridgeVisual'
import { FlipverseVisual } from './FlipverseVisual'
import styles from './PinnedShowcase.module.css'

interface PinnedShowcaseProps {
  projects: Project[]
  onOpenGallery?: (images: ProjectImage[], index: number, title: string) => void
}

export function PinnedShowcase({ projects, onOpenGallery }: PinnedShowcaseProps) {
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const [activeSlide, setActiveSlide] = useState(0)
  const { scrollTo } = useSmoothScroll()

  const flagshipProjects = projects.filter((p) => p.featured)

  // GSAP MatchMedia ScrollTrigger for Desktop Kinetic Pinned Track
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion || typeof window === 'undefined') return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (!pinRef.current || !trackRef.current) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top 84px',
            end: '+=100%',
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress
              if (progressBarRef.current) {
                progressBarRef.current.style.width = `${Math.min(100, Math.max(50, 50 + p * 50))}%`
              }
              const isSecond = p > 0.45
              if (counterRef.current) {
                counterRef.current.textContent = isSecond ? '02 / 02' : '01 / 02'
              }
              setActiveSlide((prev) => (prev === (isSecond ? 1 : 0) ? prev : isSecond ? 1 : 0))
            },
          },
        })

        scrollTriggerInstanceRef.current = tl.scrollTrigger || null

        tl.to(trackRef.current, {
          xPercent: -50,
          ease: 'power1.inOut',
        })

        return () => {
          scrollTriggerInstanceRef.current = null
        }
      })

      return () => mm.revert()
    },
    { scope: pinRef },
  )

  // Mobile/Tablet scroll observer to update active pill when unpinned (reactive to resize)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mq = window.matchMedia('(max-width: 1023px)')
    let observer: IntersectionObserver | null = null

    const attach = () => {
      observer?.disconnect()
      if (!mq.matches) return

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = slideRefs.current.indexOf(entry.target as HTMLElement)
              if (idx !== -1) {
                setActiveSlide(idx)
                if (counterRef.current) {
                  counterRef.current.textContent = idx === 1 ? '02 / 02' : '01 / 02'
                }
              }
            }
          })
        },
        { threshold: 0.35 },
      )

      slideRefs.current.forEach((el) => {
        if (el) observer?.observe(el)
      })
    }

    attach()
    mq.addEventListener('change', attach)
    return () => {
      mq.removeEventListener('change', attach)
      observer?.disconnect()
    }
  }, [])

  // Interactive slide jump handler integrated with Lenis
  const handleJumpToSlide = useCallback(
    (index: number) => {
      setActiveSlide(index)

      if (window.innerWidth >= 1024 && scrollTriggerInstanceRef.current) {
        const st = scrollTriggerInstanceRef.current
        const targetScroll =
          index === 0 ? st.start + 6 : st.start + (st.end - st.start) * 0.92
        scrollTo(targetScroll)
      } else {
        const targetEl = slideRefs.current[index]
        if (targetEl) {
          scrollTo(targetEl, { offset: -84 })
        }
      }
    },
    [scrollTo],
  )

  // Allow Craft Lab / Journey project links to target flagship slides directly
  useEffect(() => {
    const onSelectProject = (e: Event) => {
      const customEvent = e as CustomEvent<string>
      const idx = flagshipProjects.findIndex((p) => p.id === customEvent.detail)
      if (idx !== -1) {
        handleJumpToSlide(idx)
      }
    }
    window.addEventListener('showcase-select-project', onSelectProject)
    return () => window.removeEventListener('showcase-select-project', onSelectProject)
  }, [flagshipProjects, handleJumpToSlide])

  return (
    <div id="pinned-showcase" ref={pinRef} className={styles.showcasePinWrapper}>
      {/* Pinned Showcase Headbar with Live Progress Indicator and Nav Pills */}
      <div className={styles.showcaseHeaderBar}>
        <div className={styles.headerLeft}>
          <span className={styles.flagshipPulseDot} aria-hidden="true" />
          <span className={styles.headerLabel}>
            FLAGSHIP ARCHITECTURES // KINETIC SHOWCASE
          </span>
        </div>

        {/* Interactive Quick Navigation Pills */}
        <div className={styles.navPills} role="tablist" aria-label="Flagship projects navigation">
          {flagshipProjects.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={activeSlide === idx}
              tabIndex={0}
              className={`${styles.navPillBtn} ${activeSlide === idx ? styles.navPillActive : ''}`}
              onClick={() => handleJumpToSlide(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleJumpToSlide(idx)
                }
              }}
              data-cursor-text={`GOTO 0${idx + 1}`}
            >
              <span className={styles.navPillIndex}>0{idx + 1}</span>
              <span className={styles.navPillTitle}>{p.title}</span>
            </button>
          ))}
        </div>

        <div className={styles.headerRight}>
          <span ref={counterRef} className={styles.progressCounter}>
            {activeSlide === 1 ? '02 / 02' : '01 / 02'}
          </span>
          <div className={styles.progressTrack} aria-hidden="true">
            <div ref={progressBarRef} className={styles.progressBar} />
          </div>
        </div>
      </div>

      {/* Horizontal Slides Track */}
      <div ref={trackRef} className={styles.slidesTrack}>
        {flagshipProjects.map((project, idx) => {
          const isLinkBridge = project.id === 'linkbridge'
          const visual = isLinkBridge ? <LinkBridgeVisual /> : <FlipverseVisual />
          const isPrivateRepo = project.links?.repoStatus === 'private'

          return (
            <article
              key={project.id}
              ref={(el) => {
                slideRefs.current[idx] = el
              }}
              id={`pinned-slide-${project.id}`}
              className={styles.slide}
              aria-labelledby={`pinned-title-${project.id}`}
            >
              {/* Massive Typographic Watermark in Background */}
              <div className={styles.slideWatermark} aria-hidden="true">
                {isLinkBridge ? 'LINKBRIDGE' : 'FLIPVERSE'}
              </div>

              {/* Information Column */}
              <div className={styles.infoCol}>
                <div className={styles.projectMeta}>
                  <span className={styles.indexPill}>
                    0{idx + 1} // FLAGSHIP SYSTEM
                  </span>
                  <span className={styles.categoryPill}>{project.category}</span>
                  {project.links?.repoStatus && (
                    <span
                      className={`${styles.statusBadge} ${
                        project.links.repoStatus === 'public'
                          ? styles.statusPublic
                          : styles.statusPrivate
                      }`}
                    >
                      {project.links.repoStatus === 'public'
                        ? '● Public Repo'
                        : '○ Private Build'}
                    </span>
                  )}
                </div>

                <h3 id={`pinned-title-${project.id}`} className={styles.projectTitle}>
                  {project.title}
                </h3>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>

                {project.platforms && (
                  <div className={styles.platformsRow} aria-label="Platforms">
                    {project.platforms.map((plat) => (
                      <span key={plat} className={styles.platformTag}>
                        {plat}
                      </span>
                    ))}
                  </div>
                )}

                <p className={styles.projectDescription}>{project.description}</p>

                {/* Core Engineering Highlights */}
                {project.features && project.features.length > 0 && (
                  <div className={styles.featuresWrap}>
                    <span className={styles.featuresTitle}>Core Engineering Highlights</span>
                    <ul className={styles.featuresList}>
                      {project.features.slice(0, 4).map((f) => (
                        <li key={f} className={styles.featureItem}>
                          <span className={styles.featureDot} aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Badges */}
                <div className={styles.tagsRow} aria-label="Core technologies">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="moss">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Direct Action Buttons */}
                <div className={styles.actionsRow}>
                  {project.links?.github && !isPrivateRepo && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.githubBtn}
                      aria-label={`View ${project.title} GitHub repository`}
                      data-cursor-text="GITHUB"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub Repo ↗
                    </a>
                  )}

                  {isPrivateRepo && (
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        scrollTo('#contact', { offset: -76 })
                      }}
                      className={styles.galleryTriggerBtn}
                      aria-label={`Request walkthrough for ${project.title} private repository`}
                      data-cursor-text="REQUEST"
                    >
                      Private Repo · Request Demo →
                    </a>
                  )}

                  {project.assets?.hasRealScreenshots &&
                    project.assets.gallery &&
                    project.assets.gallery.length > 0 &&
                    onOpenGallery && (
                      <button
                        type="button"
                        className={styles.galleryTriggerBtn}
                        onClick={() => {
                          const gallery = project.assets?.gallery
                          if (gallery && gallery.length > 0) {
                            onOpenGallery(gallery, 0, project.title)
                          }
                        }}
                      >
                        View Screenshots ({project.assets.gallery.length}) ⛶
                      </button>
                    )}
                </div>
              </div>

              {/* Visual Showcase Column */}
              <div className={styles.visualCol}>
                <ProjectGallery
                  project={project}
                  onOpenLightbox={onOpenGallery}
                  customSchematicVisual={visual}
                />
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
