import { useRef, useEffect } from 'react'
import { gsap, useGSAP } from '@/animations'
import { journeyData } from '@/data'
import { Container } from '@/components/common'
import {
  AcademicBlueprintScene,
  MobileSandboxScene,
  CoordinationNetworkScene,
  SystemsArchitectureScene,
} from './JourneyMilestoneScenes'
import styles from './JourneySection.module.css'

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const journeyPathRef = useRef<SVGPathElement>(null)
  const journeyTrackRef = useRef<HTMLDivElement>(null)

  // Order milestones in natural engineering narrative sequence:
  // 1. Education (Undergraduate Computing Core)
  // 2. Internship (Mobile Engineering Practice)
  // 3. Leadership (Multi-Track Technical Coordination)
  // 4. Engineering (Continuous Systems Architecture)
  const orderedMilestones = [
    journeyData.find((m) => m.id === 'btech-it') || journeyData[2],
    journeyData.find((m) => m.id === 'sdlc-internship') || journeyData[0],
    journeyData.find((m) => m.id === 'hackxpo-coordination') || journeyData[1],
    journeyData.find((m) => m.id === 'project-engineering') || journeyData[3],
  ].filter(Boolean)

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) {
        if (journeyPathRef.current) {
          gsap.set(journeyPathRef.current, { strokeDashoffset: 0 })
        }
        return
      }

      // 1. Scrubbed SVG Signal Conduit Path Draw
      if (journeyPathRef.current && journeyTrackRef.current) {
        gsap.fromTo(
          journeyPathRef.current,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: journeyTrackRef.current,
              start: 'top 75%',
              end: 'bottom 85%',
              scrub: 0.6,
            },
          },
        )
      }

      // 2. Individual Milestone Scene Entrances
      const milestoneItems = journeyTrackRef.current?.querySelectorAll(
        `.${styles.milestoneItem}`,
      )

      if (milestoneItems && milestoneItems.length > 0) {
        milestoneItems.forEach((item) => {
          const content = item.querySelector(`.${styles.milestoneContent}`)
          const scene = item.querySelector(`.${styles.sceneWrapper}`)
          const beacon = item.querySelector(`.${styles.waypointBeacon}`)

          if (beacon) {
            gsap.from(beacon, {
              scale: 0.4,
              opacity: 0.3,
              duration: 0.6,
              ease: 'back.out(2)',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true,
              },
            })
          }

          if (content) {
            gsap.from(content, {
              y: 35,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true,
              },
            })
          }

          if (scene) {
            gsap.from(scene, {
              y: 40,
              opacity: 0,
              duration: 0.85,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                once: true,
              },
            })
          }
        })
      }
    },
    { scope: sectionRef },
  )

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.inView = entry.isIntersecting ? 'true' : 'false'
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const renderMilestoneScene = (id: string, milestone: (typeof orderedMilestones)[0]) => {
    switch (id) {
      case 'btech-it':
        return <AcademicBlueprintScene milestone={milestone} />
      case 'sdlc-internship':
        return <MobileSandboxScene milestone={milestone} />
      case 'hackxpo-coordination':
        return <CoordinationNetworkScene milestone={milestone} />
      case 'project-engineering':
        return <SystemsArchitectureScene milestone={milestone} />
      default:
        return null
    }
  }

  return (
    <section id="experience" ref={sectionRef} className={styles.journeySection} aria-label="Engineering Journey">
      {/* Background Ambience & Engineering Rulers */}
      <div className={styles.journeyBackground} aria-hidden="true">
        <div className={styles.rulerLineTop} />
        <div className={styles.rulerLineBottom} />
      </div>

      <Container>
        {/* Section Header */}
        <header className={styles.journeyHeader}>
          <div className={styles.headerMeta}>
            <span className={styles.headerIndex}>04 // ENGINEERING PATH</span>
            <span className={styles.signalStatus}>
              <span className={styles.signalDot} />
              CONTINUOUS SIGNAL CONDUIT · 4 STATIONS
            </span>
          </div>

          <h2 className={styles.sectionTitle}>
            From Computing Foundations to Applied Systems
          </h2>
          <p className={styles.sectionDesc}>
            A continuous engineering journey traversing undergraduate computing coursework at GCE Erode,
            a hands-on mobile app development internship at SDLC Madurai, HackXpo &apos;26 student project
            coordination, and ongoing independent software projects.
          </p>
        </header>

        {/* Continuous Visual Journey Track */}
        <div ref={journeyTrackRef} className={styles.journeyTrack}>
          {/* Continuous SVG Signal Conduit Spine */}
          <div className={styles.conduitSpine} aria-hidden="true">
            <svg
              className={styles.conduitSvg}
              viewBox="0 0 24 1000"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Ghost Rail Line */}
              <line
                x1="12"
                y1="0"
                x2="12"
                y2="1000"
                stroke="rgba(82, 116, 90, 0.15)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Active Animated Signal Conduit */}
              <path
                ref={journeyPathRef}
                d="M 12,0 L 12,1000"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>
          </div>

          {/* Milestones Stack */}
          <div className={styles.milestonesList}>
            {orderedMilestones.map((item, index) => {
              const isEven = index % 2 === 1
              const milestoneNumber = `0${index + 1}`

              return (
                <article
                  key={item.id}
                  className={`${styles.milestoneItem} ${isEven ? styles.milestoneReverse : ''}`}
                  aria-labelledby={`milestone-${item.id}-heading`}
                >
                  {/* Waypoint Conduit Node */}
                  <div className={styles.waypointNode} aria-hidden="true">
                    <div className={styles.waypointBeacon}>
                      <span className={styles.waypointPulse} />
                      <span className={styles.waypointDot} />
                    </div>
                    <span className={styles.waypointTag}>{milestoneNumber}</span>
                  </div>

                  {/* Editorial Milestone Narrative Box */}
                  <div className={styles.milestoneContent}>
                    <div className={styles.metaRow}>
                      <span className={styles.milestoneTypeBadge}>{item.type.toUpperCase()}</span>
                      <span className={styles.periodBadge}>{item.period}</span>
                      {item.location && <span className={styles.locationPill}>{item.location}</span>}
                    </div>

                    <div className={styles.titleGroup}>
                      <h3 id={`milestone-${item.id}-heading`} className={styles.milestoneTitle}>
                        {item.title}
                      </h3>
                      <h4 className={styles.organizationTitle}>{item.organization}</h4>
                    </div>

                    <p className={styles.milestoneDescription}>{item.description}</p>

                    {/* Key Responsibilities & Outcomes */}
                    {item.focusAreas && item.focusAreas.length > 0 && (
                      <div className={styles.responsibilitiesBox}>
                        <span className={styles.responsibilitiesLabel}>Key Outcomes &amp; Practice:</span>
                        <ul className={styles.responsibilitiesList}>
                          {item.focusAreas.map((focus) => (
                            <li key={focus} className={styles.responsibilityItem}>
                              <span className={styles.resDot} aria-hidden="true" />
                              <span>{focus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Tag Group */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className={styles.technologiesRow} aria-label="Key competencies">
                        {item.technologies.map((tech) => (
                          <span key={tech} className={styles.techBadge}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bespoke Visual Scene Environment */}
                  <div className={styles.sceneWrapper}>
                    {renderMilestoneScene(item.id, item)}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
