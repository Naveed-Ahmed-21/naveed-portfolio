import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

/**
 * Centralized GSAP Configuration
 * Registers plugins and sets consistent animation defaults.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })
}

export { gsap, ScrollTrigger, useGSAP }
export default gsap

