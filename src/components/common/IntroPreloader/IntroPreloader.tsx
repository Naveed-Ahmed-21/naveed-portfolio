import { useState, useEffect, useRef } from 'react'
import { gsap } from '@/animations'
import styles from './IntroPreloader.module.css'

interface IntroPreloaderProps {
  onComplete?: () => void
}

export function IntroPreloader({ onComplete }: IntroPreloaderProps) {
  const [isDone, setIsDone] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const counterNumRef = useRef<HTMLSpanElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isDone) {
      onComplete?.()
      window.dispatchEvent(new CustomEvent('intro-complete'))
      return
    }

    const counterObj = { val: 0 }
    let slideTween: gsap.core.Tween | null = null

    const tl = gsap.timeline({
      onComplete: () => {
        window.dispatchEvent(new CustomEvent('intro-complete'))

        if (overlayRef.current) {
          slideTween = gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 0.75,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsDone(true)
              onComplete?.()
            },
          })
        } else {
          setIsDone(true)
          onComplete?.()
        }
      },
    })

    tl.to(counterObj, {
      val: 100,
      duration: 0.75,
      ease: 'power2.inOut',
      onUpdate: () => {
        const rounded = Math.floor(counterObj.val)
        if (counterNumRef.current) {
          counterNumRef.current.textContent = rounded < 10 ? `0${rounded}` : `${rounded}`
        }
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${rounded}%`
        }
      },
    }).to(
      contentRef.current,
      {
        opacity: 0,
        y: -15,
        duration: 0.25,
        ease: 'power2.in',
      },
      '-=0.1',
    )

    return () => {
      tl.kill()
      slideTween?.kill()
    }
  }, [isDone, onComplete])

  if (isDone) return null

  return (
    <div ref={overlayRef} className={styles.introOverlay} aria-hidden="true">
      <div ref={contentRef} className={styles.introContent}>
        {/* Monogram Badge */}
        <div className={styles.brandRow}>
          <div className={styles.monogram}>
            <span className={styles.monogramText}>NAK</span>
          </div>
          <span className={styles.editionTag}>PORTFOLIO // 2026 EDITION</span>
        </div>

        {/* Hero Counter */}
        <div className={styles.counterWrap}>
          <span ref={counterNumRef} className={styles.counterNumber}>
            00
          </span>
          <span className={styles.counterPercent}>%</span>
        </div>

        {/* Narrative Tagline */}
        <div className={styles.taglineRow}>
          <span className={styles.taglineDot} />
          <span className={styles.taglineText}>
            NAVEED AHMED K // FLUTTER &amp; FULL-STACK SYSTEMS
          </span>
        </div>

        {/* Precision Progress Bar */}
        <div className={styles.progressBarTrack}>
          <div ref={progressBarRef} className={styles.progressBarFill} />
        </div>
      </div>
    </div>
  )
}
