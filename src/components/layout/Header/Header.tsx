import { useState, useEffect, useRef } from 'react'
import { gsap, useSmoothScroll } from '@/animations'
import { siteConfig } from '@/data'
import { Badge, Button } from '@/components/common'
import styles from './Header.module.css'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const headerRef = useRef<HTMLElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const hasAnimatedRef = useRef(false)
  const { scrollTo, stop, start } = useSmoothScroll()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const runEntrance = () => {
      if (hasAnimatedRef.current || !headerRef.current) return
      hasAnimatedRef.current = true
      gsap.from(headerRef.current, {
        y: -35,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }

    window.addEventListener('intro-complete', runEntrance)
    const timer = setTimeout(runEntrance, 1800)
    return () => {
      window.removeEventListener('intro-complete', runEntrance)
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 24)
      if (y < 80) {
        setActiveSection('hero')
        return
      }
      const docHeight = document.documentElement.scrollHeight
      if (y + window.innerHeight >= docHeight - 260) {
        const contactEl = document.getElementById('contact')
        if (contactEl && contactEl.getBoundingClientRect().top < window.innerHeight * 0.75) {
          setActiveSection('contact')
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Section Observer for active indicator
  useEffect(() => {
    const sectionIds = siteConfig.navItems.map((item) => item.id)
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 80) {
          setActiveSection('hero')
          return
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-18% 0px -55% 0px',
        threshold: 0,
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll & Lenis and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      stop()
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false)
          menuToggleRef.current?.focus()
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.style.overflow = ''
        start()
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.style.overflow = ''
      start()
    }
  }, [mobileMenuOpen, start, stop])

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    document.body.style.overflow = ''
    start()
    if (href.startsWith('#')) {
      const offset = href === '#hero' ? 0 : -76
      scrollTo(href, { offset })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* Personal Monogram Brand */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#hero')
          }}
          className={styles.brand}
          aria-label="Naveed Ahmed K - Back to Top"
        >
          <div className={styles.monogram}>
            <span className={styles.monogramText}>NAK</span>
          </div>
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>Naveed Ahmed K</span>
            <span className={styles.brandRole}>Flutter &amp; Full Stack</span>
          </div>
        </a>

        {/* Minimal Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {siteConfig.navItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id} className={styles.navItem}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className={styles.activeIndicator}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className={styles.actions}>
          <div className={styles.availability}>
            <Badge variant="sage" dot>
              {siteConfig.availability.status === 'available' ? 'Available' : 'Engaged'}
            </Badge>
          </div>

          <Button
            href="#contact"
            variant="primary"
            size="sm"
            magnetic
            className={styles.contactBtn}
          >
            Contact Me
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuToggleRef}
            type="button"
            className={`${styles.menuToggle} ${mobileMenuOpen ? styles.menuOpen : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span className={styles.burgerLine} aria-hidden="true" />
            <span className={styles.burgerLine} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.drawerOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.drawerHeader}>
          <div className={styles.monogram}>
            <span className={styles.monogramText}>NAK</span>
          </div>
          <span className={styles.drawerTitle}>Navigation</span>
        </div>

        <nav className={styles.mobileNav} aria-label="Mobile Navigation">
          <ul className={styles.mobileNavList}>
            {siteConfig.navItems.map((item, idx) => {
              const isActive = activeSection === item.id
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href)
                    }}
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={styles.mobileLinkIndex}>0{idx + 1}</span>
                    <span className={styles.mobileLinkLabel}>{item.label}</span>
                    {isActive && <span className={styles.mobileDot} aria-hidden="true" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={styles.drawerFooter}>
          <div className={styles.drawerAvailability}>
            <Badge variant="sage" dot>
              {siteConfig.availability.message}
            </Badge>
          </div>
          <Button
            href="#contact"
            variant="primary"
            size="md"
            tabIndex={mobileMenuOpen ? 0 : -1}
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#contact')
            }}
            className={styles.drawerCta}
          >
            Contact Me
          </Button>
        </div>
      </div>
    </header>
  )
}
