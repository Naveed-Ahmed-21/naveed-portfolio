import type { ReactNode } from 'react'
import styles from './VisualFrames.module.css'

/* ==========================================================================
   1. Smartphone Frame Component
   ========================================================================== */
interface PhoneFrameProps {
  children: ReactNode
  className?: string
  variant?: 'dark' | 'forest'
  orientation?: 'portrait' | 'landscape'
  statusBarTitle?: string
  screenSheen?: boolean
}

export function PhoneFrame({
  children,
  className = '',
  variant = 'dark',
  orientation = 'portrait',
  statusBarTitle = '9:41',
  screenSheen = true,
}: PhoneFrameProps) {
  return (
    <div
      className={`${styles.phoneShell} ${styles[variant]} ${styles[orientation]} ${className}`}
    >
      {/* Side Hardware Buttons */}
      <div className={styles.phoneLeftButtons} aria-hidden="true">
        <div className={styles.phoneVolUp} />
        <div className={styles.phoneVolDown} />
      </div>
      <div className={styles.phoneRightButton} aria-hidden="true">
        <div className={styles.phonePowerBtn} />
      </div>

      {/* Main Bezel */}
      <div className={styles.phoneBezel}>
        {/* Screen Area */}
        <div className={styles.phoneScreen}>
          {/* Subtle screen glass highlight sheen */}
          {screenSheen && <div className={styles.screenGlassSheen} aria-hidden="true" />}

          {/* Status Bar with safe spacing around notch */}
          <div className={styles.phoneStatusBar} aria-hidden="true">
            <span className={styles.phoneTime}>{statusBarTitle}</span>
            <div className={styles.phoneNotchPill} />
            <div className={styles.phoneStatusIcons}>
              {/* Crisp SVG WiFi Icon */}
              <svg width="11" height="9" viewBox="0 0 12 10" fill="currentColor">
                <path d="M6 8.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zm-3.5-3a4.95 4.95 0 017 0 .6.6 0 01-.85.85 3.75 3.75 0 00-5.3 0 .6.6 0 01-.85-.85zm-2.5-3a8.45 8.45 0 0112 0 .6.6 0 11-.85.85 7.25 7.25 0 00-10.3 0 .6.6 0 01-.85-.85z" />
              </svg>
              {/* Crisp SVG Battery Icon */}
              <svg width="14" height="8" viewBox="0 0 16 9" fill="currentColor">
                <rect x="0.5" y="0.5" width="13" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1" />
                <rect x="2" y="2" width="8.5" height="5" rx="1" />
                <path d="M14.5 3h1v3h-1z" />
              </svg>
            </div>
          </div>

          {/* Screen Content */}
          <div className={styles.phoneContent}>{children}</div>

          {/* Home Indicator */}
          <div className={styles.phoneHomeBar} aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   2. Desktop Window Frame Component (Linux / Terminal style)
   ========================================================================== */
interface DesktopWindowFrameProps {
  title: string
  children: ReactNode
  className?: string
  statusTag?: string
}

export function DesktopWindowFrame({
  title,
  children,
  className = '',
  statusTag,
}: DesktopWindowFrameProps) {
  return (
    <div className={`${styles.desktopWindow} ${className}`}>
      {/* Window Title Bar */}
      <div className={styles.windowTitleBar} aria-hidden="true">
        <div className={styles.windowControls}>
          <span className={`${styles.controlDot} ${styles.dotClose}`} />
          <span className={`${styles.controlDot} ${styles.dotMin}`} />
          <span className={`${styles.controlDot} ${styles.dotMax}`} />
        </div>
        <div className={styles.windowTitleText}>
          <span className={styles.terminalPrompt}>$</span>
          <span className={styles.titleTruncate}>{title}</span>
        </div>
        {statusTag ? (
          <span className={styles.windowStatusTag}>{statusTag}</span>
        ) : (
          <div className={styles.windowControlsSpacer} />
        )}
      </div>

      {/* Window Body */}
      <div className={styles.windowBody}>{children}</div>
    </div>
  )
}

/* ==========================================================================
   3. Browser Window Frame Component
   ========================================================================== */
interface BrowserFrameProps {
  url: string
  children: ReactNode
  className?: string
  title?: string
}

export function BrowserFrame({
  url,
  children,
  className = '',
  title,
}: BrowserFrameProps) {
  return (
    <div className={`${styles.browserWindow} ${className}`}>
      {/* Browser Bar */}
      <div className={styles.browserHeader} aria-hidden="true">
        <div className={styles.browserControls}>
          <span className={`${styles.controlDot} ${styles.dotClose}`} />
          <span className={`${styles.controlDot} ${styles.dotMin}`} />
          <span className={`${styles.controlDot} ${styles.dotMax}`} />
        </div>

        {/* Tab Header with SVG Favicon */}
        {title && (
          <div className={styles.browserTab}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '4px', flexShrink: 0 }}>
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span className={styles.tabText}>{title}</span>
          </div>
        )}

        {/* Address Bar with crisp SVG Padlock */}
        <div className={styles.browserAddressBar}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#52745A" strokeWidth="2.5" className={styles.lockIconSvg}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className={styles.urlText}>{url}</span>
        </div>
      </div>

      {/* Viewport Content */}
      <div className={styles.browserContent}>{children}</div>
    </div>
  )
}

/* ==========================================================================
   4. Floating Interface Panel Frame
   ========================================================================== */
interface FloatingPanelProps {
  title?: string
  children: ReactNode
  className?: string
  badge?: string
}

export function FloatingPanel({
  title,
  children,
  className = '',
  badge,
}: FloatingPanelProps) {
  return (
    <div className={`${styles.floatingPanel} ${className}`}>
      {(title || badge) && (
        <div className={styles.panelHeader}>
          {title && <span className={styles.panelTitle}>{title}</span>}
          {badge && <span className={styles.panelBadge}>{badge}</span>}
        </div>
      )}
      <div className={styles.panelContent}>{children}</div>
    </div>
  )
}
