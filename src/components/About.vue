<template>
  <section id="about" class="py-20 bg-black text-white relative overflow-hidden">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-12">
        <!-- Avatar Side -->
        <div 
          class="w-full md:w-1/3 flex justify-center"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800 } }"
        >
          <div class="relative w-64 h-64 md:w-80 md:h-80">
            <div class="absolute inset-0 bg-electric-blue rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div class="relative w-full h-full rounded-full border-4 border-gray-800 overflow-hidden bg-gray-900 group hover:border-electric-blue transition-colors duration-300">
               <img src="../assets/georgeIkwegbu.jpg" alt="George Ikwegbu" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>

        <!-- Content Side -->
        <div 
          class="w-full md:w-2/3"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 800, delay: 200 } }"
        >
          <h2 class="text-3xl md:text-5xl font-display font-bold mb-6">
            About <span class="text-electric-blue">Me</span>
          </h2>
          
          <div class="space-y-4 text-gray-300 text-lg leading-relaxed whitespace-pre-line">
            {{ profile.bio }}
          </div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in profile.stats" 
          :key="stat.label"
          class="text-center p-6 bg-gray-900/50 rounded-xl hover:bg-gray-800/50 transition-colors duration-300 border border-gray-800 hover:border-electric-blue/30"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        >
          <div class="text-4xl md:text-5xl font-bold text-electric-blue mb-2 font-display">
            {{ stat.value }}
          </div>
          <div class="text-gray-400 text-sm md:text-base font-medium uppercase tracking-wide">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { profile } from '../data/profile'
</script>
