<template>
  <div class="floating-panel">
    <UiButton @click="$emit('change-view', 'map')" :variant="activeView === 'map' ? 'primary' : 'secondary'">Map</UiButton>
    <UiButton @click="$emit('show-stats')" :variant="activeView === 'stats' ? 'primary' : 'secondary'">Stats</UiButton>
    <UiButton @click="$emit('show-settings')" :variant="activeView === 'settings' ? 'primary' : 'secondary'">Settings</UiButton>
    <UiButton @click="$emit('export-logs')" variant="secondary">Export Logs</UiButton>
  </div>
</template>

<script setup lang="ts">
interface Props { activeView: 'map' | 'stats' | 'settings' }
defineProps<Props>()
defineEmits<{
  'change-view': [view: 'map' | 'stats' | 'settings']
  'show-settings': []
  'show-stats': []
  'export-logs': []
}>()
</script>

<style scoped>
.floating-panel {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
  z-index: 100;
}
</style>