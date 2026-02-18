<template>
  <footer class="bg-black py-8 border-t border-gray-900 text-sm text-gray-500">
    <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-center md:text-left">
        &copy; {{ new Date().getFullYear() }} George Ikwegbu. Built with <span class="text-electric-blue">Vue.js</span> & <span class="text-electric-blue">Tailwind</span>
      </div>
      
      <div class="flex items-center gap-6">
        <a href="https://github.com/gikwegbu" target="_blank" class="hover:text-electric-blue transition-colors">GitHub</a>
        <a href="https://linkedin.com/in/GIkwegbu" target="_blank" class="hover:text-electric-blue transition-colors">LinkedIn</a>
        <a href="mailto:g.ikwegbu@gmail.com" class="hover:text-electric-blue transition-colors">Email</a>
      
        <button 
          @click="scrollToTop" 
          class="p-2 bg-gray-900 rounded-full hover:bg-electric-blue hover:text-black transition-all ml-4"
          aria-label="Back to top"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
