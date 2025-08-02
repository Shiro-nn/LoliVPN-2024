<template>
  <Teleport to="body">
    <div class="notifications-container">
      <TransitionGroup name="notification" tag="div">
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification"
            :class="[`notification-${notification.type}`, { 'notification-dismissible': notification.dismissible }]"
        >
          <div class="notification-icon">{{ getNotificationIcon(notification.type) }}</div>
          <div class="notification-content">
            <div class="notification-title">{{ notification.title }}</div>
            <div v-if="notification.message" class="notification-message">{{ notification.message }}</div>
          </div>
          <button v-if="notification.dismissible" class="notification-close" @click="dismissNotification(notification.id)">
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  dismissible?: boolean
}

const notifications = ref<Notification[]>([])

const getNotificationIcon = (type: string) => {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }
  return icons[type as keyof typeof icons] || 'ℹ️'
}

const addNotification = (notification: Omit<Notification, 'id'>) => {
  const id = `notification-${Date.now()}-${Math.random()}`
  const newNotification: Notification = { id, dismissible: true, duration: 5000, ...notification }
  notifications.value.push(newNotification)
  if (newNotification.duration && newNotification.duration > 0) {
    setTimeout(() => dismissNotification(id), newNotification.duration)
  }
}

const dismissNotification = (id: string) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) notifications.value.splice(index, 1)
}

const { isConnected, currentServerData, lastError } = useVPN()

watch(isConnected, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    addNotification({
      type: 'success',
      title: 'Connected to VPN',
      message: currentServerData.value?.name ? `Connected to ${currentServerData.value.name}` : undefined
    })
  } else if (!newValue && oldValue) {
    addNotification({
      type: 'info',
      title: 'Disconnected from VPN',
      message: 'Your connection is no longer protected'
    })
  }
})

watch(lastError, (error) => {
  if (error) {
    addNotification({
      type: 'error',
      title: 'Connection Error',
      message: error,
      duration: 8000
    })
  }
})

provide('notifications', { add: addNotification, dismiss: dismissNotification })
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: 80px;
  right: 24px;
  z-index: var(--z-notification);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  max-width: 400px;
  width: 100%;
}

.notification {
  background: var(--background-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  box-shadow: var(--shadow-medium);
  backdrop-filter: blur(20px);
}

.notification-success { border-left: 4px solid var(--success-green); }
.notification-error { border-left: 4px solid var(--danger-red); }
.notification-warning { border-left: 4px solid var(--warning-orange); }
.notification-info { border-left: 4px solid var(--primary-blue); }

.notification-icon { font-size: var(--font-size-lg); flex-shrink: 0; }
.notification-content { flex: 1; }
.notification-title {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
}
.notification-message {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}

.notification-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
  flex-shrink: 0;
}

.notification-close:hover {
  background: var(--glass-bg);
  color: var(--text-primary);
}

.notification-enter-active, .notification-leave-active { transition: all 0.3s ease; }
.notification-enter-from { opacity: 0; transform: translateX(100%); }
.notification-leave-to { opacity: 0; transform: translateX(100%); }
.notification-move { transition: transform 0.3s ease; }

@media (max-width: 480px) {
  .notifications-container { left: 16px; right: 16px; max-width: none; }
}
</style>