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
      <Speaking />
      <Blog />
      <Contact />
    </main>

    <Footer />
    <ProjectModal />
    <SpeakingModal />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '../store'
import Navbar from '../components/Navbar.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Journey from '../components/Journey.vue'
import Experience from '../components/Experience.vue'
import Skills from '../components/Skills.vue'
import Education from '../components/Education.vue'
import Projects from '../components/Projects.vue'
import Speaking from '../components/Speaking.vue'
import Blog from '../components/Blog.vue'
import Contact from '../components/Contact.vue'
import Footer from '../components/Footer.vue'
import ProjectModal from '../components/ProjectModal.vue'
import SpeakingModal from '../components/SpeakingModal.vue'

const store = useMainStore()

onMounted(() => {
  store.fetchAll()
})
</script>
