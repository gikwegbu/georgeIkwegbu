<template>
  <div v-if="isOpen && talk" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/90 backdrop-blur-md"
      @click="closeModal"
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
    ></div>

    <!-- Modal Card -->
    <div 
      class="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] z-10"
      v-motion
      :initial="{ opacity: 0, scale: 0.95, y: 20 }"
      :enter="{ opacity: 1, scale: 1, y: 0, transition: { duration: 250 } }"
    >
      <!-- Header Banner / Hero Image -->
      <div class="relative h-60 sm:h-72 bg-black flex-shrink-0 group overflow-hidden">
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/90 rounded-full text-white border border-gray-700 transition-colors"
          title="Close (Esc)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        <div v-if="talk.heroImage" class="w-full h-full cursor-zoom-in relative" @click="openLightbox(0)">
          <img :src="talk.heroImage" :alt="talk.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          
          <div class="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono text-electric-blue border border-gray-800 flex items-center gap-1.5 shadow">
            <span>🔍 Click to expand stage photo</span>
          </div>
        </div>
        <div v-else class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-950 flex items-center justify-center">
          <span class="text-6xl">🎤</span>
        </div>
      </div>

      <!-- Scrollable Body Content -->
      <div class="p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-8">
        <!-- Event Header & Meta -->
        <div class="space-y-3">
          <div class="flex items-center gap-2.5 flex-wrap">
            <span class="px-3 py-1 bg-electric-blue/10 text-electric-blue border border-electric-blue/30 rounded-full text-xs font-mono font-bold">
              {{ talk.eventType || 'Keynote' }}
            </span>
            <span v-if="talk.isVirtual" class="px-2.5 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 rounded-full text-xs font-mono">
              🌐 Virtual Event
            </span>
            <span v-if="talk.attendees" class="px-2.5 py-1 bg-gray-800/90 text-gray-300 border border-gray-700 rounded-full text-xs font-mono">
              👥 {{ talk.attendees }}
            </span>
            <span class="text-gray-500 text-xs font-mono ml-auto">
              {{ talk.date }} • {{ talk.location }}
            </span>
          </div>

          <div class="text-xs font-bold font-mono tracking-wider text-electric-blue uppercase">
            {{ talk.eventName }}
          </div>

          <h2 class="text-2xl sm:text-3xl font-display font-bold text-white leading-snug">
            {{ talk.title }}
          </h2>
        </div>

        <!-- Abstract & Synopsis -->
        <div>
          <h3 class="text-sm font-bold font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>📝</span> Talk Overview & Synopsis
          </h3>
          <p class="text-gray-300 leading-relaxed text-sm sm:text-base">
            {{ talk.description }}
          </p>
        </div>

        <!-- Key Takeaways Highlight Box -->
        <div v-if="talk.keyTakeaways && talk.keyTakeaways.length > 0" class="p-5 rounded-xl bg-gray-950/80 border border-gray-800 space-y-3">
          <h3 class="text-sm font-bold font-mono text-electric-blue uppercase tracking-wider flex items-center gap-2">
            <span>⚡</span> Key Technical Takeaways
          </h3>
          <ul class="space-y-2.5">
            <li 
              v-for="(point, idx) in talk.keyTakeaways" 
              :key="idx"
              class="text-xs sm:text-sm text-gray-300 flex items-start gap-2.5 leading-relaxed"
            >
              <span class="text-electric-blue font-bold shrink-0 mt-0.5">▸</span>
              <span>{{ point }}</span>
            </li>
          </ul>
        </div>

        <!-- Action Links Hub (Including 1-Click Slide Download) -->
        <div class="pt-2 flex flex-wrap items-center gap-3">
          <!-- Direct Slide Download Button -->
          <button 
            v-if="talk.slidesLink" 
            @click="handleDownloadSlides"
            :disabled="isDownloading"
            class="px-5 py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-yellow-500/10 disabled:opacity-50 cursor-pointer"
          >
            <svg v-if="!isDownloading" class="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            <svg v-else class="w-4 h-4 animate-spin text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>{{ isDownloading ? 'Downloading Slide Deck...' : 'Download Slide Deck' }}</span>
          </button>

          <!-- Watch Video -->
          <a 
            v-if="talk.videoLink" 
            :href="talk.videoLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-5 py-2.5 bg-electric-blue text-black font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-electric-blue/10"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <span>Watch Recording</span>
          </a>

          <!-- GitHub Demo Repo -->
          <a 
            v-if="talk.repoLink" 
            :href="talk.repoLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-gray-700 transition-colors"
          >
            <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>GitHub Demo</span>
          </a>

          <!-- Event Page -->
          <a 
            v-if="talk.eventLink" 
            :href="talk.eventLink" 
            target="_blank" 
            rel="noopener noreferrer"
            class="px-4 py-2.5 text-xs sm:text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-colors ml-auto flex items-center gap-1.5"
          >
            <span>Event Website</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </a>
        </div>

        <!-- Topic Hashtags -->
        <div v-if="talk.tags && talk.tags.length > 0" class="pt-2">
          <h4 class="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider mb-2">Topics & Hashtags</h4>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in talk.tags" 
              :key="tag"
              class="px-3 py-1 bg-gray-950 rounded-lg text-xs font-mono text-gray-300 border border-gray-800"
            >
              {{ tag.startsWith('#') ? tag : '#' + tag }}
            </span>
          </div>
        </div>

        <!-- Event & Stage Photo Gallery -->
        <div v-if="talk.screenshots && talk.screenshots.length > 0" class="mt-8 pt-8 border-t border-gray-800">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-bold font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <span>📸</span> Event & Stage Gallery
            </h4>
            <span class="text-xs text-electric-blue font-mono">Click any photo to expand</span>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div 
              v-for="(img, idx) in talk.screenshots" 
              :key="idx" 
              @click="openLightbox(hasHeroImage ? idx + 1 : idx)"
              class="aspect-[4/3] rounded-xl overflow-hidden bg-black border border-gray-800 group relative hover:border-electric-blue/60 transition-all shadow-md cursor-zoom-in"
            >
              <img :src="img" :alt="`${talk.title} stage photo ${idx + 1}`" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span class="p-2 rounded-full bg-black/70 text-electric-blue text-sm border border-electric-blue/30">🔍</span>
              </div>
              <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-gray-300">
                #{{ idx + 1 }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FULLSCREEN EXPANDED IMAGE LIGHTBOX -->
    <div 
      v-if="lightbox.show" 
      class="fixed inset-0 z-[70] flex flex-col items-center justify-between p-4 sm:p-6 bg-black/95 backdrop-blur-xl select-none"
      @keydown.esc="closeLightbox"
      tabindex="0"
    >
      <!-- Lightbox Header -->
      <div class="w-full flex items-center justify-between px-2 sm:px-6 py-2">
        <div class="flex items-center gap-3">
          <span class="font-display font-bold text-white text-base sm:text-lg truncate max-w-md">{{ talk.title }}</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-mono bg-electric-blue/10 text-electric-blue border border-electric-blue/30">
            {{ lightboxIndex === 0 && hasHeroImage ? 'Stage Cover' : `Photo ${hasHeroImage ? lightboxIndex : lightboxIndex + 1} of ${allGalleryImages.length - (hasHeroImage ? 1 : 0)}` }}
          </span>
        </div>

        <button 
          @click="closeLightbox" 
          class="p-2.5 rounded-full bg-gray-900 border border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
          title="Close Lightbox (Esc)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Center Viewer with Navigation Arrows -->
      <div class="relative w-full max-w-5xl h-[65vh] sm:h-[70vh] flex items-center justify-center my-auto">
        <!-- Previous Arrow -->
        <button 
          v-if="allGalleryImages.length > 1"
          @click.stop="prevPhoto"
          class="absolute left-2 sm:-left-12 p-3 rounded-full bg-black/70 hover:bg-electric-blue hover:text-black text-white border border-gray-700 transition-all duration-200 z-10"
          title="Previous (Left Arrow)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        </button>

        <img 
          :src="allGalleryImages[lightboxIndex]" 
          :alt="`${talk.title} high resolution photo`" 
          class="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-gray-800 transition-all duration-300"
        />

        <!-- Next Arrow -->
        <button 
          v-if="allGalleryImages.length > 1"
          @click.stop="nextPhoto"
          class="absolute right-2 sm:-right-12 p-3 rounded-full bg-black/70 hover:bg-electric-blue hover:text-black text-white border border-gray-700 transition-all duration-200 z-10"
          title="Next (Right Arrow)"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      <!-- Bottom Thumbnail Carousel -->
      <div v-if="allGalleryImages.length > 1" class="w-full max-w-4xl flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-4 scrollbar-thin">
        <button 
          v-for="(img, idx) in allGalleryImages" 
          :key="idx"
          @click="lightboxIndex = idx"
          class="w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer"
          :class="lightboxIndex === idx ? 'border-electric-blue scale-105 shadow-lg shadow-electric-blue/20' : 'border-gray-800 opacity-50 hover:opacity-100'"
        >
          <img :src="img" :alt="`Thumbnail ${idx + 1}`" class="w-full h-full object-cover" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useMainStore } from '../store'
import { storeToRefs } from 'pinia'

const store = useMainStore()
const { isSpeakingModalOpen: isOpen, selectedSpeaking: talk } = storeToRefs(store)

const isDownloading = ref(false)

const closeModal = () => {
  closeLightbox()
  store.closeSpeakingModal()
}

// 1-Click Slide Download Engine
const handleDownloadSlides = async () => {
  if (!talk.value || !talk.value.slidesLink) return
  const url = talk.value.slidesLink
  isDownloading.value = true

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Download request failed')
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    // Generate clean file name
    const sanitizedTitle = (talk.value.title || 'Presentation_Slides').replace(/[^a-zA-Z0-9_-]/g, '_')
    link.download = `George_Ikwegbu_${sanitizedTitle}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch (err) {
    console.warn('Direct blob download failed, opening direct URL:', err)
    window.open(url, '_blank')
  } finally {
    isDownloading.value = false
  }
}

// Gallery & Lightbox Management
const hasHeroImage = computed(() => !!talk.value?.heroImage)

const allGalleryImages = computed(() => {
  if (!talk.value) return []
  const list = []
  if (talk.value.heroImage) list.push(talk.value.heroImage)
  if (Array.isArray(talk.value.screenshots)) {
    talk.value.screenshots.forEach(s => {
      if (s && !list.includes(s)) list.push(s)
    })
  }
  return list
})

const lightbox = reactive({
  show: false
})
const lightboxIndex = ref(0)

const openLightbox = (index = 0) => {
  lightboxIndex.value = index
  lightbox.show = true
}

const closeLightbox = () => {
  lightbox.show = false
}

const prevPhoto = () => {
  if (allGalleryImages.value.length <= 1) return
  lightboxIndex.value = (lightboxIndex.value - 1 + allGalleryImages.value.length) % allGalleryImages.value.length
}

const nextPhoto = () => {
  if (allGalleryImages.value.length <= 1) return
  lightboxIndex.value = (lightboxIndex.value + 1) % allGalleryImages.value.length
}

const handleKeyDown = (e) => {
  if (!isOpen.value) return
  if (e.key === 'Escape') {
    if (lightbox.show) closeLightbox()
    else closeModal()
  }
  if (lightbox.show) {
    if (e.key === 'ArrowLeft') prevPhoto()
    if (e.key === 'ArrowRight') nextPhoto()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(17, 24, 39, 0.4); 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #374151; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4B5563; 
}
</style>
