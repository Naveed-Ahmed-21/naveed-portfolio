export interface NavItem {
  id: string
  label: string
  href: string
  badge?: string
}

export interface SocialLink {
  platform: string
  label: string
  url: string
  username?: string
  iconName?: string
}

export interface SiteConfig {
  name: string
  title: string
  role: string
  tagline: string
  bio: string
  location: string
  availability: {
    status: 'available' | 'busy' | 'selective'
    message: string
  }
  email: string
  phone?: string
  socials: SocialLink[]
  navItems: NavItem[]
}

