<template>
  <div class="world-map-container">
    <div class="world-map" ref="mapContainer">
      <VPNPoint
          v-for="[serverId, server] in mapServers"
          :key="serverId"
          :server="{ id: serverId, ...server }"
          :active="serverId === currentServer"
          @click="$emit('select-server', serverId)"
          @show-tooltip="showTooltip"
          @hide-tooltip="hideTooltip"
      />
      <VPNConnectionLine
          v-if="isConnected && currentServer && connectionLineData"
          :from="connectionLineData.from"
          :to="connectionLineData.to"
          :active="true"
      />
    </div>
    <VPNTooltip v-if="tooltipData" :data="tooltipData" :position="tooltipPosition" />
  </div>
</template>

<script setup lang="ts">
interface Server {
  name: string
  flag: string
  ping: string
  load: string
  x: number
  y: number
  premium: boolean
}

interface Props {
  servers: Record<string, Server>
  currentServer?: string | null
  isConnected: boolean
}

const props = defineProps<Props>()
defineEmits<{ 'select-server': [serverId: string] }>()

const mapContainer = ref<HTMLElement>()
const tooltipData = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })

const mapServers = computed(() => {
  return Object.entries(props.servers).filter(([id]) => id !== 'auto')
})

const connectionLineData = computed(() => {
  if (!props.isConnected || !props.currentServer) return null
  const server = props.servers[props.currentServer]
  if (!server) return null
  return {
    from: { x: 10, y: 40 },
    to: { x: server.x, y: server.y }
  }
})

const showTooltip = (event: MouseEvent, server: Server & { id: string }) => {
  tooltipData.value = server
  tooltipPosition.value = { x: event.pageX + 10, y: event.pageY - 10 }
}

const hideTooltip = () => {
  tooltipData.value = null
}
</script>

<style scoped>
.world-map-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.world-map {
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,212,255,0.03)" stroke-width="1"/></pattern><radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:rgba(0,212,255,0.1);stop-opacity:1" /><stop offset="100%" style="stop-color:rgba(0,212,255,0);stop-opacity:0" /></radialGradient></defs><rect width="100%" height="100%" fill="url(%23grid)"/><circle cx="600" cy="300" r="300" fill="url(%23glow)"/></svg>');
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>