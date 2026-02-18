<template>
  <div 
    class="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-electric-blue/50 transition-all duration-300 cursor-pointer h-full flex flex-col"
    @click="$emit('open-modal', project)"
  >
    <!-- Image Area -->
    <div class="h-48 bg-gray-800 relative overflow-hidden">
      <div v-if="project.heroImage" class="w-full h-full">
        <img :src="project.heroImage" :alt="project.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div v-else class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <span class="text-4xl">📱</span>
        <!-- Optional: Overlay with app icon if available -->
      </div>
      
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span class="text-electric-blue font-bold px-4 py-2 border border-electric-blue rounded-full bg-black/50 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          View Details
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6 flex-grow flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <span class="text-electric-blue text-xs font-bold uppercase tracking-wider">{{ project.category }}</span>
        <div class="flex gap-2">
           <!-- Store Icons Placeholder -->
           <span v-if="project.playStoreUrl" class="text-gray-400 hover:text-white"><i class="fab fa-google-play"></i></span>
           <span v-if="project.appStoreUrl" class="text-gray-400 hover:text-white"><i class="fab fa-app-store"></i></span>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colors">{{ project.title }}</h3>
      <p class="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{{ project.shortDescription }}</p>

      <div class="flex flex-wrap gap-2 mt-auto">
        <span 
          v-for="tech in project.techStack.slice(0, 3)" 
          :key="tech"
          class="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded"
        >
          {{ tech }}
        </span>
        <span v-if="project.techStack.length > 3" class="text-xs text-gray-500 px-2 py-1">+{{ project.techStack.length - 3 }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})

defineEmits(['open-modal'])
</script>
