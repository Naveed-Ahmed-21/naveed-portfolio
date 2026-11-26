import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

export function ScrollProgress() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafPending = false

    const updateProgress = () => {
      rafPending = false
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0

      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${ratio})`
      }
      if (wrapperRef.current) {
        wrapperRef.current.setAttribute('aria-valuenow', String(Math.round(ratio * 100)))
      }
    }

    const handleScroll = () => {
      if (!rafPending) {
        rafPending = true
        requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className={styles.progressBarWrapper}
      role="progressbar"
      aria-label="Page reading progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        ref={barRef}
        className={styles.progressBar}
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
