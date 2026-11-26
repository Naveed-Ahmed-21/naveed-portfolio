import { useState, useEffect, useRef } from 'react'
import type { Project, ProjectImage } from '@/types'
import { Badge, Button, ProjectGallery } from '@/components/common'
import {
  PhoneFrame,
  DesktopWindowFrame,
  BrowserFrame,
  FloatingPanel,
} from './VisualFrames'
import styles from './ExhibitionGallery.module.css'

interface ExhibitionGalleryProps {
  projects: Project[]
  onOpenGallery?: (images: ProjectImage[], index: number, title: string) => void
}

/* ==========================================================================
   Bespoke Visual 01: Dual Tap Game (Split-Screen Two-Player Territory Game)
   ========================================================================== */
function DualTapVisual() {
  const [blueShare, setBlueShare] = useState<number>(42)
  const [scoreA, setScoreA] = useState<number>(90)
  const [scoreB, setScoreB] = useState<number>(55)

  const handlePlayerTap = (player: 'A' | 'B') => {
    if (player === 'A') {
      setBlueShare((prev) => Math.max(12, prev - 4))
      setScoreA((s) => s + 5)
    } else {
      setBlueShare((prev) => Math.min(88, prev + 4))
      setScoreB((s) => s + 5)
    }
  }

  const resetMatch = () => {
    setBlueShare(50)
    setScoreA(0)
    setScoreB(0)
  }

  const leader = blueShare > 50 ? 'PLAYER B LEADING' : blueShare < 50 ? 'PLAYER A LEADING' : '50 / 50 TIED'

  return (
    <div
      className={styles.visualCanvas}
      role="region"
      aria-label="Interactive Dual Tap Game split-screen preview"
    >
      <div className={styles.arenaSplitLines} aria-hidden="true" />

      <div className={styles.simDisclaimer}>
        <span>* INTERACTIVE PREVIEW // TWO-PLAYER TERRITORY TAP GAME</span>
      </div>

      <div className={styles.arenaScene}>
        <div className={styles.dualTapPhoneWrap}>
          <PhoneFrame
            variant="forest"
            statusBarTitle="DUAL TAP // FLUTTER"
            className={styles.dualTapPhone}
          >
            <div className={styles.dualTapScreen}>
              {/* Player B Top Zone (Blue) */}
              <button
                type="button"
                onClick={() => handlePlayerTap('B')}
                className={styles.dualTapP2}
                style={{
                  flex: blueShare,
                  background: '#3C7EFF',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.45rem 0.6rem',
                  cursor: 'pointer',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                }}
                aria-label="Tap for Player B (Blue) +5 points and +4% territory"
              >
                <span className={styles.playerTag} style={{ color: '#FFFFFF' }}>
                  PLAYER B
                </span>
                <strong style={{ fontSize: '0.95rem', fontWeight: 800 }}>{scoreB}</strong>
              </button>

              <div className={styles.dualTapDivider}>
                <span className={styles.dividerPill}>{leader}</span>
                <span className={styles.dividerTimer}>+4% / +5 PTS</span>
              </div>

              {/* Player A Bottom Zone (Red) */}
              <button
                type="button"
                onClick={() => handlePlayerTap('A')}
                className={styles.dualTapP1}
                style={{
                  flex: 100 - blueShare,
                  transform: 'none',
                  background: '#EF625D',
                  color: '#FFFFFF',
                  border: 'none',
                  borderBottom: 'none',
                  padding: '0.45rem 0.6rem',
                  cursor: 'pointer',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}
                aria-label="Tap for Player A (Red) +5 points and +4% territory"
              >
                <span className={styles.playerTag} style={{ color: '#FFFFFF' }}>
                  PLAYER A
                </span>
                <strong style={{ fontSize: '0.95rem', fontWeight: 800 }}>{scoreA}</strong>
              </button>
            </div>
          </PhoneFrame>
        </div>

        <FloatingPanel title="Territory Match" badge="Interactive" className={styles.dualTapPanel}>
          <div className={styles.panelMetricRow}>
            <span>Blue / Red Split</span>
            <strong className={styles.metricValGreen}>{blueShare}% / {100 - blueShare}%</strong>
          </div>
          <div className={styles.panelMetricRow}>
            <span>Tap Step</span>
            <strong className={styles.metricValAmber}>+4% · +5 Pts</strong>
          </div>
          <button
            type="button"
            className={styles.testTapBtn}
            onClick={resetMatch}
            title="Reset split-screen match to 50/50"
            aria-label="Reset split-screen match"
          >
            <span>RESET 50/50 ↺</span>
          </button>
        </FloatingPanel>
      </div>
    </div>
  )
}

/* ==========================================================================
   Bespoke Visual 02: CampusHub (Academic Knowledge & Syllabus Portal)
   ========================================================================== */
function CampusHubVisual() {
  const [role, setRole] = useState<'student' | 'faculty'>('student')

  return (
    <div
      className={styles.visualCanvas}
      role="region"
      aria-label="Interactive CampusHub portal preview"
    >
      <div className={styles.simDisclaimer}>
        <span>* ILLUSTRATIVE ACADEMIC PLATFORM // STUDENT &amp; FACULTY PORTAL</span>
      </div>

      <BrowserFrame
        url={role === 'student' ? 'https://campushub.edu/student/announcements' : 'https://campushub.edu/faculty/evaluations'}
        title="CampusHub Academic Portal"
        className={styles.campusBrowser}
      >
        <div className={styles.campusScreen}>
          {/* Top Bar with Interactive Role Switcher */}
          <div className={styles.campusTopNav}>
            <div className={styles.campusBrand}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#52745A" strokeWidth="2" aria-hidden="true">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span className={styles.campusName}>CampusHub Portal</span>
            </div>
            <div className={styles.roleToggleGroup} role="group" aria-label="Portal role view">
              <button
                type="button"
                aria-pressed={role === 'student'}
                className={`${styles.roleBtn} ${role === 'student' ? styles.roleBtnActive : ''}`}
                onClick={() => setRole('student')}
              >
                Student View
              </button>
              <button
                type="button"
                aria-pressed={role === 'faculty'}
                className={`${styles.roleBtn} ${role === 'faculty' ? styles.roleBtnActive : ''}`}
                onClick={() => setRole('faculty')}
              >
                Faculty Portal
              </button>
            </div>
          </div>

          {/* Conditional Content based on Active Role */}
          {role === 'student' ? (
            <>
              {/* Department Notice Card */}
              <div className={styles.announcementCard}>
                <div className={styles.annHeader}>
                  <span className={styles.annBadge}>DEPARTMENT NOTICE</span>
                  <span className={styles.annTime}>Today, 10:30 AM</span>
                </div>
                <div className={styles.annTitle}>
                  CS-401: Distributed Systems End-Semester Schedule
                </div>
                <div className={styles.annBody}>
                  All laboratory source codes and viva submissions must be finalized by Friday 5:00 PM.
                </div>
              </div>

              {/* Syllabus Repository File Shelf with Crisp SVG Icons */}
              <div className={styles.repositoryList}>
                <div className={styles.repoFile}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52745A" strokeWidth="2" className={styles.fileIconSvg}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>cs401_distributed_systems_syllabus.pdf</span>
                    <span className={styles.fileSize}>2.4 MB · Updated 2d ago</span>
                  </div>
                  <span className={styles.downloadIcon}>↓</span>
                </div>
                <div className={styles.repoFile}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#52745A" strokeWidth="2" className={styles.fileIconSvg}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <div className={styles.fileDetails}>
                    <span className={styles.fileName}>lab_assignment_03_socket_spec.pdf</span>
                    <span className={styles.fileSize}>1.1 MB · Updated 4d ago</span>
                  </div>
                  <span className={styles.downloadIcon}>↓</span>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.facultyPanel}>
              <div className={styles.facultyHeaderRow}>
                <span className={styles.facultyTitle}>SUBMISSIONS REVIEW // 48 ENROLLED</span>
                <span className={styles.evalTag}>38 SUBMITTED</span>
              </div>
              <div className={styles.submissionRow}>
                <span>Alex M. — Lab Assignment 03</span>
                <span className={styles.badgeReviewed}>REVIEWED (9.5/10)</span>
              </div>
              <div className={styles.submissionRow}>
                <span>Sarah K. — Socket Spec Implementation</span>
                <span className={styles.badgePending}>PENDING VIVA</span>
              </div>
            </div>
          )}
        </div>
      </BrowserFrame>
    </div>
  )
}

/* ==========================================================================
   Bespoke Visual 03: Chat-X (Real-Time Messaging Client)
   ========================================================================== */
function ChatXVisual() {
  const [messages, setMessages] = useState<Array<{ sender: string; text: string; out?: boolean; time: string }>>([
    { sender: 'Alex', text: 'Did you share the project presentation slides?', time: '09:40' },
    { sender: 'You', text: 'Uploaded to the chat media hub — Firestore sync updated!', out: true, time: '09:41' },
    { sender: 'Sarah', text: 'Voice note played cleanly on Android client.', time: '09:41' },
  ])

  const sendTestMessage = () => {
    setMessages((prev) => [
      ...prev,
      { sender: 'You', text: 'Sample message synced via Cloud Firestore ✓✓', out: true, time: '09:42' },
    ])
  }

  return (
    <div
      className={styles.visualCanvas}
      role="region"
      aria-label="Interactive Chat-X messaging preview"
    >
      <div className={styles.simDisclaimer}>
        <span>* ILLUSTRATIVE PREVIEW // FLUTTER + CLOUD FIRESTORE MESSAGING</span>
      </div>

      <div className={styles.chatScene}>
        <div className={styles.chatPhoneWrap}>
          <PhoneFrame
            variant="dark"
            statusBarTitle="09:41"
            className={styles.chatPhone}
          >
            <div className={styles.chatScreen}>
              {/* Room Header */}
              <div className={styles.chatRoomHeader}>
                <div className={styles.avatarCircle}>CX</div>
                <div className={styles.chatRoomMeta}>
                  <div className={styles.chatRoomName}>Dev Core Channel</div>
                  <div className={styles.chatOnline}>● 4 members connected</div>
                </div>
              </div>

              {/* Conversation Stream */}
              <div className={styles.chatBubbleStream}>
                {messages.map((m, i) => (
                  <div key={i} className={m.out ? styles.outgoingBubble : styles.incomingBubble}>
                    {!m.out && <span className={styles.bubbleSender}>{m.sender}</span>}
                    <p>{m.text}</p>
                    <div className={m.out ? styles.bubbleMetaOut : styles.bubbleMetaIn}>
                      <span>{m.time}</span>
                      {m.out && <span className={styles.ticksDouble}>✓✓</span>}
                    </div>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                  <span className={styles.typingDot} />
                </div>
              </div>

              {/* Message Input Bar with Send Action */}
              <div className={styles.chatInputBar}>
                <span className={styles.inputPlaceholder}>Write a message...</span>
                <button
                  type="button"
                  className={styles.sendBtn}
                  onClick={sendTestMessage}
                  title="Simulate Dispatch Message"
                  aria-label="Simulate sending a message"
                >
                  ➤
                </button>
              </div>
            </div>
          </PhoneFrame>
        </div>

        {/* Cloud & Media Storage Panel */}
        <FloatingPanel title="Cloud Firestore" badge="GetX · Auth" className={styles.chatPanel}>
          <div className={styles.panelMetricRow}>
            <span>Chat Sync</span>
            <strong className={styles.metricValGreen}>FIRESTORE</strong>
          </div>
          <div className={styles.panelMetricRow}>
            <span>Media Upload</span>
            <strong className={styles.metricValAmber}>CLOUDINARY</strong>
          </div>
        </FloatingPanel>
      </div>
    </div>
  )
}

/* ==========================================================================
   Bespoke Visual 04: CPMS (Recruitment & Drive Scheduling Portal)
   ========================================================================== */
function CpmsVisual() {
  const [filter, setFilter] = useState<'all' | 'high_cgpa' | 'scheduled'>('all')

  return (
    <div
      className={styles.visualCanvas}
      role="region"
      aria-label="Interactive Campus Placement Management System preview"
    >
      <div className={styles.simDisclaimer}>
        <span>* ILLUSTRATIVE RECRUITMENT PORTAL // DRIVE MANAGEMENT CONSOLE</span>
      </div>

      <DesktopWindowFrame
        title="cpms-admin-console --placement-drives"
        statusTag="ELIGIBILITY ENGINE ACTIVE"
        className={styles.cpmsTerminal}
      >
        <div className={styles.cpmsScreen}>
          {/* Interactive Filter Navigation Bar */}
          <div className={styles.filterBar} role="group" aria-label="Filter campus drives">
            <button
              type="button"
              aria-pressed={filter === 'all'}
              className={`${styles.filterBtn} ${filter === 'all' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('all')}
            >
              All Drives (3)
            </button>
            <button
              type="button"
              aria-pressed={filter === 'high_cgpa'}
              className={`${styles.filterBtn} ${filter === 'high_cgpa' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('high_cgpa')}
            >
              CGPA &gt;= 7.50
            </button>
            <button
              type="button"
              aria-pressed={filter === 'scheduled'}
              className={`${styles.filterBtn} ${filter === 'scheduled' ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter('scheduled')}
            >
              Scheduled Only
            </button>
            <span className={styles.filterStatus}>142 Eligible</span>
          </div>

          {/* Drive Eligibility Matrix Table */}
          <div className={styles.driveMatrix}>
            <div className={styles.matrixHeader}>
              <span>COMPANY DRIVE</span>
              <span>ROLE</span>
              <span>ELIGIBLE</span>
              <span>STATUS</span>
            </div>

            <div className={styles.matrixRow}>
              <strong className={styles.companyName}>Tech Corp Inc.</strong>
              <span>Full-Stack Engineer</span>
              <span className={styles.eligibleCount}>142 / 180</span>
              <span className={styles.statusScheduled}>SCHEDULED</span>
            </div>

            {filter !== 'scheduled' && (
              <div className={styles.matrixRow}>
                <strong className={styles.companyName}>Cloud Scale Systems</strong>
                <span>DevOps Associate</span>
                <span className={styles.eligibleCount}>98 / 180</span>
                <span className={styles.statusActive}>INTERVIEWING</span>
              </div>
            )}

            {filter === 'all' && (
              <div className={styles.matrixRow}>
                <strong className={styles.companyName}>NextGen AI Labs</strong>
                <span>Mobile Developer</span>
                <span className={styles.eligibleCount}>76 / 180</span>
                <span className={styles.statusReview}>RESUME REVIEW</span>
              </div>
            )}
          </div>
        </div>
      </DesktopWindowFrame>
    </div>
  )
}

/* ==========================================================================
   Bespoke Visual 05: Smart Canteen (Dual Pre-Order & Kitchen Display Pipeline)
   ========================================================================== */
function SmartCanteenVisual() {
  const [orderStatus, setOrderStatus] = useState<'prep' | 'ready'>('prep')

  const toggleOrderStatus = () => {
    setOrderStatus((prev) => (prev === 'prep' ? 'ready' : 'prep'))
  }

  return (
    <div
      className={styles.visualCanvas}
      role="region"
      aria-label="Interactive Smart Canteen pre-order and kitchen display preview"
    >
      <div className={styles.simDisclaimer}>
        <span>* ILLUSTRATIVE ORDER PIPELINE // STUDENT PRE-ORDER &amp; KITCHEN KDS</span>
      </div>

      <div className={styles.splitPipeline}>
        {/* Left Column: Student Mobile Ticket */}
        <div className={styles.studentCol}>
          <PhoneFrame
            variant="forest"
            statusBarTitle="12:15"
            className={styles.miniPhoneCanteen}
          >
            <div className={styles.ticketScreen}>
              <div className={styles.ticketTop}>
                <span className={styles.ticketBadge}>STUDENT TICKET</span>
                <span className={styles.orderNo}>#1042</span>
              </div>
              <div className={styles.ticketItems}>
                <div className={styles.ticketItemRow}>
                  <span>1x Veg Fried Rice</span>
                  <strong>₹60</strong>
                </div>
                <div className={styles.ticketItemRow}>
                  <span>1x Fresh Lime Juice</span>
                  <strong>₹40</strong>
                </div>
              </div>
              <div className={orderStatus === 'prep' ? styles.ticketStatusPrep : styles.ticketStatusReady}>
                <span className={orderStatus === 'prep' ? styles.pulseOrange : styles.pulseGreen} />
                <span>{orderStatus === 'prep' ? 'IN KITCHEN PREPARATION' : 'READY FOR PICKUP ✓'}</span>
              </div>
            </div>
          </PhoneFrame>
        </div>

        {/* Central Pipeline Sync Channel */}
        <div className={styles.pipelineArrow} aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D9BFA3" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          <span className={styles.arrowLabel}>ORDER STATUS FLOW</span>
        </div>

        {/* Right Column: Kitchen Display System Browser */}
        <div className={styles.kitchenCol}>
          <BrowserFrame
            url="https://canteen.internal/kitchen-kds"
            title="Kitchen Order Display"
            className={styles.kitchenBrowser}
          >
            <div className={styles.kitchenScreen}>
              <div className={styles.kdsHeader}>
                <span className={styles.kdsLiveDot} />
                <span>LIVE QUEUE ({orderStatus === 'prep' ? '1 ACTIVE' : '0 PENDING'})</span>
              </div>
              <div className={styles.orderCardActive}>
                <div className={styles.orderCardTop}>
                  <strong>TICKET #1042</strong>
                  <span className={styles.prepTimer}>
                    {orderStatus === 'prep' ? '04:12 mins' : 'COMPLETED'}
                  </span>
                </div>
                <ul className={styles.kdsItemList}>
                  <li>• 1x Veg Fried Rice</li>
                  <li>• 1x Fresh Lime Juice</li>
                </ul>
                <div className={styles.kdsAction}>
                  <button
                    type="button"
                    className={styles.kdsDoneBtn}
                    onClick={toggleOrderStatus}
                    title="Click to toggle ticket readiness"
                  >
                    {orderStatus === 'prep' ? 'MARK READY ➔' : 'RESET TICKET ↺'}
                  </button>
                </div>
              </div>
            </div>
          </BrowserFrame>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   Bespoke Visual 06: Lingo Breeze (My Vocabulary — Clean Architecture + Riverpod)
   ========================================================================== */
const SAMPLE_VOCAB_WORDS = [
  { word: 'Serene', meaning: 'Calm, peaceful, and untroubled' },
  { word: 'Resilient', meaning: 'Able to recover cleanly under stress' },
  { word: 'Concise', meaning: 'Clear and brief without filler' },
]

function LingoBreezeVisual() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [savedWords, setSavedWords] = useState<string[]>(['Serene'])
  const [viewState, setViewState] = useState<'loaded' | 'empty'>('loaded')

  const activeEntry = SAMPLE_VOCAB_WORDS[selectedIndex]
  const isSaved = savedWords.includes(activeEntry.word)

  const toggleSaveWord = () => {
    setSavedWords((prev) =>
      prev.includes(activeEntry.word)
        ? prev.filter((w) => w !== activeEntry.word)
        : [...prev, activeEntry.word],
    )
  }

  return (
    <div
      className={styles.visualCanvas}
      role="region"
      aria-label="Interactive Lingo Breeze My Vocabulary preview"
    >
      <div className={styles.simDisclaimer}>
        <span>* ILLUSTRATIVE PREVIEW // MY VOCABULARY · RIVERPOD + FIRESTORE</span>
      </div>

      <div className={styles.lingoScene}>
        <div className={styles.lingoPhoneWrap}>
          <PhoneFrame
            variant="forest"
            statusBarTitle="My Vocabulary"
            className={styles.lingoPhone}
          >
            <div className={styles.lingoScreen}>
              <div className={styles.lingoTopBar}>
                <div className={styles.streakBadge} style={{ background: 'rgba(82, 116, 90, 0.14)', color: '#354B3A' }}>
                  <span>RIVERPOD // M3</span>
                </div>
                <span className={styles.xpCounter}>{savedWords.length} SAVED</span>
              </div>

              {viewState === 'empty' ? (
                <div className={styles.flashCard} style={{ cursor: 'default' }}>
                  <span className={styles.cardLang}>EMPTY STATE HANDLER</span>
                  <div className={styles.vocabWord} style={{ fontSize: '0.95rem' }}>No Words Fetched</div>
                  <div className={styles.definitionText}>
                    Clean Architecture empty-state fallback ready for API retry.
                  </div>
                </div>
              ) : (
                <div className={styles.flashCard} style={{ cursor: 'default' }}>
                  <span className={styles.cardLang}>NODE.JS API // VOCABULARY</span>
                  <div className={styles.vocabWord}>{activeEntry.word}</div>
                  <div className={styles.definitionText}>{activeEntry.meaning}</div>
                  <div className={styles.flipHint}>
                    {isSaved ? 'Saved in Cloud Firestore ✓' : 'Ready to save to Firestore'}
                  </div>
                </div>
              )}

              <div className={styles.recallButtons}>
                <button
                  type="button"
                  className={styles.rateBtnHard}
                  style={{ background: 'rgba(82, 116, 90, 0.12)', color: '#354B3A' }}
                  onClick={() => {
                    setViewState('loaded')
                    setSelectedIndex((i) => (i + 1) % SAMPLE_VOCAB_WORDS.length)
                  }}
                >
                  NEXT WORD
                </button>
                <button
                  type="button"
                  className={styles.rateBtnGood}
                  style={{
                    background: isSaved ? '#354B3A' : 'rgba(82, 116, 90, 0.2)',
                    color: isSaved ? '#FFFFFF' : '#354B3A',
                  }}
                  onClick={() => {
                    setViewState('loaded')
                    toggleSaveWord()
                  }}
                >
                  {isSaved ? 'SAVED ✓' : 'SAVE WORD'}
                </button>
                <button
                  type="button"
                  className={styles.rateBtnEasy}
                  onClick={() => setViewState((s) => (s === 'loaded' ? 'empty' : 'loaded'))}
                >
                  {viewState === 'loaded' ? 'EMPTY' : 'FETCH'}
                </button>
              </div>
            </div>
          </PhoneFrame>
        </div>

        <FloatingPanel title="Clean Architecture" badge="Firestore" className={styles.lingoPanel}>
          <div className={styles.panelMetricRow}>
            <span>Word Fetch</span>
            <strong className={styles.metricValGreen}>Node.js API</strong>
          </div>
          <div className={styles.panelMetricRow}>
            <span>Saved Count</span>
            <strong className={styles.metricValAmber}>{savedWords.length} Words</strong>
          </div>
        </FloatingPanel>
      </div>
    </div>
  )
}

/* ==========================================================================
   Helper Mapping: Connect Project IDs to Bespoke Visual Environments
   ========================================================================== */
function renderProjectVisual(projectId: string) {
  switch (projectId) {
    case 'dual-tap-game':
      return <DualTapVisual />
    case 'campushub':
      return <CampusHubVisual />
    case 'chat-x':
      return <ChatXVisual />
    case 'campus-placement-system':
      return <CpmsVisual />
    case 'smart-canteen':
      return <SmartCanteenVisual />
    case 'lingo-breeze':
      return <LingoBreezeVisual />
    default:
      return null
  }
}

/* ==========================================================================
   Main Exhibition Gallery Component
   ========================================================================== */
export function ExhibitionGallery({ projects, onOpenGallery }: ExhibitionGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver to pause offscreen CSS animations cleanly
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          target.dataset.inView = entry.isIntersecting ? 'true' : 'false'
        })
      },
      { threshold: 0.08 },
    )

    const articles = el.querySelectorAll('article')
    articles.forEach((art) => {
      art.dataset.inView = 'true'
      observer.observe(art)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className={styles.exhibitionContainer}>
      {projects.map((project, index) => {
        const visual = renderProjectVisual(project.id)
        const isReversed = index % 2 === 1
        const indexStr = index + 3 < 10 ? `0${index + 3}` : `${index + 3}`

        return (
          <article
            key={project.id}
            id={`exhibition-${project.id}`}
            className={`${styles.projectWorld} ${isReversed ? styles.worldReversed : ''}`}
            aria-labelledby={`project-title-${project.id}`}
          >
            {/* Visual Environment Canvas */}
            <div className={styles.worldVisualCol}>
              {project.assets?.hasRealScreenshots &&
              project.assets.gallery &&
              project.assets.gallery.length > 0 ? (
                <ProjectGallery
                  project={project}
                  onOpenLightbox={onOpenGallery}
                  customSchematicVisual={visual}
                />
              ) : (
                visual
              )}
            </div>

            {/* Editorial Information Column */}
            <div className={styles.worldInfoCol}>
              <div className={styles.metaRow}>
                <span className={styles.indexTag}>{indexStr} // BESPOKE REPOSITORY</span>
                <span className={styles.categoryTag}>{project.category}</span>
                {project.links?.repoStatus && (
                  <span
                    className={`${styles.statusBadge} ${
                      project.links.repoStatus === 'public'
                        ? styles.statusPublic
                        : styles.statusPrivate
                    }`}
                  >
                    {project.links.repoStatus === 'public'
                      ? '● Public Repo'
                      : '○ Private / Local Build'}
                  </span>
                )}
              </div>

              <h3 id={`project-title-${project.id}`} className={styles.projectTitle}>
                {project.title}
              </h3>

              <p className={styles.projectSubtitle}>{project.subtitle}</p>

              {project.platforms && (
                <div className={styles.platformsList} aria-label="Target Platforms">
                  {project.platforms.map((plat) => (
                    <span key={plat} className={styles.platformPill}>
                      {plat}
                    </span>
                  ))}
                </div>
              )}

              <p className={styles.projectDescription}>{project.description}</p>

              {/* Core Verified Features */}
              {project.features && project.features.length > 0 && (
                <div className={styles.featuresSection}>
                  <span className={styles.featuresHeading}>Core Engineering Highlights</span>
                  <ul className={styles.featuresList}>
                    {project.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        <span className={styles.featureDot} aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Badges */}
              <div className={styles.tagsRow} aria-label="Technologies">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="moss">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons: GitHub Link and Gallery trigger */}
              <div className={styles.actionsRow}>
                {project.links?.github && (
                  <Button
                    href={project.links.github}
                    variant="primary"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} GitHub repository`}
                    data-cursor-text="GITHUB"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      style={{ marginRight: '6px' }}
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub Repository ↗
                  </Button>
                )}

                {project.assets?.hasRealScreenshots &&
                  project.assets.gallery &&
                  project.assets.gallery.length > 0 &&
                  onOpenGallery && (
                    <button
                      type="button"
                      className={styles.galleryBtn}
                      onClick={() => {
                        const gallery = project.assets?.gallery
                        if (gallery && gallery.length > 0) {
                          onOpenGallery(gallery, 0, project.title)
                        }
                      }}
                    >
                      View Real Screenshots ({project.assets.gallery.length}) ⛶
                    </button>
                  )}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
