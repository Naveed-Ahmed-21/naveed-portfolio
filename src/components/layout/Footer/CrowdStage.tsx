import { useState, useEffect, useRef, useCallback } from 'react'
import { getAssetUrl } from '@/utils/assets'
import styles from './CrowdStage.module.css'

interface Pedestrian {
  id: number
  img: HTMLImageElement
  x: number
  y: number
  width: number
  height: number
  speed: number
  direction: 'left' | 'right'
  flipped: boolean
  bobPhase: number
  bobSpeed: number
  bobAmplitude: number
  layer: 'rear' | 'foreground'
  opacity: number
  streamPeriod: number
  maxStreamWidth: number
}

// 15 distinct monochrome pedestrian sprites in /crowd/pedestrians/p_{1..15}.png
const ALL_SPRITE_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

// High-density, non-repeating sequences across the promenade
const DESKTOP_REAR_ROSTER = [1, 4, 7, 10, 13, 2, 5, 8, 11, 14, 3, 6, 9, 12, 15, 4] // 16 entities (L -> R)
const DESKTOP_FG_ROSTER = [14, 3, 9, 15, 6, 12, 1, 8, 4, 11, 2, 13, 7, 10, 5] // 15 entities (R -> L)

const MOBILE_REAR_ROSTER = [1, 4, 7, 10, 13, 2, 6, 9, 12, 15, 3, 8] // 12 entities
const MOBILE_FG_ROSTER = [14, 3, 11, 5, 13, 2, 9, 15, 4, 10, 7] // 11 entities

// Natural height variation multipliers (~1.38x-1.65x over original baseline)
const REAR_SCALE_VARIANCE = [0.92, 1.04, 1.08, 0.90, 0.99, 1.06, 0.91, 1.00, 1.07, 0.93, 1.05, 0.96, 1.02, 0.90, 1.06, 0.97]
const FG_SCALE_VARIANCE = [0.93, 1.06, 1.01, 0.91, 1.05, 0.90, 0.99, 1.07, 0.93, 1.04, 0.96, 1.05, 0.92, 1.02, 0.98]

// Organic varied horizontal spacing to populate the stage without huge empty gaps or clumping
const REAR_BASE_GAPS = [14, 36, 10, 28, 18, 42, 12, 32, 22, 10, 40, 16, 30, 14, 34, 20]
const FG_BASE_GAPS = [28, 56, 20, 46, 34, 62, 24, 50, 38, 22, 58, 32, 44, 26, 52]

// Tight crop bounds for character.png (682x1024) removing empty transparent side/bottom margins
const HERO_CROP = { sx: 177, sy: 5, sw: 331, sh: 1015 }

export function CrowdStage() {
  const [isPaused, setIsPaused] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })
  const [isInView, setIsInView] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  const stageSectionRef = useRef<HTMLElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const characterImgRef = useRef<HTMLImageElement | null>(null)
  const loadedSpriteMapRef = useRef<Record<number, HTMLImageElement>>({})
  const pedestriansRef = useRef<Pedestrian[]>([])
  const animFrameIdRef = useRef<number | null>(null)
  const isPausedRef = useRef(isPaused)
  const isInViewRef = useRef(true)
  const renderRef = useRef<(now: number) => void>(() => {})
  const lastTimeRef = useRef(0)
  const lastSizeRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    isInViewRef.current = isInView
  }, [isInView])

  // 1. Preload central character + all 15 pedestrian sprites
  useEffect(() => {
    let active = true
    let loadedCount = 0
    const totalSprites = ALL_SPRITE_IDS.length

    const checkAllLoaded = () => {
      loadedCount++
      if (loadedCount >= totalSprites + 1 && active) {
        setImagesLoaded(true)
      }
    }

    const charImg = new Image()
    charImg.src = getAssetUrl('/crowd/character.png')
    charImg.onload = () => {
      characterImgRef.current = charImg
      checkAllLoaded()
    }
    charImg.onerror = () => checkAllLoaded()

    ALL_SPRITE_IDS.forEach((id) => {
      const img = new Image()
      img.src = getAssetUrl(`/crowd/pedestrians/p_${id}.png`)
      img.onload = () => {
        loadedSpriteMapRef.current[id] = img
        checkAllLoaded()
      }
      img.onerror = () => checkAllLoaded()
    })

    return () => {
      active = false
    }
  }, [])

  // 2. Setup Canvas Pedestrian Entities — ~1.5x Taller Scale, Dense Distribution, Seamless Conveyor Loop
  const initPedestrians = useCallback((canvasWidth: number, canvasHeight: number) => {
    const isNarrow = canvasWidth < 480
    const isMobile = canvasWidth < 768
    const isTablet = canvasWidth < 1024

    // Unified Ground Baseline
    const groundY = canvasHeight - (isNarrow ? 18 : isMobile ? 22 : 26)

    // Base heights (~1.45x-1.6x taller than original 192/168 desktop & 126/108 mobile)
    const baseFgHeight = isNarrow
      ? Math.round(canvasHeight * 0.57)
      : isMobile
        ? Math.round(canvasHeight * 0.57)
        : isTablet
          ? Math.round(canvasHeight * 0.58)
          : Math.round(Math.min(canvasHeight * 0.60, 294))

    const baseRearHeight = isNarrow
      ? Math.round(canvasHeight * 0.49)
      : isMobile
        ? Math.round(canvasHeight * 0.49)
        : isTablet
          ? Math.round(canvasHeight * 0.50)
          : Math.round(Math.min(canvasHeight * 0.52, 255))

    const gapScale = isNarrow ? 0.52 : isMobile ? 0.62 : isTablet ? 0.78 : 1.0

    const rearSprites = isMobile ? MOBILE_REAR_ROSTER : DESKTOP_REAR_ROSTER
    const fgSprites = isMobile ? MOBILE_FG_ROSTER : DESKTOP_FG_ROSTER

    const rearSpeed = isMobile ? 0.54 : isTablet ? 0.62 : 0.70
    const fgSpeed = isMobile ? 0.84 : isTablet ? 0.96 : 1.08

    const buildStream = (
      roster: number[],
      layer: 'rear' | 'foreground',
      baseHeight: number,
      scales: number[],
      baseGaps: number[],
      speed: number,
      direction: 'left' | 'right',
      flipped: boolean,
      opacity: number,
    ): Pedestrian[] => {
      const dims = roster.map((num, idx) => {
        const img = loadedSpriteMapRef.current[num] || new Image()
        if (!img.src) img.src = getAssetUrl(`/crowd/pedestrians/p_${num}.png`)
        const scale = scales[idx % scales.length]
        const h = Math.round(baseHeight * scale)
        const aspect =
          img.naturalWidth > 0 && img.naturalHeight > 0
            ? img.naturalWidth / img.naturalHeight
            : 0.57
        const w = Math.round(h * aspect)
        const gap = Math.round(baseGaps[idx % baseGaps.length] * gapScale)
        return { num, img, w, h, gap }
      })

      const maxW = Math.max(...dims.map((d) => d.w))
      const rawPeriod = dims.reduce((acc, d) => acc + d.w + d.gap, 0)
      const minPeriod = canvasWidth + maxW * 2 + 48
      const extraGapPerItem =
        rawPeriod < minPeriod ? (minPeriod - rawPeriod) / dims.length : 0
      const streamPeriod = Math.max(rawPeriod, minPeriod)

      // Align the widest foreground gap around stage center at frame 0 so Naveed is unobstructed on load
      let shiftOffset = 0
      if (layer === 'foreground') {
        let cursor = 0
        let bestCenter = 0
        let largestGap = -1
        dims.forEach((d) => {
          const g = d.gap + extraGapPerItem
          if (g > largestGap) {
            largestGap = g
            bestCenter = cursor + d.w + g / 2
          }
          cursor += d.w + g
        })
        shiftOffset = canvasWidth / 2 - bestCenter
      }

      let cursorX = -maxW + shiftOffset
      return dims.map((d, idx) => {
        const finalGap = d.gap + extraGapPerItem
        let x = cursorX
        while (x >= streamPeriod - maxW) x -= streamPeriod
        while (x < -maxW) x += streamPeriod

        cursorX += d.w + finalGap

        return {
          id: d.num,
          img: d.img,
          x,
          y: groundY - d.h,
          width: d.w,
          height: d.h,
          speed,
          direction,
          flipped,
          bobPhase: idx * 0.85,
          bobSpeed: layer === 'rear' ? 0.08 + (idx % 3) * 0.012 : 0.09 + (idx % 3) * 0.012,
          bobAmplitude: layer === 'rear' ? 2.1 : 2.6,
          layer,
          opacity,
          streamPeriod,
          maxStreamWidth: maxW,
        }
      })
    }

    const rearLayer = buildStream(
      rearSprites,
      'rear',
      baseRearHeight,
      REAR_SCALE_VARIANCE,
      REAR_BASE_GAPS,
      rearSpeed,
      'right',
      false,
      0.85,
    )

    const fgLayer = buildStream(
      fgSprites,
      'foreground',
      baseFgHeight,
      FG_SCALE_VARIANCE,
      FG_BASE_GAPS,
      fgSpeed,
      'left',
      true,
      0.98,
    )

    pedestriansRef.current = [...rearLayer, ...fgLayer]
  }, [])

  // 3. Canvas Render & Continuous Animation Loop
  useEffect(() => {
    if (!imagesLoaded) return

    const canvas = canvasRef.current
    const container = canvasContainerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1

    const handleResize = (force = false) => {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      const nextWidth = Math.floor(rect.width)
      const nextHeight = Math.floor(rect.height)
      if (nextWidth <= 0 || nextHeight <= 0) return

      const widthDelta = Math.abs(nextWidth - lastSizeRef.current.width)
      const heightDelta = Math.abs(nextHeight - lastSizeRef.current.height)
      if (!force && widthDelta < 2 && heightDelta < 18) return

      lastSizeRef.current = { width: nextWidth, height: nextHeight }
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = nextWidth
      height = nextHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      initPedestrians(width, height)

      if (isPausedRef.current && isInViewRef.current) {
        lastTimeRef.current = performance.now()
        renderRef.current(lastTimeRef.current)
      }
    }

    lastTimeRef.current = performance.now()
    let frameCount = 0

    const render = (now: number) => {
      if (!isInViewRef.current || document.hidden) {
        animFrameIdRef.current = null
        return
      }

      const dt = Math.min((now - lastTimeRef.current) / 16.667, 2.5)
      lastTimeRef.current = now

      const shouldAnimate = !isPausedRef.current && isInViewRef.current && !document.hidden
      if (shouldAnimate) {
        frameCount += dt
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, height)

      const isNarrow = width < 480
      const isMobile = width < 768
      const isTablet = width < 1024

      // Single Unified Ground Baseline
      const groundY = height - (isNarrow ? 18 : isMobile ? 22 : 26)

      // Central Hero Dimensions
      const charHeight = isNarrow
        ? Math.round(height * 0.72)
        : isMobile
          ? Math.round(height * 0.72)
          : isTablet
            ? Math.round(height * 0.73)
            : Math.round(Math.min(height * 0.74, 360))
      const charWidth = charHeight * (HERO_CROP.sw / HERO_CROP.sh)
      const charX = width / 2 - charWidth / 2
      const charY = groundY - charHeight

      const pedestrians = pedestriansRef.current
      const rearPedestrians = pedestrians.filter((p) => p.layer === 'rear')
      const fgPedestrians = pedestrians.filter((p) => p.layer === 'foreground')

      // A. DRAW REAR LAYER (Moves Left to Right behind Naveed)
      rearPedestrians.forEach((p) => {
        if (shouldAnimate) {
          p.x += p.speed * dt
          if (p.x > p.streamPeriod - p.maxStreamWidth) {
            p.x -= p.streamPeriod
          }
        }

        if (p.x + p.width < -12 || p.x > width + 12) return

        const lift = shouldAnimate
          ? Math.abs(Math.sin(frameCount * p.bobSpeed + p.bobPhase)) * p.bobAmplitude
          : 0
        const drawY = p.y - lift

        // Rear ground shadow on unified baseline
        ctx.save()
        ctx.fillStyle = 'rgba(37, 41, 34, 0.08)'
        ctx.beginPath()
        ctx.ellipse(
          p.x + p.width / 2,
          groundY - 0.5,
          p.width * 0.36,
          2.8,
          0,
          0,
          Math.PI * 2,
        )
        ctx.fill()
        ctx.restore()

        ctx.save()
        ctx.globalAlpha = p.opacity
        if (p.img.complete && p.img.naturalWidth > 0) {
          ctx.drawImage(
            p.img,
            Math.round(p.x),
            Math.round(drawY),
            Math.round(p.width),
            Math.round(p.height),
          )
        }
        ctx.restore()
      })

      // B. DRAW STATIONARY CENTRAL HERO CHARACTER (Naveed)
      // Soft radial backdrop keeps Naveed crisp over the giant outline typography
      ctx.save()
      const haloGrad = ctx.createRadialGradient(
        width / 2,
        charY + charHeight * 0.45,
        charWidth * 0.15,
        width / 2,
        charY + charHeight * 0.45,
        charWidth * 1.2,
      )
      haloGrad.addColorStop(0, 'rgba(255, 255, 255, 0.82)')
      haloGrad.addColorStop(0.65, 'rgba(255, 255, 255, 0.38)')
      haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = haloGrad
      ctx.beginPath()
      ctx.ellipse(
        width / 2,
        charY + charHeight * 0.48,
        charWidth * 1.15,
        charHeight * 0.54,
        0,
        0,
        Math.PI * 2,
      )
      ctx.fill()
      ctx.restore()

      // Central character ground shadow on unified baseline
      ctx.save()
      ctx.fillStyle = 'rgba(37, 41, 34, 0.24)'
      ctx.beginPath()
      ctx.ellipse(
        width / 2,
        groundY,
        charWidth * 0.58,
        Math.max(5.5, charHeight * 0.028),
        0,
        0,
        Math.PI * 2,
      )
      ctx.fill()
      ctx.restore()

      if (characterImgRef.current?.complete && characterImgRef.current.naturalWidth > 0) {
        ctx.save()
        ctx.shadowColor = 'rgba(37, 41, 34, 0.18)'
        ctx.shadowBlur = 18
        ctx.shadowOffsetY = 4
        ctx.drawImage(
          characterImgRef.current,
          HERO_CROP.sx,
          HERO_CROP.sy,
          HERO_CROP.sw,
          HERO_CROP.sh,
          Math.round(charX),
          Math.round(charY),
          Math.round(charWidth),
          Math.round(charHeight),
        )
        ctx.restore()
      }

      // C. DRAW FOREGROUND LAYER (Moves Right to Left, softly yielding opacity right across Naveed's center)
      fgPedestrians.forEach((p) => {
        if (shouldAnimate) {
          p.x -= p.speed * dt
          if (p.x < -p.maxStreamWidth) {
            p.x += p.streamPeriod
          }
        }

        if (p.x + p.width < -12 || p.x > width + 12) return

        // Cosine smoothstep opacity dip directly in front of Naveed so he is never hidden by passersby
        const pedCenter = p.x + p.width / 2
        const distFromHero = Math.abs(pedCenter - width / 2)
        const innerZone = charWidth * 0.45
        const outerZone = innerZone + p.width * 0.65
        let effectiveAlpha = p.opacity
        if (distFromHero < outerZone) {
          const t = Math.max(0, Math.min(1, (distFromHero - innerZone) / (outerZone - innerZone)))
          const smoothT = t * t * (3 - 2 * t)
          effectiveAlpha = 0.34 + (p.opacity - 0.34) * smoothT
        }

        const lift = shouldAnimate
          ? Math.abs(Math.sin(frameCount * p.bobSpeed + p.bobPhase)) * p.bobAmplitude
          : 0
        const drawY = p.y - lift

        // Foreground ground shadow on unified baseline
        ctx.save()
        ctx.fillStyle = `rgba(37, 41, 34, ${(0.12 * effectiveAlpha).toFixed(3)})`
        ctx.beginPath()
        ctx.ellipse(
          p.x + p.width / 2,
          groundY - 0.5,
          p.width * 0.4,
          3.4,
          0,
          0,
          Math.PI * 2,
        )
        ctx.fill()
        ctx.restore()

        if (p.img.complete && p.img.naturalWidth > 0) {
          ctx.save()
          ctx.globalAlpha = effectiveAlpha

          if (p.flipped) {
            ctx.translate(Math.round(p.x + p.width), Math.round(drawY))
            ctx.scale(-1, 1)
            ctx.drawImage(p.img, 0, 0, Math.round(p.width), Math.round(p.height))
          } else {
            ctx.drawImage(
              p.img,
              Math.round(p.x),
              Math.round(drawY),
              Math.round(p.width),
              Math.round(p.height),
            )
          }

          ctx.restore()
        }
      })

      // D. DRAW UNIFIED GROUND BASELINE
      ctx.save()
      ctx.strokeStyle = '#DDD7CC'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, groundY + 0.5)
      ctx.lineTo(width, groundY + 0.5)
      ctx.stroke()
      ctx.restore()

      ctx.restore()

      if (!isPausedRef.current && isInViewRef.current && !document.hidden) {
        animFrameIdRef.current = requestAnimationFrame(render)
      } else {
        animFrameIdRef.current = null
      }
    }

    renderRef.current = render
    handleResize(true)

    const resizeObserver = new ResizeObserver(() => handleResize(false))
    resizeObserver.observe(container)

    if (!isPausedRef.current && isInViewRef.current && !document.hidden) {
      animFrameIdRef.current = requestAnimationFrame(render)
    } else {
      render(lastTimeRef.current)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current)
          animFrameIdRef.current = null
        }
      } else if (isInViewRef.current && !isPausedRef.current && !animFrameIdRef.current) {
        lastTimeRef.current = performance.now()
        animFrameIdRef.current = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
        animFrameIdRef.current = null
      }
      resizeObserver.disconnect()
    }
  }, [imagesLoaded, initPedestrians])

  // 4. Viewport Observer for Resource Conservation
  useEffect(() => {
    const el = stageSectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting
        setIsInView(inView)
        isInViewRef.current = inView
        if (inView && !animFrameIdRef.current && imagesLoaded && !isPausedRef.current && !document.hidden) {
          lastTimeRef.current = performance.now()
          animFrameIdRef.current = requestAnimationFrame((now) => renderRef.current(now))
        }
      },
      { threshold: 0.05 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [imagesLoaded])

  // 5. Reduced Motion Preference Listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsPaused(true)
        if (animFrameIdRef.current) {
          cancelAnimationFrame(animFrameIdRef.current)
          animFrameIdRef.current = null
        }
      }
    }
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const togglePause = () => {
    setIsPaused((prev) => {
      const next = !prev
      isPausedRef.current = next
      if (!next && isInViewRef.current && !animFrameIdRef.current && imagesLoaded && !document.hidden) {
        lastTimeRef.current = performance.now()
        animFrameIdRef.current = requestAnimationFrame((now) => renderRef.current(now))
      }
      return next
    })
  }

  return (
    <section
      ref={stageSectionRef}
      className={styles.stageSection}
      aria-label="Interactive crowd pedestrian stage"
    >
      {/* Subtle Ivory-to-White Editorial Transition Gradient */}
      <div className={styles.transitionGradient} aria-hidden="true" />

      <div ref={canvasContainerRef} className={styles.stageContainer}>
        {/* Large Decorative Name Typography Layered Behind Pedestrians */}
        <div className={styles.decorativeTypography} aria-hidden="true">
          <span className={styles.decorativeText}>NAVEED AHMED K</span>
        </div>

        {/* High-Performance Canvas 2D Animated Stage */}
        <canvas ref={canvasRef} className={styles.crowdCanvas} />
      </div>

      {/* Signature Dark Bottom Caption Strip with Functional Pause/Resume */}
      <div className={styles.captionStrip}>
        <div className={styles.captionLeft}>
          <span className={styles.captionDot} aria-hidden="true" />
          <span className={styles.captionText}>
            Pedestrian Promenade // Two-Way Kinetic Stage
          </span>
        </div>

        <button
          type="button"
          onClick={togglePause}
          className={styles.controlBtn}
          aria-pressed={isPaused}
          aria-label={isPaused ? 'Resume crowd animation' : 'Pause crowd animation'}
        >
          <span className={styles.controlIcon} aria-hidden="true">
            {isPaused ? '▶' : '⏸'}
          </span>
          <span className={styles.controlLabel}>
            {isPaused ? 'Resume Motion' : 'Pause Motion'}
          </span>
        </button>
      </div>
    </section>
  )
}
