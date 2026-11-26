import {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import {
  SmoothScrollContext,
  type SmoothScrollContextValue,
} from './smoothScrollContext'

interface SmoothScrollProviderProps {
  children: ReactNode
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    lenisRef.current = lenis
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    const handleScroll = () => {
      ScrollTrigger.update()
    }
    lenis.on('scroll', handleScroll)

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    let refreshTimer: number | null = null
    const scheduleRefresh = () => {
      if (refreshTimer) window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => {
        ScrollTrigger.refresh()
      }, 60)
    }

    // Initial refresh after layout settles, fonts load, and intro curtain completes
    scheduleRefresh()
    document.fonts?.ready.then(scheduleRefresh).catch(() => {})
    window.addEventListener('load', scheduleRefresh)
    window.addEventListener('intro-complete', scheduleRefresh)

    return () => {
      if (refreshTimer) window.clearTimeout(refreshTimer)
      window.removeEventListener('load', scheduleRefresh)
      window.removeEventListener('intro-complete', scheduleRefresh)
      lenis.off('scroll', handleScroll)
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  const scrollTo = useCallback(
    (
      target: number | string | HTMLElement,
      options?: {
        offset?: number
        duration?: number
        immediate?: boolean
        lock?: boolean
        onComplete?: () => void
      },
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options)
      } else {
        const offset = options?.offset ?? 0
        const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'
        if (typeof target === 'number') {
          window.scrollTo({ top: Math.max(0, target + offset), behavior })
        } else {
          const el =
            typeof target === 'string' ? document.querySelector(target) : target
          if (el instanceof HTMLElement) {
            const top = el.getBoundingClientRect().top + window.scrollY + offset
            window.scrollTo({ top: Math.max(0, top), behavior })
          }
        }
        options?.onComplete?.()
      }
    },
    [reducedMotion],
  )

  const start = useCallback(() => {
    lenisRef.current?.start()
  }, [])

  const stop = useCallback(() => {
    lenisRef.current?.stop()
  }, [])

  const getLenis = useCallback(() => lenisRef.current, [])

  const contextValue = useMemo<SmoothScrollContextValue>(
    () => ({
      getLenis,
      scrollTo,
      start,
      stop,
    }),
    [getLenis, scrollTo, start, stop],
  )

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  )
}
