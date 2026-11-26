import { useSmoothScroll } from '@/animations'
import type { CraftDomain, CraftTechnology } from '@/data'
import styles from './CraftSection.module.css'

interface CraftDomainPanelProps {
  domain: CraftDomain
  activeTechnology: CraftTechnology | null
  onSelectTechnology: (tech: CraftTechnology) => void
}

const PROJECT_ID_MAP: Record<string, string> = {
  cpms: 'campus-placement-system',
  linkbridge: 'linkbridge',
  flipverse: 'flipverse',
  'dual-tap-game': 'dual-tap-game',
  campushub: 'campushub',
  'chat-x': 'chat-x',
  'smart-canteen': 'smart-canteen',
  'lingo-breeze': 'lingo-breeze',
}

export function CraftDomainPanel({
  domain,
  activeTechnology,
  onSelectTechnology,
}: CraftDomainPanelProps) {
  const { scrollTo } = useSmoothScroll()

  const handleNavigateProject = (e: React.MouseEvent<HTMLAnchorElement>, rawId: string) => {
    const mappedId = PROJECT_ID_MAP[rawId]
    if (!mappedId) {
      e.preventDefault()
      scrollTo('#work', { offset: -76 })
      return
    }

    e.preventDefault()
    if (mappedId === 'linkbridge' || mappedId === 'flipverse') {
      window.dispatchEvent(new CustomEvent('showcase-select-project', { detail: mappedId }))
      return
    }

    const target = `#exhibition-${mappedId}`
    if (document.querySelector(target)) {
      scrollTo(target, { offset: -84 })
    } else {
      scrollTo('#work', { offset: -76 })
    }
  }

  return (
    <div className={styles.domainPanelContainer} aria-label="Domain Telemetry and Inspection Panel">
      {/* Telemetry Console Header */}
      <div className={styles.consoleHeader}>
        <div className={styles.consoleMetaLeft}>
          <span className={styles.consoleTerminalTag}>INSPECTION CONSOLE</span>
          <span className={styles.consoleDomainCode}>{domain.code}</span>
        </div>
        <div className={styles.consoleStatusRight}>
          <span className={styles.consoleLed} aria-hidden="true" />
          <span className={styles.consoleStatusText}>{domain.status}</span>
        </div>
      </div>

      {/* Domain Title & Editorial Tagline */}
      <div className={styles.domainHeadingGroup}>
        <div className={styles.domainIndexBadge}>DOMAIN // {domain.number}</div>
        <h3 className={styles.domainMainTitle}>{domain.title}</h3>
        <p className={styles.domainTaglineText}>{domain.tagline}</p>
      </div>

      {/* Domain Factual Philosophy Description */}
      <p className={styles.domainDescriptionText}>{domain.description}</p>

      {/* Active Technologies Array */}
      <div className={styles.technologiesSection}>
        <div className={styles.techSectionHeader}>
          <span className={styles.techSectionLabel}>CORE TECHNOLOGIES &amp; FRAMEWORKS</span>
          <span className={styles.techSectionHint}>CLICK A NODE TO INSPECT IMPLEMENTATION</span>
        </div>

        <div className={styles.techPillGrid} role="tablist" aria-label="Domain Technologies">
          {domain.technologies.map((tech) => {
            const isSelected = activeTechnology?.name === tech.name
            return (
              <button
                key={tech.name}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`${styles.techPillButton} ${isSelected ? styles.techPillSelected : ''}`}
                onClick={() => onSelectTechnology(tech)}
                data-cursor-text="INSPECT"
              >
                <span className={styles.techDot} aria-hidden="true" />
                <span className={styles.techNameText}>{tech.name}</span>
                <span className={styles.techCategoryBadge}>{tech.category}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Technology Spotlight Panel */}
      {activeTechnology && (
        <div className={styles.techSpotlightCard} role="region" aria-label="Technology Implementation Details">
          <div className={styles.spotlightHeader}>
            <span className={styles.spotlightLabel}>TECHNOLOGY FOCUS // {activeTechnology.name.toUpperCase()}</span>
            <span className={styles.spotlightCategory}>{activeTechnology.category}</span>
          </div>
          <p className={styles.spotlightDetail}>{activeTechnology.detail}</p>
          <div className={styles.spotlightProjects}>
            <span className={styles.spotlightProjTitle}>Implemented in Software Systems:</span>
            <div className={styles.spotlightProjPills}>
              {activeTechnology.associatedProjects.map((proj) => {
                const mapped = PROJECT_ID_MAP[proj.id]
                const href =
                  mapped === 'linkbridge' || mapped === 'flipverse'
                    ? `#pinned-slide-${mapped}`
                    : mapped
                      ? `#exhibition-${mapped}`
                      : '#work'
                return (
                  <a
                    key={`${proj.id}-${proj.role}`}
                    href={href}
                    onClick={(e) => handleNavigateProject(e, proj.id)}
                    className={styles.spotlightProjLink}
                    title={`View ${proj.title} in Work section`}
                  >
                    <span className={styles.projLinkDot} aria-hidden="true" />
                    <strong>{proj.title}</strong>
                    <span className={styles.projLinkRole}>({proj.role})</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Associated Production Systems (Projects) */}
      <div className={styles.projectsSection}>
        <div className={styles.projectsSectionHeader}>
          <span className={styles.projectsLabel}>ASSOCIATED PORTFOLIO PROJECTS</span>
          <span className={styles.projectsCount}>{domain.associatedProjects.length} PROJECTS</span>
        </div>

        <div className={styles.projectsGrid}>
          {domain.associatedProjects.map((project) => {
            const mapped = PROJECT_ID_MAP[project.id]
            const href =
              mapped === 'linkbridge' || mapped === 'flipverse'
                ? `#pinned-slide-${mapped}`
                : mapped
                  ? `#exhibition-${mapped}`
                  : '#work'
            return (
              <a
                key={project.id}
                href={href}
                onClick={(e) => handleNavigateProject(e, project.id)}
                className={styles.projectCardLink}
                data-cursor-text="VIEW"
              >
                <div className={styles.projectCardTop}>
                  <span className={styles.projectCardTitle}>{project.title}</span>
                  <span className={styles.projectCardArrow} aria-hidden="true">
                    ↗
                  </span>
                </div>
                <span className={styles.projectCardRole}>{project.role}</span>
                <span className={styles.projectCardTech}>{project.techHighlight}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Console Footer */}
      <div className={styles.consoleFooter}>
        <span className={styles.consoleFooterNote}>
          * EXPLORE CODE REPOSITORIES IN THE WORK SECTION
        </span>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault()
            scrollTo('#work', { offset: -76 })
          }}
          className={styles.consoleWorkLink}
        >
          <span>Explore Projects in Work</span>
          <span aria-hidden="true">↑</span>
        </a>
      </div>
    </div>
  )
}
