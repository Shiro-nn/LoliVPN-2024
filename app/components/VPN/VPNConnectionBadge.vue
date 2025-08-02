<template>
  <div class="connection-badge" :class="{ connected, disconnected: !connected }">
    <span class="badge-icon">{{ badgeIcon }}</span>
    <span class="badge-text">{{ status }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props { connected: boolean; status: string }
const props = defineProps<Props>()

const badgeIcon = computed(() => props.connected ? '🛡️' : '🔒')
</script>

<style scoped>
.connection-badge {
  background: linear-gradient(135deg, var(--success-green), var(--success-green-dark));
  border-radius: var(--border-radius-sm);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  transition: var(--transition-normal);
}

.connection-badge.disconnected {
  background: linear-gradient(135deg, var(--danger-red), var(--danger-red-dark));
}

.badge-icon { font-size: 14px; }
.badge-text { white-space: nowrap; }

@media (max-width: 768px) {
  .connection-badge { padding: 4px 8px; font-size: 11px; }
  .badge-text { display: none; }
}
</style>