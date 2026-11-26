import type { ReactNode } from 'react'
import { SmoothScrollProvider } from '@/animations'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { ScrollProgress } from '../ScrollProgress/ScrollProgress'
import { CustomCursor, IntroPreloader } from '@/components/common'
import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <SmoothScrollProvider>
      {/* Intro Preloader Cinematic Sequence */}
      <IntroPreloader />

      <div className={styles.layoutWrapper}>
        {/* Desktop Custom Interactive Cursor */}
        <CustomCursor />

        {/* Accessible Skip-to-Content Link */}
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>

        {/* Grain overlay for tactile editorial finish */}
        <div className="grain-overlay" aria-hidden="true" />

        {/* Global Hairline Scroll Progress Bar */}
        <ScrollProgress />

        {/* Global Navigation Header */}
        <Header />

        {/* Main Content Area */}
        <main id="main-content" className={styles.main}>
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </SmoothScrollProvider>
  )
}

