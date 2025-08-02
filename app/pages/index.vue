<template>
  <NuxtLayout name="vpn">
    <div class="vpn-main">
      <VPNWorldMap
          v-if="activeView === 'map'"
          :servers="servers"
          :current-server="currentServer"
          :is-connected="isConnected"
          @select-server="selectServer"
      />
      <VPNStatsView
          v-else-if="activeView === 'stats'"
          :stats="stats"
          :connection-duration="connectionDuration"
          :is-connected="isConnected"
      />
      <VPNSettingsModal
          v-else-if="activeView === 'settings'"
          :settings="settings"
          @update:settings="updateSettings"
      />
      <VPNWorldMap
          v-else
          :servers="servers"
          :current-server="currentServer"
          :is-connected="isConnected"
          @select-server="selectServer"
      />
      <VPNFloatingPanel
          :active-view="activeView"
          @change-view="setActiveView"
          @show-settings="showSettings"
          @show-stats="showStats"
          @export-logs="exportLogs"
      />
      <VPNQuickActions
          v-if="!isConnected"
          :fastest-server="fastestServer"
          :recent-servers="recentServers"
          @quick-connect="quickConnect"
      />
      <VPNConnectionInfo
          v-if="isConnected"
          :server="currentServerData"
          :stats="stats"
          :duration="connectionDuration"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'LoliVPN - Secure VPN Client',
  meta: [{ name: 'description', content: 'Modern VPN client with advanced features' }]
})

const {
  servers,
  currentServer,
  currentServerData,
  selectedServer,
  isConnected,
  isConnecting,
  stats,
  connectionDuration,
  fastestServer,
  selectServer,
  toggleConnection
} = useVPN()

const { settings, updateSettings } = useSettings()
const { recentServers } = useServers()

const activeView = ref<'map' | 'stats' | 'settings'>('map')

const setActiveView = (view: 'map' | 'stats' | 'settings') => {
  activeView.value = view
}

const showSettings = () => setActiveView('settings')
const showStats = () => setActiveView('stats')

const quickConnect = async (serverId?: string) => {
  if (serverId) selectServer(serverId)
  await toggleConnection()
}

const exportLogs = () => {
  const logs = generateConnectionLogs()
  downloadFile('vpn-logs.txt', logs)
}

const generateConnectionLogs = () => {
  return `LoliVPN Connection Logs
Generated: ${new Date().toISOString()}

Current Status: ${isConnected.value ? 'Connected' : 'Disconnected'}
${currentServer.value ? `Server: ${currentServerData.value?.name}` : ''}
${stats.value.downloadSpeed ? `Download: ${stats.value.downloadSpeed.toFixed(1)} Mbps` : ''}
${stats.value.uploadSpeed ? `Upload: ${stats.value.uploadSpeed.toFixed(1)} Mbps` : ''}
${connectionDuration.value ? `Duration: ${formatDuration(connectionDuration.value)}` : ''}`
}

const downloadFile = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const formatDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  return hours > 0 ? `${hours}h ${minutes % 60}m ${seconds % 60}s` :
      minutes > 0 ? `${minutes}m ${seconds % 60}s` :
          `${seconds}s`
}
</script>

<style scoped>
.vpn-main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>