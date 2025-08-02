import { ref, computed } from 'vue'
import { useDevice } from './useDevice'

export function useSidebar() {
    const { isMobile } = useDevice()
    const sidebarOpen = ref(!isMobile.value)

    const toggleSidebar = () => {
        sidebarOpen.value = !sidebarOpen.value
    }

    const closeSidebar = () => {
        if (isMobile.value) sidebarOpen.value = false
    }

    return { sidebarOpen, toggleSidebar, closeSidebar }
}