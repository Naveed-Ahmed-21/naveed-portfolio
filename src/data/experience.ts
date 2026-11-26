import type { JourneyMilestone } from '@/types'

export const journeyData: JourneyMilestone[] = [
  {
    id: 'sdlc-internship',
    title: 'Mobile App Development Intern',
    organization: 'SDLC – Skill Development Learning Centre',
    period: '15 May 2026 – 15 July 2026',
    type: 'Internship',
    location: 'Madurai, Tamil Nadu, India',
    description:
      'Completed a hands-on mobile application development internship working with Flutter, Dart, Android tooling, UI implementation, REST API integration, and debugging workflows.',
    focusAreas: [
      'Cross-Platform Mobile UI Implementation',
      'REST API Integration & Data Handling',
      'Mobile Development & Debugging Workflows',
    ],
    technologies: ['Flutter', 'Dart', 'Android', 'REST APIs'],
  },
  {
    id: 'hackxpo-coordination',
    title: 'Technical Coordinator & Mentor',
    organization: "HackXpo '26",
    period: 'College Technical Expo',
    type: 'Leadership',
    location: 'Tamil Nadu, India',
    description:
      'Served as Technical Coordinator for HackXpo \'26, assisting with project allocation, mentor coordination, and progress tracking across 40+ student projects, while directly mentoring a student team.',
    focusAreas: [
      'Student Project & Mentor Coordination',
      '1-on-1 Project Team Mentorship',
      'Technical Troubleshooting & Expo Delivery',
    ],
    technologies: ['Project Coordination', 'Student Mentorship', 'Team Collaboration'],
  },
  {
    id: 'btech-it',
    title: 'B.Tech in Information Technology',
    organization: 'Government College of Engineering, Erode',
    period: '2023 – 2027 (~7.8 CGPA)',
    type: 'Education',
    location: 'Tamil Nadu, India',
    description:
      'Undergraduate engineering coursework building core foundations in data structures, algorithms, operating systems, Linux shell basics, computer networking, and database management systems.',
    focusAreas: [
      'Data Structures & Algorithm Design',
      'Operating Systems & Linux Fundamentals',
      'Computer Networking & Socket Basics',
      'Database Management Systems & Programming',
    ],
    technologies: ['C', 'Python', 'Dart', 'TypeScript', 'SQL', 'Linux'],
  },
  {
    id: 'project-engineering',
    title: 'Independent Software Engineering Projects',
    organization: 'Ongoing Project Practice',
    period: 'Independent Development',
    type: 'Engineering',
    location: 'Tamil Nadu, India',
    description:
      'Built 8 featured portfolio projects spanning Flutter mobile applications, Android-to-Linux desktop connectivity tools, arcade game prototypes, and full-stack web platforms.',
    focusAreas: [
      'Local Socket Connectivity (LinkBridge)',
      'Flutter & Flame Puzzle Prototype (FLIPVERSE)',
      'Multi-Client Campus Platform (CampusHub)',
      'Two-Player Mobile Gameplay (Dual Tap Game)',
    ],
    technologies: ['Flutter', 'Dart', 'React', 'Node.js', 'PostgreSQL', 'Firebase'],
  },
]
