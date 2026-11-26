import { useState } from 'react'
import { useSmoothScroll } from '@/animations'
import type { JourneyMilestone } from '@/types'
import styles from './JourneySection.module.css'

/* ==========================================================================
   Scene 1: Academic Computing Blueprint (Education — B.Tech IT '26)
   ========================================================================== */
interface AcademicBlueprintSceneProps {
  milestone: JourneyMilestone
}

export function AcademicBlueprintScene({ milestone }: AcademicBlueprintSceneProps) {
  const [activePillar, setActivePillar] = useState<number>(0)

  const PILLARS = [
    {
      title: 'Data Structures & Algorithms',
      code: 'DSA_CORE // O(log n)',
      desc: 'Tree traversals, graph connectivity, dynamic programming, and computational complexity bounds.',
      tags: ['B-Trees', 'Graphs', 'Sorting', 'DP'],
    },
    {
      title: 'Operating Systems & Linux Kernel',
      code: 'SYS_OS // LINUX',
      desc: 'Process scheduling, virtual memory paging, concurrency fundamentals, and Linux shell workflows.',
      tags: ['Processes', 'Memory Mgmt', 'Bash', 'Threads'],
    },
    {
      title: 'Networking & Socket Protocols',
      code: 'NET_SOCKET // TCP_UDP',
      desc: 'TCP three-way handshakes, UDP datagram streams, OSI reference model, and client-server sockets.',
      tags: ['TCP Sockets', 'UDP Broadcast', 'HTTP/REST', 'DNS'],
    },
    {
      title: 'Database Architecture & DBMS',
      code: 'DATA_PERSIST // ACID',
      desc: 'Relational algebra, SQL query optimization, ACID transaction guarantees, and indexing.',
      tags: ['SQL', 'Normalization', 'Indexing', 'Transactions'],
    },
  ]

  return (
    <div className={styles.blueprintScene} aria-label="Academic Computing Blueprint">
      {/* Blueprint Header */}
      <div className={styles.blueprintHeader}>
        <div className={styles.blueprintTitleWrap}>
          <span className={styles.blueprintIcon} aria-hidden="true">📐</span>
          <span className={styles.blueprintCode}>SYS_SPEC // COMPUTING FOUNDATIONS</span>
        </div>
        <span className={styles.blueprintBadge}>B.TECH IT · FINAL YEAR</span>
      </div>

      {/* Interactive Blueprint Schematic Grid */}
      <div className={styles.blueprintGrid}>
        <div className={styles.blueprintOverlayGrid} aria-hidden="true" />
        
        {PILLARS.map((pillar, idx) => {
          const isActive = activePillar === idx
          return (
            <div
              key={pillar.code}
              className={`${styles.blueprintPillar} ${isActive ? styles.blueprintPillarActive : ''}`}
              onClick={() => setActivePillar(idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActivePillar(idx)
                }
              }}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`Select ${pillar.title}`}
            >
              <div className={styles.pillarHeader}>
                <span className={styles.pillarNum}>0{idx + 1}</span>
                <span className={styles.pillarCode}>{pillar.code}</span>
              </div>
              <h4 className={styles.pillarTitle}>{pillar.title}</h4>
              <p className={styles.pillarDesc}>{pillar.desc}</p>
              <div className={styles.pillarTags} aria-label={`${pillar.title} concepts`}>
                {pillar.tags.map((tag) => (
                  <span key={tag} className={styles.pillarTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Blueprint Blueprint Footer Note */}
      <div className={styles.blueprintFooter}>
        <span className={styles.blueprintCoord}>LOC // GCE ERODE · TAMIL NADU, IN · {milestone.period}</span>
        <span className={styles.blueprintVerify}>CORE COMPUTING CURRICULUM</span>
      </div>
    </div>
  )
}

/* ==========================================================================
   Scene 2: Mobile Interface Engineering Sandbox (Internship — SDLC)
   ========================================================================== */
interface MobileSandboxSceneProps {
  milestone: JourneyMilestone
}

export function MobileSandboxScene({ milestone: _milestone }: MobileSandboxSceneProps) {
  const [activeTab, setActiveTab] = useState<'widgets' | 'network'>('widgets')
  const [simulatedState, setSimulatedState] = useState<boolean>(true)

  return (
    <div className={styles.mobileSandboxScene} aria-label="Mobile Application Development Sandbox">
      {/* Sandbox Header / Switcher */}
      <div className={styles.sandboxHeader}>
        <div className={styles.sandboxMeta}>
          <span className={styles.devicePill}>MOBILE LAB // FLUTTER &amp; DART</span>
          <span className={styles.sandboxStatus}>● ACTIVE BUILD</span>
        </div>
        <div className={styles.sandboxTabs} role="tablist">
          <button
            type="button"
            className={`${styles.sandboxTabBtn} ${activeTab === 'widgets' ? styles.sandboxTabActive : ''}`}
            onClick={() => setActiveTab('widgets')}
            role="tab"
            aria-selected={activeTab === 'widgets'}
          >
            Widget Tree
          </button>
          <button
            type="button"
            className={`${styles.sandboxTabBtn} ${activeTab === 'network' ? styles.sandboxTabActive : ''}`}
            onClick={() => setActiveTab('network')}
            role="tab"
            aria-selected={activeTab === 'network'}
          >
            REST API Stream
          </button>
        </div>
      </div>

      {/* Sandbox Visual Display */}
      <div className={styles.sandboxDisplay}>
        {/* Miniature Device Mockup */}
        <div className={styles.miniPhoneViewport}>
          <div className={styles.miniPhoneBar}>
            <span className={styles.miniPhoneTime}>10:42</span>
            <div className={styles.miniPhoneNotch} />
            <span className={styles.miniPhoneBat}>100%</span>
          </div>

          <div className={styles.miniPhoneBody}>
            <div className={styles.miniAppNav}>
              <span className={styles.miniNavTitle}>SDLC Intern App</span>
              <span className={styles.miniNavTag}>DEV</span>
            </div>

            <div className={styles.miniCardList}>
              <div className={styles.miniCard}>
                <div className={styles.miniCardDot} />
                <div className={styles.miniCardLines}>
                  <div className={styles.miniLineLong} />
                  <div className={styles.miniLineShort} />
                </div>
              </div>
              <div className={styles.miniCard}>
                <div className={styles.miniCardDot} />
                <div className={styles.miniCardLines}>
                  <div className={styles.miniLineLong} />
                  <div className={styles.miniLineMed} />
                </div>
              </div>
            </div>

            <button
              type="button"
              className={styles.miniActionButton}
              onClick={() => setSimulatedState(!simulatedState)}
              aria-label="Simulate reactive state toggle"
            >
              <span>{simulatedState ? 'STATE: REACTIVE_OK' : 'STATE: RELOADING...'}</span>
              <span className={styles.miniBtnArrow}>↺</span>
            </button>
          </div>
        </div>

        {/* Live Code / Telemetry Panel */}
        <div className={styles.sandboxTelemetry}>
          {activeTab === 'widgets' ? (
            <div className={styles.codeHierarchy}>
              <span className={styles.telemetryTitle}>REACTIVE COMPONENT TREE:</span>
              <div className={styles.treeNode}>
                <span className={styles.treeIndent}>└─</span>
                <span className={styles.treeClass}>MaterialApp</span>
                <span className={styles.treeBadge}>Root</span>
              </div>
              <div className={styles.treeNode} style={{ paddingLeft: '1rem' }}>
                <span className={styles.treeIndent}>└─</span>
                <span className={styles.treeClass}>ChangeNotifierProvider</span>
                <span className={styles.treeProp}>state: scoped</span>
              </div>
              <div className={styles.treeNode} style={{ paddingLeft: '2rem' }}>
                <span className={styles.treeIndent}>└─</span>
                <span className={styles.treeClass}>StreamBuilder&lt;Payload&gt;</span>
                <span className={styles.treeBadge}>Async</span>
              </div>
              <div className={styles.treeNode} style={{ paddingLeft: '3rem' }}>
                <span className={styles.treeIndent}>└─</span>
                <span className={styles.treeClass}>AnimatedList</span>
                <span className={styles.treeProp}>Smooth Transition</span>
              </div>
            </div>
          ) : (
            <div className={styles.apiPipeline}>
              <span className={styles.telemetryTitle}>REST API SERIALIZATION STREAM:</span>
              <div className={styles.apiItem}>
                <span className={styles.apiMethod}>GET</span>
                <span className={styles.apiRoute}>/api/v1/auth/session</span>
                <span className={styles.apiStatus}>200 OK · SAMPLE</span>
              </div>
              <div className={styles.apiItem}>
                <span className={styles.apiMethod}>POST</span>
                <span className={styles.apiRoute}>/api/v1/sync/state</span>
                <span className={styles.apiStatus}>201 CREATED · SAMPLE</span>
              </div>
              <div className={styles.apiPayload}>
                <code>
                  {'{ "authenticated": true, "client": "flutter", "mode": "rest_api" }'}
                </code>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.sandboxFooter}>
        <span className={styles.sandboxPeriod}>15 MAY 2026 – 15 JULY 2026 · MADURAI, TN, INDIA</span>
        <span className={styles.sandboxTools}>DART · FLUTTER · REST APIs</span>
      </div>
    </div>
  )
}

/* ==========================================================================
   Scene 3: Branching Multi-Track Coordination Network (Leadership — HackXpo '26)
   ========================================================================== */
interface CoordinationNetworkSceneProps {
  milestone: JourneyMilestone
}

export function CoordinationNetworkScene({ milestone: _milestone }: CoordinationNetworkSceneProps) {
  const [selectedTrack, setSelectedTrack] = useState<string>('mentor')

  const TRACKS = [
    { id: 'mentor', label: 'Project Team Mentorship', count: '1 Team', desc: 'Provided technical guidance, troubleshooting support, and presentation feedback.' },
    { id: 'scope', label: 'Expo Project Coordination', count: '40+ Projects', desc: 'Coordinated project allocation, mentor assignment, and progress tracking.' },
    { id: 'reviews', label: 'Troubleshooting Support', count: 'Student Help', desc: 'Assisted student teams in resolving integration blockers across stacks.' },
    { id: 'demo', label: 'Expo Execution & Reviews', count: 'Showcase', desc: 'Supported timely project completion and final exhibition demos.' },
  ]

  return (
    <div className={styles.networkScene} aria-label="Technical Coordination Network">
      {/* Network Header */}
      <div className={styles.networkHeader}>
        <div className={styles.networkTitleWrap}>
          <span className={styles.networkIcon} aria-hidden="true">🌐</span>
          <span className={styles.networkCode}>COORDINATION // HACKXPO &apos;26 PROJECT EXPO</span>
        </div>
        <span className={styles.networkBadge}>COORDINATION OVERVIEW</span>
      </div>

      {/* Network Topology Visual Graph */}
      <div className={styles.networkGraphContainer}>
        {/* Central Coordinator Hub */}
        <div className={styles.centralHub}>
          <div className={styles.hubPulseRing} aria-hidden="true" />
          <div className={styles.hubCore}>
            <span className={styles.hubTitle}>COORDINATOR</span>
            <span className={styles.hubSub}>NAVEED AHMED K</span>
          </div>
        </div>

        {/* Radiating Branch Nodes */}
        <div className={styles.branchNodesGrid}>
          {TRACKS.map((t) => {
            const isSelected = selectedTrack === t.id
            return (
              <div
                key={t.id}
                className={`${styles.branchNode} ${isSelected ? styles.branchNodeSelected : ''}`}
                onClick={() => setSelectedTrack(t.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedTrack(t.id)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                aria-label={`Select ${t.label}`}
              >
                <div className={styles.branchHead}>
                  <span className={styles.branchStatusDot} />
                  <span className={styles.branchCount}>{t.count}</span>
                </div>
                <h4 className={styles.branchLabel}>{t.label}</h4>
                <p className={styles.branchDesc}>{t.desc}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Operations Telemetry Readout */}
      <div className={styles.networkTelemetryBar}>
        <div className={styles.telemetryMetric}>
          <span className={styles.metricBig}>40+</span>
          <span className={styles.metricLabel}>Student Projects Coordinated</span>
        </div>
        <div className={styles.telemetryMetric}>
          <span className={styles.metricBig}>1</span>
          <span className={styles.metricLabel}>Mentored Project Team</span>
        </div>
        <div className={styles.telemetryMetric}>
          <span className={styles.metricBig}>Expo</span>
          <span className={styles.metricLabel}>Mentor &amp; Team Execution</span>
        </div>
      </div>
    </div>
  )
}

/* ==========================================================================
   Scene 4: Cross-Platform Systems Architecture Matrix (Engineering — 8 Systems)
   ========================================================================== */
interface SystemsArchitectureSceneProps {
  milestone: JourneyMilestone
}

export function SystemsArchitectureScene({ milestone: _milestone }: SystemsArchitectureSceneProps) {
  const { scrollTo } = useSmoothScroll()

  const TIERS = [
    {
      tier: 'TIER 01 // MOBILE & GAMES',
      title: 'Flutter, Flame & Mobile UI',
      tools: 'Flutter · Dart · Flame · Riverpod',
      projects: [
        { label: 'LinkBridge Mobile', target: 'linkbridge', isFlagship: true },
        { label: 'FLIPVERSE (10/30 Levels)', target: 'flipverse', isFlagship: true },
        { label: 'Dual Tap Game', target: 'dual-tap-game', isFlagship: false },
      ],
    },
    {
      tier: 'TIER 02 // LOCAL NETWORK',
      title: 'Android-to-Linux Connectivity',
      tools: 'mDNS · Mutual TLS · Chunked Transfer',
      projects: [
        { label: 'LinkBridge LAN Discovery & SAS', target: 'linkbridge', isFlagship: true },
        { label: 'Clipboard & File Sync', target: 'linkbridge', isFlagship: true },
      ],
    },
    {
      tier: 'TIER 03 // CLOUD MOBILE',
      title: 'Firebase & Clean Architecture',
      tools: 'Firebase Auth · Cloud Firestore · GetX / Riverpod',
      projects: [
        { label: 'Chat-X Realtime Messaging', target: 'chat-x', isFlagship: false },
        { label: 'Lingo Breeze Vocabulary App', target: 'lingo-breeze', isFlagship: false },
      ],
    },
    {
      tier: 'TIER 04 // FULL-STACK PLATFORMS',
      title: 'Multi-Client Web & Mobile Systems',
      tools: 'Flutter · React · TypeScript · Postgres · MongoDB',
      projects: [
        { label: 'CampusHub Monorepo', target: 'campushub', isFlagship: false },
        { label: 'CPMS Recruitment Portal', target: 'campus-placement-system', isFlagship: false },
        { label: 'Smart Canteen App + Admin', target: 'smart-canteen', isFlagship: false },
      ],
    },
  ]

  const handleProjectJump = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string,
    isFlagship: boolean,
  ) => {
    e.preventDefault()
    if (isFlagship) {
      window.dispatchEvent(new CustomEvent('showcase-select-project', { detail: target }))
      return
    }
    const selector = `#exhibition-${target}`
    if (document.querySelector(selector)) {
      scrollTo(selector, { offset: -84 })
    } else {
      scrollTo('#work', { offset: -76 })
    }
  }

  return (
    <div className={styles.systemsMatrixScene} aria-label="Systems Architecture Matrix">
      {/* Matrix Header */}
      <div className={styles.matrixHeader}>
        <div className={styles.matrixTitleWrap}>
          <span className={styles.matrixIcon} aria-hidden="true">⚡</span>
          <span className={styles.matrixCode}>SYSTEM OVERVIEW // 8 FEATURED PROJECTS</span>
        </div>
        <span className={styles.matrixBadge}>CONTINUOUS ENGINEERING PRACTICE</span>
      </div>

      {/* Bus Architecture Tiers */}
      <div className={styles.matrixTiers}>
        {TIERS.map((tier, idx) => (
          <div key={tier.tier} className={styles.matrixTierCard}>
            <div className={styles.tierHeader}>
              <span className={styles.tierTag}>{tier.tier}</span>
              <span className={styles.tierIdx}>LAYER 0{idx + 1}</span>
            </div>
            <h4 className={styles.tierTitle}>{tier.title}</h4>
            <span className={styles.tierTools}>{tier.tools}</span>
            <div className={styles.tierProjects} aria-label={`${tier.title} implemented systems`}>
              {tier.projects.map((proj) => (
                <a
                  key={proj.label}
                  href={proj.isFlagship ? `#pinned-slide-${proj.target}` : `#exhibition-${proj.target}`}
                  onClick={(e) => handleProjectJump(e, proj.target, proj.isFlagship)}
                  className={styles.projectPill}
                >
                  <span className={styles.projectDot} aria-hidden="true" />
                  <span>{proj.label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Matrix Footer */}
      <div className={styles.matrixFooter}>
        <span className={styles.matrixNotice}>* EXPLORE REPOSITORIES IN THE WORK SECTION ABOVE</span>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#work', { offset: -76 })
          }}
          className={styles.matrixWorkLink}
        >
          <span>Jump to Interactive Work Worlds</span>
          <span className={styles.matrixArrow} aria-hidden="true">↑</span>
        </a>
      </div>
    </div>
  )
}

