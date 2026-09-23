# George Ikwegbu - Professional Portfolio & Studio CMS

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%23FFE45E.svg?style=for-the-badge&logo=pinia&logoColor=black)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white)

A modern, dynamic portfolio and real-time content management studio built for **George Ikwegbu**, a Senior Flutter/Mobile Engineer. The website combines an ultra-sleek dark aesthetic with **Cloud Firestore**, **Firebase Storage**, and **Firebase Authentication** for content authoring and asset pipelines.

---

## ✨ Features

### Public Portfolio
- **🎨 Modern Aesthetic**: Dark-themed architecture with "Electric Blue" accents, frosted glassmorphism, and responsive typography.
- **⚡ Zero-Delay Loading**: Pinia state management is pre-seeded with instant fallbacks, ensuring zero layout shifts and offline reliability while hydrating fresh data from Firestore.
- **🔍 Click-to-Expand Image Lightbox**: High-resolution fullscreen lightbox overlay for project hero images, speaking stage photos, and screenshots with carousel navigation (`←` / `→`), thumbnail jumping, and keyboard controls (`Esc`, arrow keys).
- **📱 Case Study Modals**: Deep-dive project modals featuring overview, role, tech stack chips, app store links, and screenshot galleries.
- **🎤 Public Speaking Showcase & Modals**: Interactive speaking engagements hub with keynote/workshop filters, deep-dive modal case studies (`SpeakingModal.vue`), **⚡ Key Technical Takeaways**, 1-click slide presentation downloads, and stage photo galleries.
- **🌊 Motion & Micro-Interactions**: Scroll-triggered view transitions and micro-animations powered by `@vueuse/motion`.
- **🏷️ Dynamic Filtering**: Real-time project and talk categorization.

### Studio & Content Management
- **🔐 Secure Firebase Authentication**: Google Sign-In and Email/Password authentication.
- **📑 Full CRUD Support**: Tabbed content management across 7 real-time Firestore collections:
  - 📝 **Blogs & Articles**
  - 🚀 **Projects & Mobile Apps**
  - 🎤 **Public Speaking & Workshops**
  - 🧭 **My Tech Journey** (Career Timeline)
  - 💼 **Work Experience**
  - ⚡ **Technical Skills**
  - 🎓 **Academic Education**
- **🖼️ Firebase Storage Pipeline**:
  - Organized directory hierarchy per entity ID (`projects/{projectId}/` and `speaking/{talkId}/`).
  - Single-image Hero Cover upload with real-time progress indicators.
  - Multi-file screenshot & stage photo uploader with aggregate progress tracking.
  - Presentation slide deck file upload to storage.
  - Drag-and-drop image reordering with instantaneous Firestore order sync.
  - Safe asset deletion confirmation modals.
- **🆔 Standard Firestore Auto IDs & FIFO Ordering**: Automatic 20-character canonical Firestore ID generation and auto-incrementing display ordering for frictionless content creation.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [Vue.js 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/) (with lazy-loaded admin code-splitting)
- **Backend & Database**: [Cloud Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)
- **File Storage**: [Firebase Storage](https://firebase.google.com/docs/storage)
- **Animations**: [@vueuse/motion](https://motion.vueuse.org/)
- **Typography**: [Inter](https://fonts.google.com/specimen/Inter) (Body) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Headings)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher recommended)
- npm (v8.0.0 or higher)
- A Firebase project with Firestore, Storage, and Auth enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gikwegbu/georgeIkwegbu.git
   cd georgeIkwegbu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Fill in your Firebase project configuration credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Running Locally

Start the development server:
```bash
npm run dev
```
The application will run at `http://localhost:5173`.

### Building for Production

Compile and bundle for production:
```bash
npm run build
```
Optimized assets and split bundles will be output to the `dist/` directory.

---

## 📂 Project Structure

```text
├── scripts/             # Data migration and seeding scripts
│   ├── seed-firestore.js
│   ├── migrate-to-autoids.js
│   └── cleanup-firestore-ids.js
├── src/
│   ├── assets/          # Static images, documents & fonts
│   ├── components/      # UI components (Hero, Navbar, ProjectModal, etc.)
│   ├── data/            # Local default datasets & fallback files
│   ├── firebase/        # Firebase initialization, Firestore service, Storage service
│   │   ├── config.js
│   │   ├── db.js
│   │   └── storage.js
│   ├── router/          # Vue Router configuration
│   ├── store/           # Pinia store with Firestore actions
│   ├── views/           # Page views (Home.vue, Admin.vue)
│   ├── App.vue          # Root component
│   └── main.js          # App bootstrap
├── firestore.rules      # Cloud Firestore security rules
├── storage.rules        # Firebase Storage security rules
├── firebase.json        # Firebase configuration
└── CHANGELOG.md         # Detailed release history
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & Built by **George Ikwegbu**.
