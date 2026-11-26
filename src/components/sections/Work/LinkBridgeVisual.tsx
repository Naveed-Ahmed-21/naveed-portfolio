import { useEffect, useRef, useState, useCallback } from 'react'
import { PhoneFrame, DesktopWindowFrame } from './VisualFrames'
import styles from './LinkBridgeVisual.module.css'

export function LinkBridgeVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [syncStage, setSyncStage] = useState<'idle' | 'transmitting' | 'synced'>('synced')
  const [fileProgress, setFileProgress] = useState(100)

  // IntersectionObserver to pause offscreen loops
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const timersRef = useRef<number[]>([])

  // Choreographed transmission replay interaction
  const triggerReSync = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []

    setSyncStage('transmitting')
    setFileProgress(45)

    const timer1 = window.setTimeout(() => {
      setFileProgress(88)
    }, 900)

    const timer2 = window.setTimeout(() => {
      setFileProgress(100)
      setSyncStage('synced')
    }, 1800)

    timersRef.current = [timer1, timer2]
  }, [])

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id))
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${styles.schematicCanvas} ${isInView ? styles.inView : styles.paused}`}
      role="region"
      aria-label="Interactive LinkBridge connectivity preview"
    >
      {/* Background blueprint architectural matrix */}
      <div className={styles.blueprintGrid} aria-hidden="true" />

      {/* Illustrative System Disclaimer Tag */}
      <div className={styles.illustrativeBanner}>
        <div className={styles.bannerContent}>
          <span className={styles.bannerDot} />
          <span className={styles.bannerText}>
            ILLUSTRATIVE SYSTEM PREVIEW // LOCAL DEVICE CONNECTIVITY
          </span>
        </div>
        <button
          type="button"
          className={styles.reSyncBtn}
          onClick={triggerReSync}
          title="Replay Choreographed Transmission"
          aria-label="Replay device synchronization sequence"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
          <span>{syncStage === 'transmitting' ? 'SYNCING...' : 'RE-SYNC BRIDGE'}</span>
        </button>
      </div>

      {/* Main Asymmetric Connected Architecture Scene */}
      <div className={styles.bridgeDiagram}>
        {/* Left Side: Android Mobile Client in Perspective */}
        <div className={styles.phonePerspectiveWrapper}>
          <PhoneFrame
            variant="dark"
            statusBarTitle="09:41"
            className={styles.asymmetricPhone}
          >
            <div className={styles.phoneScreenContent}>
              {/* Client Status Header */}
              <div className={styles.clientHeader}>
                <div className={styles.deviceStatus}>
                  <span className={`${styles.statusDotLive} ${syncStage === 'transmitting' ? styles.dotPulsing : ''}`} />
                  <span className={styles.clientTitle}>Android Node</span>
                </div>
                <span className={styles.ipBadge}>192.168.1.88</span>
              </div>

              {/* Paired Host Card */}
              <div className={styles.connectedCard}>
                <div className={styles.cardHeaderSmall}>
                  <span className={styles.cardType}>PAIRED WORKSTATION</span>
                  <span className={styles.lockBadge}>LAN PAIR</span>
                </div>
                <div className={styles.hostName}>Linux-Desktop</div>
                <div className={styles.subDetail}>Local Socket Session · Sample View</div>
              </div>

              {/* Real-Time Sync Interface Cards */}
              <div className={styles.syncCard}>
                {/* Clipboard Item */}
                <div className={`${styles.syncItem} ${syncStage === 'transmitting' ? styles.itemActiveGlow : ''}`}>
                  <div className={styles.syncIconWrap}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </div>
                  <div className={styles.syncMeta}>
                    <span className={styles.syncLabel}>Clipboard Synced</span>
                    <span className={styles.syncValue}>"git checkout main"</span>
                  </div>
                  <span className={styles.syncTick}>{syncStage === 'transmitting' ? '⋯' : '✓'}</span>
                </div>

                {/* File Transfer Item with Active Progress */}
                <div className={styles.syncItem}>
                  <div className={styles.syncIconWrap}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                  <div className={styles.syncMeta}>
                    <div className={styles.syncRowJustified}>
                      <span className={styles.syncLabel}>File Transfer</span>
                      <span className={styles.percentText}>{fileProgress}%</span>
                    </div>
                    <span className={styles.syncValue}>payload.tar.gz (48MB)</span>
                    <div className={styles.miniProgressBar}>
                      <div
                        className={styles.miniProgressFill}
                        style={{ width: `${fileProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* P2P Active State */}
              <div className={styles.serviceStatus}>
                <span className={styles.heartbeatPulse} />
                <span>LOCAL SOCKET PREVIEW</span>
              </div>
            </div>
          </PhoneFrame>
        </div>

        {/* Central Complex Transmission Architecture (Curved Multi-Layer SVG) */}
        <div className={styles.centralBridge}>
          {/* Multi-tier SVG Transmission Cables */}
          <svg className={styles.bridgeSvg} viewBox="0 0 220 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="primaryCableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#52745A" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#B8E986" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#52745A" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="returnCableGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D9BFA3" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#D9BFA3" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#D9BFA3" stopOpacity="0.2" />
              </linearGradient>
              <filter id="pulseGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Cable 1: Upper Outgoing Socket Stream (Curved Parabola) */}
            <path d="M 0 40 C 60 10, 160 10, 220 40" className={styles.cableTrackBase} />
            <path d="M 0 40 C 60 10, 160 10, 220 40" className={styles.cableTrackPulsePrimary} filter="url(#pulseGlow)" />

            {/* Cable 2: Lower Return Acknowledgment Stream */}
            <path d="M 220 80 C 160 110, 60 110, 0 80" className={styles.cableTrackBaseReturn} />
            <path d="M 220 80 C 160 110, 60 110, 0 80" className={styles.cableTrackPulseReturn} filter="url(#pulseGlow)" />

            {/* Center Cross Connection Bus Line */}
            <line x1="110" y1="25" x2="110" y2="95" className={styles.cableBusLine} />

            {/* Node Junction Points with Radiant Rings */}
            <circle cx="110" cy="25" r="4.5" className={styles.junctionNode} />
            <circle cx="110" cy="25" r="8" className={styles.junctionRing} />
            <circle cx="110" cy="95" r="4.5" className={styles.junctionNodeReturn} />
            <circle cx="110" cy="95" r="8" className={styles.junctionRing} />
          </svg>

          {/* Telemetry Hub with Live Directional Flow Readouts */}
          <div className={styles.telemetryHub}>
            <div className={styles.telemetryBadge}>
              <span className={styles.telemetryDotGreen} />
              <span>MUTUAL TLS</span>
            </div>
            <div className={styles.directionalBadge}>
              <span className={styles.streamArrow}>➔</span>
              <span>CHUNKED TRANSFER</span>
            </div>
            <div className={styles.telemetryBadge}>
              <span className={styles.telemetryDotAmber} />
              <span>mDNS DISCOVERY</span>
            </div>
          </div>
        </div>

        {/* Right Side: Linux Desktop Window in Layered Scale */}
        <div className={styles.desktopPerspectiveWrapper}>
          <DesktopWindowFrame
            title="linkbridge_desktop"
            statusTag="SAS PAIRED (SAMPLE)"
            className={styles.asymmetricTerminal}
          >
            <div className={styles.terminalContent}>
              <div className={styles.termRow}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}>linkbridge_desktop --listen</span>
              </div>
              <div className={styles.termLogLine}>
                <span className={styles.logTagInfo}>[INIT]</span>
                <span>mDNS service advertised on local Wi-Fi</span>
              </div>
              <div className={styles.termLogLine}>
                <span className={styles.logTagOk}>[AUTH]</span>
                <span>Sample preview: cert pin + SAS pairing</span>
              </div>
              <div className={styles.termLogLine}>
                <span className={styles.logTagSync}>[SYNC]</span>
                <span>Clipboard synced with Android companion</span>
              </div>
              <div className={`${styles.termLogLine} ${syncStage === 'transmitting' ? styles.logActiveHighlight : ''}`}>
                <span className={styles.logTagRecv}>[RECV]</span>
                <span>sample-bundle.zip [{fileProgress}%] preview</span>
              </div>
              <div className={styles.termCursorLine}>
                <span className={styles.termPrompt}>&gt;</span>
                <span className={styles.termCursor} />
              </div>
            </div>
          </DesktopWindowFrame>
        </div>
      </div>

      {/* Protocol Watermark */}
      <div className={styles.protocolWatermark}>
        <span>OPEN-SOURCE REPO // FLUTTER + DART + LINUX // LOCAL CONNECTIVITY PREVIEW</span>
      </div>
    </div>
  )
}
