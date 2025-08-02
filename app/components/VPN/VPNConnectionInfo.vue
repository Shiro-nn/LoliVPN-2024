<template>
  <div class="connection-info">
    <div class="connection-info-header">
      <div class="server-flag">{{ server.flag }}</div>
      <div class="server-details">
        <h3>{{ server.name }}</h3>
        <p>{{ formatDuration(duration) }} connected</p>
      </div>
      <div class="connection-status">
        <div class="status-dot"></div>
        <span>Secure</span>
      </div>
    </div>
    <div class="connection-stats">
      <div class="stat-item">
        <div class="stat-icon">↓</div>
        <div class="stat-value">{{ stats.downloadSpeed.toFixed(1) }} Mbps</div>
        <div class="stat-label">Download</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">↑</div>
        <div class="stat-value">{{ stats.uploadSpeed.toFixed(1) }} Mbps</div>
        <div class="stat-label">Upload</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">📍</div>
        <div class="stat-value">{{ server.ping }}</div>
        <div class="stat-label">Ping</div>
      </div>
      <div class="stat-item">
        <div class="stat-icon">🔒</div>
        <div class="stat-value">ChaCha20</div>
        <div class="stat-label">Encryption</div>
      </div>
    </div>
    <div class="connection-actions">
      <UiButton size="sm" variant="secondary" @click="showDetails">View Details</UiButton>
      <UiButton size="sm" variant="danger" @click="$emit('disconnect')">Disconnect</UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props { server: any; stats: any; duration: number }
defineProps<Props>()
defineEmits<{ disconnect: [] }>()

const formatDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return hours > 0 ? `${hours}h ${minutes % 60}m` : minutes > 0 ? `${minutes}m` : `${seconds}s`
}

const showDetails = () => console.log('Show connection details')
</script>

<style scoped>
.connection-info {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  min-width: 300px;
  box-shadow: var(--shadow-medium);
}

.connection-info-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.server-flag {
  font-size: var(--font-size-2xl);
  width: 40px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  border-radius: var(--border-radius-sm);
}

.server-details h3 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: 2px;
}

.server-details p {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.connection-status {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--success-green);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--success-green);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.connection-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border-radius: var(--border-radius-sm);
}

.stat-icon { font-size: var(--font-size-lg); margin-bottom: var(--spacing-xs); }
.stat-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: 2px;
}
.stat-label {
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.connection-actions { display: flex; gap: var(--spacing-sm); }

@media (max-width: 768px) {
  .connection-info { position: relative; bottom: auto; left: auto; margin: var(--spacing-lg); min-width: 0; }
  .connection-stats { grid-template-columns: repeat(4, 1fr); }
}
</style>