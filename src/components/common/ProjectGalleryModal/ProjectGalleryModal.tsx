import { useEffect, useCallback, useState, useRef } from 'react'
import { useSmoothScroll } from '@/animations'
import type { ProjectImage } from '@/types'
import styles from './ProjectGalleryModal.module.css'

interface ProjectGalleryModalProps {
  isOpen: boolean
  images: ProjectImage[]
  currentIndex: number
  projectTitle: string
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ProjectGalleryModal({
  isOpen,
  images,
  currentIndex,
  projectTitle,
  onClose,
  onNavigate,
}: ProjectGalleryModalProps) {
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '')
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({})
  const touchStartX = useRef<number | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const { stop, start } = useSmoothScroll()

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % images.length)
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + images.length) % images.length)
      }
    },
    [isOpen, currentIndex, images.length, onClose, onNavigate],
  )

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
      stop()
      requestAnimationFrame(() => closeBtnRef.current?.focus())
    } else {
      document.body.style.overflow = ''
      start()
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      start()
      if (isOpen) {
        previousFocusRef.current?.focus?.()
      }
    }
  }, [isOpen, handleKeyDown, start, stop])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        onNavigate((currentIndex + 1) % images.length)
      } else {
        // Swiped right -> prev
        onNavigate((currentIndex - 1 + images.length) % images.length)
      }
    }
    touchStartX.current = null
  }

  if (!isOpen || images.length === 0) return null

  const currentImg = images[currentIndex]
  const fullSrc = currentImg.src.startsWith('http')
    ? currentImg.src
    : `${baseUrl}${currentImg.src.startsWith('/') ? '' : '/'}${currentImg.src}`

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} screenshot gallery`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className={styles.modalHeader}>
          <div className={styles.metaLeft}>
            <span className={styles.projectTitle}>{projectTitle}</span>
            <span className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close image gallery"
            data-cursor-text="CLOSE"
          >
            ✕
          </button>
        </div>

        {/* Main Stage with Touch Gestures */}
        <div
          className={styles.stage}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
              aria-label="Previous screenshot"
              data-cursor-text="PREV"
            >
              ←
            </button>
          )}

          <div className={styles.imageContainer}>
            {failedUrls[fullSrc] ? (
              <div
                style={{
                  padding: '2rem',
                  backgroundColor: '#191E16',
                  borderRadius: '12px',
                  border: '1px solid #52745A',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  fontFamily: 'monospace',
                }}
              >
                <div style={{ color: '#D9BFA3', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  SCREENSHOT ASSET STAGING IN PROGRESS
                </div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                  Expected asset path: {currentImg.src}
                </div>
              </div>
            ) : (
              <img
                key={fullSrc}
                src={fullSrc}
                alt={currentImg.alt}
                className={styles.activeImage}
                onError={() => setFailedUrls((prev) => ({ ...prev, [fullSrc]: true }))}
              />
            )}
          </div>

          {images.length > 1 && (
            <button
              type="button"
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={() => onNavigate((currentIndex + 1) % images.length)}
              aria-label="Next screenshot"
              data-cursor-text="NEXT"
            >
              →
            </button>
          )}
        </div>

        {/* Caption & Filmstrip */}
        <div className={styles.modalFooter}>
          <div className={styles.captionBlock}>
            <h4 className={styles.imageAlt}>{currentImg.alt}</h4>
            <p className={styles.imageCaption}>{currentImg.caption}</p>
          </div>

          {/* Thumbnail Filmstrip */}
          {images.length > 1 && (
            <div className={styles.filmstrip} role="tablist" aria-label="Gallery thumbnails">
              {images.map((img, idx) => {
                const thumbSrc = img.src.startsWith('http')
                  ? img.src
                  : `${baseUrl}${img.src.startsWith('/') ? '' : '/'}${img.src}`
                return (
                  <button
                    key={`${img.src}-${idx}`}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentIndex}
                    className={`${styles.thumbBtn} ${idx === currentIndex ? styles.thumbActive : ''}`}
                    onClick={() => onNavigate(idx)}
                    aria-label={`View ${img.alt}`}
                  >
                    <img
                      src={thumbSrc}
                      alt=""
                      className={styles.thumbImg}
                      onError={(e) => {
                        // Hide broken thumbnail gracefully
                        const el = e.currentTarget
                        el.style.display = 'none'
                      }}
                    />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
