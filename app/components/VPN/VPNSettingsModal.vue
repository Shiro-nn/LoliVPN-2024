<template>
  <UiModal v-model="isOpen" @close="$emit('close')">
    <template #header>
      <h2 class="modal-title">Settings</h2>
    </template>
    <div class="settings-content">
      <VPNSettingGroup title="Connection" description="VPN connection preferences">
        <VPNSettingItem label="Auto Connect" description="Automatically connect to VPN when app starts">
          <UiToggleSwitch v-model="settings.autoConnect" @change="updateSetting('autoConnect', $event)" />
        </VPNSettingItem>
        <VPNSettingItem label="Kill Switch" description="Block internet if VPN disconnects unexpectedly">
          <UiToggleSwitch v-model="settings.killSwitch" @change="updateSetting('killSwitch', $event)" />
        </VPNSettingItem>
        <VPNSettingItem label="Protocol" description="VPN protocol for connection">
          <select v-model="settings.protocol" class="setting-select" @change="updateSetting('protocol', $event.target.value)">
            <option value="auto">Auto (Recommended)</option>
            <option value="wireguard">WireGuard</option>
            <option value="openvpn">OpenVPN</option>
            <option value="ikev2">IKEv2</option>
          </select>
        </VPNSettingItem>
      </VPNSettingGroup>
      <VPNSettingGroup title="Privacy" description="Privacy and security settings">
        <VPNSettingItem label="DNS Server" description="Custom DNS server for enhanced privacy">
          <select v-model="settings.dnsServer" class="setting-select" @change="updateSetting('dnsServer', $event.target.value)">
            <option value="auto">Auto (Recommended)</option>
            <option value="cloudflare">Cloudflare (1.1.1.1)</option>
            <option value="google">Google (8.8.8.8)</option>
            <option value="quad9">Quad9 (9.9.9.9)</option>
            <option value="custom">Custom</option>
          </select>
        </VPNSettingItem>
        <VPNSettingItem label="Block Ads" description="Block advertisements and trackers">
          <UiToggleSwitch v-model="settings.blockAds" @change="updateSetting('blockAds', $event)" />
        </VPNSettingItem>
      </VPNSettingGroup>
      <VPNSettingGroup title="Appearance" description="App appearance and behavior">
        <VPNSettingItem label="Theme" description="Choose your preferred theme">
          <select v-model="settings.theme" class="setting-select" @change="updateSetting('theme', $event.target.value)">
            <option value="dark">Dark (Default)</option>
            <option value="light">Light</option>
            <option value="auto">Auto</option>
          </select>
        </VPNSettingItem>
        <VPNSettingItem label="Start Minimized" description="Start app minimized to system tray">
          <UiToggleSwitch v-model="settings.startMinimized" @change="updateSetting('startMinimized', $event)" />
        </VPNSettingItem>
      </VPNSettingGroup>
    </div>
    <template #footer>
      <div class="modal-actions">
        <UiButton variant="secondary" @click="resetSettings">Reset to Default</UiButton>
        <UiButton variant="primary" @click="saveSettings">Save Changes</UiButton>
      </div>
    </template>
  </UiModal>
</template>

<script setup lang="ts">
interface Settings {
  autoConnect: boolean
  killSwitch: boolean
  protocol: string
  dnsServer: string
  blockAds: boolean
  theme: string
  startMinimized: boolean
}

interface Props {
  modelValue: boolean
  settings: Settings
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'update:settings': [settings: Settings]
  close: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const settings = ref({ ...props.settings })

const updateSetting = (key: keyof Settings, value: any) => {
  settings.value[key] = value
}

const saveSettings = () => {
  emit('update:settings', { ...settings.value })
  emit('close')
}

const resetSettings = () => {
  settings.value = {
    autoConnect: false,
    killSwitch: true,
    protocol: 'auto',
    dnsServer: 'auto',
    blockAds: true,
    theme: 'dark',
    startMinimized: false
  }
}

watch(() => props.settings, (newSettings) => {
  settings.value = { ...newSettings }
}, { deep: true })
</script>

<style scoped>
.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.settings-content {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
}

.setting-select {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius-sm);
  padding: 8px 12px;
  color: var(--text-primary);
  font-size: 14px;
  min-width: 200px;
}

.setting-select:focus {
  outline: none;
  border-color: var(--primary-blue);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>