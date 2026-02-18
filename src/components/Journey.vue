<template>
  <section id="journey" class="py-20 bg-gray-900/30 text-white">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4">My Tech <span class="text-electric-blue">Journey</span></h2>
        <p class="text-gray-400 text-lg">Started on the web. Found my home in mobile.</p>
      </div>

      <div class="relative max-w-4xl mx-auto">
        <!-- Vertical Line -->
        <div class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gray-800"></div>

        <div 
          v-for="(item, index) in journey" 
          :key="index"
          class="relative mb-12 flex flex-col md:flex-row items-center w-full"
          :class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
        >
          <!-- Timeline Dot -->
          <div class="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-black border-4 border-electric-blue z-10"></div>

          <!-- Content Card -->
          <div class="w-full md:w-1/2 pl-16 md:pl-0 md:px-10">
            <div 
              class="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-electric-blue/50 transition-colors duration-300 shadow-lg"
              v-motion
              :initial="{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }"
              :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 100 } }"
            >
              <div class="flex items-center gap-3 mb-2">
                <span class="text-electric-blue font-bold font-mono text-sm">{{ item.year }}</span>
                <div class="h-px bg-gray-700 flex-grow"></div>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">{{ item.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ item.subtitle }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { journey } from '../data/journey'
</script>
