import { useState, useRef, useEffect } from 'react'
import { gsap, useGSAP, useSmoothScroll } from '@/animations'
import { CRAFT_DOMAINS, type CraftDomain, type CraftTechnology } from '@/data'
import { Container } from '@/components/common'
import { CraftArchitectureMap } from './CraftArchitectureMap'
import { CraftDomainPanel } from './CraftDomainPanel'
import styles from './CraftSection.module.css'

export function CraftSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const panelContainerRef = useRef<HTMLDivElement>(null)
  const { scrollTo } = useSmoothScroll()

  const [activeDomainId, setActiveDomainId] = useState<string>('mobile')
  const [activeTechnology, setActiveTechnology] = useState<CraftTechnology | null>(
    CRAFT_DOMAINS[0].technologies[0],
  )

  const currentDomain: CraftDomain =
    CRAFT_DOMAINS.find((d) => d.id === activeDomainId) || CRAFT_DOMAINS[0]

  const handleSelectDomain = (id: string) => {
    setActiveDomainId(id)
    const newDomain = CRAFT_DOMAINS.find((d) => d.id === id)
    if (newDomain && newDomain.technologies.length > 0) {
      setActiveTechnology(newDomain.technologies[0])
    } else {
      setActiveTechnology(null)
    }
  }

  const handleSelectTechnology = (tech: CraftTechnology) => {
    setActiveTechnology(tech)
  }

  // IntersectionObserver to pause offscreen continuous visual effects
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.dataset.inView = 'true'
          } else {
            el.dataset.inView = 'false'
          }
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

      // 1. Headline Staggered Reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(`.${styles.headlineWord}`)
        if (words.length > 0) {
          gsap.from(words, {
            yPercent: 110,
            opacity: 0,
            duration: 0.85,
            stagger: 0.05,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 90%',
              once: true,
            },
          })
        }
      }

      // 2. Blueprint Architecture Map Entrance
      if (mapContainerRef.current) {
        gsap.from(mapContainerRef.current, {
          scale: 0.94,
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: mapContainerRef.current,
            start: 'top 90%',
            once: true,
          },
        })
      }

      // 3. Domain Telemetry Panel Entrance
      if (panelContainerRef.current) {
        gsap.from(panelContainerRef.current, {
          x: 35,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: panelContainerRef.current,
            start: 'top 90%',
            once: true,
          },
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={styles.craftSection}
      aria-label="The Craft Lab — Technical Architecture Ecosystem"
      data-in-view="true"
    >
      {/* Background Architectural Blueprint Grid Lines */}
      <div className={styles.blueprintBackdrop} aria-hidden="true">
        <div className={styles.gridLineH1} />
        <div className={styles.gridLineH2} />
        <div className={styles.gridLineV1} />
        <div className={styles.gridLineV2} />
      </div>

      <Container>
        {/* Section Top Header & Initialization Sequence */}
        <header className={styles.sectionHeader}>
          <div className={styles.headerMetaBar}>
            <div className={styles.headerMetaLeft}>
              <span className={styles.metaIndex}>02 // THE CRAFT LAB</span>
              <span className={styles.metaDivider}>/</span>
              <span className={styles.metaLocation}>TECHNICAL ECOSYSTEM</span>
            </div>
            <div className={styles.headerStatusRight}>
              <span className={styles.statusPulseDot} />
              <span className={styles.statusText}>CORE ENGINEERING STACK</span>
              <span className={styles.statusClock}>5 DOMAINS</span>
            </div>
          </div>

          {/* Staggered Editorial Headline */}
          <div ref={headlineRef} className={styles.headlineWrapper}>
            <h2 className={styles.headlineTitle}>
              <span className={styles.headlineRow}>
                <span className={styles.headlineWord}>THE</span>{' '}
                <span className={styles.headlineWord}>TOOLS.</span>
              </span>
              <span className={styles.headlineRow}>
                <span className={styles.headlineWord}>THE</span>{' '}
                <span className={`${styles.headlineWord} ${styles.headlineHighlight}`}>SYSTEMS.</span>
              </span>
              <span className={styles.headlineRow}>
                <span className={styles.headlineWord}>THE</span>{' '}
                <span className={`${styles.headlineWord} ${styles.headlineHighlight}`}>CRAFT.</span>
              </span>
            </h2>
          </div>

          <p className={styles.headlineSubtitle}>
            An interactive system architecture laboratory mapping 5 engineering domains, connected
            technologies, and the software systems they power.
          </p>

          {/* Mobile Domain Selector Tabs (< 1024px) */}
          <div className={styles.mobileDomainSelector} role="tablist" aria-label="Engineering Domains">
            {CRAFT_DOMAINS.map((domain) => {
              const isActive = domain.id === activeDomainId
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.mobileTabBtn} ${isActive ? styles.mobileTabActive : ''}`}
                  onClick={() => handleSelectDomain(domain.id)}
                  data-cursor-text="DOMAIN"
                >
                  <span className={styles.tabIdx}>{domain.number}</span>
                  <span className={styles.tabName}>{domain.title}</span>
                </button>
              )
            })}
          </div>
        </header>

        {/* Asymmetrical Laboratory Canvas: Architecture Map + Domain Panel */}
        <div className={styles.labCanvasGrid}>
          {/* Left Column: Interactive System Architecture Blueprint */}
          <div ref={mapContainerRef} className={styles.mapColumn}>
            <CraftArchitectureMap
              domains={CRAFT_DOMAINS}
              activeDomainId={activeDomainId}
              activeTechnology={activeTechnology}
              onSelectDomain={handleSelectDomain}
              onSelectTechnology={handleSelectTechnology}
            />

            {/* Architectural Legend */}
            <div className={styles.mapLegend}>
              <div className={styles.legendItem}>
                <span className={styles.legendDotCore} />
                <span>Central Core Bus</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDotActive} />
                <span>Active Domain Signal</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.legendDotTech} />
                <span>Orbiting Tech Nodes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Domain Telemetry & Inspection Console */}
          <div ref={panelContainerRef} className={styles.panelColumn}>
            <CraftDomainPanel
              domain={currentDomain}
              activeTechnology={activeTechnology}
              onSelectTechnology={handleSelectTechnology}
            />
          </div>
        </div>

        {/* Restrained Continuity Bridge: The Craft Lab ➔ Developer Identity */}
        <div className={styles.identityBridgeConduit}>
          <div className={styles.identityConduitLine} aria-hidden="true" />
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#about', { offset: -76 })
            }}
            className={styles.identityBridgeBtn}
            data-cursor-text="IDENTITY"
          >
            <span className={styles.identityPulseDot} />
            <span className={styles.identityBridgeText}>
              EXPLORE DEVELOPER IDENTITY &amp; BACKGROUND
            </span>
            <span className={styles.identityBridgeArrow} aria-hidden="true">
              ↓
            </span>
          </a>
          <div className={styles.identityConduitLine} aria-hidden="true" />
        </div>
      </Container>
    </section>
  )
}
