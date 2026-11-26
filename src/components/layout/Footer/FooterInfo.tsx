import { siteConfig } from '@/data'
import { useSmoothScroll } from '@/animations'
import { Container } from '@/components/common'
import styles from './FooterInfo.module.css'

const CURRENT_YEAR = new Date().getFullYear()

export function FooterInfo() {
  const { scrollTo } = useSmoothScroll()

  const handleBackToTop = () => {
    scrollTo(0, { duration: 1.4 })
  }

  const linkedInUrl =
    siteConfig.socials.find((s) => s.platform === 'LinkedIn')?.url ||
    'https://linkedin.com/in/naveedahmedk'
  const gitHubUrl =
    siteConfig.socials.find((s) => s.platform === 'GitHub')?.url ||
    'https://github.com/Naveed-Ahmed-21'
  const email = siteConfig.email || 'naveedsha269@gmail.com'
  const phone = siteConfig.phone || '+91 7708325976'

  return (
    <div className={styles.infoSection}>
      <Container>
        {/* Prominent Name Header */}
        <div className={styles.topRow}>
          <div className={styles.brandGroup}>
            <div className={styles.monogram}>
              <span className={styles.monogramText}>NAK</span>
            </div>
            <div className={styles.brandText}>
              <h2 className={styles.prominentName}>{siteConfig.name}</h2>
              <p className={styles.roleTagline}>
                {siteConfig.role} · {siteConfig.location}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className={styles.backToTopBtn}
            aria-label="Back to top of page"
          >
            <span>↑ Back to Top</span>
          </button>
        </div>

        {/* Links and Metadata Row */}
        <div className={styles.bottomRow}>
          <div className={styles.verifiedLinks}>
            <a
              href={`mailto:${email}`}
              className={styles.verifiedLink}
              aria-label={`Send email to ${email}`}
            >
              <span className={styles.linkLabel}>Email</span>
              <span className={styles.linkValue}>{email}</span>
              <span className={styles.linkArrow}>↗</span>
            </a>

            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className={styles.verifiedLink}
              aria-label={`Call ${phone}`}
            >
              <span className={styles.linkLabel}>Phone</span>
              <span className={styles.linkValue}>{phone}</span>
              <span className={styles.linkArrow}>↗</span>
            </a>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.verifiedLink}
            >
              <span className={styles.linkLabel}>LinkedIn</span>
              <span className={styles.linkValue}>in/naveedahmedk</span>
              <span className={styles.linkArrow}>↗</span>
            </a>

            <a
              href={gitHubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.verifiedLink}
            >
              <span className={styles.linkLabel}>GitHub</span>
              <span className={styles.linkValue}>Naveed-Ahmed-21</span>
              <span className={styles.linkArrow}>↗</span>
            </a>
          </div>

          <div className={styles.copyrightNotice}>
            <span>© {CURRENT_YEAR} Naveed Ahmed K. All rights reserved.</span>
            <span className={styles.designSystemTag}>Forest &amp; Ivory Architecture</span>
          </div>
        </div>
      </Container>
    </div>
  )
}

