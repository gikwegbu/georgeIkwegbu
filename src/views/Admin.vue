<template>
  <div class="min-h-screen bg-[#070709] text-gray-100 font-body selection:bg-electric-blue selection:text-black">
    <!-- TOP NAVIGATION -->
    <header class="border-b border-gray-800 bg-gray-900/60 backdrop-blur-md sticky top-0 z-30 px-4 lg:px-8 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-electric-blue/10 border border-electric-blue/40 flex items-center justify-center text-electric-blue font-bold font-mono text-sm group-hover:bg-electric-blue group-hover:text-black transition-colors">
            G
          </div>
          <span class="font-display font-bold text-lg text-white">George's <span class="text-electric-blue">Studio</span></span>
        </router-link>
        <span class="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-mono bg-gray-800 text-gray-400 border border-gray-700">Admin Portal</span>
      </div>

      <div class="flex items-center gap-4">
        <router-link to="/" class="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          <span class="hidden sm:inline">View Site</span>
        </router-link>

        <div v-if="user" class="flex items-center gap-3 pl-3 border-l border-gray-800">
          <div class="flex items-center gap-2">
            <img v-if="user.photoURL" :src="user.photoURL" alt="avatar" class="w-7 h-7 rounded-full border border-gray-700" />
            <div v-else class="w-7 h-7 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-xs font-bold font-mono">
              {{ (user.email || 'A')[0].toUpperCase() }}
            </div>
            <span class="hidden md:inline text-xs text-gray-300 font-medium truncate max-w-[160px]">{{ user.displayName || user.email }}</span>
          </div>
          <button @click="handleSignOut" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- TOAST NOTIFICATION -->
    <transition name="fade">
      <div v-if="toast.show" class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-3 max-w-md" :class="toast.type === 'success' ? 'bg-emerald-950/90 border-emerald-600 text-emerald-200' : 'bg-rose-950/90 border-rose-600 text-rose-200'">
        <span>{{ toast.message }}</span>
        <button @click="toast.show = false" class="opacity-70 hover:opacity-100 text-xs">✕</button>
      </div>
    </transition>

    <!-- AUTHENTICATION SCREEN -->
    <main v-if="!user" class="min-h-[85vh] flex items-center justify-center p-4">
      <div class="w-full max-w-md bg-gray-900/90 border border-gray-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-electric-blue/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-electric-blue/10 border border-electric-blue/30 text-electric-blue mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
          </div>
          <h1 class="text-2xl font-display font-bold text-white mb-1">Portfolio Studio</h1>
          <p class="text-gray-400 text-sm">Sign in to manage your blogs, projects, and bio</p>
        </div>

        <div v-if="authError" class="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          <span>{{ authError }}</span>
        </div>

        <!-- Google Sign In -->
        <button
          @click="signInGoogle"
          :disabled="authLoading"
          class="w-full mb-5 py-3 px-4 rounded-xl border border-gray-700 bg-gray-800/80 hover:bg-gray-800 text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-3 group hover:border-electric-blue/50 disabled:opacity-50"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <div class="flex items-center gap-3 my-5">
          <div class="h-px bg-gray-800 flex-grow"></div>
          <span class="text-xs text-gray-500 uppercase tracking-widest font-mono">Or with Email</span>
          <div class="h-px bg-gray-800 flex-grow"></div>
        </div>

        <!-- Email & Password Form -->
        <form @submit.prevent="signInEmail" class="space-y-4">
          <div>
            <label class="block text-xs font-mono text-gray-400 mb-1.5">Email Address</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="admin@georgeikwegbu.com"
              class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-blue transition-colors"
            />
          </div>
          <div>
            <label class="block text-xs font-mono text-gray-400 mb-1.5">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electric-blue transition-colors"
            />
          </div>
          <button
            type="submit"
            :disabled="authLoading"
            class="w-full py-3 rounded-xl bg-electric-blue text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2 shadow-lg shadow-electric-blue/10"
          >
            {{ authLoading ? 'Signing in...' : 'Sign In with Email' }}
          </button>
        </form>
      </div>
    </main>

    <!-- DASHBOARD VIEW -->
    <main v-else class="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
      <!-- DASHBOARD HEADER -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-800">
        <div>
          <h1 class="text-2xl sm:text-3xl font-display font-bold text-white">Content <span class="text-electric-blue">Manager</span></h1>
          <p class="text-gray-400 text-sm mt-1">Manage real-time documents connected to Cloud Firestore and Firebase Storage</p>
        </div>

        <div class="flex items-center gap-3 flex-wrap">
          <button
            @click="refreshCurrentCollection"
            :disabled="loading"
            class="px-3.5 py-2 rounded-xl text-xs font-medium border border-gray-800 bg-gray-900 hover:bg-gray-800 text-gray-300 transition-colors flex items-center gap-1.5"
          >
            <svg class="w-3.5 h-3.5" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span>Refresh</span>
          </button>
          <button
            @click="openAddModal"
            class="px-4 py-2 rounded-xl text-xs font-bold bg-electric-blue text-black hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-lg shadow-electric-blue/10"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            <span>Add {{ activeTabTitle }}</span>
          </button>
        </div>
      </div>

      <!-- TABS NAVIGATION -->
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 border"
          :class="activeTab === tab.id ? 'bg-electric-blue/10 border-electric-blue text-electric-blue font-bold' : 'bg-gray-900/60 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700'"
        >
          <span>{{ tab.icon }}</span>
          <span>{{ tab.title }}</span>
          <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-gray-800 text-gray-300">
            {{ getCollectionCount(tab.id) }}
          </span>
        </button>
      </div>

      <!-- SEARCH BAR -->
      <div class="flex items-center justify-between gap-4">
        <div class="relative w-full max-w-sm">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="`Search ${activeTabTitle.toLowerCase()}...`"
            class="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-blue transition-colors"
          />
          <svg class="w-4 h-4 text-gray-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <div class="text-xs text-gray-500 font-mono hidden sm:block">
          Total: {{ filteredItems.length }} items
        </div>
      </div>

      <!-- ITEMS GRID / LIST -->
      <div v-if="loading" class="py-20 text-center text-gray-500 text-sm animate-pulse flex flex-col items-center gap-2">
        <div class="w-8 h-8 rounded-full border-2 border-electric-blue border-t-transparent animate-spin"></div>
        <span>Loading {{ activeTabTitle }} from Firestore...</span>
      </div>

      <div v-else-if="filteredItems.length === 0" class="py-20 text-center border border-dashed border-gray-800 rounded-2xl p-8 bg-gray-900/20">
        <div class="text-3xl mb-3">📂</div>
        <h3 class="text-lg font-bold text-white mb-1">No items found</h3>
        <p class="text-gray-400 text-xs max-w-sm mx-auto mb-4">You haven't added any entries in this section yet or your search query didn't match.</p>
        <button @click="openAddModal" class="px-4 py-2 rounded-xl text-xs font-bold bg-electric-blue text-black">
          Add first item
        </button>
      </div>

      <!-- DYNAMIC CONTENT LIST -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="bg-gray-900/60 border border-gray-800 hover:border-gray-700 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group"
        >
          <!-- Item Card Header -->
          <div>
            <!-- Image Preview thumbnail on Project or Blog card -->
            <div 
              v-if="item.heroImage || item.coverImage" 
              @click.stop="openImagePreview(item.heroImage || item.coverImage, item.title || item.role)"
              class="h-32 mb-3 rounded-xl overflow-hidden bg-black/40 border border-gray-800 relative cursor-zoom-in group/img"
              title="Click to expand"
            >
              <img :src="item.heroImage || item.coverImage" :alt="item.title" class="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300" />
              <div v-if="item.screenshots && item.screenshots.length > 0" class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-[10px] font-mono text-electric-blue border border-gray-800">
                📸 {{ item.screenshots.length }} shots
              </div>
            </div>

            <div class="flex items-start justify-between gap-3 mb-2">
              <span v-if="item.category || item.year || item.role" class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-electric-blue/10 text-electric-blue border border-electric-blue/20">
                {{ item.category || item.year || item.role }}
              </span>
              <span class="text-[10px] font-mono text-gray-500">ID: {{ item.id }}</span>
            </div>

            <!-- Title & Details -->
            <h3 class="text-lg font-bold text-white group-hover:text-electric-blue transition-colors line-clamp-2 mb-2">
              {{ item.title || item.degree || item.role || item.category }}
            </h3>

            <p v-if="item.excerpt || item.shortDescription || item.subtitle || item.school || item.company" class="text-xs text-gray-400 line-clamp-3 mb-4 leading-relaxed">
              {{ item.excerpt || item.shortDescription || item.subtitle || item.school || item.company }}
            </p>

            <!-- Tags / Techstack preview -->
            <div v-if="item.techStack || item.tags || item.items" class="flex flex-wrap gap-1.5 mb-4">
              <span
                v-for="tag in (item.techStack || item.tags || item.items || []).slice(0, 4)"
                :key="tag"
                class="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-md"
              >
                {{ tag }}
              </span>
              <span v-if="(item.techStack || item.tags || item.items || []).length > 4" class="text-[10px] text-gray-500 px-1">
                +{{ (item.techStack || item.tags || item.items || []).length - 4 }}
              </span>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4 border-t border-gray-800/80 flex items-center justify-between mt-auto">
            <span class="text-[10px] text-gray-500 font-mono">
              {{ item.date || item.year || 'Order: ' + (item.order ?? '-') }}
            </span>

            <div class="flex items-center gap-2">
              <button
                @click="openEditModal(item)"
                class="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(item)"
                class="px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- CREATE / EDIT MODAL -->
    <div v-if="modal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div class="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative my-8">
        <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div>
            <h2 class="text-xl font-display font-bold text-white">
              {{ modal.isEdit ? 'Edit' : 'Add New' }} {{ activeTabTitle }}
            </h2>
            <p class="text-xs text-gray-400 mt-0.5">Fill in the fields below to update Firestore and Firebase Storage in real time.</p>
          </div>
          <button @click="modal.show = false" class="text-gray-400 hover:text-white text-lg p-1">✕</button>
        </div>

        <form @submit.prevent="saveModalItem" class="space-y-5 max-h-[65vh] overflow-y-auto pr-1 custom-scrollbar">
          <!-- BLOG FIELDS -->
          <template v-if="activeTab === 'blogs'">
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Title *</label>
              <input v-model="form.title" type="text" required class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Article URL *</label>
              <input v-model="form.url" type="url" required placeholder="https://dev.to/gikwegbu/..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Cover Image URL</label>
              <input v-model="form.coverImage" type="text" placeholder="https://... (or leave empty)" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Excerpt / Summary</label>
              <textarea v-model="form.excerpt" rows="3" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none"></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Date</label>
                <input v-model="form.date" type="text" placeholder="2026-09-23" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Read Time</label>
                <input v-model="form.readTime" type="text" placeholder="10 min read" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
          </template>

          <!-- PROJECT FIELDS (WITH FIREBASE STORAGE HERO & MULTI-SCREENSHOTS) -->
          <template v-if="activeTab === 'projects'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Project Title *</label>
                <input v-model="form.title" type="text" required class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Category *</label>
                <input v-model="form.category" type="text" required placeholder="Fintech, Mobility, IoT, AI" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>

            <!-- HERO IMAGE SECTION -->
            <div class="p-4 rounded-xl bg-gray-950/60 border border-gray-800 space-y-3">
              <div class="flex items-center justify-between">
                <label class="text-xs font-mono text-gray-300 font-bold flex items-center gap-1.5">
                  <span>🖼️ Hero Image (Cover)</span>
                  <span v-if="form.heroImage" class="text-[10px] text-emerald-400 font-normal">● Uploaded</span>
                </label>
                <input
                  ref="heroFileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleHeroFileUpload"
                />
              </div>

              <!-- Hero Image Preview -->
              <div v-if="form.heroImage" class="relative group rounded-xl overflow-hidden border border-gray-800 bg-black max-h-48 flex items-center justify-center">
                <img :src="form.heroImage" alt="Hero cover" class="w-full h-40 object-cover cursor-zoom-in" @click="openImagePreview(form.heroImage, 'Hero Cover Image')" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 pointer-events-none">
                  <span class="px-3 py-1 rounded-lg text-xs font-mono bg-black/70 text-electric-blue border border-electric-blue/30">
                    🔍 Click image to expand
                  </span>
                </div>
                <!-- Delete Button (Top Right) -->
                <button
                  type="button"
                  @click.stop="openDeleteImageConfirmation('hero', null, form.heroImage)"
                  title="Delete Hero Image"
                  class="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center text-xs font-bold shadow-lg transition-transform hover:scale-110 z-10"
                >
                  ✕
                </button>
              </div>

              <!-- Hero Upload Button / Dropzone -->
              <div v-else class="space-y-2">
                <div
                  @click="triggerHeroFileInput"
                  class="border-2 border-dashed border-gray-800 hover:border-electric-blue/60 rounded-xl p-4 text-center cursor-pointer transition-colors bg-gray-900/40 hover:bg-gray-900/80"
                >
                  <div class="text-xl mb-1">📁</div>
                  <div class="text-xs font-medium text-gray-300">Click to upload Hero Cover image</div>
                  <div class="text-[10px] text-gray-500 font-mono">PNG, JPG, WebP up to 10MB</div>
                </div>
                <!-- Upload Progress -->
                <div v-if="heroUpload.isUploading" class="space-y-1">
                  <div class="flex justify-between text-[10px] font-mono text-gray-400">
                    <span>Uploading hero image to Firebase Storage...</span>
                    <span>{{ heroUpload.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-electric-blue h-1.5 rounded-full transition-all duration-200" :style="{ width: `${heroUpload.progress}%` }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- SCREENSHOTS SECTION (MULTIPLE & DRAGGABLE) -->
            <div class="p-4 rounded-xl bg-gray-950/60 border border-gray-800 space-y-3">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <label class="text-xs font-mono text-gray-300 font-bold flex items-center gap-1.5">
                    <span>📱 App Screenshots (Multiple)</span>
                    <span class="text-[10px] text-gray-400 font-normal">({{ form.screenshots ? form.screenshots.length : 0 }} images)</span>
                  </label>
                  <p class="text-[10px] text-gray-500 mt-0.5">Drag to rearrange order. Click 🔍 to expand, ✕ to delete.</p>
                </div>

                <div class="flex items-center gap-2">
                  <input
                    ref="screenshotsFileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    class="hidden"
                    @change="handleScreenshotsUpload"
                  />
                  <button
                    type="button"
                    @click="triggerScreenshotsFileInput"
                    :disabled="screenshotsUpload.isUploading"
                    class="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-800 hover:bg-gray-700 text-electric-blue border border-gray-700 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
                    <span>Add Screenshots</span>
                  </button>
                </div>
              </div>

              <!-- Upload Progress -->
              <div v-if="screenshotsUpload.isUploading" class="space-y-1">
                <div class="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>Uploading {{ screenshotsUpload.totalFiles }} screenshot(s)...</span>
                  <span>{{ screenshotsUpload.progress }}%</span>
                </div>
                <div class="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-electric-blue h-1.5 rounded-full transition-all duration-200" :style="{ width: `${screenshotsUpload.progress}%` }"></div>
                </div>
              </div>

              <!-- Thumbnails Grid with Drag and Drop Reordering -->
              <div v-if="form.screenshots && form.screenshots.length > 0" class="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                <div
                  v-for="(imgUrl, index) in form.screenshots"
                  :key="imgUrl + index"
                  draggable="true"
                  @dragstart="handleDragStart($event, index)"
                  @dragover.prevent="handleDragOver($event, index)"
                  @drop="handleDrop($event, index)"
                  @dragend="handleDragEnd"
                  class="aspect-[9/16] rounded-xl overflow-hidden border border-gray-800 bg-black relative group cursor-grab active:cursor-grabbing hover:border-electric-blue/60 transition-all shadow-md select-none"
                  :class="{ 'opacity-40 border-dashed border-electric-blue scale-95': draggedIndex === index }"
                >
                  <img :src="imgUrl" alt="screenshot" class="w-full h-full object-cover pointer-events-none" />

                  <!-- Position Badge -->
                  <div class="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-gray-300">
                    #{{ index + 1 }}
                  </div>

                  <!-- Expand Icon on Hover -->
                  <button
                    type="button"
                    @click.stop="openImagePreview(imgUrl, `Screenshot #${index + 1}`)"
                    title="Click to expand"
                    class="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/80 hover:bg-black text-electric-blue text-[10px] font-mono shadow z-10"
                  >
                    🔍
                  </button>

                  <!-- Delete Button (Top Right) -->
                  <button
                    type="button"
                    @click.stop="openDeleteImageConfirmation('screenshot', index, imgUrl)"
                    title="Delete Screenshot"
                    class="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shadow-lg transition-transform hover:scale-110 z-10"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div v-else class="text-center py-6 border border-dashed border-gray-800 rounded-xl text-gray-500 text-xs">
                No screenshots added yet. Click <strong>Add Screenshots</strong> to upload.
              </div>
            </div>

            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Short Description</label>
              <input v-model="form.shortDescription" type="text" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Full Description</label>
              <textarea v-model="form.description" rows="3" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none"></textarea>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Tech Stack (comma separated)</label>
              <input v-model="form.techStackInput" type="text" placeholder="Flutter, Bloc, Firebase, Socket.io" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Role</label>
                <input v-model="form.role" type="text" placeholder="Lead Flutter Engineer" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Year</label>
                <input v-model="form.year" type="text" placeholder="2024" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Play Store URL</label>
                <input v-model="form.playStoreUrl" type="url" placeholder="https://play.google.com/..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">App Store URL</label>
                <input v-model="form.appStoreUrl" type="url" placeholder="https://apps.apple.com/..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
          </template>

          <!-- JOURNEY FIELDS -->
          <template v-if="activeTab === 'journey'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Year / Timeline *</label>
                <input v-model="form.year" type="text" required placeholder="2024–Present" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Icon Key</label>
                <select v-model="form.icon" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none">
                  <option value="spark">Spark (✨)</option>
                  <option value="degree">Degree (🎓)</option>
                  <option value="switch">Switch (🔄)</option>
                  <option value="rocket">Rocket (🚀)</option>
                  <option value="trend">Trend (📈)</option>
                  <option value="lead">Lead (👑)</option>
                  <option value="master">Master (🏛️)</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Milestone Title *</label>
              <input v-model="form.title" type="text" required class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Description / Subtitle</label>
              <textarea v-model="form.subtitle" rows="3" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none"></textarea>
            </div>
          </template>

          <!-- EXPERIENCE FIELDS -->
          <template v-if="activeTab === 'experience'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Role / Job Title *</label>
                <input v-model="form.role" type="text" required class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Company *</label>
                <input v-model="form.company" type="text" required class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Date / Period</label>
                <input v-model="form.date" type="text" placeholder="Sept 2023 – Present" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Location</label>
                <input v-model="form.location" type="text" placeholder="Lagos, Nigeria / Remote" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Bullet Points (one per line)</label>
              <textarea v-model="form.descriptionLines" rows="4" placeholder="Directed the development...&#10;Integrated Paystack...&#10;Optimised UI..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none"></textarea>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Tags (comma separated)</label>
              <input v-model="form.tagsInput" type="text" placeholder="Flutter, Fintech, Bloc, Firebase" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
          </template>

          <!-- SKILLS FIELDS -->
          <template v-if="activeTab === 'skills'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Category Name *</label>
                <input v-model="form.category" type="text" required placeholder="Frameworks, Languages, Tools..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Badge Color (Tailwind class)</label>
                <input v-model="form.color" type="text" placeholder="bg-blue-500, bg-cyan-500, etc." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Skill Items (comma separated) *</label>
              <input v-model="form.itemsInput" type="text" required placeholder="Dart, Flutter, Bloc, Swift, TypeScript" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
            </div>
          </template>

          <!-- EDUCATION FIELDS -->
          <template v-if="activeTab === 'education'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Degree / Qualification *</label>
                <input v-model="form.degree" type="text" required placeholder="MSc Computer Science" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">School / University *</label>
                <input v-model="form.school" type="text" required placeholder="York St. John University, London" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Year / Period</label>
                <input v-model="form.year" type="text" placeholder="2025–2026" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
              <div>
                <label class="block text-xs font-mono text-gray-400 mb-1">Status</label>
                <input v-model="form.status" type="text" placeholder="Completed / In Progress" class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Focus Areas</label>
              <textarea v-model="form.focus" rows="2" placeholder="AI, Cloud Computing, Machine Learning..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none"></textarea>
            </div>
            <div>
              <label class="block text-xs font-mono text-gray-400 mb-1">Dissertation or Project</label>
              <textarea v-model="form.dissertation" rows="2" placeholder="Title and brief outline..." class="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none"></textarea>
            </div>
          </template>

          <!-- Order Index -->
          <div class="pt-2">
            <label class="block text-xs font-mono text-gray-400 mb-1">Display Order (integer)</label>
            <input v-model.number="form.order" type="number" placeholder="0" class="w-32 bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-electric-blue outline-none" />
          </div>

          <!-- Buttons -->
          <div class="flex items-center justify-end gap-3 pt-6 border-t border-gray-800">
            <button
              type="button"
              @click="modal.show = false"
              class="px-4 py-2 rounded-xl text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="modalLoading || heroUpload.isUploading || screenshotsUpload.isUploading"
              class="px-5 py-2 rounded-xl text-xs font-bold bg-electric-blue text-black hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-1.5"
            >
              <span>{{ modalLoading ? 'Saving...' : 'Save to Firestore' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- DEDICATED DELETE IMAGE CONFIRMATION MODAL -->
    <div v-if="deleteImageModal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl relative text-center">
        <div class="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4 text-xl">
          🗑️
        </div>
        <h3 class="text-lg font-display font-bold text-white mb-2">
          Delete {{ deleteImageModal.type === 'hero' ? 'Hero Image' : 'Screenshot' }}?
        </h3>
        <p class="text-xs text-gray-400 leading-relaxed mb-5">
          Are you sure you want to delete this file? It will be removed from Firebase Storage and your project. You can then upload a replacement.
        </p>

        <!-- Preview of Image being deleted -->
        <div v-if="deleteImageModal.url" class="h-28 rounded-xl overflow-hidden bg-black/50 border border-gray-800 mb-6 flex items-center justify-center">
          <img :src="deleteImageModal.url" alt="To delete" class="h-full w-auto object-contain" />
        </div>

        <div class="flex items-center justify-center gap-3">
          <button
            type="button"
            @click="deleteImageModal.show = false"
            class="px-4 py-2 rounded-xl text-xs font-medium bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="handleConfirmDeleteImage"
            :disabled="deleteImageModal.loading"
            class="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors disabled:opacity-50"
          >
            {{ deleteImageModal.loading ? 'Deleting...' : 'Yes, Delete' }}
          </button>
        </div>
      </div>
    </div>

    <!-- FULL EXPANDED IMAGE PREVIEW MODAL (LIGHTBOX) -->
    <div v-if="previewImageModal.show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md select-none" @click.self="previewImageModal.show = false">
      <div class="relative max-w-4xl w-full flex flex-col items-center">
        <div class="w-full flex items-center justify-between pb-3 px-2">
          <span class="text-sm font-mono text-electric-blue">{{ previewImageModal.title }}</span>
          <button @click="previewImageModal.show = false" class="p-2 rounded-full bg-gray-900 border border-gray-700 text-gray-300 hover:text-white transition-colors" title="Close">
            ✕
          </button>
        </div>
        <div class="max-h-[80vh] flex items-center justify-center p-2">
          <img :src="previewImageModal.url" alt="Expanded image" class="max-h-[75vh] max-w-[90vw] object-contain rounded-xl shadow-2xl border border-gray-800" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { auth, googleProvider } from '../firebase/config'
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  addCollectionDoc,
  setCollectionDoc,
  updateCollectionDoc,
  deleteCollectionDoc,
  generateDocId
} from '../firebase/db'
import {
  uploadFileToStorage,
  deleteStorageFile
} from '../firebase/storage'
import { useMainStore } from '../store'

const store = useMainStore()

// State
const user = ref(null)
const authLoading = ref(false)
const authError = ref('')
const email = ref('')
const password = ref('')

const loading = ref(false)
const modalLoading = ref(false)
const activeTab = ref('blogs')
const searchQuery = ref('')

// Template Refs for file upload
const heroFileInput = ref(null)
const screenshotsFileInput = ref(null)

// Drag and drop index
const draggedIndex = ref(null)

// Upload state tracking
const heroUpload = reactive({
  isUploading: false,
  progress: 0
})

const screenshotsUpload = reactive({
  isUploading: false,
  progress: 0,
  totalFiles: 0
})

// Delete Image Confirmation Modal
const deleteImageModal = reactive({
  show: false,
  type: 'hero', // 'hero' | 'screenshot'
  index: null,
  url: '',
  loading: false
})

// Lightbox Expand Preview Modal
const previewImageModal = reactive({
  show: false,
  url: '',
  title: ''
})

const openImagePreview = (url, title = 'Image Preview') => {
  if (!url) return
  previewImageModal.url = url
  previewImageModal.title = title
  previewImageModal.show = true
}

const toast = reactive({
  show: false,
  message: '',
  type: 'success'
})

const tabs = [
  { id: 'blogs', title: 'Blogs', icon: '📝' },
  { id: 'projects', title: 'Projects', icon: '🚀' },
  { id: 'journey', title: 'Tech Journey', icon: '🧭' },
  { id: 'experience', title: 'Experience', icon: '💼' },
  { id: 'skills', title: 'Skills', icon: '⚡' },
  { id: 'education', title: 'Education', icon: '🎓' }
]

const modal = reactive({
  show: false,
  isEdit: false,
  docId: null
})

const form = reactive({})

// Auth lifecycle
onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
    if (currentUser) {
      store.fetchAll()
    }
  })
})

const showToast = (message, type = 'success') => {
  toast.message = message
  toast.type = type
  toast.show = true
  setTimeout(() => {
    toast.show = false
  }, 4000)
}

const activeTabTitle = computed(() => {
  const match = tabs.find(t => t.id === activeTab.value)
  return match ? match.title : 'Item'
})

const currentItems = computed(() => {
  switch (activeTab.value) {
    case 'blogs': return store.blogs || []
    case 'projects': return store.projects || []
    case 'journey': return store.journey || []
    case 'experience': return store.experience || []
    case 'skills': return store.skills || []
    case 'education': return store.education || []
    default: return []
  }
})

const getCollectionCount = (tabId) => {
  switch (tabId) {
    case 'blogs': return store.blogs?.length || 0
    case 'projects': return store.projects?.length || 0
    case 'journey': return store.journey?.length || 0
    case 'experience': return store.experience?.length || 0
    case 'skills': return store.skills?.length || 0
    case 'education': return store.education?.length || 0
    default: return 0
  }
}

const filteredItems = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return currentItems.value
  return currentItems.value.filter(item => {
    const text = JSON.stringify(item).toLowerCase()
    return text.includes(q)
  })
})

// Authentication Handlers
const signInGoogle = async () => {
  authLoading.value = true
  authError.value = ''
  try {
    await signInWithPopup(auth, googleProvider)
    showToast('Signed in successfully!')
  } catch (err) {
    authError.value = err.message
  } finally {
    authLoading.value = false
  }
}

const signInEmail = async () => {
  authLoading.value = true
  authError.value = ''
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    showToast('Signed in successfully!')
  } catch (err) {
    authError.value = err.message
  } finally {
    authLoading.value = false
  }
}

const handleSignOut = async () => {
  try {
    await signOut(auth)
    showToast('Signed out')
  } catch (err) {
    showToast(err.message, 'error')
  }
}

const refreshCurrentCollection = async () => {
  loading.value = true
  try {
    await store.fetchAll()
    showToast('Refreshed data from Firestore')
  } catch (err) {
    showToast(err.message, 'error')
  } finally {
    loading.value = false
  }
}

// Modal Form Operations
const resetForm = () => {
  Object.keys(form).forEach(k => delete form[k])
  form.order = currentItems.value.length
  form.screenshots = []
}

const getProjectId = () => {
  if (!modal.docId) {
    modal.docId = generateDocId('projects')
  }
  return modal.docId
}

const openAddModal = () => {
  resetForm()
  modal.isEdit = false
  modal.docId = generateDocId(activeTab.value)
  form.id = modal.docId
  modal.show = true
}

const openEditModal = (item) => {
  resetForm()
  modal.isEdit = true
  modal.docId = item.id

  Object.assign(form, item)

  // Ensure screenshots is an array
  form.screenshots = Array.isArray(item.screenshots) ? [...item.screenshots] : []

  // Format array fields to comma/newline separated string
  if (Array.isArray(item.techStack)) form.techStackInput = item.techStack.join(', ')
  if (Array.isArray(item.tags)) form.tagsInput = item.tags.join(', ')
  if (Array.isArray(item.items)) form.itemsInput = item.items.join(', ')
  if (Array.isArray(item.description)) form.descriptionLines = item.description.join('\n')
  if (item.project && !item.dissertation) form.dissertation = item.project

  modal.show = true
}

// Hero Image Trigger & Upload
const triggerHeroFileInput = () => {
  if (heroFileInput.value) {
    heroFileInput.value.click()
  }
}

const handleHeroFileUpload = async (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  const projId = getProjectId()
  heroUpload.isUploading = true
  heroUpload.progress = 0

  try {
    const folder = `projects/${projId}/hero`
    const { downloadUrl } = await uploadFileToStorage(file, folder, (progress) => {
      heroUpload.progress = progress
    })
    form.heroImage = downloadUrl

    // If editing existing project in Firestore, immediately persist update
    if (modal.isEdit && modal.docId) {
      await updateCollectionDoc('projects', String(modal.docId), { heroImage: downloadUrl })
      await store.fetchAll()
      showToast('Hero image uploaded and saved to project!')
    } else {
      showToast('Hero image uploaded to project folder!')
    }
  } catch (err) {
    showToast(err.message || 'Failed to upload hero image', 'error')
  } finally {
    heroUpload.isUploading = false
    if (heroFileInput.value) heroFileInput.value.value = ''
  }
}

// Multiple Screenshots Trigger & Upload
const triggerScreenshotsFileInput = () => {
  if (screenshotsFileInput.value) {
    screenshotsFileInput.value.click()
  }
}

const handleScreenshotsUpload = async (e) => {
  const files = Array.from(e.target.files || [])
  if (!files.length) return

  const projId = getProjectId()
  screenshotsUpload.isUploading = true
  screenshotsUpload.progress = 0
  screenshotsUpload.totalFiles = files.length

  if (!form.screenshots) {
    form.screenshots = []
  }

  try {
    let completed = 0
    const folder = `projects/${projId}/screenshots`
    const uploadPromises = files.map(async (file) => {
      const { downloadUrl } = await uploadFileToStorage(file, folder)
      completed++
      screenshotsUpload.progress = Math.round((completed / files.length) * 100)
      return downloadUrl
    })

    const urls = await Promise.all(uploadPromises)
    form.screenshots.push(...urls)

    // If editing existing project in Firestore, immediately persist update
    if (modal.isEdit && modal.docId) {
      await updateCollectionDoc('projects', String(modal.docId), { screenshots: form.screenshots })
      await store.fetchAll()
      showToast(`Uploaded ${urls.length} screenshot(s) and saved to project!`)
    } else {
      showToast(`Uploaded ${urls.length} screenshot(s) to project folder!`)
    }
  } catch (err) {
    showToast(err.message || 'Failed to upload screenshots', 'error')
  } finally {
    screenshotsUpload.isUploading = false
    if (screenshotsFileInput.value) screenshotsFileInput.value.value = ''
  }
}

// Drag and Drop Screenshot Reordering
const handleDragStart = (e, index) => {
  draggedIndex.value = index
  e.dataTransfer.effectAllowed = 'move'
}

const handleDragOver = (e, index) => {
  e.dataTransfer.dropEffect = 'move'
}

const handleDrop = async (e, targetIndex) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) return
  const itemToMove = form.screenshots.splice(draggedIndex.value, 1)[0]
  form.screenshots.splice(targetIndex, 0, itemToMove)
  draggedIndex.value = null

  // If editing, immediately update order in Firestore
  if (modal.isEdit && modal.docId) {
    await updateCollectionDoc('projects', String(modal.docId), { screenshots: form.screenshots })
    await store.fetchAll()
  }
  showToast('Screenshots reordered')
}

const handleDragEnd = () => {
  draggedIndex.value = null
}

// Image Deletion Modal and Execution
const openDeleteImageConfirmation = (type, index = null, url = '') => {
  deleteImageModal.type = type
  deleteImageModal.index = index
  deleteImageModal.url = url
  deleteImageModal.show = true
}

const handleConfirmDeleteImage = async () => {
  deleteImageModal.loading = true
  try {
    if (deleteImageModal.url) {
      await deleteStorageFile(deleteImageModal.url)
    }

    if (deleteImageModal.type === 'hero') {
      form.heroImage = null
      if (modal.isEdit && modal.docId) {
        await updateCollectionDoc('projects', String(modal.docId), { heroImage: null })
        await store.fetchAll()
      }
      showToast('Hero image removed')
    } else if (deleteImageModal.type === 'screenshot' && deleteImageModal.index !== null) {
      form.screenshots.splice(deleteImageModal.index, 1)
      if (modal.isEdit && modal.docId) {
        await updateCollectionDoc('projects', String(modal.docId), { screenshots: form.screenshots })
        await store.fetchAll()
      }
      showToast('Screenshot removed')
    }

    deleteImageModal.show = false
  } catch (err) {
    showToast(err.message || 'Failed to delete image', 'error')
  } finally {
    deleteImageModal.loading = false
  }
}

// Save Modal Item to Firestore
const saveModalItem = async () => {
  modalLoading.value = true
  try {
    const payload = { ...form }
    const docId = modal.docId || form.id

    // Transform string inputs back to arrays
    if (payload.techStackInput !== undefined) {
      payload.techStack = payload.techStackInput.split(',').map(s => s.trim()).filter(Boolean)
      delete payload.techStackInput
    }
    if (payload.tagsInput !== undefined) {
      payload.tags = payload.tagsInput.split(',').map(s => s.trim()).filter(Boolean)
      delete payload.tagsInput
    }
    if (payload.itemsInput !== undefined) {
      payload.items = payload.itemsInput.split(',').map(s => s.trim()).filter(Boolean)
      delete payload.itemsInput
    }
    if (payload.descriptionLines !== undefined) {
      payload.description = payload.descriptionLines.split('\n').map(s => s.trim()).filter(Boolean)
      delete payload.descriptionLines
    }

    if (docId) {
      await setCollectionDoc(activeTab.value, String(docId), payload, true)
      showToast(`Saved ${activeTabTitle.value} item successfully`)
    } else {
      await addCollectionDoc(activeTab.value, payload)
      showToast(`Added new ${activeTabTitle.value} item successfully`)
    }

    modal.show = false
    await store.fetchAll()
  } catch (err) {
    showToast(err.message, 'error')
  } finally {
    modalLoading.value = false
  }
}

const confirmDelete = async (item) => {
  const label = item.title || item.degree || item.role || item.category || 'this item'
  if (!confirm(`Are you sure you want to delete "${label}" from Firestore?`)) {
    return
  }

  try {
    await deleteCollectionDoc(activeTab.value, String(item.id))
    showToast(`Deleted "${label}" from Firestore`)
    await store.fetchAll()
  } catch (err) {
    showToast(err.message, 'error')
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
