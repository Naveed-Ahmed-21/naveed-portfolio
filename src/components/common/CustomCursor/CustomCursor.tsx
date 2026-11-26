import { useEffect, useRef, useState } from 'react'
import styles from './CustomCursor.module.css'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [cursorText, setCursorText] = useState<string | null>(null)
  const [isEnabled, setIsEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return isFine && !reducedMotion
  })

  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  const mousePos = useRef({ x: -100, y: -100 })
  const followerPos = useRef({ x: -100, y: -100 })
  const rafId = useRef<number | null>(null)
  const isVisibleRef = useRef(false)
  const isPointerRef = useRef(false)
  const cursorTextRef = useRef<string | null>(null)

  useEffect(() => {
    const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateEnabled = () => {
      setIsEnabled(pointerQuery.matches && !motionQuery.matches)
    }
    pointerQuery.addEventListener('change', updateEnabled)
    motionQuery.addEventListener('change', updateEnabled)
    return () => {
      pointerQuery.removeEventListener('change', updateEnabled)
      motionQuery.removeEventListener('change', updateEnabled)
    }
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    const springLerp = 0.18

    const tick = () => {
      const dx = mousePos.current.x - followerPos.current.x
      const dy = mousePos.current.y - followerPos.current.y
      followerPos.current.x += dx * springLerp
      followerPos.current.y += dy * springLerp

      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerPos.current.x}px, ${followerPos.current.y}px, 0)`
      }

      // Stop RAF once follower has converged and mouse is idle
      if (isVisibleRef.current && (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15)) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        rafId.current = null
      }
    }

    const ensureLoop = () => {
      if (!rafId.current && isVisibleRef.current && !document.hidden) {
        rafId.current = requestAnimationFrame(tick)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const wasHidden = !isVisibleRef.current
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (wasHidden) {
        followerPos.current = { x: e.clientX, y: e.clientY }
        isVisibleRef.current = true
        setIsVisible(true)
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      const target = e.target as HTMLElement | null
      const interactiveEl = target?.closest(
        'a, button, [data-cursor], [data-cursor-text], input, select, textarea, [role="button"], [role="tab"]',
      ) as HTMLElement | null

      const nextPointer = Boolean(interactiveEl)
      const nextText = interactiveEl ? interactiveEl.getAttribute('data-cursor-text') : null

      if (nextPointer !== isPointerRef.current) {
        isPointerRef.current = nextPointer
        setIsPointer(nextPointer)
      }
      if (nextText !== cursorTextRef.current) {
        cursorTextRef.current = nextText
        setCursorText(nextText)
      }

      ensureLoop()
    }

    const onMouseLeave = () => {
      isVisibleRef.current = false
      setIsVisible(false)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }

    const onMouseEnter = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div
      className={`${styles.cursorWrapper} ${isVisible ? styles.visible : ''}`}
      aria-hidden="true"
    >
      {/* Precision Center Dot */}
      <div ref={dotRef} className={styles.cursorDot} />

      {/* Smooth Trailing Spring Follower */}
      <div
        ref={followerRef}
        className={`${styles.cursorFollower} ${
          isPointer ? styles.followerPointer : ''
        } ${cursorText ? styles.followerWithText : ''}`}
      >
        {cursorText && <span className={styles.cursorLabel}>{cursorText}</span>}
      </div>
    </div>
  )
}
