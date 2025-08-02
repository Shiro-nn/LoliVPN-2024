import { computed, ref } from 'vue'
import { useVPNStore } from '~/stores/vpn'

export function useVPN() {
    const store = useVPNStore()

    const isConnected = computed(() => store.isConnected)
    const isConnecting = computed(() => store.isConnecting)
    const currentServer = computed(() => store.currentServer)
    const selectedServer = computed(() => store.selectedServer)
    const servers = computed(() => store.servers)
    const currentServerData = computed(() => store.currentServer ? store.servers[store.currentServer] : null)
    const selectedServerData = computed(() => store.selectedServer ? store.servers[store.selectedServer] : null)
    const stats = computed(() => store.stats)
    const connectionDuration = computed(() => store.connectionDuration)
    const fastestServer = computed(() => store.fastestServer)
    const lastError = computed(() => store.lastError)

    const connect = async () => {
        if (!store.selectedServer) {
            store.selectServer(store.fastestServer?.id || Object.keys(store.servers)[0])
        }
        await store.connect()
    }

    const disconnect = async () => {
        await store.disconnect()
    }

    const toggleConnection = async () => {
        if (store.isConnected) {
            await disconnect()
        } else {
            await connect()
        }
    }

    const selectServer = (serverId: string) => {
        store.selectServer(serverId)
    }

    return {
        isConnected,
        isConnecting,
        currentServer,
        selectedServer,
        servers,
        currentServerData,
        selectedServerData,
        stats,
        connectionDuration,
        fastestServer,
        lastError,
        connect,
        disconnect,
        toggleConnection,
        selectServer
    }
}