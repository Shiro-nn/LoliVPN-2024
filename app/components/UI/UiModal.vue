<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal" :class="modalClass" @click.stop>
          <header v-if="$slots.header" class="modal-header">
            <slot name="header" />
            <button class="modal-close" @click="close">×</button>
          </header>
          <main class="modal-body">
            <slot />
          </main>
          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlay?: boolean
}

const props = withDefaults(defineProps<Props>(), { size: 'md', closeOnOverlay: true })
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; close: [] }>()

const modalClass = computed(() => `modal-${props.size}`)

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  animation: fadeIn 0.3s ease;
}

.modal {
  background: var(--background-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-lg);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-strong);
}

.modal-sm { width: 400px; }
.modal-md { width: 600px; }
.modal-lg { width: 800px; }
.modal-xl { width: 1000px; }

.modal-header {
  padding: var(--spacing-lg) var(--spacing-2xl);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: var(--font-size-lg);
  cursor: pointer;
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-fast);
}

.modal-close:hover {
  background: var(--glass-bg);
  color: var(--text-primary);
}

.modal-body {
  padding: var(--spacing-2xl);
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: var(--spacing-lg) var(--spacing-2xl);
  border-top: 1px solid var(--glass-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

.modal-enter-active, .modal-leave-active { transition: all 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.95); }
.modal-enter-from .modal-overlay { opacity: 0; }
.modal-leave-to .modal-overlay { opacity: 0; }

@media (max-width: 768px) {
  .modal { width: 90vw !important; }
}
</style>