import { useEffect, useRef, useState } from 'react'
import { PhoneFrame } from './VisualFrames'
import styles from './FlipverseVisual.module.css'

export function FlipverseVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [gravityFlipped, setGravityFlipped] = useState(false)
  const [inversionCount, setInversionCount] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Interactive gravity inversion with feedback state
  const toggleGravity = () => {
    setGravityFlipped((prev) => !prev)
    setInversionCount((c) => c + 1)
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.cosmicCanvas} ${isInView ? styles.inView : styles.paused}`}
      role="region"
      aria-label="Interactive FLIPVERSE gravity physics preview"
    >
      {/* Deep celestial grid matrix */}
      <div className={styles.celestialGrid} aria-hidden="true" />

      {/* Illustrative Architecture Disclaimer Tag */}
      <div className={styles.illustrativeBanner}>
        <div className={styles.bannerLeft}>
          <span className={styles.cosmicDot} />
          <span className={styles.bannerText}>
            ILLUSTRATIVE GAMEPLAY PREVIEW // FLUTTER + FLAME ENGINE
          </span>
        </div>
        <div className={styles.engineTelemetryBadge}>
          <span>PROTOTYPE · 10 PLAYABLE LEVELS</span>
        </div>
      </div>

      {/* Main Physics Arena Landscape Phone */}
      <div className={styles.gameContainer}>
        <PhoneFrame
          variant="forest"
          orientation="landscape"
          statusBarTitle="FLIPVERSE // PREVIEW"
          className={styles.landscapePhone}
        >
          <div className={`${styles.viewport} ${gravityFlipped ? styles.viewportFlipped : ''}`}>
            {/* Ambient Nebula Fog */}
            <div className={styles.nebulaGlow} />

            {/* In-Game Heads-Up Display (HUD) */}
            <div className={styles.gameHudTop}>
              <div className={styles.hudStat}>
                <span className={styles.hudLabel}>CHAPTER</span>
                <span className={styles.hudVal}>CH 01–02</span>
              </div>

              <div className={styles.vectorHudGroup}>
                <span className={styles.hudLabel}>GRAVITY CYCLE</span>
                <div className={`${styles.vectorDisplay} ${gravityFlipped ? styles.vectorFlipped : ''}`}>
                  <span className={styles.vectorCompass}>{gravityFlipped ? '▲' : '▼'}</span>
                  <span className={styles.vectorValue}>
                    {gravityFlipped ? 'CLOCKWISE · INVERTED' : 'CLOCKWISE · DOWN'}
                  </span>
                </div>
              </div>

              <div className={styles.hudStat}>
                <span className={styles.hudLabel}>STATE</span>
                <span className={styles.hudVal}>RIVERPOD</span>
              </div>
            </div>

            {/* Celestial Physics Field Arena */}
            <div className={styles.physicsArena}>
              {/* Dynamic Gravity Vector Field Grid (SVG) */}
              <svg className={styles.trajectorySvg} viewBox="0 0 340 130">
                <defs>
                  <linearGradient id="orbitGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B8E986" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#52745A" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#D9BFA3" stopOpacity="0.6" />
                  </linearGradient>
                  <filter id="coreBlur" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Concentric Gravity Field Rings */}
                <ellipse cx="170" cy="65" rx="125" ry="50" className={styles.fieldRingOuter} />
                <ellipse cx="170" cy="65" rx="85" ry="34" className={styles.fieldRingInner} />

                {/* Dynamic Parabolic Trajectory Arc */}
                <path
                  d={
                    gravityFlipped
                      ? 'M 35 25 C 100 120, 240 120, 305 25'
                      : 'M 35 105 C 100 10, 240 10, 305 105'
                  }
                  className={styles.trajectoryArc}
                />

                {/* Trajectory Collision Impact Marker */}
                <circle
                  cx="305"
                  cy={gravityFlipped ? '25' : '105'}
                  r="5"
                  className={styles.impactMarker}
                />
                <circle
                  cx="305"
                  cy={gravityFlipped ? '25' : '105'}
                  r="10"
                  className={styles.impactRing}
                />
              </svg>

              {/* Central Massive Planetary Core */}
              <div className={styles.planetaryCore}>
                <div className={styles.coreCorona} />
                <div className={styles.coreBody}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B8E986" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
              </div>

              {/* Dynamic Orbiting Player Vessel */}
              <div className={styles.orbitContainer}>
                <div className={`${styles.playerVessel} ${gravityFlipped ? styles.vesselInverted : ''}`}>
                  <span className={styles.vesselNose} />
                  <span className={styles.thrusterFlame} />
                </div>
              </div>

              {/* Orbital Zone Markers */}
              <div className={styles.hazardZoneTop}>
                <span>ZONE α // FIELD NORMAL</span>
              </div>
              <div className={styles.hazardZoneBottom}>
                <span>ZONE β // FIELD INVERTED</span>
              </div>
            </div>

            {/* In-Game Action Bar with Interactive Button */}
            <div className={styles.gameHudBottom}>
              <button
                type="button"
                className={styles.gravityTrigger}
                onClick={toggleGravity}
                aria-label="Invert cosmic gravity vector in game simulation"
                data-cursor-text="INVERT"
              >
                <span className={styles.triggerArrow}>{gravityFlipped ? '▲' : '▼'}</span>
                <span>
                  {gravityFlipped ? 'GRAVITY: INVERTED (CLICK TO RESET)' : 'INVERT GRAVITY POLARITY'}
                </span>
              </button>

              <div className={styles.inversionMetric}>
                <span>FLIPS: {inversionCount}</span>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>

      {/* Cosmic Technical Legend */}
      <div className={styles.cosmicWatermark}>
        <span>ILLUSTRATIVE PREVIEW // FLUTTER + FLAME + RIVERPOD // WIP PROTOTYPE (10 LEVELS)</span>
      </div>
    </div>
  )
}
