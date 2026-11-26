import { useState, useEffect } from 'react'
import styles from './RoleCycler.module.css'

const ROLES = [
  { id: 'flutter', title: 'Flutter Developer', badge: 'Mobile & Systems' },
  { id: 'fullstack', title: 'Full Stack Developer', badge: 'Web Platforms' },
  { id: 'creative', title: 'Creative Engineer', badge: 'Motion & Architecture' },
]

export function RoleCycler() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    // Respect reduced motion: stay on first role
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let timeoutId: number | null = null

    const interval = window.setInterval(() => {
      if (document.hidden) return
      setIsTransitioning(true)
      timeoutId = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROLES.length)
        setIsTransitioning(false)
      }, 350)
    }, 3200)

    return () => {
      window.clearInterval(interval)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  const currentRole = ROLES[currentIndex]
  const indexStr = `0${currentIndex + 1} / 03`

  return (
    <div className={styles.cyclerWrap} aria-live="polite">
      <div className={styles.roleHeader}>
        <span className={styles.counter}>{indexStr}</span>
        <span className={styles.roleBadge}>{currentRole.badge}</span>
      </div>

      <div className={styles.roleStage}>
        <span
          className={`${styles.roleText} ${
            isTransitioning ? styles.roleExit : styles.roleEnter
          }`}
        >
          {currentRole.title}
        </span>
      </div>
    </div>
  )
}

