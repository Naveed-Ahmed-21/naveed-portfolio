import type { SiteConfig } from '@/types'

export const siteConfig: SiteConfig = {
  name: 'Naveed Ahmed K',
  title: 'Naveed Ahmed K — Flutter Developer & Full Stack Developer',
  role: 'Flutter Developer & Full Stack Developer',
  tagline: 'Architecting high-performance Flutter mobile applications and resilient full stack web ecosystems.',
  bio: 'Final-year B.Tech Information Technology student engineering cross-platform mobile apps with Flutter and building practical full-stack web platforms. Passionate about software architecture, reliable systems, and clean implementation.',
  location: 'Tamil Nadu, India',
  availability: {
    status: 'available',
    message: 'Available for Opportunities',
  },
  email: 'naveedsha269@gmail.com',
  phone: '+91 7708325976',
  navItems: [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'work', label: 'Work', href: '#work' },
    { id: 'skills', label: 'Craft', href: '#skills' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Journey', href: '#experience' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
  socials: [
    {
      platform: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/Naveed-Ahmed-21',
      username: 'Naveed-Ahmed-21',
    },
    {
      platform: 'LinkedIn',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/naveedahmedk',
      username: 'naveedahmedk',
    },
  ],
}
