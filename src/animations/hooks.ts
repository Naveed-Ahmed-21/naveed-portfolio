import { useRef } from 'react'
import { gsap } from './gsap'
import { useGSAP } from '@gsap/react'

/**
 * Hook to apply a subtle magnetic attraction effect to interactive elements
 * on fine-pointer desktop devices when reduced motion is not preferred.
 */
export function useMagnetic<T extends HTMLElement = HTMLDivElement>(
  strength: number = 0.35,
) {
  const ref = useRef<T>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el || typeof window === 'undefined') return

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      if (prefersReducedMotion || !isFinePointer) return

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const deltaX = (e.clientX - centerX) * strength
        const deltaY = (e.clientY - centerY) * strength

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.4,
          ease: 'power2.out',
        })
      }

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1.1, 0.4)',
        })
      }

      el.addEventListener('mousemove', onMouseMove)
      el.addEventListener('mouseleave', onMouseLeave)

      return () => {
        el.removeEventListener('mousemove', onMouseMove)
        el.removeEventListener('mouseleave', onMouseLeave)
        gsap.set(el, { clearProps: 'transform' })
      }
    },
    { scope: ref },
  )

  return ref
}
