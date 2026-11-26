import type { Project } from '@/types'

export const projectsData: Project[] = [
  {
    id: 'linkbridge',
    slug: 'linkbridge',
    title: 'LinkBridge',
    subtitle: 'Cross-Platform Phone-to-PC Connectivity Suite',
    description:
      'An open-source Android-to-Linux connectivity suite linking mobile and desktop over local Wi-Fi without cloud intermediaries. Implements mDNS discovery, TLS certificate pinning with challenge-response authentication, numeric SAS pairing, chunked file transfers, and clipboard exchange (automated test suites verified; multi-device hardware testing ongoing).',
    category: 'Mobile & Desktop',
    platforms: ['Android Mobile', 'Linux Desktop'],
    featured: true,
    tags: ['Flutter', 'Dart', 'Kotlin', 'Linux Desktop', 'TLS / Sockets', 'mDNS'],
    features: [
      'Mutual TLS Authentication & Certificate Pinning',
      'Local Wi-Fi mDNS Discovery & Numeric SAS Pairing',
      'Chunked LAN File Transfer & Checksum Checks',
      'Clipboard Synchronization Between Devices',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/LinkBridge',
      repoStatus: 'public',
    },
    assets: {
      folder: 'linkbridge',
      hasRealScreenshots: false,
      assetChecklist: [
        'Android Flutter Companion & Kotlin MethodChannels UI',
        'Linux Desktop Companion App & Diagnostics Screen',
        'TLS + Numeric SAS Pairing Flow Between Devices',
        'Local Wi-Fi File Transfer & Clipboard Sync Session',
      ],
      gallery: [],
    },
  },
  {
    id: 'flipverse',
    slug: 'flipverse',
    title: 'FLIPVERSE',
    subtitle: 'Clockwise Gravity Grid Puzzle Game Prototype',
    description:
      'An active in-development gravity puzzle game built with Flutter, Flame Engine, and Riverpod. Features 4-direction clockwise gravity rotation, gravity-sensitive moving blocks, an interactive 6-step tutorial, bundled SFX/music audio, and 10 playable levels completed toward a planned 30-level campaign.',
    category: 'Game Development',
    platforms: ['Flutter', 'Android / Linux / Web'],
    featured: true,
    tags: ['Flutter', 'Dart', 'Flame Engine', 'Riverpod', 'SharedPreferences'],
    features: [
      '4-Direction Clockwise Gravity Mechanics',
      '10 Playable Campaign Levels (In Progress of 30)',
      '6-Step Interactive Tutorial & Replay Controls',
      'Flame Rendering Loop & Bundled Audio Engine',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/flipverse',
      repoStatus: 'private',
    },
    assets: {
      folder: 'flipverse',
      hasRealScreenshots: false,
      assetChecklist: [
        'Welcome Screen & Chapter Level Selection UI',
        'Active Grid Gameplay with Flame Engine & Pip Character',
        'Gravity Flip State Resolution & Undo Controls',
        'Audio Settings & Reduced-Motion Visual Modes',
      ],
      gallery: [],
    },
  },
  {
    id: 'dual-tap-game',
    slug: 'dual-tap-game',
    title: 'Dual Tap Game',
    subtitle: 'Two-Player Split-Screen Territory Tap Game',
    description:
      'A local two-player split-screen Flutter game where Player A (Red) and Player B (Blue) compete on one device. Each tap expands the player’s territory divider by 4% and awards 5 points until one side fills the screen, complete with tap and victory sound effects.',
    category: 'Game Development',
    platforms: ['Flutter Mobile / Multi-Platform'],
    featured: false,
    tags: ['Flutter', 'Dart', 'audioplayers', 'Split-Screen UI'],
    features: [
      'Player A (Red) vs Player B (Blue) Split Screen',
      'Live +4% Territory Shift & +5 Points per Tap',
      'Tap & Victory Sound Effects + Instant Replay',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/Dual-Tap-Game',
      repoStatus: 'public',
    },
    assets: {
      folder: 'dual-tap',
      cover: '/assets/projects/dual-tap/dual-tap-start.jpg',
      hasRealScreenshots: true,
      assetChecklist: [
        'Title & Start Screen with Split-Screen Instructions',
        'Blue vs Red Split-Screen Gameplay Arena',
        'Mid-Match Score & Territory Expansion View',
        'Winner Result Screen & Replay Trigger',
      ],
      gallery: [
        {
          src: '/assets/projects/dual-tap/dual-tap-start.jpg',
          alt: 'Dual Tap Game Start Screen',
          caption: 'Landing screen introducing Player B (Top) vs Player A (Bottom) match rules.',
          aspect: 'portrait',
        },
        {
          src: '/assets/projects/dual-tap/dual-tap-gameplay.jpg',
          alt: 'Dual Tap Game Initial Split Arena',
          caption: 'Balanced 50/50 split screen at match kickoff with zeroed player scores.',
          aspect: 'portrait',
        },
        {
          src: '/assets/projects/dual-tap/dual-tap-score.jpg',
          alt: 'Dual Tap Live Territory Expansion',
          caption: 'Active round showing Red (90) expanding territory over Blue (55) on each tap.',
          aspect: 'portrait',
        },
        {
          src: '/assets/projects/dual-tap/dual-tap-winner-a.jpg',
          alt: 'Dual Tap Mid-Match Momentum Shift',
          caption: 'Split-screen state updating live flex ratio and player tap counters.',
          aspect: 'portrait',
        },
        {
          src: '/assets/projects/dual-tap/dual-tap-winner-b.jpg',
          alt: 'Dual Tap Player B Winner Screen',
          caption: 'Victory summary displaying final score (150 points) and Play again control.',
          aspect: 'portrait',
        },
      ],
    },
  },
  {
    id: 'campushub',
    slug: 'campushub',
    title: 'CampusHub',
    subtitle: 'Full-Stack Campus App & React Admin Monorepo',
    description:
      'A multi-role digital campus monorepo featuring a Flutter mobile/web app, a React TypeScript web admin portal, and a Node.js + Express + PostgreSQL/Prisma backend with Socket.IO. Supports announcements, academic schedules, placement updates, AI career roadmaps, and campus messaging.',
    category: 'Full-Stack Web',
    platforms: ['Flutter Mobile & Web', 'React Admin Web'],
    featured: false,
    tags: ['Flutter', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Socket.IO'],
    features: [
      'Student, Faculty, Placement & Admin Role Portals',
      'Real-Time Chat & Presence via Socket.IO',
      'Course Schedules, Notices & Placement Tracking',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/CampusHub',
      repoStatus: 'public',
    },
    assets: {
      folder: 'campushub',
      hasRealScreenshots: false,
      assetChecklist: [
        'Flutter Student / Faculty App (Riverpod + GoRouter)',
        'React + Tailwind TypeScript Web Admin Dashboard',
        'Express REST & Socket.IO Backend with Prisma + PostgreSQL',
      ],
      gallery: [],
    },
  },
  {
    id: 'chat-x',
    slug: 'chat-x',
    title: 'Chat-X',
    subtitle: 'Real-Time Messaging & Media Application',
    description:
      'A Flutter messaging application powered by GetX state management, Firebase Auth, Cloud Firestore, and a Node.js/Express + Cloudinary media upload backend. Supports 1-on-1 and group chats, voice notes with waveforms, file sharing, reactions, and online presence status.',
    category: 'Real-Time Systems',
    platforms: ['Flutter Mobile Application'],
    featured: false,
    tags: ['Flutter', 'Dart', 'GetX', 'Firebase Auth', 'Cloud Firestore', 'Cloudinary'],
    features: [
      '1-on-1 & Group Messaging via Cloud Firestore',
      'Voice Notes, Waveforms & Rich Media Sharing',
      'Firebase Authentication & Real-Time Presence Status',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/Chat-X',
      repoStatus: 'public',
    },
    assets: {
      folder: 'chatx',
      hasRealScreenshots: false,
      assetChecklist: [
        'Firebase Auth Onboarding & Contact Discovery Flow',
        'Firestore Chat Stream with Voice Notes & Reactions',
        'Cloudinary Media Upload Service on Express',
      ],
      gallery: [],
    },
  },
  {
    id: 'campus-placement-system',
    slug: 'campus-placement-system',
    title: 'Campus Placement Management System',
    subtitle: 'Multi-Role College Placement Web Portal',
    description:
      'A full-stack campus placement web application built with React, Vite, Tailwind CSS, Bootstrap, Node.js, Express, and MongoDB. Provides separate portals for Students, TPOs, Staff, and HOD/Principal users alongside JWT authentication and Cloudinary document uploads.',
    category: 'Full-Stack Web',
    platforms: ['Web Management Portal'],
    featured: false,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    features: [
      'Student, TPO, Staff & HOD/Principal Portals',
      'Job Postings, Drive Tracking & Resume Uploads',
      'JWT Role Authentication & Cloudinary File Storage',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/campus-placement-management-system',
      repoStatus: 'public',
    },
    assets: {
      folder: 'cpms',
      hasRealScreenshots: false,
      assetChecklist: [
        'TPO Job Publisher & Applicant Approval View',
        'Student Eligibility & Application Tracking Portal',
        'Cloudinary Resume & Offer Letter Storage Flow',
      ],
      gallery: [],
    },
  },
  {
    id: 'smart-canteen',
    slug: 'smart-canteen',
    title: 'Smart Canteen',
    subtitle: 'Flutter Food Ordering App & React Admin Dashboard',
    description:
      'A campus dining platform combining a Flutter student ordering mobile app with a React and Tailwind web admin dashboard backed by Firebase Authentication and Cloud Firestore for live menu availability and order queue updates.',
    category: 'Mobile Application',
    platforms: ['Flutter Mobile', 'React Web Admin'],
    featured: false,
    tags: ['Flutter', 'React Admin', 'Firebase Auth', 'Cloud Firestore', 'Dart'],
    features: [
      'Student Mobile Pre-Ordering & Payment Redirect',
      'Live Order Status Sync via Cloud Firestore',
      'React Web Admin Menu & Stock Control Panel',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/canteen-app-with-admin-dashboard',
      repoStatus: 'public',
    },
    assets: {
      folder: 'smart-canteen',
      hasRealScreenshots: false,
      assetChecklist: [
        'Flutter Student Menu & Digital Order Flow',
        'React Admin Web Dashboard with Order Queue',
        'Firestore Menu Inventory & Role-Based Auth',
      ],
      gallery: [],
    },
  },
  {
    id: 'lingo-breeze',
    slug: 'lingo-breeze',
    title: 'Lingo Breeze',
    subtitle: 'Flutter Clean Architecture Vocabulary App',
    description:
      'A "My Vocabulary" Flutter module built with Clean Architecture, Riverpod, GoRouter, and Material 3. Fetches vocabulary lists from a Node.js Express API and persists selected words in Cloud Firestore with structured loading, empty, and error state handling.',
    category: 'Mobile Application',
    platforms: ['Flutter Mobile'],
    featured: false,
    tags: ['Flutter', 'Dart', 'Riverpod', 'GoRouter', 'Cloud Firestore', 'Node.js API'],
    features: [
      'Clean Architecture Layers (Core, Data, Domain, UI)',
      'Node.js REST Fetch & Cloud Firestore Word Saving',
      'Riverpod Loading, Empty & Error State Handling',
    ],
    links: {
      github: 'https://github.com/Naveed-Ahmed-21/Lingo-Breeze',
      repoStatus: 'public',
    },
    assets: {
      folder: 'lingo-breeze',
      hasRealScreenshots: false,
      assetChecklist: [
        'My Vocabulary List View with Loading & Empty States',
        'Node.js API Word Fetch & Firestore Persistence',
        'Material 3 Theme & GoRouter Navigation Shell',
      ],
      gallery: [],
    },
  },
]
