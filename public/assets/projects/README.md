# Project Screenshot Assets Directory

This directory stores verified project screenshots for the portfolio showcase and lightbox gallery.

## Directory Structure & Project Mapping

| Project Slug | Application Name | Platform | Recommended Aspect Ratio | Status |
|:---|:---|:---|:---|:---|
| `linkbridge/` | **LinkBridge** | Android Mobile & Linux Desktop | 16:10 or 16:9 desktop, 9:19.5 mobile | Pending Screenshots (Interactive Preview Active) |
| `flipverse/` | **FLIPVERSE** | Flutter Mobile Game | 9:19.5 (1080×2340 or 1080×2400) | Pending Screenshots (Interactive Preview Active) |
| `dual-tap/` | **Dual Tap Game** | Mobile 2-Player Territory Game | 9:19.5 | **Real Screenshots Integrated (5 Verified Captures)** |
| `chatx/` | **Chat-X** | Real-Time Messaging App | 16:10 or 16:9 | Pending Screenshots (Interactive Preview Active) |
| `campushub/` | **CampusHub** | Academic Communication Platform | 16:10 or 16:9 | Pending Screenshots (Interactive Preview Active) |
| `cpms/` | **Campus Placement Management System** | Web Recruitment Portal | 16:10 or 16:9 | Pending Screenshots (Interactive Preview Active) |
| `smart-canteen/`| **Smart Canteen** | Mobile Ordering & Web Admin | 16:10 or 9:19.5 | Pending Screenshots (Interactive Preview Active) |
| `lingo-breeze/` | **Lingo Breeze** | Language Learning App | 9:19.5 mobile | Pending Screenshots (Interactive Preview Active) |

## How to Add Real Screenshots

1. Save your PNG/JPEG screenshots into the corresponding folder, e.g.:
   `public/assets/projects/chatx/chat-dashboard.png`
   `public/assets/projects/chatx/realtime-chat.png`
2. Update the project configuration in `src/data/projects.ts`:
   ```ts
   assets: {
     hasRealScreenshots: true,
     thumbnail: '/assets/projects/chatx/chat-dashboard.png',
     gallery: [
       {
         src: '/assets/projects/chatx/chat-dashboard.png',
         alt: 'Chat-X Live Messaging Interface',
         caption: 'WebSocket real-time chat with active channels.',
         width: 1920,
         height: 1080,
       },
     ],
   }
   ```
3. When `hasRealScreenshots` is set to `false` (or when files are pending), the portfolio automatically renders the high-end **Editorial Architectural Schematic Placeholder** with zero layout shift and zero broken images.

