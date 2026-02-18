<template>
  <section id="skills" class="py-20 bg-black text-white border-t border-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4">Technical <span class="text-electric-blue">Skills</span></h2>
        <p class="text-gray-400 text-lg">My stack and tools.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div 
          v-for="(skillGroup, index) in skills" 
          :key="skillGroup.category"
          class="bg-gray-900/20 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          v-motion
          :initial="{ opacity: 0, scale: 0.95 }"
          :visible="{ opacity: 1, scale: 1, transition: { duration: 400, delay: index * 50 } }"
        >
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            <span class="w-2 h-6 rounded-full" :class="skillGroup.color"></span>
            {{ skillGroup.category }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="item in skillGroup.items" 
              :key="item"
              class="px-3 py-1.5 bg-gray-800 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors cursor-default"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { skills } from '../data/skills'
</script>
