<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/90 backdrop-blur-sm"
      @click="closeModal"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
    ></div>

    <!-- Modal Content -->
    <div 
      class="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      v-motion
      :initial="{ opacity: 0, scale: 0.9, y: 20 }"
      :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 300 } }"
    >
      <!-- Header Image / Carousel -->
      <div class="relative h-64 sm:h-80 bg-black flex-shrink-0">
         <button 
          @click="closeModal"
          class="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div v-if="project.heroImage" class="w-full h-full">
           <img :src="project.heroImage" class="w-full h-full object-cover" />
        </div>
        <div v-else class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
           <span class="text-6xl">📱</span>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="p-6 sm:p-8 overflow-y-auto custom-scrollbar">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Main Info -->
          <div class="flex-1">
             <div class="flex items-center gap-3 mb-2">
                <span class="text-electric-blue font-bold px-3 py-1 bg-electric-blue/10 rounded-full text-sm">{{ project.category }}</span>
                <span class="text-gray-500 text-sm">{{ project.year }}</span>
             </div>
             
             <h2 class="text-3xl font-display font-bold text-white mb-1">{{ project.title }}</h2>
             <p class="text-gray-400 text-lg mb-6">{{ project.role }}</p>

             <h3 class="text-lg font-bold text-white mb-2">Overview</h3>
             <p class="text-gray-300 leading-relaxed mb-6">{{ project.description }}</p>

             <div class="flex flex-wrap gap-3">
               <a 
                 v-if="project.playStoreUrl" 
                 :href="project.playStoreUrl" 
                 target="_blank"
                 class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
               >
                 <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg>
                 Play Store
               </a>
               <a 
                 v-if="project.appStoreUrl" 
                 :href="project.appStoreUrl" 
                 target="_blank"
                 class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
               >
                 <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" /></svg>
                 App Store
               </a>
               <button 
                 v-if="!project.playStoreUrl && !project.appStoreUrl"
                 disabled 
                 class="px-6 py-3 bg-gray-800/50 text-gray-500 rounded-lg cursor-not-allowed flex items-center gap-2"
               >
                 Internal / Not Public
               </button>
             </div>
          </div>

          <!-- Sidebar Tech Stack -->
          <div class="w-full md:w-64 flex-shrink-0">
            <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Tech Stack</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in project.techStack" 
                :key="tech"
                class="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-electric-blue border border-gray-700"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { isModalOpen: isOpen, selectedProject: project } = storeToRefs(store)

const closeModal = () => {
  store.closeProjectModal()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(31, 41, 55, 0.5); 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4B5563; 
}
</style>
