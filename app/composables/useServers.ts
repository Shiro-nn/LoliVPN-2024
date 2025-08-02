import { computed, ref } from 'vue'
import { useVPNStore } from '~/stores/vpn'

export function useServers() {
    const store = useVPNStore()

    const servers = computed(() => store.servers)
    const recentServers = computed(() => {
        return store.recentServers
            .map(serverId => ({ id: serverId, ...store.servers[serverId] }))
            .filter(server => server.id !== 'auto')
    })
    const fastestServer = computed(() => store.fastestServer)

    return { servers, recentServers, fastestServer }
}