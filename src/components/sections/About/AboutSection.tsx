import { useRef, useState, useCallback, useEffect } from 'react'
import { gsap, useGSAP, useSmoothScroll } from '@/animations'
import { getAssetUrl } from '@/utils/assets'
import { Container } from '@/components/common'
import styles from './AboutSection.module.css'

interface TechnicalAnnotation {
  id: string
  label: string
  value: string
  detail: string
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
}

const TECHNICAL_ANNOTATIONS: TechnicalAnnotation[] = [
  {
    id: 'sys',
    label: 'DEV_ENV // OS',
    value: 'Linux x86_64',
    detail: 'Linux Workflow & Socket Tooling',
    position: 'topLeft',
  },
  {
    id: 'foundation',
    label: 'ACADEMICS // DEGREE',
    value: 'B.Tech IT ’26',
    detail: 'Final-Year · Computing Core',
    position: 'topRight',
  },
  {
    id: 'mobile',
    label: 'SPECIALIZATION',
    value: 'Flutter & Dart',
    detail: 'Mobile Apps & Reactive UI',
    position: 'bottomLeft',
  },
  {
    id: 'sync',
    label: 'CONNECTIVITY',
    value: 'Socket & Web',
    detail: 'Cross-Device Local Bridges',
    position: 'bottomRight',
  },
]

interface EngineeringPrinciple {
  number: string
  title: string
  statement: string
  elaboration: string
}

const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    number: '01',
    title: 'BUILD TO UNDERSTAND',
    statement: 'I learn technologies by turning ideas into working software, not just following tutorials.',
    elaboration:
      'Every library, protocol, and architecture pattern is mastered through concrete implementation. Understanding comes from resolving real compiler errors, debugging socket handshakes, and deploying software that runs in user hands.',
  },
  {
    number: '02',
    title: 'THINK BEYOND THE SCREEN',
    statement:
      'I explore mobile, desktop, backend, and connectivity systems instead of treating applications as isolated interfaces.',
    elaboration:
      'Software exists in a connected multi-device ecosystem. A mobile application gains immense utility when it pairs directly with a Linux desktop daemon over local sockets, or synchronizes dining pre-orders in real time with kitchen displays.',
  },
  {
    number: '03',
    title: 'ITERATE UNTIL IT WORKS',
    statement:
      'I test, debug, revisit decisions, and refine implementations rather than stopping at a prototype.',
    elaboration:
      'Engineering clarity comes through disciplined iteration: improving UI responsiveness, preventing state leaks, tuning interactive motion, and building reliable cross-device software.',
  },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const portraitStageRef = useRef<HTMLDivElement>(null)
  const portraitFrameRef = useRef<HTMLDivElement>(null)
  const portraitImageRef = useRef<HTMLImageElement>(null)
  const annotationsRef = useRef<HTMLDivElement>(null)
  const narrativeRef = useRef<HTMLDivElement>(null)
  const principlesRef = useRef<HTMLDivElement>(null)
  const snapshotRef = useRef<HTMLDivElement>(null)

  const [activePrinciple, setActivePrinciple] = useState<string>('01')
  const { scrollTo } = useSmoothScroll()
  const portraitSrc = getAssetUrl('/images/portrait-cinematic.png')

  // Mouse tilt effect for desktop portrait (disabled on touch and reduced motion)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitFrameRef.current || typeof window === 'undefined') return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    ) {
      return
    }
    const rect = portraitFrameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

    portraitFrameRef.current.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
    portraitFrameRef.current.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!portraitFrameRef.current) return
    portraitFrameRef.current.style.setProperty('--tilt-x', '0deg')
    portraitFrameRef.current.style.setProperty('--tilt-y', '0deg')
  }, [])

  // Suspend offscreen effects
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          el.dataset.inView = entry.isIntersecting ? 'true' : 'false'
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) return

      // 1. Oversized Masked Headline Reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(`.${styles.headlineWord}`)
        if (words.length > 0) {
          gsap.fromTo(
            words,
            { yPercent: 110, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.05,
              ease: 'power3.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: headlineRef.current,
                start: 'top 92%',
                once: true,
              },
            },
          )
        }
      }

      // 2. Layered Portrait Frame Entrance & Parallax
      if (portraitStageRef.current && portraitImageRef.current) {
        gsap.fromTo(
          portraitStageRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: portraitStageRef.current,
              start: 'top 90%',
              once: true,
            },
          },
        )

        gsap.to(portraitImageRef.current, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: portraitStageRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // 3. Technical Annotations Progressive Entrance
      if (annotationsRef.current) {
        const chips = annotationsRef.current.children
        if (chips.length > 0) {
          gsap.fromTo(
            chips,
            { scale: 0.88, opacity: 0, y: 20 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.12,
              ease: 'back.out(1.5)',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: annotationsRef.current,
                start: 'top 90%',
                once: true,
              },
            },
          )
        }
      }

      // 4. Narrative Column Reveal
      if (narrativeRef.current) {
        gsap.fromTo(
          narrativeRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: narrativeRef.current,
              start: 'top 90%',
              once: true,
            },
          },
        )
      }

      // 5. Engineering Principles Reveal
      if (principlesRef.current) {
        const items = principlesRef.current.querySelectorAll(`.${styles.principleItem}`)
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: 'power2.out',
              clearProps: 'transform,opacity',
              scrollTrigger: {
                trigger: principlesRef.current,
                start: 'top 92%',
                once: true,
              },
            },
          )
        }
      }

      // 6. Developer Snapshot Reveal
      if (snapshotRef.current) {
        gsap.fromTo(
          snapshotRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: 'power2.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: snapshotRef.current,
              start: 'top 92%',
              once: true,
            },
          },
        )
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      className={styles.aboutSection}
      aria-label="Developer Identity — Naveed Ahmed K"
      data-in-view="true"
    >
      {/* Background Blueprint Construction Lines */}
      <div className={styles.blueprintBackdrop} aria-hidden="true">
        <div className={styles.gridLineH1} />
        <div className={styles.gridLineH2} />
        <div className={styles.gridLineV1} />
        <div className={styles.gridLineV2} />
      </div>

      <Container>
        {/* Section Top Header & Identity Metadata */}
        <header className={styles.sectionHeader}>
          <div className={styles.metaRow}>
            <div className={styles.metaLeft}>
              <span className={styles.metaIndex}>03 // DEVELOPER IDENTITY</span>
              <span className={styles.metaDivider}>/</span>
              <span className={styles.metaIdentity}>SYS_ID // NAVEED_AHMED_K</span>
            </div>
            <div className={styles.metaRight}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusText}>RUNTIME // LINUX x86_64</span>
              <span className={styles.coordsText}>TAMIL NADU, INDIA · GCE ERODE</span>
            </div>
          </div>

          {/* Oversized Masked Editorial Headline */}
          <div ref={headlineRef} className={styles.headlineWrapper}>
            <h2 className={styles.headlineTitle}>
              <span className={styles.headlineRow}>
                <span className={styles.headlineWord}>I</span>{' '}
                <span className={styles.headlineWord}>THINK</span>{' '}
                <span className={styles.headlineWord}>IN</span>{' '}
                <span className={`${styles.headlineWord} ${styles.headlineHighlight}`}>SYSTEMS.</span>
              </span>
              <span className={styles.headlineRow}>
                <span className={styles.headlineWord}>I</span>{' '}
                <span className={styles.headlineWord}>BUILD</span>{' '}
                <span className={styles.headlineWord}>IN</span>{' '}
                <span className={`${styles.headlineWord} ${styles.headlineHighlight}`}>INTERFACES.</span>
              </span>
            </h2>
          </div>

          <p className={styles.headlineSubtitle}>
            An engineer&apos;s approach to bridging responsive cross-platform mobile applications, Linux
            desktop socket utilities, and structured full-stack web platforms.
          </p>
        </header>

        {/* Asymmetrical Editorial Composition */}
        <div className={styles.editorialGrid}>
          {/* Left Column: Architectural Portrait Frame & Depth Layers */}
          <div className={styles.portraitColumn}>
            <div
              ref={portraitStageRef}
              className={styles.portraitStage}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Offset Geometric Underlay for Architectural Depth */}
              <div className={styles.offsetFrameUnderlay} aria-hidden="true" />

              {/* Main Architectural Portrait Frame */}
              <div ref={portraitFrameRef} className={styles.portraitFrame}>
                {/* Precision Corner Brackets */}
                <div className={`${styles.cornerBracket} ${styles.topLeft}`} aria-hidden="true" />
                <div className={`${styles.cornerBracket} ${styles.topRight}`} aria-hidden="true" />
                <div className={`${styles.cornerBracket} ${styles.bottomLeft}`} aria-hidden="true" />
                <div className={`${styles.cornerBracket} ${styles.bottomRight}`} aria-hidden="true" />

                {/* Frame Header Status Bar */}
                <div className={styles.frameHeaderBar}>
                  <div className={styles.frameStatusLeft}>
                    <span className={styles.pulseIndicator} aria-hidden="true" />
                    <span className={styles.frameStatusText}>DEV_ID // NAVEED AHMED K</span>
                  </div>
                  <span className={styles.frameStatusTag}>AUTHENTIC PORTRAIT</span>
                </div>

                {/* Portrait Parallax Viewport */}
                <div className={styles.portraitViewport}>
                  <img
                    ref={portraitImageRef}
                    src={portraitSrc}
                    alt="Naveed Ahmed K — Software Engineer"
                    className={styles.portraitImage}
                    loading="lazy"
                    width={1116}
                    height={1409}
                  />
                  {/* Cinematic Glass Sheen & Dark Vignette */}
                  <div className={styles.portraitVignette} aria-hidden="true" />
                  <div className={styles.portraitGlassSheen} aria-hidden="true" />
                </div>

                {/* Frame Footer Rulers */}
                <div className={styles.frameFooterBar}>
                  <span className={styles.frameFooterText}>B.TECH IT ’26 · FLUTTER &amp; SYSTEMS</span>
                  <span className={styles.frameCoords}>NAVEED AHMED K // DEVELOPER</span>
                </div>
              </div>

              {/* Floating Technical Annotation Chips (Desktop) */}
              <div ref={annotationsRef} className={styles.annotationsCluster} aria-hidden="true">
                {TECHNICAL_ANNOTATIONS.map((ann) => (
                  <div key={ann.id} className={`${styles.annotationChip} ${styles[ann.position]}`}>
                    <span className={styles.annotationLabel}>{ann.label}</span>
                    <strong className={styles.annotationValue}>{ann.value}</strong>
                    <span className={styles.annotationDetail}>{ann.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro Caption */}
            <p className={styles.portraitCaption}>
              Photograph: Portrait of Naveed Ahmed K, undergraduate software developer.
            </p>
          </div>

          {/* Right Column: Personal Narrative */}
          <div ref={narrativeRef} className={styles.manifestoWrapper}>
            <div className={styles.quoteCard}>
              <span className={styles.quotePill}>ENGINEERING PERSPECTIVE</span>
              <blockquote className={styles.quoteContent}>
                “I treat software not as abstract syntax, but as a physical instrument. Every system I
                engineer solves tangible cross-platform challenges—from peer-to-peer device discovery
                to fluid physics loops and reliable full-stack platforms.”
              </blockquote>
            </div>

            <div className={styles.narrativeText}>
              <p>
                I am a final-year <strong>B.Tech Information Technology</strong> undergraduate at
                Government College of Engineering, Erode (CGPA approximately <strong>7.8</strong>).
                My focus centers on building responsive mobile applications with <strong>Flutter</strong>{' '}
                and developing reliable <strong>full-stack web platforms</strong>.
              </p>
              <p>
                Rather than stopping at standard coursework exercises, I build cross-platform projects
                that solve practical problems: connecting Android devices with Linux desktops over local
                Wi-Fi (<strong>LinkBridge</strong>), building a grid-based gravity puzzle game in
                Flutter and Flame (<strong>FLIPVERSE</strong>), and creating a student dining pre-order
                app and web admin dashboard (<strong>Smart Canteen</strong>).
              </p>
              <p>
                My background combines hands-on engineering practice with technical coordination—from
                working with Flutter and REST workflows during my mobile app development internship at{' '}
                <strong>SDLC, Madurai</strong>, to coordinating 40+ student projects and mentoring a
                team during <strong>HackXpo &apos;26</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Philosophy — 3 Core Principles */}
        <div className={styles.philosophySection}>
          <div className={styles.philosophyHeader}>
            <span className={styles.philosophyIndex}>CORE ENGINEERING PHILOSOPHY</span>
            <span className={styles.philosophyHint}>SELECT PRINCIPLE TO VIEW APPROACH</span>
          </div>

          <div ref={principlesRef} className={styles.principlesList}>
            {ENGINEERING_PRINCIPLES.map((principle) => {
              const isActive = activePrinciple === principle.number
              const panelId = `principle-panel-${principle.number}`
              return (
                <div
                  key={principle.number}
                  className={`${styles.principleItem} ${isActive ? styles.principleActive : ''}`}
                  onClick={() => setActivePrinciple(principle.number)}
                >
                  <h3 className={styles.principleHeadingReset}>
                    <button
                      type="button"
                      className={styles.principleTriggerBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActivePrinciple(principle.number)
                      }}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                    >
                      <span className={styles.principleMain}>
                        <span className={styles.principleMeta}>
                          <span className={styles.principleNumber}>{principle.number}</span>
                          <span className={styles.principleTitle}>{principle.title}</span>
                        </span>
                        <span className={styles.principleIndicator} aria-hidden="true">
                          {isActive ? '−' : '+'}
                        </span>
                      </span>
                    </button>
                  </h3>

                  <p className={styles.principleStatement}>“{principle.statement}”</p>

                  {isActive && (
                    <div
                      id={panelId}
                      className={styles.principleExpanded}
                      role="region"
                      aria-label={principle.title}
                    >
                      <p className={styles.principleElaboration}>{principle.elaboration}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Activity / Developer Snapshot Module (Full-Width Systems Telemetry) */}
        <div ref={snapshotRef} className={styles.snapshotModule} aria-label="Current Developer Snapshot">
          <div className={styles.snapshotHeader}>
            <span className={styles.snapshotTag}>CURRENT FOCUS // ACTIVE WORK</span>
            <span className={styles.snapshotStatus}>● OPEN TO ROLES</span>
          </div>

          <div className={styles.snapshotGrid}>
            <div className={styles.snapshotBlock}>
              <span className={styles.snapshotLabel}>CURRENTLY BUILDING</span>
              <strong className={styles.snapshotValue}>
                LinkBridge multi-device flows &amp; FLIPVERSE level expansion (10/30 levels)
              </strong>
            </div>

            <div className={styles.snapshotBlock}>
              <span className={styles.snapshotLabel}>CURRENTLY EXPLORING</span>
              <strong className={styles.snapshotValue}>
                Flutter mobile architecture, Linux socket tools &amp; web platforms
              </strong>
            </div>

            <div className={styles.snapshotBlock}>
              <span className={styles.snapshotLabel}>DEVELOPMENT ENVIRONMENT</span>
              <strong className={styles.snapshotValue}>
                Linux x86_64 workstation, Flutter &amp; Dart SDK, VS Code, Git CLI
              </strong>
            </div>
          </div>
        </div>

        {/* Visual Bridge to Journey */}
        <div className={styles.bridgeWrap}>
          <a
            href="#experience"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#experience', { offset: -76 })
            }}
            className={styles.bridgeButton}
            data-cursor-text="JOURNEY"
          >
            <span>Explore Engineering Trajectory &amp; Journey</span>
            <span className={styles.bridgeArrow} aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </Container>
    </section>
  )
}
