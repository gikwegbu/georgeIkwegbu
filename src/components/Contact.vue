<template>
  <section id="contact" class="py-20 bg-black text-white relative">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
        
        <!-- Left Side -->
        <div 
          v-motion
          :initial="{ opacity: 0, x: -30 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 600 } }"
        >
          <h2 class="text-4xl md:text-5xl font-display font-bold mb-6">Let's <span class="text-electric-blue">Talk</span></h2>
          <p class="text-xl text-gray-300 mb-8 leading-relaxed">
            I'm open to senior Flutter roles, contract work, and collaborations. 
            Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div class="space-y-6">
            <a href="mailto:g.ikwegbu@gmail.com" class="flex items-center gap-4 text-gray-300 hover:text-electric-blue transition-colors group">
              <div class="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-electric-blue transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <span class="text-lg">g.ikwegbu@gmail.com</span>
            </a>
            
            <a href="https://linkedin.com/in/GIkwegbu" target="_blank" class="flex items-center gap-4 text-gray-300 hover:text-electric-blue transition-colors group">
              <div class="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-electric-blue transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </div>
              <span class="text-lg">linkedin.com/in/GIkwegbu</span>
            </a>

            <a href="https://github.com/gikwegbu" target="_blank" class="flex items-center gap-4 text-gray-300 hover:text-electric-blue transition-colors group">
               <div class="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-800 group-hover:border-electric-blue transition-colors">
                 <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
               </div>
               <span class="text-lg">github.com/gikwegbu</span>
            </a>
          </div>
        </div>

        <!-- Right Side (Form / Success State) -->
        <div 
          class="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl relative overflow-hidden"
          v-motion
          :initial="{ opacity: 0, x: 30 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 600, delay: 200 } }"
        >
          <!-- Success State -->
          <div v-if="isSubmitted" class="py-8 text-center space-y-5 animate-fade-in">
            <div class="w-16 h-16 bg-electric-blue/10 border border-electric-blue/40 rounded-full flex items-center justify-center mx-auto text-electric-blue shadow-[0_0_30px_rgba(0,240,255,0.3)]">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <div class="space-y-2">
              <h3 class="text-2xl font-display font-bold text-white">Message Received! 🚀</h3>
              <p class="text-gray-300 text-sm max-w-sm mx-auto leading-relaxed">
                Thanks for reaching out. I've received your note and will get back to you shortly.
              </p>
            </div>

            <button 
              @click="resetForm" 
              class="px-6 py-2.5 rounded-xl text-xs font-mono font-bold bg-gray-800 hover:bg-gray-700 text-electric-blue border border-gray-700 transition-all hover:scale-105"
            >
              Send Another Message
            </button>
          </div>

          <!-- Contact Form -->
          <form v-else @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Error Banner -->
            <div v-if="errorMessage" class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              <span>{{ errorMessage }}</span>
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                id="name" 
                name="name" 
                required 
                placeholder="John Doe"
                class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric-blue transition-colors"
              >
            </div>
            
            <div>
              <label for="email" class="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="john@example.com"
                class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric-blue transition-colors"
              >
            </div>
            
            <div>
              <label for="message" class="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                v-model="form.message" 
                id="message" 
                name="message" 
                rows="4" 
                required 
                placeholder="Hi George, let's talk about..."
                class="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-electric-blue transition-colors resize-none"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-electric-blue text-black font-bold py-4 rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(0,180,255,0.3)] hover:shadow-[0_0_30px_rgba(0,180,255,0.5)] disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              <svg v-if="isSubmitting" class="w-5 h-5 animate-spin text-black" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSubmitting ? 'Sending Message...' : 'Send Message' }}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('https://formspree.io/f/mzbjapka', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        message: form.message
      })
    })

    if (response.ok) {
      isSubmitted.value = true
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      const data = await response.json().catch(() => ({}))
      if (data && data.errors && data.errors.length > 0) {
        errorMessage.value = data.errors.map(err => err.message).join(', ')
      } else {
        errorMessage.value = 'Oops! There was a problem sending your message. Please try again.'
      }
    }
  } catch (err) {
    errorMessage.value = 'Network error. Please check your internet connection or email directly.'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  isSubmitted.value = false
  errorMessage.value = ''
}
</script>
