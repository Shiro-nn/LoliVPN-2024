<template>
  <div class="speed-chart" ref="chartContainer">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'

interface SpeedData { time: Date; download: number; upload: number }
interface Props { speedData: SpeedData[] }
defineProps<Props>()

const chartContainer = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
let chartInstance: Chart | null = null

const initializeChart = (speedData: SpeedData[]) => {
  if (!canvas.value) return
  if (chartInstance) chartInstance.destroy()

  const ctx = canvas.value.getContext('2d')
  if (!ctx) return

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Download Speed',
          data: speedData.map(d => ({ x: d.time, y: d.download })),
          borderColor: 'rgba(0, 212, 255, 0.8)',
          backgroundColor: 'rgba(0, 212, 255, 0.2)',
          tension: 0.4,
          pointRadius: 0,
          fill: true
        },
        {
          label: 'Upload Speed',
          data: speedData.map(d => ({ x: d.time, y: d.upload })),
          borderColor: 'rgba(255, 136, 0, 0.8)',
          backgroundColor: 'rgba(255, 136, 0, 0.2)',
          tension: 0.4,
          pointRadius: 0,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { type: 'time', time: { unit: 'second' }, title: { display: true, text: 'Time' } },
        y: { beginAtZero: true, title: { display: true, text: 'Speed (Mbps)' } }
      },
      plugins: { legend: { position: 'top' } }
    }
  })
}

watch(() => props.speedData, (newData) => {
  initializeChart(newData)
}, { deep: true })

onMounted(() => {
  initializeChart(props.speedData)
})

onUnmounted(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<style scoped>
.speed-chart {
  height: 200px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md);
}
</style>