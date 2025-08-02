<template>
  <div class="window-controls">
    <button class="window-control close" @click="closeApp" title="Close"></button>
    <button class="window-control minimize" @click="minimizeApp" title="Minimize"></button>
    <button class="window-control maximize" @click="toggleMaximize" title="Maximize"></button>
  </div>
</template>

<script setup lang="ts">
const { closeApp, minimizeApp, toggleMaximize } = useTauriWindow()
</script>

<style scoped>
.window-controls { display: flex; gap: 8px; }
.window-control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: var(--transition-fast);
}
.window-control:hover { opacity: 0.8; transform: scale(1.1); }
.window-control.close { background: var(--danger-red); }
.window-control.minimize { background: var(--warning-orange); }
.window-control.maximize { background: var(--success-green); }
</style>