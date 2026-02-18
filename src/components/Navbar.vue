<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black/80 backdrop-blur-md shadow-lg': isScrolled || isMenuOpen, 'bg-transparent': !isScrolled && !isMenuOpen }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 cursor-pointer" @click="scrollToSection('hero')">
          <span class="font-display font-bold text-xl tracking-wider text-white">
            <span class="text-electric-blue">&lt;</span>GI<span class="text-electric-blue"> /&gt;</span>
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <a 
              v-for="item in navItems" 
              :key="item.name" 
              @click.prevent="scrollToSection(item.id)"
              class="text-gray-300 hover:text-electric-blue hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex md:hidden">
          <button 
            @click="toggleMenu" 
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              class="block h-6 w-6" 
              :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              class="h-6 w-6" 
              :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-black/95 backdrop-blur-xl h-screen absolute w-full top-20 left-0 border-t border-gray-800">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center h-3/4">
        <a 
          v-for="item in navItems" 
          :key="item.name" 
          @click.prevent="scrollToSection(item.id)"
          class="text-gray-300 hover:text-electric-blue block px-3 py-4 rounded-md text-2xl font-display font-medium cursor-pointer"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMenuOpen = ref(false)

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Journey', id: 'journey' },
  { name: 'Experience', id: 'experience' },
  { name: 'Education', id: 'education' },
  { name: 'Projects', id: 'projects' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    // Offset for fixed header
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
  
  if (isMenuOpen.value) {
    toggleMenu()
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
