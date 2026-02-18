<template>
  <section id="experience" class="py-20 bg-black text-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4">Work <span class="text-electric-blue">Experience</span></h2>
        <p class="text-gray-400 text-lg">My professional track record.</p>
      </div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div 
          v-for="(job, index) in experience" 
          :key="job.id"
          class="group relative bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-electric-blue/40 transition-all duration-300"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        >
          <div class="p-6 md:p-8">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 class="text-2xl font-bold text-white group-hover:text-electric-blue transition-colors duration-300">{{ job.role }}</h3>
                <div class="text-lg text-gray-400 mt-1 font-medium">{{ job.company }}</div>
              </div>
              <div class="flex flex-col md:items-end gap-1">
                <span class="text-electric-blue font-mono text-sm bg-electric-blue/10 px-3 py-1 rounded-full">{{ job.date }}</span>
                <span class="text-gray-500 text-sm">{{ job.location }}</span>
              </div>
            </div>

            <ul class="space-y-3 mb-6">
              <li 
                v-for="(point, idx) in job.description" 
                :key="idx"
                class="flex items-start text-gray-300"
              >
                <span class="text-electric-blue mr-3 mt-1.5 text-xs">▶</span>
                <span class="leading-relaxed">{{ point }}</span>
              </li>
            </ul>

            <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-800">
              <span 
                v-for="tag in job.tags" 
                :key="tag"
                class="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full border border-gray-700 hover:border-gray-500 transition-colors"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { experience } from '../data/experience'
</script>
