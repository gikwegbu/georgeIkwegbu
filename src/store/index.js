import { defineStore } from 'pinia'
import { getCollectionDocs } from '../firebase/db'

// Import initial fallback data
import { blogPosts as initialBlogs } from '../data/blog'
import { projects as initialProjects } from '../data/projects'
import { journey as initialJourney } from '../data/journey'
import { experience as initialExperience } from '../data/experience'
import { skills as initialSkills } from '../data/skills'
import { education as initialEducation } from '../data/education'
import { speakingEngagements as initialSpeaking } from '../data/speaking'

export const useMainStore = defineStore('main', {
    state: () => ({
        // Navigation & Modal UI State
        isMenuOpen: false,
        activeCategory: 'All',
        isModalOpen: false,
        selectedProject: null,
        isSpeakingModalOpen: false,
        selectedSpeaking: null,

        // Data Collections (initialized with instant local data)
        blogs: initialBlogs,
        projects: initialProjects,
        journey: initialJourney,
        experience: initialExperience,
        skills: initialSkills,
        education: initialEducation,
        speaking: initialSpeaking,

        // Loading and error states
        isLoadingData: false,
        lastFetchedAt: null,
        fetchError: null
    }),
    actions: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        closeMenu() {
            this.isMenuOpen = false
        },
        setCategory(category) {
            this.activeCategory = category
        },
        openProjectModal(project) {
            this.selectedProject = project
            this.isModalOpen = true
        },
        closeProjectModal() {
            this.isModalOpen = false
            this.selectedProject = null
        },
        openSpeakingModal(talk) {
            this.selectedSpeaking = talk
            this.isSpeakingModalOpen = true
        },
        closeSpeakingModal() {
            this.isSpeakingModalOpen = false
            this.selectedSpeaking = null
        },

        // Firestore Fetch Actions
        async fetchAll() {
            this.isLoadingData = true
            this.fetchError = null
            try {
                await Promise.allSettled([
                    this.fetchBlogs(),
                    this.fetchProjects(),
                    this.fetchJourney(),
                    this.fetchExperience(),
                    this.fetchSkills(),
                    this.fetchEducation(),
                    this.fetchSpeaking()
                ])
                this.lastFetchedAt = new Date().toISOString()
            } catch (error) {
                console.warn('Error during full fetch:', error)
                this.fetchError = error.message
            } finally {
                this.isLoadingData = false
            }
        },

        async fetchBlogs() {
            try {
                const data = await getCollectionDocs('blogs', 'order', 'asc')
                if (data && data.length > 0) {
                    this.blogs = data
                }
            } catch (err) {
                console.warn('Fallback to static blogs:', err.message)
            }
        },

        async fetchProjects() {
            try {
                const data = await getCollectionDocs('projects', 'order', 'asc')
                if (data && data.length > 0) {
                    this.projects = data
                }
            } catch (err) {
                console.warn('Fallback to static projects:', err.message)
            }
        },

        async fetchJourney() {
            try {
                const data = await getCollectionDocs('journey', 'order', 'asc')
                if (data && data.length > 0) {
                    this.journey = data
                }
            } catch (err) {
                console.warn('Fallback to static journey:', err.message)
            }
        },

        async fetchExperience() {
            try {
                const data = await getCollectionDocs('experience', 'order', 'asc')
                if (data && data.length > 0) {
                    this.experience = data
                }
            } catch (err) {
                console.warn('Fallback to static experience:', err.message)
            }
        },

        async fetchSkills() {
            try {
                const data = await getCollectionDocs('skills', 'order', 'asc')
                if (data && data.length > 0) {
                    this.skills = data
                }
            } catch (err) {
                console.warn('Fallback to static skills:', err.message)
            }
        },

        async fetchEducation() {
            try {
                const data = await getCollectionDocs('education', 'order', 'asc')
                if (data && data.length > 0) {
                    this.education = data
                }
            } catch (err) {
                console.warn('Fallback to static education:', err.message)
            }
        },

        async fetchSpeaking() {
            try {
                const data = await getCollectionDocs('speaking', 'order', 'desc')
                if (data && data.length > 0) {
                    this.speaking = data
                }
            } catch (err) {
                console.warn('Fallback to static speaking:', err.message)
            }
        }
    }
})
