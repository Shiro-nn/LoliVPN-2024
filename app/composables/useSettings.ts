import { computed, ref } from 'vue'
import { useVPNStore } from '~/stores/vpn'

export function useSettings() {
    const store = useVPNStore()

    const settings = computed(() => store.settings)

    const updateSettings = (newSettings: Partial<typeof store.settings>) => {
        store.updateSettings(newSettings)
    }

    return { settings, updateSettings }
}