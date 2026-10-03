<template>
  <nav 
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="{ 'bg-black/80 backdrop-blur-md shadow-lg': isScrolled || isMenuOpen, 'bg-transparent': !isScrolled && !isMenuOpen }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo with Long-Press Easter Egg to Admin -->
        <div 
          class="flex-shrink-0 cursor-pointer select-none relative group"
          @mousedown="handlePressStart"
          @mouseup="handlePressEnd"
          @mouseleave="handlePressCancel"
          @touchstart="handleTouchStart"
          @touchend="handlePressEnd"
          @touchcancel="handlePressCancel"
          @contextmenu.prevent
          title="George Ikwegbu"
        >
          <div 
            class="relative px-3 py-1.5 rounded-xl transition-all duration-300 flex items-center justify-center overflow-hidden"
            :class="{ 
              'bg-electric-blue/15 shadow-[0_0_25px_rgba(0,240,255,0.5)] scale-105 ring-1 ring-electric-blue/50': showFeedback
            }"
          >
            <!-- Charging Progress Fill / SVG Border Ring (Only shown after silent threshold) -->
            <svg 
              v-if="showFeedback" 
              class="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <!-- Track -->
              <rect x="2" y="2" width="96" height="96" rx="14" ry="14" fill="none" stroke="rgba(0, 240, 255, 0.2)" stroke-width="3" />
              <!-- Progress Indicator -->
              <rect 
                x="2" y="2" width="96" height="96" rx="14" ry="14" 
                fill="none" 
                stroke="#00f0ff" 
                stroke-width="3.5"
                stroke-linecap="round"
                :style="{
                  strokeDasharray: '400',
                  strokeDashoffset: `${400 - (holdProgress / 100) * 400}`,
                  transition: 'stroke-dashoffset 40ms linear'
                }"
              />
            </svg>

            <!-- Charging Ambient Aura Bar -->
            <div 
              v-if="showFeedback" 
              class="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-electric-blue to-transparent transition-all duration-75"
              :style="{ width: `${holdProgress}%` }"
            ></div>

            <!-- Logo Text -->
            <span 
              class="font-display font-bold text-xl tracking-wider text-white transition-all duration-200 z-10"
              :class="{ 'text-white drop-shadow-[0_0_12px_#00f0ff]': showFeedback }"
            >
              <span class="text-electric-blue">&lt;</span>GI<span class="text-electric-blue"> /&gt;</span>
            </span>
          </div>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <a 
              v-for="item in navItems" 
              :key="item.name" 
              @click.prevent="scrollToSection(item.id)"
              class="text-gray-300 hover:text-electric-blue hover:scale-105 transition-all duration-200 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="-mr-2 flex md:hidden">
          <button 
            @click="toggleMenu" 
            type="button" 
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              class="block h-6 w-6" 
              :class="{ 'hidden': isMenuOpen, 'block': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              class="h-6 w-6" 
              :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden bg-black/95 backdrop-blur-xl h-screen absolute w-full top-20 left-0 border-t border-gray-800">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center h-3/4">
        <a 
          v-for="item in navItems" 
          :key="item.name" 
          @click.prevent="scrollToSection(item.id)"
          class="text-gray-300 hover:text-electric-blue block px-3 py-4 rounded-md text-2xl font-display font-medium cursor-pointer"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

// Easter Egg: Click & Hold Logo to unlock Admin (/xxy)
const isHolding = ref(false)
const showFeedback = ref(false)
const holdProgress = ref(0)
const SILENT_DELAY = 450 // 450ms: Normal clicks/taps are completely silent & show zero visual changes
const TOTAL_DURATION = 1900 // 1.9s total hold duration to trigger unlock
let animationFrameId = null
let pressStartTime = 0
let triggeredAdmin = false

const handlePressStart = () => {
  triggeredAdmin = false
  isHolding.value = true
  showFeedback.value = false
  holdProgress.value = 0
  pressStartTime = Date.now()

  const tick = () => {
    const elapsed = Date.now() - pressStartTime

    // Only reveal visual charging feedback if the user deliberately held past SILENT_DELAY
    if (elapsed >= SILENT_DELAY) {
      showFeedback.value = true
      const activeElapsed = elapsed - SILENT_DELAY
      const activeDuration = TOTAL_DURATION - SILENT_DELAY
      const progress = Math.min(100, (activeElapsed / activeDuration) * 100)
      holdProgress.value = progress
    }

    if (elapsed >= TOTAL_DURATION) {
      triggerAdminUnlock()
    } else if (isHolding.value) {
      animationFrameId = requestAnimationFrame(tick)
    }
  }

  animationFrameId = requestAnimationFrame(tick)
}

const handleTouchStart = () => {
  handlePressStart()
}

const handlePressCancel = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  isHolding.value = false
  showFeedback.value = false
  holdProgress.value = 0
}

const handlePressEnd = () => {
  const elapsed = Date.now() - pressStartTime
  handlePressCancel()

  // If released before silent threshold (standard quick click/tap), smoothly scroll to hero
  if (!triggeredAdmin && elapsed < SILENT_DELAY) {
    scrollToSection('hero')
  }
}

const triggerAdminUnlock = () => {
  triggeredAdmin = true
  handlePressCancel()

  // Haptic feedback for mobile/touch devices
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate([40, 50, 80])
    } catch (_) {}
  }

  // Client-side SPA navigation to secret admin route
  router.push('/xxy')
}

const navItems = [
  { name: 'About', id: 'about' },
  { name: 'Journey', id: 'journey' },
  { name: 'Experience', id: 'experience' },
  { name: 'Education', id: 'education' },
  { name: 'Projects', id: 'projects' },
  { name: 'Speaking', id: 'speaking' },
  { name: 'Blog', id: 'blog' },
  { name: 'Contact', id: 'contact' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    // Offset for fixed header
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
  
  if (isMenuOpen.value) {
    toggleMenu()
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  handlePressCancel()
})
</script>
