import { gsap } from './gsap'

/**
 * Standardized easing curves and motion presets for Forest & Ivory
 */
export const EASINGS = {
  expoOut: 'expo.out',
  power2Out: 'power2.out',
  power3Out: 'power3.out',
  power4Out: 'power4.out',
  backOut: 'back.out(1.7)',
  slowMo: 'power1.inOut',
} as const

export const DURATIONS = {
  instant: 0.2,
  fast: 0.4,
  normal: 0.8,
  slow: 1.2,
  deliberate: 1.6,
} as const

/**
 * Check if the user has requested reduced motion
 */
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Fade-up reveal animation helper
 */
export const fadeUp = (
  element: gsap.DOMTarget,
  options: gsap.TweenVars = {},
) => {
  if (isReducedMotion()) return gsap.set(element, { opacity: 1, y: 0 })
  return gsap.from(element, {
    y: 35,
    opacity: 0,
    duration: DURATIONS.normal,
    ease: EASINGS.power3Out,
    ...options,
  })
}

/**
 * Staggered element entrance for lists, card grids, pills, or icons
 */
export const staggerEntrance = (
  elements: gsap.DOMTarget,
  options: {
    trigger?: gsap.DOMTarget
    stagger?: number
    start?: string
    y?: number
    duration?: number
    delay?: number
  } = {},
) => {
  const {
    trigger,
    stagger = 0.1,
    start = 'top 85%',
    y = 35,
    duration = DURATIONS.normal,
    delay = 0,
  } = options

  if (isReducedMotion()) return gsap.set(elements, { opacity: 1, y: 0 })

  const tweenVars: gsap.TweenVars = {
    y,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease: EASINGS.power3Out,
  }

  if (trigger) {
    tweenVars.scrollTrigger = {
      trigger,
      start,
      once: true,
    }
  }

  return gsap.from(elements, tweenVars)
}

/**
 * Backward compatibility alias for staggerFadeUp
 */
export const staggerFadeUp = staggerEntrance

/**
 * Smooth CSS clip-path reveal for images, media frames, or cards
 */
export const imageClipReveal = (
  element: gsap.DOMTarget,
  options: {
    trigger?: gsap.DOMTarget
    start?: string
    duration?: number
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
  } = {},
) => {
  const {
    trigger,
    start = 'top 80%',
    duration = DURATIONS.slow,
    delay = 0,
    direction = 'up',
  } = options

  if (isReducedMotion()) return gsap.set(element, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 })

  let initialClip = 'inset(100% 0% 0% 0%)'
  if (direction === 'down') initialClip = 'inset(0% 0% 100% 0%)'
  if (direction === 'left') initialClip = 'inset(0% 100% 0% 0%)'
  if (direction === 'right') initialClip = 'inset(0% 0% 0% 100%)'

  gsap.set(element, { clipPath: initialClip, opacity: 1 })

  const tweenVars: gsap.TweenVars = {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration,
    delay,
    ease: EASINGS.power4Out,
  }

  if (trigger) {
    tweenVars.scrollTrigger = {
      trigger,
      start,
      once: true,
    }
  }

  return gsap.to(element, tweenVars)
}

/**
 * Parallax element movement linked to scroll scrub
 */
export const createParallax = (
  element: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  speed: number = 0.2, // Negative for slower/reverse, positive for forward
) => {
  if (isReducedMotion()) return

  return gsap.to(element, {
    y: () => speed * 120,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/**
 * Scroll-linked scaling and opacity transition
 */
export const scrollLinkedScale = (
  element: gsap.DOMTarget,
  trigger: gsap.DOMTarget,
  options: {
    fromScale?: number
    toScale?: number
    fromOpacity?: number
    toOpacity?: number
    start?: string
    end?: string
  } = {},
) => {
  if (isReducedMotion()) return

  const {
    fromScale = 0.95,
    toScale = 1.05,
    fromOpacity = 0.85,
    toOpacity = 1,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  gsap.set(element, { scale: fromScale, opacity: fromOpacity })

  return gsap.to(element, {
    scale: toScale,
    opacity: toOpacity,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  })
}

/**
 * Word-by-word text split and reveal utility without external plugin dependencies
 */
export const splitWordReveal = (
  element: HTMLElement,
  options: {
    trigger?: gsap.DOMTarget
    start?: string
    stagger?: number
    duration?: number
    delay?: number
  } = {},
) => {
  if (isReducedMotion()) return

  const {
    trigger,
    start = 'top 85%',
    stagger = 0.04,
    duration = DURATIONS.normal,
    delay = 0,
  } = options

  // Split words if not already wrapped
  if (!element.querySelector('.word-mask')) {
    const rawText = element.textContent || ''
    const words = rawText.trim().split(/\s+/)
    element.innerHTML = words
      .map(
        (word) =>
          `<span class="word-mask" style="display:inline-block;overflow:hidden;vertical-align:top;margin-right:0.28em;"><span class="word-inner" style="display:inline-block;will-change:transform;">${word}</span></span>`,
      )
      .join(' ')
  }

  const wordInners = element.querySelectorAll('.word-inner')

  gsap.set(wordInners, { y: '115%', opacity: 0 })

  const tweenVars: gsap.TweenVars = {
    y: '0%',
    opacity: 1,
    duration,
    stagger,
    delay,
    ease: EASINGS.power3Out,
  }

  if (trigger) {
    tweenVars.scrollTrigger = {
      trigger,
      start,
      once: true,
    }
  }

  return gsap.to(wordInners, tweenVars)
}

/**
 * Character-by-character reveal for key brand headings
 */
export const splitCharReveal = (
  element: HTMLElement,
  options: {
    trigger?: gsap.DOMTarget
    start?: string
    stagger?: number
    duration?: number
    delay?: number
  } = {},
) => {
  if (isReducedMotion()) return

  const {
    trigger,
    start = 'top 85%',
    stagger = 0.02,
    duration = DURATIONS.fast,
    delay = 0,
  } = options

  if (!element.querySelector('.char-mask')) {
    const rawText = element.textContent || ''
    const chars = Array.from(rawText)
    element.innerHTML = chars
      .map((char) =>
        char === ' '
          ? '<span style="display:inline-block;width:0.3em;">&nbsp;</span>'
          : `<span class="char-mask" style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="char-inner" style="display:inline-block;will-change:transform;">${char}</span></span>`,
      )
      .join('')
  }

  const charInners = element.querySelectorAll('.char-inner')

  gsap.set(charInners, { y: '120%', opacity: 0 })

  const tweenVars: gsap.TweenVars = {
    y: '0%',
    opacity: 1,
    duration,
    stagger,
    delay,
    ease: EASINGS.power4Out,
  }

  if (trigger) {
    tweenVars.scrollTrigger = {
      trigger,
      start,
      once: true,
    }
  }

  return gsap.to(charInners, tweenVars)
}

/**
 * Horizontal scroll section pinning helper
 */
export const horizontalScrollSection = (
  container: HTMLElement,
  panels: HTMLElement[],
) => {
  if (isReducedMotion() || panels.length <= 1) return

  return gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => `+=${container.offsetWidth}`,
    },
  })
}

/**
 * Section transition effect (subtle background/scale shift entering viewport)
 */
export const sectionTransition = (
  section: gsap.DOMTarget,
  options: {
    start?: string
    y?: number
  } = {},
) => {
  if (isReducedMotion()) return

  const { start = 'top 90%', y = 25 } = options

  return gsap.from(section, {
    y,
    opacity: 0.92,
    duration: DURATIONS.slow,
    ease: EASINGS.power2Out,
    scrollTrigger: {
      trigger: section,
      start,
      once: true,
    },
  })
}
