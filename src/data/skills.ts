import type { SkillCategory } from '@/types'

export const skillsData: SkillCategory[] = [
  {
    id: 'mobile-dev',
    name: 'Mobile Development',
    categoryNumber: '01',
    focus: 'Cross-platform mobile apps, state architecture, and Flame game prototypes',
    skills: [
      {
        name: 'Flutter',
        associatedProjects: ['LinkBridge', 'FLIPVERSE', 'CampusHub', 'Smart Canteen', 'Dual Tap Game', 'Chat-X', 'Lingo Breeze'],
      },
      {
        name: 'Dart',
        associatedProjects: ['LinkBridge', 'FLIPVERSE', 'CampusHub', 'Dual Tap Game', 'Chat-X', 'Lingo Breeze'],
      },
      {
        name: 'Android Mobile & Kotlin',
        associatedProjects: ['LinkBridge', 'FLIPVERSE', 'CampusHub', 'Smart Canteen'],
      },
    ],
  },
  {
    id: 'frontend-dev',
    name: 'Frontend Development',
    categoryNumber: '02',
    focus: 'Component architectures, design systems and typed interfaces',
    skills: [
      {
        name: 'React',
        associatedProjects: ['CampusHub', 'Campus Placement Management System', 'Smart Canteen', 'naveed-portfolio'],
      },
      {
        name: 'TypeScript',
        associatedProjects: ['CampusHub', 'naveed-portfolio'],
      },
      {
        name: 'JavaScript (ES6+)',
        associatedProjects: ['CampusHub', 'Campus Placement Management System'],
      },
      {
        name: 'HTML5, CSS3 & Tailwind',
        associatedProjects: ['CampusHub', 'Campus Placement Management System', 'Smart Canteen', 'naveed-portfolio'],
      },
    ],
  },
  {
    id: 'backend-dev',
    name: 'Backend & APIs',
    categoryNumber: '03',
    focus: 'RESTful API endpoints, role-based access and Socket.IO / TLS connectivity',
    skills: [
      {
        name: 'Node.js',
        associatedProjects: ['CampusHub', 'Campus Placement Management System', 'Chat-X', 'Lingo Breeze'],
      },
      {
        name: 'Express.js',
        associatedProjects: ['CampusHub', 'Campus Placement Management System', 'Chat-X', 'Lingo Breeze'],
      },
      {
        name: 'REST APIs & Socket.IO',
        associatedProjects: ['CampusHub', 'Campus Placement Management System', 'Lingo Breeze'],
      },
      {
        name: 'LAN Sockets, TLS & mDNS',
        associatedProjects: ['LinkBridge'],
      },
    ],
  },
  {
    id: 'databases',
    name: 'Databases & Cloud Services',
    categoryNumber: '04',
    focus: 'Relational PostgreSQL/Prisma schemas, MongoDB collections, and Firebase Firestore',
    skills: [
      {
        name: 'PostgreSQL & Prisma ORM',
        associatedProjects: ['CampusHub'],
      },
      {
        name: 'Firebase Auth & Firestore',
        associatedProjects: ['Chat-X', 'Smart Canteen', 'Lingo Breeze'],
      },
      {
        name: 'MongoDB & Mongoose',
        associatedProjects: ['Campus Placement Management System'],
      },
    ],
  },
  {
    id: 'languages',
    name: 'Programming Languages',
    categoryNumber: '05',
    focus: 'Strong typing, state architecture and systems fundamentals',
    skills: [
      {
        name: 'Dart',
        associatedProjects: ['LinkBridge', 'FLIPVERSE', 'CampusHub', 'Dual Tap Game'],
      },
      {
        name: 'TypeScript & JavaScript',
        associatedProjects: ['CampusHub', 'Campus Placement Management System', 'naveed-portfolio'],
      },
      {
        name: 'Python & Kotlin',
        associatedProjects: ['LinkBridge Android Channels', 'Coursework'],
      },
      {
        name: 'SQL & C',
        associatedProjects: ['CampusHub (PostgreSQL)', 'Undergraduate Coursework'],
      },
    ],
  },
  {
    id: 'tools-workflow',
    name: 'Tools & State Management',
    categoryNumber: '06',
    focus: 'Riverpod/GetX state management, version control, API testing and Linux tools',
    skills: [
      {
        name: 'Riverpod, GetX & GoRouter',
        associatedProjects: ['FLIPVERSE', 'CampusHub', 'Lingo Breeze', 'Chat-X'],
      },
      {
        name: 'Linux Desktop & Shell',
        associatedProjects: ['LinkBridge Linux Companion', 'Development Environment'],
      },
      {
        name: 'Git & GitHub',
        associatedProjects: ['8 Featured Projects', 'HackXpo Coordination'],
      },
      {
        name: 'Postman & VS Code / Android Studio',
        associatedProjects: ['REST API Testing', 'Flutter & Web Builds'],
      },
    ],
  },
]
