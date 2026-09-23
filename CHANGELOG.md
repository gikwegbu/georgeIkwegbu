# Changelog

All notable changes to this portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.0] - 2026-09-23

- **Public Speaking & Workshop Showcase**:
  - Dedicated Public Speaking showcase component (`Speaking.vue`) featuring streamlined cards with format badges (Keynote, Talk, Workshop, Panel), topic hashtags, and social proof metrics.
  - Interactive case-study detail modal (`SpeakingModal.vue`) featuring talk synopsis, **⚡ Key Technical Takeaways**, and high-resolution stage photo gallery with carousel Lightbox navigation.
  - **1-Click Slide Downloader Engine**: Built-in file blob downloader that triggers immediate direct file downloads for slide decks (`.pdf`/`.pptx`).
  - Studio Admin tab for full CRUD, Firebase Storage pipeline (`speaking/{talkId}/hero`, `speaking/{talkId}/screenshots`, `speaking/{talkId}/slides`), and drag-and-drop photo reordering.
  - **Automatic FIFO Descending Ordering System**: Standardized auto-incrementing order calculation (`maxOrder + 1`) and descending sorting (`order: 'desc'`) across **Blogs**, **Projects**, and **Public Speaking**, ensuring newest entries automatically appear at the top without requiring manual renumbering of older records.
- **Firebase Cloud Firestore Integration**:
  - Dynamic cloud database support across 7 collections: `blogs`, `projects`, `speaking` (Public Speaking), `journey` (My Tech Journey), `experience` (Work Experience), `skills` (Technical Skills), and `education`.
  - Service layer (`src/firebase/db.js`) providing standardized CRUD operations and auto ID generators (`generateDocId`).
  - Pinia state management integration in `src/store/index.js` with instant local fallbacks for zero-layout-shift and offline reliability.
- **Firebase Storage & Image Asset Management**:
  - Project ID-based storage hierarchy (`projects/{projectId}/hero` and `projects/{projectId}/screenshots`).
  - Multi-file screenshot uploader supporting parallel uploads with aggregate progress bars.
  - Single-image Hero Cover uploader with preview and replacement capabilities.
  - Deletion handler with Firebase Storage file cleanup.
- **Dedicated Admin Management Portal**:
  - Firebase Authentication supporting Google Sign-In and Email/Password login.
  - Full CRUD management interface with tabbed navigation for all 6 collections.
  - Live modal forms with auto-transformations for comma-separated tags, bullet lists, and links.
  - Native HTML5 Drag-and-Drop reordering for project screenshots with real-time Firestore sync.
  - Dedicated asset deletion confirmation modal with image preview.
- **Click-to-Expand Full-Screen Lightbox**:
  - Interactive Lightbox in project case study modals (`ProjectModal.vue`) and Admin preview cards.
  - Full-screen high-resolution view for Hero covers and screenshots.
  - Sequential carousel controls (previous/next arrows), bottom thumbnail jumping strip, and counter badge.
  - Keyboard navigation support (`Escape` to close, `ArrowLeft` / `ArrowRight` to navigate).
- **Automated Migration & Cleanup Scripts**:
  - `scripts/seed-firestore.js`: Seed initial static records to Firestore.
  - `scripts/migrate-to-autoids.js`: Migration script converting legacy numerical IDs to standard 20-character Firestore Auto IDs.
  - `scripts/cleanup-firestore-ids.js`: Database cleanup stripping legacy ID fields from document bodies.
- **Security & Hosting Configurations**:
  - Production `firestore.rules` and `storage.rules` configured and deployed.
  - `.env.example` template added for Vite environment variables.

### Changed
- Refactored `Blog.vue`, `Projects.vue`, `Journey.vue`, `Experience.vue`, `Skills.vue`, and `Education.vue` to bind to reactive Pinia store state.
- Configured dynamic lazy-loading for admin routes in Vue Router.
- Optimized bundle code-splitting in Vite.

---

## [1.0.0] - 2026-09-22

### Added
- Initial release of George Ikwegbu's personal portfolio.
- Dark-themed design with Electric Blue accents and glassmorphism.
- Responsive mobile layout with animated hamburger menu.
- Smooth scroll animations via `@vueuse/motion`.
- Static data architecture for blogs, projects, experience, education, skills, and timeline.
