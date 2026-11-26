import { useState, useRef } from 'react'
import { useSmoothScroll } from '@/animations'
import { projectsData } from '@/data'
import type { ProjectImage } from '@/types'
import { Container, SectionHeader, ProjectGalleryModal } from '@/components/common'
import { PinnedShowcase } from './PinnedShowcase'
import { ExhibitionGallery } from './ExhibitionGallery'
import styles from './WorkSection.module.css'

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()

  // Fullscreen Lightbox Modal State
  const [galleryModal, setGalleryModal] = useState<{
    isOpen: boolean
    images: ProjectImage[]
    currentIndex: number
    title: string
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: '',
  })

  const openGallery = (images: ProjectImage[], index: number, title: string) => {
    setGalleryModal({
      isOpen: true,
      images,
      currentIndex: index,
      title,
    })
  }

  const closeGallery = () => {
    setGalleryModal((prev) => ({ ...prev, isOpen: false }))
  }

  const navigateGallery = (index: number) => {
    setGalleryModal((prev) => ({ ...prev, currentIndex: index }))
  }

  const otherProjects = projectsData.filter((p) => !p.featured)

  return (
    <section id="work" ref={sectionRef} className={styles.workSection}>
      <Container>
        {/* Editorial Section Header */}
        <div className={styles.headerRow}>
          <SectionHeader
            eyebrow="01 // Selected Work"
            title="Engineered Systems & Creative Mobile Apps"
            description="Cross-platform mobile applications, Linux desktop socket connectivity tools, mobile arcade prototypes, and academic web platforms."
            className={styles.sectionHeaderReset}
          />

          <div className={styles.metaIndicators} aria-hidden="true">
            <span className={styles.indicatorPill}>Featured Projects · 08</span>
            <span className={styles.indicatorPill}>Interactive Worlds · 08</span>
          </div>
        </div>

        {/* Pinned Kinetic Showcase for Flagship Systems */}
        <PinnedShowcase projects={projectsData} onOpenGallery={openGallery} />

        {/* Curated Digital Exhibition Section Divider */}
        <div className={styles.subDivider}>
          <div className={styles.subHeadingWrap}>
            <span className={styles.subEyebrow}>02 // Curated Digital Exhibition</span>
            <h3 className={styles.subHeading}>Specialized Architectures &amp; Interactive Worlds</h3>
          </div>
          <p className={styles.subDesc}>
            Interactive preview environments showcasing real-time socket messaging, academic knowledge platforms, split-screen reflex gaming, campus management systems, and language learning tools.
          </p>
        </div>

        {/* Bespoke Exhibition Worlds for Secondary Projects */}
        <ExhibitionGallery
          projects={otherProjects}
          onOpenGallery={openGallery}
        />

        {/* Restrained Continuity Bridge: Work ➔ The Craft Lab */}
        <div className={styles.craftBridgeConduit}>
          <div className={styles.conduitLine} aria-hidden="true" />
          <a
            href="#skills"
            onClick={(e) => {
              e.preventDefault()
              scrollTo('#skills', { offset: -76 })
            }}
            className={styles.conduitBadge}
            data-cursor-text="CRAFT LAB"
          >
            <span className={styles.conduitPulseDot} />
            <span className={styles.conduitText}>
              EXPLORE TECHNICAL ARCHITECTURE &amp; SYSTEMS LAB
            </span>
            <span className={styles.conduitArrow} aria-hidden="true">
              ↓
            </span>
          </a>
          <div className={styles.conduitLine} aria-hidden="true" />
        </div>
      </Container>

      {/* Fullscreen Interactive Lightbox Modal */}
      <ProjectGalleryModal
        isOpen={galleryModal.isOpen}
        images={galleryModal.images}
        currentIndex={galleryModal.currentIndex}
        projectTitle={galleryModal.title}
        onClose={closeGallery}
        onNavigate={navigateGallery}
      />
    </section>
  )
}
