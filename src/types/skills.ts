export interface SkillItem {
  name: string
  associatedProjects?: string[]
}

export interface SkillCategory {
  id: string
  name: string
  categoryNumber: string
  focus?: string
  skills: SkillItem[]
}
