import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        isMenuOpen: false,
        activeCategory: 'All',
        isModalOpen: false,
        selectedProject: null
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
        }
    }
})
