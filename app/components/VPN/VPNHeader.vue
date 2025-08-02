<template>
  <header class="app-header">
    <div class="header-left">
      <VPNWindowControls v-if="!isMobile" />
      <button v-else class="mobile-menu-btn" @click="$emit('toggle-sidebar')">
        ☰
      </button>
    </div>
    <div class="header-center">
      <div class="app-title">LoliVPN</div>
    </div>
    <div class="header-right">
      <VPNSpeedDisplay :download-speed="downloadSpeed" :upload-speed="uploadSpeed" />
      <VPNConnectionBadge :connected="isConnected" :status="connectionStatus" />
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  downloadSpeed: number
  uploadSpeed: number
  isConnected: boolean
  connectionStatus: string
}

const props = defineProps<Props>();
const {
  downloadSpeed, connectionStatus, isConnected, uploadSpeed
} = toRefs(props)
defineEmits<{ 'toggle-sidebar': [] }>()

const { isMobile } = useDevice()
</script>

<style scoped>
.app-header {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  z-index: 100;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.header-center {
  flex: 0 0 auto;
}

.header-right {
  justify-content: flex-end;
}

.app-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-blue);
  text-align: center;
}

.mobile-menu-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;
  padding: 8px;
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
}

.mobile-menu-btn:hover {
  background: var(--glass-bg);
}

@media (max-width: 768px) {
  .app-header { padding: 0 16px; }
  .app-title { font-size: 16px; }
}
</style>