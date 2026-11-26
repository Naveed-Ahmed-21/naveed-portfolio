import { MainLayout } from '@/components/layout'
import {
  HeroSection,
  WorkSection,
  CraftSection,
  AboutSection,
  JourneySection,
  ContactSection,
} from '@/components/sections'

function App() {
  return (
    <MainLayout>
      <HeroSection />
      <WorkSection />
      <CraftSection />
      <AboutSection />
      <JourneySection />
      <ContactSection />
    </MainLayout>
  )
}

export default App
