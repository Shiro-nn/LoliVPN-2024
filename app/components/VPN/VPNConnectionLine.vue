<template>
  <div class="connection-line" :class="{ active }" :style="lineStyle">
    <div class="line-flow"></div>
  </div>
</template>

<script setup lang="ts">
interface Point { x: number; y: number }
interface Props { from: Point; to: Point; active?: boolean }

const props = defineProps<Props>()

const lineStyle = computed(() => {
  const deltaX = props.to.x - props.from.x
  const deltaY = props.to.y - props.from.y
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
  return {
    left: `${props.from.x}%`,
    top: `${props.from.y}%`,
    width: `${distance}%`,
    transform: `rotate(${angle}deg)`,
    transformOrigin: 'left center'
  }
})
</script>

<style scoped>
.connection-line {
  position: absolute;
  height: 2px;
  pointer-events: none;
  z-index: 5;
  opacity: 0;
  transition: var(--transition-normal);
}

.connection-line.active { opacity: 1; }

.line-flow {
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
  var(--primary-blue) 0%,
  transparent 20%,
  var(--success-green) 50%,
  transparent 80%,
  var(--primary-blue) 100%
  );
  animation: connectionFlow 2s ease-in-out infinite;
}

@keyframes connectionFlow {
  0% { opacity: 0; transform: scaleX(0); }
  20% { opacity: 1; }
  80% { opacity: 1; transform: scaleX(1); }
  100% { opacity: 0; transform: scaleX(1); }
}
</style>