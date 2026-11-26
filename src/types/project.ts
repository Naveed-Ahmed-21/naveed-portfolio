export type ProjectCategory =
  | 'Mobile & Desktop'
  | 'Game Development'
  | 'Full-Stack Web'
  | 'Mobile Application'
  | 'Real-Time Systems'
  | 'Creative Development'

export interface ProjectImage {
  src: string
  alt: string
  caption: string
  aspect?: 'landscape' | 'portrait' | 'wide'
}

export interface ProjectLinks {
  live?: string
  github?: string
  caseStudy?: string
  repoStatus?: 'public' | 'private' | 'upcoming'
}

export interface ProjectAssets {
  folder?: string
  cover?: string
  thumbnail?: string
  alt?: string
  gallery?: ProjectImage[]
  hasRealScreenshots?: boolean
  assetChecklist?: string[]
}

export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  category: ProjectCategory
  platforms?: string[]
  role?: string
  year?: string
  featured: boolean
  tags: string[]
  features?: string[]
  links?: ProjectLinks
  assets?: ProjectAssets
}
