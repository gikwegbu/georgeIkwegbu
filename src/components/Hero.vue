<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white pt-20">
    <!-- Background Effects -->
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,180,255,0.1),_transparent_40%)]"></div>
      <!-- Animated Particles/Stars could go here -->
    </div>

    <div class="relative z-10 container mx-auto px-4 text-center">
      <h2 
        class="text-sm md:text-lg text-electric-blue font-bold tracking-widest uppercase mb-4"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
      >
        Hi, I'm
      </h2>
      
      <h1 
        class="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold mb-6 tracking-tight"
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 800, delay: 400 } }"
      >
        George Ikwegbu
      </h1>

      <div class="h-12 md:h-16 mb-6 overflow-hidden">
        <span 
          class="text-xl md:text-3xl lg:text-4xl text-gray-300 font-mono"
        >
          <span class="text-purple-400">> </span>
          {{ displayedText }}
          <span class="animate-pulse">|</span>
        </span>
      </div>

      <p 
        class="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 800 } }"
      >
        I build seamless mobile experiences — from architecture to App Store.
      </p>

      <div 
        class="flex flex-col sm:flex-row items-center justify-center gap-4"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 1000 } }"
      >
        <button 
          @click="scrollToProjects"
          class="px-8 py-3 bg-electric-blue text-black font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 w-full sm:w-auto"
        >
          View My Work
        </button>
        <a 
          href="/resume.pdf" 
          download
          class="px-8 py-3 border border-gray-600 text-white font-medium rounded-full hover:border-electric-blue hover:text-electric-blue hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
        >
          Download CV
        </a>
      </div>
      
      <!-- Social Links -->
      <div 
        class="mt-12 flex justify-center gap-6"
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { duration: 800, delay: 1200 } }"
      >
        <a href="https://github.com/gikwegbu" target="_blank" class="text-gray-400 hover:text-electric-blue transition-colors duration-300">
            <!-- Github Icon -->
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="https://linkedin.com/in/GIkwegbu" target="_blank" class="text-gray-400 hover:text-electric-blue transition-colors duration-300">
            <!-- LinkedIn Icon -->
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="mailto:g.ikwegbu@gmail.com" class="text-gray-400 hover:text-electric-blue transition-colors duration-300">
             <!-- Email Icon -->
             <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-11.179l4.623 5.467zm-4.484-6.069h4.186l2.494 2.949 2.501-2.949h4.195l-8.681 10.163-4.695-10.163zm16.273 6.069l4.588-5.467v11.179l-4.588-5.712zm-8.412 1.488l-9.043-10.428h22.086l-9.043 10.428zm-4.954 6.582h-3.046v-3.046h3.046v3.046zm10.518-3.046v3.046h-3.046v-3.046h3.046z"/></svg> <!-- Simplified envelope shape -->
             <!-- Actually using a better path for envelope -->
             <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        </a>
      </div>
    </div>
    
    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const displayedText = ref('')
const roles = [
  "Senior Flutter Engineer",
  "Mobile App Architect",
  "Open Source Contributor",
  "MSc Computer Science"
]
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typingInterval = null
const typingSpeed = 100
const deletingSpeed = 50
const pauseBetweenRoles = 2000

const typeRole = () => {
  const currentRole = roles[roleIndex]
  
  if (isDeleting) {
    displayedText.value = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayedText.value = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true
    setTimeout(typeRole, pauseBetweenRoles)
    return
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed
  setTimeout(typeRole, speed)
}

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects')
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  setTimeout(typeRole, 1000)
})
</script>
