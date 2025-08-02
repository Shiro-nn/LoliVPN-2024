<template>
  <div class="connection-card" :class="{ connected: isConnected }">
    <div
        class="status-circle"
        :class="{ connected: isConnected, disconnected: !isConnected }"
        @click="$emit('toggle-connection')"
    >
      <span class="status-icon">{{ isConnected ? '🔓' : '🔒' }}</span>
    </div>
    <div class="status-text">{{ isConnected ? 'Connected' : 'Disconnected' }}</div>
    <div class="status-location">{{ locationText }}</div>
    <button
        class="quick-connect-btn"
        :class="{ disconnect: isConnected }"
        @click="$emit('toggle-connection')"
    >
      {{ isConnected ? 'Disconnect' : 'Quick Connect' }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isConnected: boolean
  currentServer?: string | null
  selectedServer?: string | null
}

const props = defineProps<Props>()
defineEmits<{ 'toggle-connection': [] }>()

const { servers } = useServers()

const locationText = computed(() => {
  if (props.isConnected && props.currentServer) {
    return servers.value[props.currentServer]?.name || 'Unknown location'
  }
  if (props.selectedServer) {
    return servers.value[props.selectedServer]?.name || 'Select a server'
  }
  return 'Select a server'
})
</script>

<style scoped>
.connection-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-xl);
  padding: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: var(--transition-normal);
}

.connection-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-blue), var(--success-green), var(--primary-blue));
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.connection-card.connected::before {
  opacity: 1;
  animation: gradientShift 3s ease-in-out infinite;
}

.status-circle {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: var(--transition-normal);
  cursor: pointer;
}

.status-circle.disconnected {
  background: linear-gradient(135deg, var(--danger-red), var(--danger-red-dark));
  box-shadow: 0 0 40px rgba(255, 71, 87, 0.4);
}

.status-circle.connected {
  background: linear-gradient(135deg, var(--success-green), var(--success-green-dark));
  box-shadow: 0 0 40px rgba(0, 255, 136, 0.4);
}

.status-circle::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  animation: pulse 2s infinite;
  opacity: 0.7;
}

.status-circle::after {
  content: '';
  position: absolute;
  width: 120%;
  height: 120%;
  border-radius: 50%;
  border: 2px solid;
  border-color: inherit;
  opacity: 0.3;
  animation: ripple 2s infinite;
}

.status-icon {
  font-size: 32px;
  z-index: 1;
}

.status-text {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.status-location {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

.quick-connect-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
  border: none;
  border-radius: var(--border-radius-md);
  padding: 14px 24px;
  color: white;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.quick-connect-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.quick-connect-btn.disconnect {
  background: linear-gradient(135deg, var(--danger-red), var(--danger-red-dark));
}

.quick-connect-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.quick-connect-btn:hover::before {
  left: 100%;
}

@keyframes gradientShift {
  0%, 100% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 0.4; }
  100% { transform: scale(1); opacity: 0.7; }
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 0.3; }
  100% { transform: scale(1.4); opacity: 0; }
}
</style>