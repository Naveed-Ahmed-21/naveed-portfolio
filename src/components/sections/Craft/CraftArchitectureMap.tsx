import { useId } from 'react'
import type { CraftDomain, CraftTechnology } from '@/data'
import styles from './CraftSection.module.css'

interface CraftArchitectureMapProps {
  domains: CraftDomain[]
  activeDomainId: string
  activeTechnology: CraftTechnology | null
  onSelectDomain: (id: string) => void
  onSelectTechnology: (tech: CraftTechnology) => void
}

interface DomainLayoutConfig {
  id: string
  cx: number
  cy: number
  labelX: number
  labelY: number
  satellitePositions: { cx: number; cy: number }[]
}

// Coordinate layout for the 700x530 architectural blueprint canvas
// Domain nodes placed on a 160px orbital ring around CENTER_HUB (350, 265)
// Labels are placed INWARD toward the center hub (zero collision with satellites)
// Satellites are placed OUTWARD along the perimeter (zero collision with domain nodes or labels)
const DOMAIN_CONFIGS: Record<string, DomainLayoutConfig> = {
  mobile: {
    id: 'mobile',
    cx: 350,
    cy: 110,
    labelX: 350,
    labelY: 154,
    satellitePositions: [
      { cx: 135, cy: 46 },
      { cx: 245, cy: 38 },
      { cx: 350, cy: 34 },
      { cx: 455, cy: 38 },
      { cx: 565, cy: 46 },
    ],
  },
  web: {
    id: 'web',
    cx: 555,
    cy: 195,
    labelX: 505,
    labelY: 238,
    satellitePositions: [
      { cx: 580, cy: 74 },
      { cx: 620, cy: 125 },
      { cx: 625, cy: 265 },
      { cx: 605, cy: 318 },
      { cx: 575, cy: 362 },
    ],
  },
  backend: {
    id: 'backend',
    cx: 485,
    cy: 405,
    labelX: 475,
    labelY: 360,
    satellitePositions: [
      { cx: 610, cy: 418 },
      { cx: 565, cy: 472 },
      { cx: 470, cy: 485 },
      { cx: 375, cy: 485 },
      { cx: 615, cy: 470 },
    ],
  },
  data: {
    id: 'data',
    cx: 215,
    cy: 405,
    labelX: 225,
    labelY: 360,
    satellitePositions: [
      { cx: 90, cy: 418 },
      { cx: 135, cy: 472 },
      { cx: 230, cy: 485 },
      { cx: 325, cy: 485 },
      { cx: 85, cy: 470 },
    ],
  },
  systems: {
    id: 'systems',
    cx: 145,
    cy: 195,
    labelX: 195,
    labelY: 238,
    satellitePositions: [
      { cx: 120, cy: 74 },
      { cx: 80, cy: 125 },
      { cx: 75, cy: 265 },
      { cx: 95, cy: 318 },
      { cx: 125, cy: 362 },
    ],
  },
}

const CENTER_HUB = { cx: 350, cy: 265 }

export function CraftArchitectureMap({
  domains,
  activeDomainId,
  activeTechnology,
  onSelectDomain,
  onSelectTechnology,
}: CraftArchitectureMapProps) {
  const filterId = useId()
  const activeDomain = domains.find((d) => d.id === activeDomainId) || domains[0]
  const activeConfig = DOMAIN_CONFIGS[activeDomain.id] || DOMAIN_CONFIGS.mobile

  return (
    <div className={styles.architectureMapWrapper} aria-label="Interactive System Architecture Map">
      {/* Precision Blueprint Coordinate Overlays */}
      <div className={styles.mapGridOverlay} aria-hidden="true" />
      <div className={styles.mapStatusCorner} aria-hidden="true">
        <span className={styles.mapStatusDot} />
        <span className={styles.mapStatusText}>SYS_GRAPH // 5 BUS CONNECTIONS</span>
      </div>

      <svg
        className={styles.architectureSvg}
        viewBox="0 0 700 530"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Engineering System Blueprint Nodes"
      >
        <defs>
          {/* Subtle Glow Filter for Active Buses */}
          <filter id={`glow-${filterId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Radial Core Gradient */}
          <radialGradient id={`coreGrad-${filterId}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#354B3A" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#20241E" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#161A14" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Outer Circular Reference Track */}
        <circle
          cx={CENTER_HUB.cx}
          cy={CENTER_HUB.cy}
          r="195"
          fill="none"
          stroke="rgba(82, 116, 90, 0.12)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />

        {/* 1. Radiating Circuit Buses from Center to Each Domain */}
        {domains.map((domain) => {
          const cfg = DOMAIN_CONFIGS[domain.id]
          if (!cfg) return null
          const isActive = domain.id === activeDomainId

          // Curved Bézier path between center hub and domain node
          const dx = cfg.cx - CENTER_HUB.cx
          const dy = cfg.cy - CENTER_HUB.cy
          const cpx = CENTER_HUB.cx + dx * 0.45 + (cfg.cy < CENTER_HUB.cy ? 15 : -15)
          const cpy = CENTER_HUB.cy + dy * 0.45

          const pathD = `M ${CENTER_HUB.cx} ${CENTER_HUB.cy} Q ${cpx} ${cpy} ${cfg.cx} ${cfg.cy}`

          return (
            <g key={`bus-${domain.id}`} className={styles.busGroup}>
              {/* Inactive ghost trace */}
              <path
                d={pathD}
                fill="none"
                stroke={isActive ? 'rgba(184, 233, 134, 0.45)' : 'rgba(82, 116, 90, 0.2)'}
                strokeWidth={isActive ? '3' : '1.5'}
                strokeDasharray={isActive ? 'none' : '3 4'}
              />

              {/* Animated Signal Pulse for Active Bus */}
              {isActive && (
                <path
                  d={pathD}
                  fill="none"
                  stroke="#B8E986"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  filter={`url(#glow-${filterId})`}
                  className={styles.activeBusFlow}
                />
              )}

              {/* Waypoint Junction Node */}
              <circle
                cx={(CENTER_HUB.cx + cfg.cx) / 2}
                cy={(CENTER_HUB.cy + cfg.cy) / 2}
                r="3"
                fill={isActive ? '#B8E986' : 'rgba(82, 116, 90, 0.4)'}
              />
            </g>
          )
        })}

        {/* 2. Central System Core Hub */}
        <g className={styles.centerHubGroup}>
          {/* Rotating Ring Halo */}
          <circle
            cx={CENTER_HUB.cx}
            cy={CENTER_HUB.cy}
            r="54"
            fill="none"
            stroke="rgba(82, 116, 90, 0.3)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            className={styles.hubRotatingRing}
          />
          {/* Main Core Body */}
          <circle
            cx={CENTER_HUB.cx}
            cy={CENTER_HUB.cy}
            r="44"
            fill={`url(#coreGrad-${filterId})`}
            stroke="#52745A"
            strokeWidth="2"
          />
          {/* Inner Signal Core */}
          <circle
            cx={CENTER_HUB.cx}
            cy={CENTER_HUB.cy}
            r="8"
            fill="#B8E986"
            className={styles.hubInnerCore}
          />
          {/* Central Core Typography */}
          <text
            x={CENTER_HUB.cx}
            y={CENTER_HUB.cy - 16}
            textAnchor="middle"
            className={styles.hubSvgTitle}
          >
            NAVEED
          </text>
          <text
            x={CENTER_HUB.cx}
            y={CENTER_HUB.cy + 22}
            textAnchor="middle"
            className={styles.hubSvgSub}
          >
            SYSTEM CORE
          </text>
        </g>

        {/* 3. Orbiting Technologies for Active Domain (Outward Perimeter Placement) */}
        {activeDomain.technologies.slice(0, 5).map((tech, idx) => {
          const slot = activeConfig.satellitePositions[idx] || {
            cx: activeConfig.cx + (idx - 2) * 50,
            cy: activeConfig.cy - 60,
          }

          // Dynamic Pill Sizing prevents text clipping for any character length
          const pillWidth = Math.max(88, Math.round(tech.name.length * 7.4 + 28))
          const pillHeight = 25
          const isSelected = activeTechnology?.name === tech.name

          return (
            <g
              key={`tech-node-${tech.name}`}
              className={`${styles.techNodeGroup} ${isSelected ? styles.techNodeSelected : ''}`}
              onClick={() => onSelectTechnology(tech)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectTechnology(tech)
                }
              }}
              aria-label={`Inspect technology ${tech.name}`}
              aria-pressed={isSelected}
            >
              {/* Clean Radial Connector Line to Active Domain Node */}
              <line
                x1={activeConfig.cx}
                y1={activeConfig.cy}
                x2={slot.cx}
                y2={slot.cy}
                stroke={isSelected ? '#B8E986' : 'rgba(82, 116, 90, 0.45)'}
                strokeWidth={isSelected ? '2' : '1.2'}
                strokeDasharray={isSelected ? 'none' : '2 3'}
              />

              {/* Dynamic Width Tech Pill Rectangle */}
              <rect
                x={slot.cx - pillWidth / 2}
                y={slot.cy - pillHeight / 2}
                width={pillWidth}
                height={pillHeight}
                rx={pillHeight / 2}
                className={styles.techNodeRect}
                fill={isSelected ? '#2A362D' : '#1A2019'}
                stroke={isSelected ? '#B8E986' : 'rgba(82, 116, 90, 0.5)'}
                strokeWidth={isSelected ? '1.8' : '1'}
              />

              {/* Status Indicator Dot */}
              <circle
                cx={slot.cx - pillWidth / 2 + 12}
                cy={slot.cy}
                r="3.5"
                fill={isSelected ? '#B8E986' : '#52745A'}
              />

              {/* Technology Name Text */}
              <text
                x={slot.cx + 5}
                y={slot.cy + 4}
                textAnchor="middle"
                className={styles.techNodeText}
                fill={isSelected ? '#FFFFFF' : '#E8EDE5'}
              >
                {tech.name}
              </text>
            </g>
          )
        })}

        {/* 4. Domain Hub Nodes */}
        {domains.map((domain) => {
          const cfg = DOMAIN_CONFIGS[domain.id]
          if (!cfg) return null
          const isActive = domain.id === activeDomainId

          return (
            <g
              key={`domain-node-${domain.id}`}
              className={`${styles.domainNodeGroup} ${isActive ? styles.domainNodeActive : ''}`}
              onClick={() => onSelectDomain(domain.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSelectDomain(domain.id)
                }
              }}
              aria-label={`Select domain ${domain.title}`}
              aria-pressed={isActive}
            >
              {/* Active Outer Radiance */}
              {isActive && (
                <circle
                  cx={cfg.cx}
                  cy={cfg.cy}
                  r="32"
                  fill="none"
                  stroke="#B8E986"
                  strokeWidth="1.5"
                  className={styles.domainPulseRing}
                />
              )}

              {/* Node Body */}
              <circle
                cx={cfg.cx}
                cy={cfg.cy}
                r="24"
                className={styles.domainNodeCircle}
                fill={isActive ? '#253227' : '#1C231B'}
                stroke={isActive ? '#B8E986' : 'rgba(82, 116, 90, 0.4)'}
                strokeWidth={isActive ? '2' : '1.2'}
              />

              {/* Domain Index */}
              <text
                x={cfg.cx}
                y={cfg.cy + 5}
                textAnchor="middle"
                className={styles.domainIndexText}
                fill={isActive ? '#B8E986' : '#A0B29F'}
              >
                {domain.number}
              </text>

              {/* Domain Inward Label Tag (Positioned safely between domain node and center hub) */}
              <g transform={`translate(${cfg.labelX}, ${cfg.labelY})`}>
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  className={styles.domainLabelText}
                  fill={isActive ? '#FFFFFF' : '#A0B29F'}
                >
                  {domain.title}
                </text>
                <text
                  x="0"
                  y="13"
                  textAnchor="middle"
                  className={styles.domainCodeText}
                  fill={isActive ? '#B8E986' : 'rgba(101, 107, 96, 0.8)'}
                >
                  {domain.code.split(' // ')[1] || domain.code}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
