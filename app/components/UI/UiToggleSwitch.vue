<template>
  <label class="toggle-switch">
    <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
    >
    <span class="switch-slider" :class="{ checked: modelValue, disabled }"></span>
  </label>
</template>

<script setup lang="ts">
interface Props { modelValue: boolean; disabled?: boolean }
withDefaults(defineProps<Props>(), { disabled: false })
defineEmits<{ 'update:modelValue': [value: boolean] }>()
</script>

<style scoped>
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.switch-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 24px;
  cursor: pointer;
  transition: var(--transition-normal);
}

.switch-slider::before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background: var(--text-muted);
  border-radius: 50%;
  transition: var(--transition-normal);
}

.switch-slider.checked {
  background: linear-gradient(135deg, var(--success-green), var(--success-green-dark));
  border-color: var(--success-green);
}

.switch-slider.checked::before {
  transform: translateX(24px);
  background: white;
}

.switch-slider.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>