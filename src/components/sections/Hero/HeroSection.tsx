import { useRef, useEffect } from 'react'
import { gsap, useGSAP, useSmoothScroll } from '@/animations'
import { siteConfig } from '@/data'
import { getAssetUrl } from '@/utils/assets'
import { Container, Button, Badge } from '@/components/common'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const contentColRef = useRef<HTMLDivElement>(null)
  const deviceColRef = useRef<HTMLDivElement>(null)
  const deviceShellRef = useRef<HTMLDivElement>(null)
  const tiltContainerRef = useRef<HTMLDivElement>(null)
  const leftButtonsRef = useRef<HTMLDivElement>(null)
  const rightButtonRef = useRef<HTMLDivElement>(null)
  const deviceFrameRef = useRef<HTMLDivElement>(null)
  const deviceScreenRef = useRef<HTMLDivElement>(null)
  const notchRef = useRef<HTMLDivElement>(null)
  const portraitRef = useRef<HTMLImageElement>(null)
  const portalSurfaceRef = useRef<HTMLDivElement>(null)
  const portalApertureRef = useRef<HTMLDivElement>(null)
  const screenOverlayRef = useRef<HTMLDivElement>(null)
  const screenChipRef = useRef<HTMLDivElement>(null)
  const frameGlossRef = useRef<HTMLDivElement>(null)
  const homeBarRef = useRef<HTMLDivElement>(null)
  const orbitSvgRef = useRef<SVGSVGElement>(null)
  const annotationsRef = useRef<HTMLDivElement>(null)
  const externalChipsRef = useRef<HTMLDivElement>(null)
  const headline1Ref = useRef<HTMLSpanElement>(null)
  const headline2Ref = useRef<HTMLSpanElement>(null)
  const headline3Ref = useRef<HTMLSpanElement>(null)
  const subTextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const stampRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  const { scrollTo } = useSmoothScroll()
  const portraitSrc = getAssetUrl('/images/portrait-cinematic.png')

  // Parallax weight: blended down to 0 during scroll transition to prevent conflict
  const parallaxWeight = useRef(1.0)

  // Desktop subtle pointer parallax tilt on tiltContainerRef only (wakes on hover, stops when settled)
  useEffect(() => {
    const col = deviceColRef.current
    if (!col) return
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!pointerQuery.matches || motionQuery.matches) return

    let animId: number | null = null
    const mouseTarget = { x: 0, y: 0 }
    const mouseCurrent = { x: 0, y: 0 }

    const animateParallax = () => {
      if (document.hidden || motionQuery.matches) {
        animId = null
        return
      }

      const weight = parallaxWeight.current
      const targetX = mouseTarget.x * weight
      const targetY = mouseTarget.y * weight
      const dx = targetX - mouseCurrent.x
      const dy = targetY - mouseCurrent.y

      mouseCurrent.x += dx * 0.08
      mouseCurrent.y += dy * 0.08

      if (tiltContainerRef.current) {
        tiltContainerRef.current.style.transform = `perspective(1200px) rotateY(${mouseCurrent.x.toFixed(3)}deg) rotateX(${(-mouseCurrent.y).toFixed(3)}deg)`
      }

      if (Math.abs(dx) > 0.02 || Math.abs(dy) > 0.02) {
        animId = requestAnimationFrame(animateParallax)
      } else {
        animId = null
      }
    }

    const ensureLoop = () => {
      if (!animId && !document.hidden && !motionQuery.matches) {
        animId = requestAnimationFrame(animateParallax)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (parallaxWeight.current <= 0.02) return
      const rect = col.getBoundingClientRect()
      mouseTarget.x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7
      mouseTarget.y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 5
      ensureLoop()
    }

    const handleMouseLeave = () => {
      mouseTarget.x = 0
      mouseTarget.y = 0
      ensureLoop()
    }

    col.addEventListener('mousemove', handleMouseMove, { passive: true })
    col.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      col.removeEventListener('mousemove', handleMouseMove)
      col.removeEventListener('mouseleave', handleMouseLeave)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      let hasAnimated = false

      // ── Entrance Choreography Sequence ──
      const runEntrance = () => {
        if (hasAnimated) return
        hasAnimated = true

        const orbitEllipses = orbitSvgRef.current?.querySelectorAll('ellipse')
        const orbitNodes = orbitSvgRef.current?.querySelectorAll('circle')

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            gsap.set(
              [
                stampRef.current,
                badgeRef.current,
                subTextRef.current,
                ctaRef.current,
                scrollIndicatorRef.current,
              ].filter(Boolean),
              { clearProps: 'transform,opacity' },
            )
          },
        })

        // 1. System stamp & availability badge
        tl.fromTo(
          stampRef.current,
          { opacity: 0, y: -6 },
          { opacity: 1, y: 0, duration: 0.45 },
        ).fromTo(
          badgeRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.35 },
          '-=0.2',
        )

        // 2. SVG Orbit paths draw/fade in
        if (orbitEllipses && orbitEllipses.length > 0) {
          tl.fromTo(
            orbitEllipses,
            { opacity: 0, scale: 0.92, transformOrigin: 'center' },
            { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' },
            '-=0.2',
          )
        }

        // 3. Smartphone device drops in with controlled depth
        tl.fromTo(
          deviceShellRef.current,
          { opacity: 0, y: 45, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power4.out' },
          '-=0.45',
        )

        // 4. Portrait inside screen reveals via clip-path
        tl.fromTo(
          portraitRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1.0, duration: 0.75, ease: 'power3.out' },
          '-=0.35',
        )

        // 5. Orbital nodes pop in
        if (orbitNodes && orbitNodes.length > 0) {
          tl.fromTo(
            orbitNodes,
            { opacity: 0, scale: 0, transformOrigin: 'center' },
            { opacity: 1, scale: 1, duration: 0.35, stagger: 0.05, ease: 'back.out(2)' },
            '-=0.4',
          )
        }

        // 6. In-screen chip and external chips reveal
        tl.fromTo(
          screenChipRef.current,
          { opacity: 0, y: 12, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(2)' },
          '-=0.25',
        ).fromTo(
          externalChipsRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' },
          '-=0.2',
        )

        // 7. Oversized Display Headline lines reveal from mask
        tl.fromTo(
          [headline1Ref.current, headline2Ref.current, headline3Ref.current],
          { y: '115%' },
          { y: '0%', duration: 0.65, stagger: 0.1, ease: 'power4.out' },
          '-=0.35',
        )

        // 8. Supporting subtext, CTAs, and annotations
        tl.fromTo(
          subTextRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.15',
        )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35 },
            '-=0.2',
          )
          .fromTo(
            annotationsRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 },
            '-=0.2',
          )
          .fromTo(
            scrollIndicatorRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35 },
            '-=0.15',
          )
      }

      window.addEventListener('intro-complete', runEntrance)
      const fallback = setTimeout(runEntrance, 1800)

      // ── Phase 2: Cinematic Device Portal Scroll Transition ──
      const mm = gsap.matchMedia()

      // Desktop & Laptop (≥980px): Pinned Full-Screen Portal Expansion
      mm.add('(min-width: 980px)', () => {
        if (!heroRef.current || !deviceShellRef.current) return

        // Scroll-position-independent center offsets relative to hero section top
        const getDeltaX = () => {
          if (!deviceShellRef.current) return 0
          const rect = deviceShellRef.current.getBoundingClientRect()
          const currentX = Number(gsap.getProperty(deviceShellRef.current, 'x')) || 0
          const baseCenterX = rect.left - currentX + rect.width / 2
          return window.innerWidth / 2 - baseCenterX
        }

        const getDeltaY = () => {
          if (!deviceShellRef.current || !heroRef.current) return 0
          const rect = deviceShellRef.current.getBoundingClientRect()
          const heroRect = heroRef.current.getBoundingClientRect()
          const currentY = Number(gsap.getProperty(deviceShellRef.current, 'y')) || 0
          const baseCenterYInHero = rect.top - currentY - heroRect.top + rect.height / 2
          return window.innerHeight / 2 - baseCenterYInHero
        }

        const portalTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=105%',
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              parallaxWeight.current = Math.max(0, 1 - self.progress * 5.5)
              if (parallaxWeight.current <= 0.02 && tiltContainerRef.current) {
                tiltContainerRef.current.style.transform =
                  'perspective(1200px) rotateY(0deg) rotateX(0deg)'
              }
            },
          },
        })

        // Stage 2: Left column and technical annotations fade out gracefully
        portalTl
          .to(
            contentColRef.current,
            {
              opacity: 0,
              y: -35,
              duration: 0.25,
              ease: 'power2.in',
            },
            0,
          )
          .to(
            [orbitSvgRef.current, annotationsRef.current, externalChipsRef.current],
            {
              opacity: 0,
              scale: 1.25,
              duration: 0.22,
              ease: 'power2.in',
            },
            0,
          )

        // Stage 3 & 4: Device moves to center and expands toward camera (zoom into portal)
        portalTl.to(
          deviceShellRef.current,
          {
            x: getDeltaX,
            y: getDeltaY,
            scale: 5.4,
            duration: 0.75,
            ease: 'power2.inOut',
          },
          0.1,
        )

        // Bezels, notch, buttons and home bar fade away as the screen approaches camera
        portalTl
          .to(
            [
              leftButtonsRef.current,
              rightButtonRef.current,
              notchRef.current,
              homeBarRef.current,
              frameGlossRef.current,
            ],
            {
              opacity: 0,
              scale: 1.4,
              duration: 0.35,
              ease: 'power1.out',
            },
            0.18,
          )
          .to(
            deviceFrameRef.current,
            {
              padding: 0,
              borderRadius: 0,
              boxShadow: 'none',
              duration: 0.5,
              ease: 'power2.out',
            },
            0.22,
          )
          .to(
            deviceScreenRef.current,
            {
              borderRadius: 0,
              duration: 0.5,
              ease: 'power2.out',
            },
            0.22,
          )
          .to(
            screenChipRef.current,
            {
              opacity: 0,
              y: 15,
              duration: 0.2,
              ease: 'power2.in',
            },
            0.12,
          )

        // Inside the screen: portrait photo transitions into digital portal matrix
        portalTl
          .to(
            portraitRef.current,
            {
              opacity: 0,
              scale: 1.15,
              duration: 0.45,
              ease: 'power1.inOut',
            },
            0.25,
          )
          .to(
            portalSurfaceRef.current,
            {
              opacity: 1,
              duration: 0.45,
              ease: 'power1.inOut',
            },
            0.25,
          )

        // Stage 5: Portal aperture expands into Projects entrance
        portalTl.to(
          portalApertureRef.current,
          {
            scale: 2.2,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          },
          0.65,
        )
      })

      // Mobile & Tablet (<980px): Gentle unpinned scroll parallax keeping headline & CTAs legible
      mm.add('(max-width: 979px)', () => {
        if (!heroRef.current || !deviceShellRef.current) return

        gsap.to(deviceShellRef.current, {
          scale: 1.06,
          y: -14,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom 35%',
            scrub: 0.6,
          },
        })
      })

      return () => {
        window.removeEventListener('intro-complete', runEntrance)
        clearTimeout(fallback)
        mm.revert()
      }
    },
    { scope: heroRef },
  )

  // Pause offscreen ambient hero CSS animations when scrolled past the viewport
  useEffect(() => {
    const el = heroRef.current
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

  const gitHubUrl =
    siteConfig.socials.find((s) => s.platform === 'GitHub')?.url ||
    'https://github.com/Naveed-Ahmed-21'
  const linkedInUrl =
    siteConfig.socials.find((s) => s.platform === 'LinkedIn')?.url ||
    'https://linkedin.com/in/naveedahmedk'

  return (
    <section id="hero" ref={heroRef} className={styles.heroSection} aria-label="Hero">
      {/* Ambient background radiance */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <Container>
        <div className={styles.grid}>
          {/* ── LEFT COLUMN ── */}
          <div ref={contentColRef} className={styles.contentCol}>
            {/* System stamp */}
            <div ref={stampRef} className={styles.systemStamp} aria-hidden="true">
              <span className={styles.stampDot} />
              <span className={styles.stampText}>
                PORTFOLIO // 2026 · FLUTTER DEV · TAMIL NADU, INDIA
              </span>
            </div>

            {/* Availability badge */}
            <div ref={badgeRef} className={styles.badgeRow}>
              <Badge variant="sage" dot>
                {siteConfig.availability.message}
              </Badge>
              <span className={styles.locationTag}>Based in {siteConfig.location}</span>
            </div>

            {/* Headline — masked reveal */}
            <div className={styles.headlineBlock}>
              <h1 className={styles.headline}>
                <span className={styles.lineClip}>
                  <span ref={headline1Ref} className={styles.lineInner}>I BUILD WHAT</span>
                </span>
                <span className={styles.lineClip}>
                  <span ref={headline2Ref} className={`${styles.lineInner} ${styles.lineAccent}`}>
                    FITS IN YOUR
                  </span>
                </span>
                <span className={styles.lineClip}>
                  <span ref={headline3Ref} className={styles.lineInner}>POCKET.</span>
                </span>
              </h1>
            </div>

            {/* Sub-text */}
            <p ref={subTextRef} className={styles.subText}>
              Flutter developer crafting mobile experiences, connected systems, and digital products.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className={styles.ctaRow}>
              <Button href="#work" variant="primary" size="lg" magnetic data-cursor-text="WORK">
                Explore Projects
                <span className={styles.arrow} aria-hidden="true">→</span>
              </Button>
              <Button
                href={gitHubUrl}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="GITHUB"
              >
                GitHub
              </Button>
              <Button
                href={linkedInUrl}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text="LINKEDIN"
              >
                LinkedIn
              </Button>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollIndicatorRef} className={styles.scrollWrap}>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('#work', { offset: -76 })
                }}
                className={styles.scrollIndicator}
                aria-label="Scroll to explore projects"
                data-cursor-text="SCROLL"
              >
                <span className={styles.scrollPulse} aria-hidden="true" />
                <span className={styles.scrollLabel}>SCROLL TO EXPLORE</span>
                <span className={styles.scrollArrow} aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN — Device Portal ── */}
          <div ref={deviceColRef} className={styles.deviceCol}>
            {/* SVG orbital system */}
            <svg
              ref={orbitSvgRef}
              className={styles.orbitSvg}
              viewBox="0 0 540 720"
              fill="none"
              aria-hidden="true"
            >
              {/* Outer ellipse */}
              <ellipse
                cx="270" cy="360" rx="250" ry="330"
                stroke="#52745A" strokeWidth="1"
                strokeDasharray="5 10" opacity="0.22"
                className={styles.orbitRingOuter}
              />
              {/* Inner ellipse */}
              <ellipse
                cx="270" cy="360" rx="175" ry="232"
                stroke="#D9BFA3" strokeWidth="0.8"
                strokeDasharray="3 7" opacity="0.18"
                className={styles.orbitRingInner}
              />
              {/* Nodes at cardinal positions */}
              <circle cx="270" cy="30" r="4" fill="#52745A" opacity="0.65" className={styles.orbitNode} />
              <circle cx="519" cy="360" r="3" fill="#D9BFA3" opacity="0.55" className={styles.orbitNode} />
              <circle cx="270" cy="690" r="4" fill="#52745A" opacity="0.65" className={styles.orbitNode} />
              <circle cx="21" cy="360" r="3" fill="#D9BFA3" opacity="0.55" className={styles.orbitNode} />
              {/* Signal pulse rings at top node */}
              <circle cx="270" cy="30" r="10" fill="none" stroke="#52745A" strokeWidth="1" opacity="0.35" className={styles.signalPulse} />
              <circle cx="270" cy="30" r="18" fill="none" stroke="#52745A" strokeWidth="0.5" opacity="0.18" className={styles.signalPulseOuter} />
              {/* Signal pulse at right node */}
              <circle cx="519" cy="360" r="8" fill="none" stroke="#D9BFA3" strokeWidth="0.8" opacity="0.3" className={styles.signalPulse} />
              {/* Connection lines from device to annotations */}
              <line x1="519" y1="360" x2="490" y2="300" stroke="#52745A" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.3" />
              <line x1="21" y1="360" x2="55" y2="420" stroke="#D9BFA3" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.3" />
            </svg>

            {/* Technical annotation labels */}
            <div ref={annotationsRef} className={styles.annotations} aria-hidden="true">
              <div className={styles.annotTopRight}>
                <span className={styles.annotLabel}>NAK_DEV_01</span>
                <span className={styles.annotSub}>v2.0 // ACTIVE</span>
              </div>
              <div className={styles.annotBottomLeft}>
                <span className={styles.annotCoord}>B.TECH IT · 2023–2027</span>
                <span className={styles.annotSub}>TAMIL NADU · INDIA</span>
              </div>
            </div>

            {/* External floating chips */}
            <div ref={externalChipsRef} className={styles.externalChips} aria-hidden="true">
              <div className={styles.chipApps}>
                <span className={styles.chipIcon}>📱</span>
                <div>
                  <span className={styles.chipVal}>08</span>
                  <span className={styles.chipMeta}>Featured Projects</span>
                </div>
              </div>
              <div className={styles.chipFps}>
                <span className={styles.chipFpsVal}>DART</span>
                <span className={styles.chipFpsMeta}>FLUTTER</span>
              </div>
            </div>

            {/* The smartphone container (managed by GSAP for portal positioning & scaling) */}
            <div ref={deviceShellRef} className={styles.deviceShell}>
              {/* Inner tilt container (managed by pointer parallax only) */}
              <div ref={tiltContainerRef} className={styles.tiltContainer}>
                {/* Side hardware buttons */}
                <div ref={leftButtonsRef} className={styles.leftButtons} aria-hidden="true">
                  <div className={styles.volUp} />
                  <div className={styles.volDown} />
                </div>
                <div ref={rightButtonRef} className={styles.rightButton} aria-hidden="true">
                  <div className={styles.powerBtn} />
                </div>

                {/* Device body frame */}
                <div ref={deviceFrameRef} className={styles.deviceFrame}>
                  <div ref={deviceScreenRef} className={styles.deviceScreen}>
                    {/* Dynamic island notch */}
                    <div ref={notchRef} className={styles.notch} aria-hidden="true" />

                    {/* Portrait photo inside screen */}
                    <img
                      ref={portraitRef}
                      src={portraitSrc}
                      alt="Portrait of Naveed Ahmed K"
                      className={styles.screenPortrait}
                      loading="eager"
                      width={1116}
                      height={1409}
                    />

                    {/* Digital Portal Surface revealed during expansion */}
                    <div ref={portalSurfaceRef} className={styles.portalSurface} aria-hidden="true">
                      <div className={styles.portalGridPattern} />
                      <div ref={portalApertureRef} className={styles.portalAperture}>
                        <div className={styles.apertureRing} />
                        <span className={styles.portalTag}>ENTERING PROJECT ECOSYSTEM</span>
                        <span className={styles.portalCoords}>TAMIL NADU // INDIA</span>
                      </div>
                    </div>

                    {/* Screen depth overlay */}
                    <div ref={screenOverlayRef} className={styles.screenOverlay} aria-hidden="true" />

                    {/* In-screen identity chip */}
                    <div ref={screenChipRef} className={styles.screenChip}>
                      <span className={styles.chipPulse} aria-hidden="true" />
                      <span className={styles.chipText}>Flutter Dev · Tamil Nadu</span>
                    </div>
                  </div>

                  {/* Frame gloss / reflection */}
                  <div ref={frameGlossRef} className={styles.frameGloss} aria-hidden="true" />
                  {/* Home indicator bar */}
                  <div ref={homeBarRef} className={styles.homeBar} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
