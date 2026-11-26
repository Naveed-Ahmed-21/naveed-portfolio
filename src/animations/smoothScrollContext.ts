import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export interface SmoothScrollContextValue {
  getLenis: () => Lenis | null
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number
      duration?: number
      immediate?: boolean
      lock?: boolean
      onComplete?: () => void
    },
  ) => void
  start: () => void
  stop: () => void
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  getLenis: () => null,
  scrollTo: () => {},
  start: () => {},
  stop: () => {},
})

/**
 * Custom hook to access Lenis instance and control smooth scrolling
 */
export function useSmoothScroll() {
  return useContext(SmoothScrollContext)
}

