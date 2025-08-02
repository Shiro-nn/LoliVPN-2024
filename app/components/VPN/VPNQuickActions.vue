<template>
  <div class="quick-actions">
    <div class="quick-actions-header">
      <h3>Quick Connect</h3>
      <p>Connect to recommended servers instantly</p>
    </div>
    <div class="quick-actions-grid">
      <div class="quick-action-card" @click="$emit('quick-connect', fastestServer?.id)">
        <div class="quick-action-icon">⚡</div>
        <div class="quick-action-content">
          <div class="quick-action-title">Fastest Server</div>
          <div class="quick-action-subtitle">{{ fastestServer?.name || 'Auto-select' }}</div>
        </div>
        <div class="quick-action-ping">{{ fastestServer?.ping || 'Auto' }}</div>
      </div>
      <div
          v-for="server in recentServers.slice(0, 2)"
          :key="server.id"
          class="quick-action-card"
          @click="$emit('quick-connect', server.id)"
      >
        <div class="quick-action-icon">{{ server.flag }}</div>
        <div class="quick-action-content">
          <div class="quick-action-title">{{ server.name }}</div>
          <div class="quick-action-subtitle">Recently used</div>
        </div>
        <div class="quick-action-ping">{{ server.ping }}</div>
      </div>
      <div class="quick-action-card" @click="connectToRandomServer">
        <div class="quick-action-icon">🎲</div>
        <div class="quick-action-content">
          <div class="quick-action-title">Random Server</div>
          <div class="quick-action-subtitle">Surprise me!</div>
        </div>
        <div class="quick-action-ping">???</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props { fastestServer?: any; recentServers: any[] }
const props = defineProps<Props>()
defineEmits<{ 'quick-connect': [serverId?: string] }>()

const { servers } = useVPN()

const connectToRandomServer = () => {
  const availableServers = Object.keys(servers.value).filter(id => id !== 'auto')
  const randomServer = availableServers[Math.floor(Math.random() * availableServers.length)]
  emit('quick-connect', randomServer)
}
</script>

<style scoped>
.quick-actions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-3xl);
  min-width: 500px;
  max-width: 90vw;
  box-shadow: var(--shadow-strong);
}

.quick-actions-header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.quick-actions-header h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}

.quick-actions-header p {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
}

.quick-action-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  cursor: pointer;
  transition: var(--transition-normal);
}

.quick-action-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--primary-blue);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 212, 255, 0.2);
}

.quick-action-icon {
  font-size: var(--font-size-3xl);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  border-radius: var(--border-radius-md);
  flex-shrink: 0;
}

.quick-action-content { flex: 1; }
.quick-action-title {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}
.quick-action-subtitle {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.quick-action-ping {
  font-size: var(--font-size-sm);
  color: var(--primary-blue);
  font-weight: var(--font-weight-medium);
}

@media (max-width: 640px) {
  .quick-actions { min-width: 0; width: 95vw; padding: var(--spacing-2xl); }
  .quick-actions-grid { grid-template-columns: 1fr; }
}
</style>