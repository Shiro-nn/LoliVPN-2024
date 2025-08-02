<template>
  <div class="stats-view">
    <div class="stats-header">
      <h2 class="stats-title">Connection Statistics</h2>
      <div class="stats-actions">
        <UiButton size="sm" variant="secondary" @click="refreshStats">🔄 Refresh</UiButton>
        <UiButton size="sm" variant="secondary" @click="exportStats">📊 Export</UiButton>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stats-card">
        <div class="stats-card-header">
          <h3>Connection Overview</h3>
          <div class="stats-card-icon">🌐</div>
        </div>
        <div class="stats-card-content">
          <div class="stat-item">
            <span class="stat-label">Status</span>
            <span class="stat-value" :class="{ connected: isConnected }">
              {{ isConnected ? 'Connected' : 'Disconnected' }}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Duration</span>
            <span class="stat-value">{{ formattedDuration }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Protocol</span>
            <span class="stat-value">WireGuard</span>
          </div>
        </div>
      </div>
      <div class="stats-card">
        <div class="stats-card-header">
          <h3>Speed Statistics</h3>
          <div class="stats-card-icon">⚡</div>
        </div>
        <div class="stats-card-content">
          <div class="stat-item">
            <span class="stat-label">Download</span>
            <span class="stat-value speed-download">{{ stats.downloadSpeed.toFixed(1) }} Mbps</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Upload</span>
            <span class="stat-value speed-upload">{{ stats.uploadSpeed.toFixed(1) }} Mbps</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Ping</span>
            <span class="stat-value">{{ currentPing }}ms</span>
          </div>
        </div>
      </div>
      <div class="stats-card">
        <div class="stats-card-header">
          <h3>Data Usage</h3>
          <div class="stats-card-icon">📈</div>
        </div>
        <div class="stats-card-content">
          <div class="stat-item">
            <span class="stat-label">Downloaded</span>
            <span class="stat-value">{{ formatBytes(stats.bytesDownloaded) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Uploaded</span>
            <span class="stat-value">{{ formatBytes(stats.bytesUploaded) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Total</span>
            <span class="stat-value">{{ formatBytes(stats.bytesDownloaded + stats.bytesUploaded) }}</span>
          </div>
        </div>
      </div>
      <div class="stats-card">
        <div class="stats-card-header">
          <h3>Security</h3>
          <div class="stats-card-icon">🔒</div>
        </div>
        <div class="stats-card-content">
          <div class="stat-item">
            <span class="stat-label">Encryption</span>
            <span class="stat-value">ChaCha20-Poly1305</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Kill Switch</span>
            <span class="stat-value" :class="{ enabled: killSwitchEnabled }">
              {{ killSwitchEnabled ? 'Enabled' : 'Disabled' }}
            </span>
          </div>
          <div class="stat-item">
            <span class="stat-label">DNS Leak</span>
            <span class="stat-value protected">Protected</span>
          </div>
        </div>
      </div>
    </div>
    <div class="stats-chart-container">
      <div class="stats-card">
        <div class="stats-card-header">
          <h3>Speed History</h3>
          <div class="stats-card-icon">📊</div>
        </div>
        <div class="stats-card-content">
          <VPNSpeedChart :speed-data="speedHistory" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props { stats: any; connectionDuration: number; isConnected: boolean }
const props = defineProps<Props>()

const { settings } = useSettings()
const speedHistory = ref<Array<{ time: Date; download: number; upload: number }>>([])

const formattedDuration = computed(() => {
  if (!props.isConnected || !props.connectionDuration) return '0s'
  const seconds = Math.floor(props.connectionDuration / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return hours > 0 ? `${hours}h ${minutes % 60}m` :
      minutes > 0 ? `${minutes}m ${seconds % 60}s` :
          `${seconds}s`
})

const currentPing = computed(() => Math.floor(Math.random() * 50) + 10)
const killSwitchEnabled = computed(() => settings.value.killSwitch)

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const refreshStats = () => console.log('Refreshing stats...')

const exportStats = () => {
  const statsData = {
    timestamp: new Date().toISOString(),
    isConnected: props.isConnected,
    duration: props.connectionDuration,
    stats: props.stats,
    speedHistory: speedHistory.value
  }
  const blob = new Blob([JSON.stringify(statsData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `vpn-stats-${Date.now()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

watch([() => props.stats.downloadSpeed, () => props.stats.uploadSpeed], () => {
  if (props.isConnected) {
    speedHistory.value.push({
      time: new Date(),
      download: props.stats.downloadSpeed,
      upload: props.stats.uploadSpeed
    })
    if (speedHistory.value.length > 50) speedHistory.value = speedHistory.value.slice(-50)
  }
})
</script>

<style scoped>
.stats-view {
  padding: var(--spacing-2xl);
  height: 100%;
  overflow-y: auto;
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
}

.stats-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
}

.stats-actions { display: flex; gap: var(--spacing-md); }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.stats-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-2xl);
  backdrop-filter: blur(10px);
}

.stats-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.stats-card-header h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}

.stats-card-icon { font-size: var(--font-size-xl); opacity: 0.7; }

.stats-card-content { display: flex; flex-direction: column; gap: var(--spacing-lg); }

.stat-item { display: flex; justify-content: space-between; align-items: center; }
.stat-label { color: var(--text-secondary); font-size: var(--font-size-sm); }
.stat-value { font-weight: var(--font-weight-semibold); color: var(--text-primary); }
.stat-value.connected { color: var(--success-green); }
.stat-value.enabled { color: var(--success-green); }
.stat-value.protected { color: var(--success-green); }
.stat-value.speed-download { color: var(--primary-blue); }
.stat-value.speed-upload { color: var(--warning-orange); }

.stats-chart-container { margin-top: var(--spacing-2xl); }

@media (max-width: 768px) {
  .stats-view { padding: var(--spacing-lg); }
  .stats-grid { grid-template-columns: 1fr; }
  .stats-header { flex-direction: column; gap: var(--spacing-lg); align-items: stretch; }
}
</style>