<template>
  <div class="loading-overlay">
    <div class="loading-content">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div class="loading-text">
        <h3>{{ loadingTitle }}</h3>
        <p>{{ loadingMessage }}</p>
      </div>
      <div class="loading-progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-text">{{ progress }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isConnecting, selectedServerData } = useVPN()

const progress = ref(0)
const loadingTitle = ref('Connecting...')
const loadingMessage = ref('Establishing secure connection')

watch(isConnecting, (connecting) => {
  if (connecting) {
    progress.value = 0
    loadingTitle.value = 'Connecting...'
    loadingMessage.value = selectedServerData.value
        ? `Connecting to ${selectedServerData.value.name}`
        : 'Establishing secure connection'
    simulateProgress()
  }
})

const simulateProgress = () => {
  const steps = [
    { progress: 20, title: 'Initializing...', message: 'Setting up connection parameters' },
    { progress: 40, title: 'Authenticating...', message: 'Verifying credentials' },
    { progress: 60, title: 'Establishing tunnel...', message: 'Creating secure tunnel' },
    { progress: 80, title: 'Configuring routes...', message: 'Setting up network routes' },
    { progress: 100, title: 'Connected!', message: 'Connection established successfully' }
  ]
  let currentStep = 0
  const interval = setInterval(() => {
    if (currentStep < steps.length && isConnecting.value) {
      const step = steps[currentStep]
      progress.value = step.progress
      loadingTitle.value = step.title
      loadingMessage.value = step.message
      currentStep++
    } else {
      clearInterval(interval)
    }
  }, 800)
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.loading-content {
  background: var(--background-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-xl);
  padding: var(--spacing-4xl);
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: var(--shadow-strong);
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-2xl);
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid var(--primary-blue);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(2) {
  width: 60px;
  height: 60px;
  top: 10px;
  left: 10px;
  border-top-color: var(--success-green);
  animation-duration: 1.2s;
  animation-direction: reverse;
}

.spinner-ring:nth-child(3) {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  border-top-color: var(--warning-orange);
  animation-duration: 0.9s;
}

.loading-text { margin-bottom: var(--spacing-2xl); }
.loading-text h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
}
.loading-text p {
  color: var(--text-secondary);
  font-size: var(--font-size-base);
}

.loading-progress {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--glass-bg);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-blue), var(--success-green));
  border-radius: 4px;
  transition: width 0.5s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  animation: shimmer 1.5s infinite;
}

.progress-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium);
}

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>