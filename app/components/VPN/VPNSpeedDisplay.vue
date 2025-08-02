<template>
  <div class="speed-display">
    <div class="speed-item">
      <span class="speed-icon">↓</span>
      <span class="speed-value">{{ formattedDownload }}</span>
    </div>
    <div class="speed-item">
      <span class="speed-icon">↑</span>
      <span class="speed-value">{{ formattedUpload }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  downloadSpeed?: number
  uploadSpeed?: number
}

const props = withDefaults(defineProps<Props>(), {
  downloadSpeed: 0,  // Значение по умолчанию
  uploadSpeed: 0     // Значение по умолчанию
})

const formattedDownload = computed(() => `${props.downloadSpeed.toFixed(1)} Mbps`)
const formattedUpload = computed(() => `${props.uploadSpeed.toFixed(1)} Mbps`)
</script>

<style scoped>
.speed-display {
  display: flex;
  gap: 16px;
  align-items: center;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: 8px 16px;
}

.speed-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
}

.speed-icon { font-size: 14px; }
.speed-value { color: var(--primary-blue); font-weight: 600; }

@media (max-width: 768px) {
  .speed-display { padding: 6px 12px; }
  .speed-item { font-size: 12px; gap: 4px; }
}
</style>