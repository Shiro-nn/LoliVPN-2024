<template>
  <div class="app-container" :class="{ 'sidebar-open': sidebarOpen }">
    <VPNHeader
        :download-speed="downloadSpeed"
        :upload-speed="uploadSpeed"
        :is-connected="isConnected"
        :connection-status="connectionStatus"
        @toggle-sidebar="toggleSidebar"
    />
    <VPNSidebar
        :open="sidebarOpen"
        :servers="servers"
        :selected-server="selectedServer"
        :current-server="currentServer"
        :is-connected="isConnected"
        :is-connecting="isConnecting"
        @select-server="selectServer"
        @toggle-connection="toggleConnection"
        @close="closeSidebar"
    />
    <main class="main-content">
      <slot />
    </main>
    <div v-if="sidebarOpen && isMobile" class="mobile-overlay" @click="closeSidebar" />
    <VPNNotifications />
    <VPNLoadingOverlay v-if="isConnecting" />
  </div>
</template>

<script setup lang="ts">
const {
  isConnected,
  isConnecting,
  currentServer,
  selectedServer,
  servers,
  connectionStatus,
  downloadSpeed,
  uploadSpeed,
  toggleConnection,
  selectServer
} = useVPN()

const { isMobile } = useDevice()
const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar()

onMounted(() => {
  const { setupEventListeners } = useTauri()
  setupEventListeners()
})

onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      toggleConnection()
    }
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
      e.preventDefault()
      toggleSidebar()
    }
    if (e.key === 'Escape' && isMobile.value && sidebarOpen.value) {
      closeSidebar()
    }
  }
  document.addEventListener('keydown', handleKeydown)
  onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
})
</script>

<style scoped>
.app-container {
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "sidebar header"
    "sidebar main";
  height: 100vh;
  position: relative;
  background: linear-gradient(135deg, var(--background-dark) 0%, var(--background-secondary) 50%, var(--background-tertiary) 100%);
}

.main-content {
  grid-area: main;
  position: relative;
  overflow: hidden;
}

.mobile-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 199;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@media (max-width: 768px) {
  .app-container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }
}

@keyframes fadeIn {
  to { opacity: 1; }
}
</style>