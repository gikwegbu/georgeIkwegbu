<template>
  <div class="bg-black min-h-screen text-white font-body selection:bg-electric-blue selection:text-black">
    <Navbar />
    
    <main>
      <Hero />
      <About />
      <Journey />
      <Experience />
      <Skills />
      <Education />
      <Projects />
      <Blog />
      <Contact />
    </main>

    <Footer />
    <ProjectModal />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Journey from '../components/Journey.vue'
import Experience from '../components/Experience.vue'
import Skills from '../components/Skills.vue'
import Education from '../components/Education.vue'
import Projects from '../components/Projects.vue'
import Blog from '../components/Blog.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
import ProjectModal from '../components/ProjectModal.vue'
</script>
