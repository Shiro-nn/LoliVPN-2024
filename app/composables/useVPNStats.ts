import { computed } from 'vue'
import { useVPNStore } from '~/stores/vpn'

export function useVPNStats() {
    const store = useVPNStore()

    const stats = computed(() => store.stats)
    const connectionDuration = computed(() => store.connectionDuration)

    const refreshStats = () => {
        store.refreshStats()
    }

    return { stats, connectionDuration, refreshStats }
}