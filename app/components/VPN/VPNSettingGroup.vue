<template>
  <div class="setting-group">
    <div class="setting-group-header">
      <h3 class="setting-group-title">{{ title }}</h3>
      <p class="setting-group-description">{{ description }}</p>
    </div>
    <div class="setting-group-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props { title: string; description: string }
defineProps<Props>()
</script>

<style scoped>
.setting-group { margin-bottom: var(--spacing-2xl); }
.setting-group-header { margin-bottom: var(--spacing-lg); }
.setting-group-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
}
.setting-group-description {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}
.setting-group-content { display: flex; flex-direction: column; gap: var(--spacing-md); }
</style>