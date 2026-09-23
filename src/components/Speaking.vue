<template>
  <section id="speaking" class="py-24 bg-gradient-to-b from-[#050507] via-black to-[#050507] text-white relative overflow-hidden">
    <!-- Ambient Glow Effects -->
    <div class="absolute top-1/4 -left-48 w-96 h-96 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16" v-motion-slide-visible-once-bottom>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-blue/10 border border-electric-blue/20 text-electric-blue text-xs font-mono uppercase tracking-wider mb-4">
          <span>🎤</span>
          <span>Keynotes & Workshops</span>
        </div>
        <h2 class="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
          Public <span class="text-electric-blue">Speaking</span>
        </h2>
        <p class="text-gray-400 text-base md:text-lg leading-relaxed">
          Sharing technical knowledge, architectural patterns, and hands-on lessons at tech conferences, community summits, and global masterclasses.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div 
        class="flex flex-wrap justify-center gap-2.5 mb-14"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: 150 } }"
      >
        <button 
          v-for="type in eventTypes" 
          :key="type"
          @click="selectedType = type"
          class="px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border"
          :class="[
            selectedType === type 
              ? 'bg-electric-blue text-black border-electric-blue font-bold shadow-lg shadow-electric-blue/20' 
              : 'bg-gray-900/80 text-gray-400 border-gray-800 hover:text-white hover:border-gray-700 hover:bg-gray-800'
          ]"
        >
          {{ type }}
        </button>
      </div>

      <!-- Engagements Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div 
          v-for="(talk, index) in filteredEngagements" 
          :key="talk.id || index"
          class="h-full"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
        >
          <!-- Streamlined Speaking Card -->
          <div 
            @click="openDetails(talk)"
            class="h-full bg-gray-900/60 border border-gray-800 hover:border-electric-blue/50 rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:shadow-electric-blue/10 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <!-- Hero Image Banner -->
              <div class="relative h-48 sm:h-52 overflow-hidden bg-black/60">
                <img 
                  :src="talk.heroImage || defaultSpeakingImage" 
                  :alt="talk.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent"></div>

                <!-- Top Badges -->
                <div class="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none gap-2">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md text-electric-blue border border-electric-blue/30 shadow-md">
                    {{ talk.eventType || 'Keynote' }}
                  </span>

                  <span v-if="talk.isVirtual" class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 backdrop-blur-md">
                    🌐 Virtual
                  </span>
                  <span v-else-if="talk.attendees" class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/80 text-gray-300 border border-gray-700 backdrop-blur-md">
                    👥 {{ talk.attendees }}
                  </span>
                </div>

                <!-- Screenshots Indicator -->
                <div 
                  v-if="talk.screenshots && talk.screenshots.length > 0"
                  class="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-electric-blue border border-gray-800"
                >
                  📸 {{ talk.screenshots.length }} shots
                </div>
              </div>

              <!-- Card Content -->
              <div class="p-5 sm:p-6 space-y-3">
                <!-- Meta: Date & Location -->
                <div class="flex items-center gap-2.5 text-[11px] text-gray-400 font-mono">
                  <span class="text-electric-blue flex items-center gap-1">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    {{ talk.date }}
                  </span>
                  <span>•</span>
                  <span class="truncate flex items-center gap-1 text-gray-400">
                    <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    {{ talk.location }}
                  </span>
                </div>

                <!-- Event Organization / Name -->
                <div class="text-xs font-bold font-mono tracking-wider text-electric-blue/90 uppercase truncate">
                  {{ talk.eventName }}
                </div>

                <!-- Talk Title -->
                <h3 class="text-lg font-display font-bold text-white group-hover:text-electric-blue transition-colors line-clamp-2 leading-snug">
                  {{ talk.title }}
                </h3>

                <!-- Short Synopsis -->
                <p class="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                  {{ talk.description }}
                </p>

                <!-- Topic Hashtags -->
                <div v-if="talk.tags && talk.tags.length > 0" class="flex flex-wrap gap-1.5 pt-1">
                  <span 
                    v-for="tag in talk.tags.slice(0, 3)" 
                    :key="tag"
                    class="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-950 text-gray-400 border border-gray-800"
                  >
                    {{ tag.startsWith('#') ? tag : '#' + tag }}
                  </span>
                  <span v-if="talk.tags.length > 3" class="text-[10px] font-mono text-gray-500 self-center">
                    +{{ talk.tags.length - 3 }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Card Footer: View Details & Actions -->
            <div class="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-gray-800/80 flex items-center justify-between gap-2">
              <button 
                @click.stop="openDetails(talk)"
                class="text-xs font-bold text-electric-blue hover:text-white flex items-center gap-1 group/btn transition-colors"
              >
                <span>View Details</span>
                <svg class="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </button>

              <div class="flex items-center gap-1.5">
                <!-- Direct Slide Download Trigger -->
                <button
                  v-if="talk.slidesLink"
                  @click.stop="downloadSlideDeck(talk)"
                  title="Download Slides"
                  class="p-1.5 rounded-lg bg-gray-800 hover:bg-yellow-500/20 text-yellow-400 border border-gray-700 hover:border-yellow-500/40 transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                </button>

                <!-- Watch Video Link -->
                <a
                  v-if="talk.videoLink"
                  :href="talk.videoLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                  title="Watch Video Recording"
                  class="p-1.5 rounded-lg bg-gray-800 hover:bg-electric-blue hover:text-black text-gray-300 border border-gray-700 transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </a>

                <!-- GitHub Demo Repo -->
                <a
                  v-if="talk.repoLink"
                  :href="talk.repoLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.stop
                  title="View GitHub Demo Code"
                  class="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 transition-colors"
                >
                  <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEngagements.length === 0" class="text-center py-20 text-gray-500 font-mono text-sm">
        No speaking engagements found in this category.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { speaking } = storeToRefs(store)

const defaultSpeakingImage = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80'

const selectedType = ref('All')

const eventTypes = computed(() => {
  const dynamicTypes = Array.from(new Set(
    (speaking.value || []).map(t => t.eventType).filter(Boolean)
  ))
  return ['All', ...dynamicTypes]
})

const filteredEngagements = computed(() => {
  const list = [...(speaking.value || [])].sort((a, b) => (Number(b.order) || 0) - (Number(a.order) || 0))
  if (selectedType.value === 'All') return list
  return list.filter(t => t.eventType === selectedType.value)
})

const openDetails = (talk) => {
  store.openSpeakingModal(talk)
}

const downloadSlideDeck = async (talk) => {
  if (!talk || !talk.slidesLink) return
  const url = talk.slidesLink

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Download failed')
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    const sanitizedTitle = (talk.title || 'Presentation_Slides').replace(/[^a-zA-Z0-9_-]/g, '_')
    link.download = `George_Ikwegbu_${sanitizedTitle}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (err) {
    window.open(url, '_blank')
  }
}
</script>
