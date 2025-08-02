<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">🛡️</div>
        <span class="logo-text">LoliVPN</span>
      </div>
      <button v-if="isMobile" class="sidebar-close" @click="$emit('close')">
        ×
      </button>
    </div>
    <VPNConnectionCard
        :is-connected="isConnected"
        :is-connecting="isConnecting"
        :current-server="currentServer"
        :selected-server="selectedServer"
        @toggle-connection="$emit('toggle-connection')"
    />
    <VPNServerList
        :servers="servers"
        :selected-server="selectedServer"
        :active-view="activeView"
        @select-server="$emit('select-server', $event)"
        @change-view="setActiveView"
    />
    <div class="sidebar-footer">
      <div class="app-version">v{{ appVersion }}</div>
      <div class="connection-indicator" :class="{ connected: isConnected }">
        {{ isConnected ? 'Secure' : 'Unsecure' }}
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
  servers: Record<string, any>
  selectedServer?: string | null
  currentServer?: string | null
  isConnected: boolean
  isConnecting: boolean
}

defineProps<Props>()
defineEmits<{
  'select-server': [serverId: string]
  'toggle-connection': []
  close: []
}>()

const { isMobile } = useDevice()
const activeView = ref<'list' | 'map'>('list')
const appVersion = ref('1.0.0')

const setActiveView = (view: 'list' | 'map') => {
  activeView.value = view
}
</script>

<style scoped>
.sidebar {
  background: var(--glass-bg);
  backdrop-filter: blur(30px);
  border-right: 1px solid var(--glass-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 10;
  transition: var(--transition-normal);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-2xl) var(--spacing-2xl) 0;
  margin-bottom: var(--spacing-2xl);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-extrabold);
  color: var(--primary-blue);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: var(--shadow-glow);
}

.logo-text {
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-close {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  color: var(--text-secondary);
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-fast);
}

.sidebar-close:hover {
  background: var(--glass-bg-hover);
  color: var(--text-primary);
}

.sidebar-footer {
  margin-top: auto;
  padding: var(--spacing-2xl);
  border-top: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-version {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
  font-weight: var(--font-weight-medium);
}

.connection-indicator {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--danger-red);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.connection-indicator.connected {
  color: var(--success-green);
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -350px;
    top: 60px;
    height: calc(100vh - 60px);
    width: 350px;
    z-index: 200;
  }
  .sidebar.open { left: 0; }
}
</style>