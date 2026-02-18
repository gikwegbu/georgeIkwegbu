<template>
  <section id="blog" class="py-20 bg-gray-900/30 text-white border-t border-gray-900">
    <div class="container mx-auto px-4">
      <div class="text-center mb-16" v-motion-slide-visible-once-bottom>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4">Latest <span class="text-electric-blue">Thoughts</span></h2>
        <p class="text-gray-400 text-lg">My writing on Flutter, architecture, and tech.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(post, index) in blogPosts" 
          :key="post.id"
          class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 group flex flex-col h-full"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        >
          <!-- Cover Image -->
          <div class="h-48 bg-gray-800 relative overflow-hidden">
            <img 
              v-if="post.coverImage" 
              :src="post.coverImage" 
              :alt="post.title" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div 
              v-else 
              class="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center relative p-6"
            >
              <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-electric-blue via-transparent to-transparent"></div>
              <span class="font-display font-bold text-2xl text-gray-500 group-hover:text-electric-blue transition-colors z-10 text-center">
                {{ post.title }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center gap-3 text-xs text-electric-blue mb-3 font-mono">
              <span>{{ post.date }}</span>
              <span>•</span>
              <span>{{ post.readTime }}</span>
            </div>
            
            <h3 class="text-xl font-bold mb-3 group-hover:text-electric-blue transition-colors line-clamp-2">
              {{ post.title }}
            </h3>
            
            <p class="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
              {{ post.excerpt }}
            </p>
            
            <a 
              :href="post.url" 
              target="_blank"
              class="inline-flex items-center text-electric-blue font-bold text-sm hover:underline mt-auto"
            >
              Read Article
              <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { blogPosts } from '../data/blog'
</script>
