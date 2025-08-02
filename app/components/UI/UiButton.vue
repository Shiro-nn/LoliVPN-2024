<template>
  <button
      class="ui-button"
      :class="[
      `variant-${variant}`,
      `size-${size}`,
      { disabled, loading }
    ]"
      :disabled="disabled || loading"
      @click="$emit('click', $event)"
  >
    <span v-if="loading" class="button-spinner"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false
})

defineEmits<{ click: [event: Event] }>()
</script>

<style scoped>
.ui-button {
  border: none;
  border-radius: var(--border-radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: var(--transition-normal);
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-base);
}

.ui-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

.ui-button:active { transform: translateY(0); }

.variant-primary {
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
  color: white;
}

.variant-secondary {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.variant-danger {
  background: linear-gradient(135deg, var(--danger-red), var(--danger-red-dark));
  color: white;
}

.size-sm { padding: var(--spacing-sm) var(--spacing-md); font-size: var(--font-size-sm); }
.size-md { padding: var(--spacing-md) var(--spacing-lg); font-size: var(--font-size-base); }
.size-lg { padding: var(--spacing-lg) var(--spacing-2xl); font-size: var(--font-size-lg); }

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading { cursor: wait; }

.button-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.variant-secondary .button-spinner { border-top-color: var(--primary-blue); }

@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>