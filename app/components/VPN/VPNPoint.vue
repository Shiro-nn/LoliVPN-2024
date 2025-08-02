<template>
  <div
      class="vpn-point"
      :class="{
      active,
      premium: server.premium,
      'load-high': server.load === 'high',
      'load-medium': server.load === 'medium'
    }"
      :style="{ left: `${server.x}%`, top: `${server.y}%` }"
      @click="$emit('click')"
      @mouseenter="handleMouseEnter"
      @mouseleave="$emit('hide-tooltip')"
  >
    <div class="point-inner"></div>
    <div class="point-pulse"></div>
  </div>
</template>

<script setup lang="ts">
interface Server {
  id: string
  name: string
  flag: string
  ping: string
  load: 'low' | 'medium' | 'high'
  x: number
  y: number
  premium: boolean
}

interface Props {
  server: Server
  active?: boolean
}

const props = defineProps<Props>()
defineEmits<{
  click: []
  'show-tooltip': [event: MouseEvent, server: Server]
  'hide-tooltip': []
}>()

const handleMouseEnter = (event: MouseEvent) => {
  emit('show-tooltip', event, props.server)
}
</script>

<style scoped>
.vpn-point {
  position: absolute;
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: var(--transition-normal);
  z-index: 10;
  transform: translate(-50%, -50%);
}

.point-inner {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  transition: var(--transition-normal);
}

.point-pulse {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  animation: pointPulse 2s infinite;
}

.vpn-point:hover {
  transform: translate(-50%, -50%) scale(1.3);
}

.vpn-point:hover .point-inner {
  box-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
}

.vpn-point.active .point-inner {
  background: linear-gradient(135deg, var(--success-green), var(--success-green-dark));
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.8);
  transform: scale(1.2);
}

.vpn-point.premium::after {
  content: '★';
  position: absolute;
  top: -8px;
  right: -8px;
  color: #ffd700;
  font-size: 10px;
  z-index: 1;
}

.vpn-point.load-medium .point-inner {
  background: linear-gradient(135deg, var(--warning-orange), #ff8800);
}

.vpn-point.load-high .point-inner {
  background: linear-gradient(135deg, var(--danger-red), var(--danger-red-dark));
}

@keyframes pointPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}
</style>