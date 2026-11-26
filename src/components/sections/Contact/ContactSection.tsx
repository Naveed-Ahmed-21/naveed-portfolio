import { useState, useRef, useEffect } from 'react'
import { gsap, useGSAP } from '@/animations'
import { siteConfig } from '@/data'
import { Container, Button, Badge } from '@/components/common'
import styles from './ContactSection.module.css'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const copyTimerRef = useRef<number | null>(null)
  const [copied, setCopied] = useState(false)

  const verifiedEmail = siteConfig.email || 'naveedsha269@gmail.com'
  const verifiedPhone = siteConfig.phone || '+91 7708325976'
  const linkedInUrl =
    siteConfig.socials.find((s) => s.platform === 'LinkedIn')?.url ||
    'https://linkedin.com/in/naveedahmedk'
  const gitHubUrl =
    siteConfig.socials.find((s) => s.platform === 'GitHub')?.url ||
    'https://github.com/Naveed-Ahmed-21'

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.inView = entry.isIntersecting ? 'true' : 'false'
      },
      { threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
    }
  }, [])

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      if (prefersReducedMotion) return

      if (cardRef.current) {
        gsap.from(cardRef.current, {
          y: 35,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
            once: true,
          },
        })
      }
    },
    { scope: sectionRef },
  )

  const handleCopyEmail = async () => {
    const showCopied = () => {
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
      setCopied(true)
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 2400)
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(verifiedEmail)
        showCopied()
        return
      } catch {
        // Fall through to textarea fallback
      }
    }

    try {
      const textArea = document.createElement('textarea')
      textArea.value = verifiedEmail
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '0'
      textArea.setAttribute('readonly', '')
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      if (successful) {
        showCopied()
      }
    } catch {
      // Inaccessible clipboard
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={styles.contactSection}
      aria-label="Contact and Transmission Terminal"
    >
      <Container narrow>
        {/* Signal Conduit Intake Terminal linking from Journey */}
        <div className={styles.conduitIntakeWrap} aria-hidden="true">
          <div className={styles.intakeConduitLine} />
          <div className={styles.intakeBeacon}>
            <span className={styles.intakeBeaconPulse} />
            <span className={styles.intakeBeaconDot} />
          </div>
          <span className={styles.intakeLabel}>05 // CONTACT CHANNEL</span>
        </div>

        <div ref={cardRef} className={styles.closingCard}>
          {/* Top Status */}
          <div className={styles.topStatus}>
            <Badge variant="sage" dot>
              Open to Opportunities
            </Badge>
            <span className={styles.locationPill}>{siteConfig.location} · Remote / On-Site</span>
          </div>

          {/* Headline & Invitation */}
          <div className={styles.narrativeWrap}>
            <span className={styles.sectionNumber}>DIRECT CONTACT</span>
            <h2 className={styles.heading}>
              Let&apos;s build impactful software <span className={styles.accentText}>together.</span>
            </h2>
            <p className={styles.invitationText}>
              I am actively seeking software engineering roles, internships, and technical collaborations.
              Whether you are looking for a Flutter developer for mobile applications or a full-stack
              engineer for web platforms, feel free to reach out.
            </p>
          </div>

          {/* Direct Email Action */}
          <div className={styles.emailActionBlock}>
            <span className={styles.emailLabel}>Direct Email</span>
            <div className={styles.emailRow}>
              <a
                href={`mailto:${verifiedEmail}`}
                className={styles.emailLink}
                aria-label={`Send email to ${verifiedEmail}`}
              >
                <span className={styles.emailText}>{verifiedEmail}</span>
                <span className={styles.emailArrow} aria-hidden="true">↗</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={styles.copyBtn}
                aria-label="Copy email address to clipboard"
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
            {copied && (
              <span className={styles.copiedNotice} role="status" aria-live="polite">
                Email address copied to clipboard
              </span>
            )}
          </div>

          {/* Direct Channels & Profiles */}
          <div className={styles.channelsFooter}>
            <div className={styles.socialGroup}>
              <a
                href={`tel:${verifiedPhone.replace(/\s+/g, '')}`}
                className={styles.channelLink}
                aria-label={`Call ${verifiedPhone}`}
              >
                <span className={styles.channelIcon}>tel</span>
                <span className={styles.channelName}>{verifiedPhone}</span>
                <span className={styles.externalArrow} aria-hidden="true">↗</span>
              </a>

              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelLink}
              >
                <span className={styles.channelIcon}>in</span>
                <span className={styles.channelName}>LinkedIn</span>
                <span className={styles.externalArrow} aria-hidden="true">↗</span>
              </a>

              <a
                href={gitHubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.channelLink}
              >
                <span className={styles.channelIcon}>gh</span>
                <span className={styles.channelName}>GitHub</span>
                <span className={styles.externalArrow} aria-hidden="true">↗</span>
              </a>
            </div>

            <div className={styles.primaryCta}>
              <Button
                href={`mailto:${verifiedEmail}`}
                variant="primary"
                size="md"
                magnetic
              >
                Initiate Conversation →
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
