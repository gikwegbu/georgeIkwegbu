# George Ikwegbu - Professional Portfolio

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%23FFE45E.svg?style=for-the-badge&logo=pinia&logoColor=black)

A modern, dark-themed developer portfolio website built for **George Ikwegbu**, a Senior Flutter/Mobile Engineer. This project showcases professional experience, technical skills, and mobile application projects using **Vue 3 (Composition API)**, **Vite**, and **Tailwind CSS v4**.

## ✨ Features

- **🎨 Modern Aesthetic**: Dark-themed design with "Electric Blue" accents and glassmorphism effects.
- **📱 Fully Responsive**: Mobile-first approach with a custom animated hamburger menu and layout adaptations.
- **⚡ High Performance**: Powered by Vite for lightning-fast HMR and production builds.
- **🌊 Smooth Animations**: Integrated scroll-triggered animations using `@vueuse/motion`.
- **🧩 Component-Based**: Modular architecture with separate components for Hero, About, Journey, Experience, Projects, etc.
- **📊 Data-Driven Content**: All content (projects, history, bio) is separated into structured data files for easy updates without touching code.
- **🔍 Project Filtering**: Dynamic filtering for projects (Fintech, Mobility, IoT).
- **🖼️ Project Modals**: Detailed modal views for showcasing project case studies.

## 🛠️ Tech Stack

- **Framework**: [Vue.js 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Animations**: [@vueuse/motion](https://motion.vueuse.org/)
- **Carousel**: [vue3-carousel](https://ismail9k.github.io/vue3-carousel/)
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) (Body) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Headings)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/gikwegbu/georgeIkwegbu.git
    cd georgeIkwegbu
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Running Locally

Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production

Build the application for deployment:
```bash
npm run build
```
The output files will be generated in the `dist/` directory.

## 📂 Project Structure

```text
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
│   ├── Navbar.vue
│   ├── Hero.vue
│   ├── ProjectCard.vue
│   └── ...
├── data/            # Static data files (Content Management)
│   ├── profile.js   # Bio, social links, stats
│   ├── projects.js  # Portfolio projects data
│   ├── experience.js# Work history
│   ├── journey.js   # Career timeline
│   ├── skills.js    # Technical skills
│   └── blog.js      # Blog posts
├── router/          # Vue Router configuration
├── store/           # Pinia state stores
├── views/           # Page views (Home.vue)
├── App.vue          # Root component
├── main.js          # Entry point
└── style.css        # Global styles & Tailwind imports
```

## 📝 Customization

This portfolio is designed to be easily customizable through the `src/data` directory.

- **Update Profile**: Edit `src/data/profile.js` to change your name, tagline, bio, and social links.
- **Add Projects**: Add new objects to the array in `src/data/projects.js`.
- **Change Validations**: Modify `src/data/experience.js` or `src/data/education.js`.
- **Colors**: The primary accent color is defined in `src/style.css` as a CSS variable `--color-electric-blue`.

## 📦 Deployment

This project produces a static site in the `dist` folder, making it suitable for deployment on:

- **Netlify**: Drag and drop the `dist` folder or connect via Git.
- **Vercel**: Import the project and it will detect Vite automatically.
- **GitHub Pages**: Configure a workflow to build and deploy the `dist` folder.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & Built by **George Ikwegbu**.
