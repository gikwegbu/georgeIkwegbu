<template>
  <section id="projects" class="py-20 bg-black text-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4">Featured <span class="text-electric-blue">Projects</span></h2>
        <p class="text-gray-400 text-lg">Mobile apps I've built and shipped.</p>
      </div>

      <!-- Filter Tabs -->
      <div 
        class="flex flex-wrap justify-center gap-4 mb-12"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
      >
        <button 
          v-for="category in categories" 
          :key="category"
          @click="setCategory(category)"
          class="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent"
          :class="[
            activeCategory === category 
              ? 'bg-electric-blue text-black' 
              : 'bg-gray-900 text-gray-400 hover:text-white hover:border-gray-700'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          class="h-full"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visible="{ opacity: 1, scale: 1, transition: { duration: 400, delay: index * 100 } }"
        >
          <ProjectCard :project="project" @open-modal="openModal" />
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20 text-gray-500">
        No projects found in this category.
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard.vue'

const store = useMainStore()
const { activeCategory } = storeToRefs(store)

const categories = ['All', 'Fintech', 'Mobility', 'IoT']

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

const setCategory = (category) => {
  store.setCategory(category)
}

const openModal = (project) => {
  store.openProjectModal(project)
}
</script>
