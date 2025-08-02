<template>
  <div class="server-item" :class="{ active }" @click="$emit('select')">
    <div class="server-flag">{{ server.flag }}</div>
    <div class="server-info">
      <div class="server-name">{{ server.name }}</div>
      <div class="server-details">
        <span class="server-ping" :class="pingClass">{{ pingIcon }} {{ server.ping }}</span>
        <span class="server-load">
          Load: <span class="load-indicator" :class="server.load"></span>
        </span>
      </div>
    </div>
    <div v-if="server.premium" class="server-premium">PRO</div>
  </div>
</template>

<script setup lang="ts">
interface Server {
  id: string
  name: string
  flag: string
  ping: string
  load: 'low' | 'medium' | 'high'
  premium: boolean
}

interface Props {
  server: Server
  active?: boolean
}

const props = defineProps<Props>()
defineEmits<{ select: [] }>()

const pingClass = computed(() => {
  const pingValue = parseInt(props.server.ping)
  return pingValue < 50 ? 'ping-good' : pingValue < 100 ? 'ping-medium' : 'ping-poor'
})

const pingIcon = computed(() => {
  const pingValue = parseInt(props.server.ping)
  return pingValue < 50 ? '🟢' : pingValue < 100 ? '🟡' : '🔴'
})
</script>

<style scoped>
.server-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 16px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.server-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateX(4px);
  border-color: var(--primary-blue);
}

.server-item.active {
  background: rgba(0, 212, 255, 0.1);
  border-color: var(--primary-blue);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.server-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--primary-blue);
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.server-item.active::before {
  opacity: 1;
}

.server-flag {
  width: 32px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
}

.server-info {
  flex: 1;
}

.server-name {
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 14px;
  color: var(--text-primary);
}

.server-details {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: var(--text-secondary);
  align-items: center;
}

.server-ping {
  display: flex;
  align-items: center;
  gap: 4px;
}

.server-load {
  display: flex;
  align-items: center;
  gap: 4px;
}

.load-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success-green);
}

.load-indicator.medium { background: var(--warning-orange); }
.load-indicator.high { background: var(--danger-red); }

.server-premium {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #000;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}
</style>