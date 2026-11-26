import { CrowdStage } from './CrowdStage'
import { FooterInfo } from './FooterInfo'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footerWrapper} role="contentinfo">
      {/* Visual Crowd Illustration Stage (White Background) */}
      <CrowdStage />

      {/* Information Section (Near-Black Background) */}
      <FooterInfo />
    </footer>
  )
}
