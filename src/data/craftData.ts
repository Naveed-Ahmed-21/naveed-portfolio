export interface CraftTechnology {
  name: string
  category: string
  detail: string
  associatedProjects: {
    id: string
    title: string
    role: string
  }[]
}

export interface CraftDomain {
  id: string
  number: string
  title: string
  code: string
  tagline: string
  description: string
  status: string
  technologies: CraftTechnology[]
  associatedProjects: {
    id: string
    title: string
    role: string
    techHighlight: string
  }[]
}

export const CRAFT_DOMAINS: CraftDomain[] = [
  {
    id: 'mobile',
    number: '01',
    title: 'Mobile Engineering',
    code: 'DOM_01 // FLUTTER_DART',
    tagline: 'Cross-Platform UI, Game Loops & State Management',
    description:
      'Building cross-platform mobile applications with Flutter and Dart. Focused on Riverpod and GetX state management, Flame game loops, Firebase integration, and local network connectivity.',
    status: 'CORE_STACK',
    technologies: [
      {
        name: 'Flutter',
        category: 'Framework',
        detail: 'Cross-platform UI toolkit powering mobile apps, desktop companions, and arcade prototypes.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'Mobile & Linux Clients' },
          { id: 'flipverse', title: 'FLIPVERSE', role: 'Gravity Puzzle Prototype' },
          { id: 'campushub', title: 'CampusHub', role: 'Flutter Mobile/Web Client' },
          { id: 'smart-canteen', title: 'Smart Canteen', role: 'Student Ordering App' },
        ],
      },
      {
        name: 'Dart',
        category: 'Language',
        detail: 'Strongly typed asynchronous language powering UI logic, Flame game rules, and socket protocols.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'Protocol & Pairing Packages' },
          { id: 'flipverse', title: 'FLIPVERSE', role: 'Grid & Gravity Domain Logic' },
          { id: 'dual-tap-game', title: 'Dual Tap Game', role: 'Split-Screen Tap Logic' },
        ],
      },
      {
        name: 'Flame Engine',
        category: 'Game Loop',
        detail: 'Lightweight 2D game rendering and flame_audio sound engine used for FLIPVERSE.',
        associatedProjects: [
          { id: 'flipverse', title: 'FLIPVERSE', role: 'P.I.P. Board & Audio Engine' },
          { id: 'dual-tap-game', title: 'Dual Tap Game', role: 'Split-Screen Audio/Game Loop' },
        ],
      },
      {
        name: 'Riverpod & GetX',
        category: 'State Management',
        detail: 'Structured state management for asynchronous data flows, routing, and reactive UI screens.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Riverpod + GoRouter Flows' },
          { id: 'flipverse', title: 'FLIPVERSE', role: 'Riverpod + SharedPreferences' },
          { id: 'lingo-breeze', title: 'Lingo Breeze', role: 'Clean Architecture State' },
          { id: 'chat-x', title: 'Chat-X', role: 'GetX Chat State & Nav' },
        ],
      },
      {
        name: 'Android & Kotlin',
        category: 'Platform',
        detail: 'Native Android MethodChannels and mobile hardware/network permission workflows.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'Android MethodChannels' },
          { id: 'chat-x', title: 'Chat-X', role: 'Mobile Messaging App' },
        ],
      },
    ],
    associatedProjects: [
      {
        id: 'linkbridge',
        title: 'LinkBridge',
        role: 'Phone-to-PC Connectivity Suite',
        techHighlight: 'Flutter · Dart · Kotlin · TLS / mDNS',
      },
      {
        id: 'flipverse',
        title: 'FLIPVERSE',
        role: 'Gravity Puzzle Game Prototype (10 Levels)',
        techHighlight: 'Flutter · Flame Engine · Riverpod',
      },
      {
        id: 'dual-tap-game',
        title: 'Dual Tap Game',
        role: 'Two-Player Territory Tap Game',
        techHighlight: 'Flutter · Dart · audioplayers',
      },
      {
        id: 'smart-canteen',
        title: 'Smart Canteen',
        role: 'Student Ordering Mobile Application',
        techHighlight: 'Flutter · Firebase Auth · Firestore',
      },
    ],
  },
  {
    id: 'web',
    number: '02',
    title: 'Web Engineering',
    code: 'DOM_02 // REACT_WEB',
    tagline: 'Component Systems, Typed Interfaces & Web Portals',
    description:
      'Structuring accessible, modular web interfaces using React, TypeScript, modern JavaScript, and Tailwind CSS across campus admin portals and placement workflows.',
    status: 'CORE_STACK',
    technologies: [
      {
        name: 'React',
        category: 'Library',
        detail: 'Component-driven web UI for institutional admin dashboards, placement portals, and canteen management.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Admin Dashboard SPA' },
          { id: 'cpms', title: 'CPMS', role: 'Multi-Role Placement Portal' },
          { id: 'smart-canteen', title: 'Smart Canteen', role: 'Web Admin Dashboard' },
        ],
      },
      {
        name: 'TypeScript',
        category: 'Language',
        detail: 'Static type safety across frontend dashboards, backend services, and shared domain interfaces.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Backend & Admin Portal' },
        ],
      },
      {
        name: 'JavaScript (ES6+)',
        category: 'Language',
        detail: 'Asynchronous client logic, API integration, and Express service routes.',
        associatedProjects: [
          { id: 'cpms', title: 'CPMS', role: 'Frontend & Express Backend' },
          { id: 'lingo-breeze', title: 'Lingo Breeze', role: 'Node.js API Server' },
        ],
      },
      {
        name: 'CSS3 & Tailwind',
        category: 'Styling',
        detail: 'Responsive dashboards using Tailwind CSS utilities, Bootstrap components, and semantic stylesheets.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Monochromatic Web Admin' },
          { id: 'cpms', title: 'CPMS', role: 'Tailwind + Bootstrap UI' },
          { id: 'smart-canteen', title: 'Smart Canteen', role: 'Admin Panel Styling' },
        ],
      },
      {
        name: 'Vite Tooling',
        category: 'Tooling',
        detail: 'Fast local development builds, module bundling, and static web deployment.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Admin Web Build' },
          { id: 'cpms', title: 'CPMS', role: 'Frontend Bundler' },
        ],
      },
    ],
    associatedProjects: [
      {
        id: 'campushub',
        title: 'CampusHub',
        role: 'Flutter App & React Web Admin Monorepo',
        techHighlight: 'Flutter · React · TypeScript · Postgres',
      },
      {
        id: 'cpms',
        title: 'CPMS',
        role: 'Campus Placement Management Portal',
        techHighlight: 'React · Express · MongoDB · JWT',
      },
      {
        id: 'smart-canteen',
        title: 'Smart Canteen',
        role: 'React & Tailwind Web Admin Dashboard',
        techHighlight: 'React · Tailwind · Firebase',
      },
    ],
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend & APIs',
    code: 'DOM_03 // NODE_REST_SOCKETS',
    tagline: 'RESTful Endpoints, Auth & Real-Time Connectivity',
    description:
      'Developing Express REST APIs, JWT/Firebase authentication workflows, Cloudinary media handling, Socket.IO messaging, and local TLS/mDNS device sockets.',
    status: 'CORE_STACK',
    technologies: [
      {
        name: 'Node.js',
        category: 'Runtime',
        detail: 'JavaScript/TypeScript server runtime powering CampusHub, CPMS, Chat-X media uploads, and Lingo Breeze.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'TypeScript API Server' },
          { id: 'cpms', title: 'CPMS', role: 'Placement Portal Backend' },
          { id: 'chat-x', title: 'Chat-X', role: 'Media Upload Service' },
          { id: 'lingo-breeze', title: 'Lingo Breeze', role: 'Vocabulary REST API' },
        ],
      },
      {
        name: 'Express',
        category: 'Framework',
        detail: 'REST route handlers, Multer/Cloudinary media pipelines, and middleware authentication.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Modular Domain Routes' },
          { id: 'cpms', title: 'CPMS', role: 'Role-Protected Routes' },
          { id: 'chat-x', title: 'Chat-X', role: 'Cloudinary Express Server' },
        ],
      },
      {
        name: 'REST APIs & Socket.IO',
        category: 'Architecture',
        detail: 'HTTP endpoints with Zod validation plus Socket.IO presence and live campus messaging.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'REST + Socket.IO Engine' },
          { id: 'lingo-breeze', title: 'Lingo Breeze', role: 'Vocabulary Word Endpoint' },
        ],
      },
      {
        name: 'JWT & RBAC Auth',
        category: 'Access Control',
        detail: 'Token-based authentication and separated role permissions for students, faculty, TPOs, and admins.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'JWT + Argon2 RBAC' },
          { id: 'cpms', title: 'CPMS', role: 'Student / TPO / HOD Roles' },
        ],
      },
      {
        name: 'Local TLS & mDNS',
        category: 'Networking',
        detail: 'Local-network mDNS discovery, certificate pinning, SAS verification, and LAN file streams.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'Control & Data Channels' },
        ],
      },
    ],
    associatedProjects: [
      {
        id: 'campushub',
        title: 'CampusHub',
        role: 'Express + Prisma + Socket.IO API',
        techHighlight: 'Node.js · TypeScript · PostgreSQL · Socket.IO',
      },
      {
        id: 'cpms',
        title: 'CPMS',
        role: 'Placement & Resume Upload API',
        techHighlight: 'Node.js · Express · MongoDB · Cloudinary',
      },
      {
        id: 'chat-x',
        title: 'Chat-X',
        role: 'Realtime Chat & Cloudinary Media Service',
        techHighlight: 'Firebase · Node.js · Express · Cloudinary',
      },
      {
        id: 'lingo-breeze',
        title: 'Lingo Breeze',
        role: 'Vocabulary Fetch API & Firestore Sync',
        techHighlight: 'Node.js · Riverpod · Cloud Firestore',
      },
    ],
  },
  {
    id: 'data',
    number: '04',
    title: 'Data & Persistence',
    code: 'DOM_04 // POSTGRES_MONGO_FIREBASE',
    tagline: 'PostgreSQL / Prisma, MongoDB & Cloud Firestore',
    description:
      'Modeling relational schemas with PostgreSQL and Prisma ORM, MongoDB collections with Mongoose, and real-time NoSQL sync with Firebase Cloud Firestore.',
    status: 'CORE_STACK',
    technologies: [
      {
        name: 'PostgreSQL & Prisma',
        category: 'Relational DB',
        detail: 'Multi-entity relational schema migrations and type-safe Prisma queries in CampusHub.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Relational Campus Schema' },
        ],
      },
      {
        name: 'MongoDB & Mongoose',
        category: 'Document DB',
        detail: 'Document schema modeling for placement drives, student applications, and job records.',
        associatedProjects: [
          { id: 'cpms', title: 'CPMS', role: 'Placement Data Collections' },
        ],
      },
      {
        name: 'Cloud Firestore',
        category: 'Cloud NoSQL',
        detail: 'Real-time cloud collections for chat rooms, canteen orders, and saved vocabulary words.',
        associatedProjects: [
          { id: 'chat-x', title: 'Chat-X', role: 'Realtime Messages & Groups' },
          { id: 'smart-canteen', title: 'Smart Canteen', role: 'Menu & Order Sync' },
          { id: 'lingo-breeze', title: 'Lingo Breeze', role: 'Saved Vocabulary Store' },
        ],
      },
      {
        name: 'SharedPreferences & Local Store',
        category: 'Client Storage',
        detail: 'Persistent local preferences, trusted pairing metadata, and game level unlock state.',
        associatedProjects: [
          { id: 'flipverse', title: 'FLIPVERSE', role: 'Progress & Audio Settings' },
          { id: 'linkbridge', title: 'LinkBridge', role: 'Trusted Peers Storage' },
        ],
      },
    ],
    associatedProjects: [
      {
        id: 'campushub',
        title: 'CampusHub',
        role: 'PostgreSQL + Prisma Relational Store',
        techHighlight: 'PostgreSQL · Prisma · TypeScript',
      },
      {
        id: 'cpms',
        title: 'CPMS',
        role: 'MongoDB + Mongoose Drive & User Store',
        techHighlight: 'MongoDB · Mongoose · Cloudinary',
      },
      {
        id: 'chat-x',
        title: 'Chat-X',
        role: 'Cloud Firestore Messaging & Presence',
        techHighlight: 'Cloud Firestore · Firebase Auth',
      },
    ],
  },
  {
    id: 'systems',
    number: '05',
    title: 'Systems & Environment',
    code: 'DOM_05 // LINUX_SOCKETS_GIT',
    tagline: 'Linux Environment, Network Sockets & Version Control',
    description:
      'Working on Linux desktop with local TCP/mDNS sockets, Docker Compose setups, Python/C coursework, automated Flutter/Jest test runs, and Git version control.',
    status: 'CORE_STACK',
    technologies: [
      {
        name: 'Linux Desktop',
        category: 'Operating System',
        detail: 'Primary workstation environment and native GTK desktop target for LinkBridge.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'Linux Desktop Client' },
          { id: 'flipverse', title: 'FLIPVERSE', role: 'Linux Desktop Build' },
        ],
      },
      {
        name: 'TCP / TLS / mDNS',
        category: 'Networking',
        detail: 'Local LAN discovery, mutual TLS handshakes, and peer-to-peer transfer channels.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'mDNS + Mutual TLS Transport' },
        ],
      },
      {
        name: 'Git & GitHub',
        category: 'Version Control',
        detail: 'Branch workflows, CI checks, and multi-package project organization across repositories.',
        associatedProjects: [
          { id: 'linkbridge', title: '8 Featured Projects', role: 'GitHub Portfolio' },
        ],
      },
      {
        name: 'Docker & CI Workflows',
        category: 'Tooling',
        detail: 'Local PostgreSQL/Redis Docker Compose development and GitHub Actions verification.',
        associatedProjects: [
          { id: 'campushub', title: 'CampusHub', role: 'Docker + GitHub CI' },
          { id: 'linkbridge', title: 'LinkBridge', role: 'Verify Scripts & Tests' },
        ],
      },
      {
        name: 'Shell, Python & C',
        category: 'Coursework',
        detail: 'Linux CLI workflows, build automation scripts, and core systems computing coursework.',
        associatedProjects: [
          { id: 'linkbridge', title: 'LinkBridge', role: 'Verify & Setup Scripts' },
          { id: 'flipverse', title: 'FLIPVERSE', role: 'Level Verify Scripts' },
        ],
      },
    ],
    associatedProjects: [
      {
        id: 'linkbridge',
        title: 'LinkBridge',
        role: 'Android & Linux Socket Connectivity',
        techHighlight: 'Linux · mDNS · Mutual TLS · Flutter',
      },
      {
        id: 'campushub',
        title: 'Portfolio Repositories',
        role: '8 Featured Projects on GitHub',
        techHighlight: 'Git · GitHub · Docker · Linux CLI',
      },
    ],
  },
]
