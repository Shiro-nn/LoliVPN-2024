<template>
  <Teleport to="body">
    <div v-if="data" class="tooltip show" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
      <div class="tooltip-title">{{ data.name }}</div>
      <div class="tooltip-details">
        <div>Ping: {{ data.ping }}</div>
        <div>Load: {{ data.load }}</div>
        <div v-if="data.premium" class="tooltip-premium">★ Premium Server</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface TooltipData { name: string; ping: string; load: string; premium: boolean }
interface Position { x: number; y: number }
interface Props { data: TooltipData | null; position: Position }

defineProps<Props>()
</script>

<style scoped>
.tooltip {
  position: fixed;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 13px;
  pointer-events: none;
  z-index: 1000;
  opacity: 0;
  transform: translateY(10px);
  transition: var(--transition-normal);
  max-width: 200px;
}

.tooltip.show {
  opacity: 1;
  transform: translateY(0);
}

.tooltip-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.tooltip-details {
  color: var(--text-secondary);
  font-size: 12px;
}

.tooltip-premium {
  color: #ffd700;
  font-weight: 500;
  margin-top: 2px;
}
</style>