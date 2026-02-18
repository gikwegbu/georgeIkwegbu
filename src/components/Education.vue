<template>
  <section id="education" class="py-20 bg-gray-900/30 text-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4">Education</h2>
        <p class="text-gray-400 text-lg">My academic background.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(edu, index) in education" 
          :key="edu.id"
          class="bg-black border border-gray-800 p-8 rounded-2xl hover:border-electric-blue transition-colors duration-300 relative group flex flex-col h-full"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        >
          <!-- Badge -->
          <div class="absolute top-4 right-4" v-if="edu.year.includes('Present') || edu.status === 'In Progress'">
            <span class="bg-electric-blue text-black text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              {{ edu.status }}
            </span>
          </div>

          <div class="mb-6">
             <div class="text-electric-blue font-mono text-sm mb-2">{{ edu.year }}</div>
             <h3 class="text-xl font-bold mb-1 group-hover:text-electric-blue transition-colors">{{ edu.degree }}</h3>
             <div class="text-gray-400 text-sm">{{ edu.school }}</div>
          </div>
          
          <div class="flex-grow">
            <p class="text-gray-300 text-sm mb-4 leading-relaxed">
              <strong class="text-gray-500 block mb-1 uppercase text-xs tracking-wider">Focus</strong>
              {{ edu.focus }}
            </p>
            
            <div v-if="edu.dissertation || edu.project" class="pt-4 border-t border-gray-900">
               <strong class="text-gray-500 block mb-1 uppercase text-xs tracking-wider">
                 {{ edu.dissertation ? 'Dissertation' : 'Project' }}
               </strong>
               <p class="text-gray-300 text-sm leading-relaxed">{{ edu.dissertation || edu.project }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { education } from '../data/education'
</script>
