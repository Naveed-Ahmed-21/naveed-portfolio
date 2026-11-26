export type JourneyType = 'Internship' | 'Leadership' | 'Education' | 'Engineering'

export interface JourneyMilestone {
  id: string
  title: string
  organization: string
  period: string
  type: JourneyType
  location?: string
  description: string
  focusAreas?: string[]
  technologies?: string[]
}
