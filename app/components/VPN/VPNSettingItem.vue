<template>
  <div class="setting-item">
    <div class="setting-item-info">
      <div class="setting-item-label">{{ label }}</div>
      <div class="setting-item-description">{{ description }}</div>
    </div>
    <div class="setting-item-control">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props { label: string; description: string }
defineProps<Props>()
</script>

<style scoped>
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
}

.setting-item-info { flex: 1; }
.setting-item-label {
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}
.setting-item-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.setting-item-control { flex-shrink: 0; display: flex; align-items: center; }
</style>