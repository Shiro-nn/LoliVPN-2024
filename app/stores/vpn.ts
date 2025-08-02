import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTauri } from '~/composables/useTauri'

interface Server {
    name: string
    flag: string
    ping: string
    load: 'low' | 'medium' | 'high'
    x: number
    y: number
    premium: boolean
    region: string
}

interface Stats {
    downloadSpeed: number
    uploadSpeed: number
    bytesDownloaded: number
    bytesUploaded: number
}

interface Settings {
    autoConnect: boolean
    killSwitch: boolean
    protocol: string
    dnsServer: string
    blockAds: boolean
    theme: string
    startMinimized: boolean
}

export const useVPNStore = defineStore('vpn', () => {
    const { connectVPN, disconnectVPN, getServerList } = useTauri()

    const isConnected = ref(false)
    const isConnecting = ref(false)
    const currentServer = ref<string | null>(null)
    const selectedServer = ref<string | null>(null)
    const servers = ref<Record<string, Server>>({})
    const recentServers = ref<string[]>([])
    const stats = ref<Stats>({
        downloadSpeed: 0,
        uploadSpeed: 0,
        bytesDownloaded: 0,
        bytesUploaded: 0
    })
    const connectionStartTime = ref<number | null>(null)
    const lastError = ref<string | null>(null)
    const settings = ref<Settings>({
        autoConnect: false,
        killSwitch: true,
        protocol: 'auto',
        dnsServer: 'auto',
        blockAds: true,
        theme: 'dark',
        startMinimized: false
    })

    const serversByRegion = computed(() => {
        const groups: Record<string, Server[]> = {
            americas: [],
            europe: [],
            asia: [],
            global: []
        }
        Object.entries(servers.value).forEach(([id, server]) => {
            if (id !== 'auto') groups[server.region].push({ id, ...server })
        })
        return groups
    })

    const fastestServer = computed(() => {
        const serverList = Object.entries(servers.value)
            .filter(([id]) => id !== 'auto')
            .map(([id, server]) => ({ id, ...server }))
        return serverList.reduce((fastest, server) => {
            if (!fastest) return server
            return parseInt(server.ping) < parseInt(fastest.ping) ? server : fastest
        }, null as (Server & { id: string }) | null)
    })

    const connectionDuration = computed(() => {
        if (!isConnected.value || !connectionStartTime.value) return 0
        return Date.now() - connectionStartTime.value
    })

    const loadServers = async () => {
        servers.value = await getServerList()
    }

    const selectServer = (serverId: string) => {
        if (servers.value[serverId]) {
            selectedServer.value = serverId
            if (!recentServers.value.includes(serverId) && serverId !== 'auto') {
                recentServers.value = [serverId, ...recentServers.value.slice(0, 4)]
            }
        }
    }

    const connect = async () => {
        if (isConnected.value || isConnecting.value || !selectedServer.value) return
        isConnecting.value = true
        try {
            await connectVPN(selectedServer.value)
            isConnected.value = true
            currentServer.value = selectedServer.value
            connectionStartTime.value = Date.now()
            lastError.value = null
        } catch (error) {
            lastError.value = String(error)
        } finally {
            isConnecting.value = false
        }
    }

    const disconnect = async () => {
        if (!isConnected.value) return
        isConnecting.value = true
        try {
            await disconnectVPN()
            isConnected.value = false
            currentServer.value = null
            connectionStartTime.value = null
            stats.value = { downloadSpeed: 0, uploadSpeed: 0, bytesDownloaded: 0, bytesUploaded: 0 }
        } catch (error) {
            lastError.value = String(error)
        } finally {
            isConnecting.value = false
        }
    }

    const setConnectionStatus = (status: boolean) => {
        isConnected.value = status
        if (!status) {
            currentServer.value = null
            connectionStartTime.value = null
        }
    }

    const updateStats = (newStats: Partial<Stats>) => {
        stats.value = { ...stats.value, ...newStats }
    }

    const refreshStats = () => {
        // Simulate stats refresh
        stats.value = {
            downloadSpeed: Math.random() * 50 + 10,
            uploadSpeed: Math.random() * 30 + 5,
            bytesDownloaded: stats.value.bytesDownloaded + Math.random() * 1000000,
            bytesUploaded: stats.value.bytesUploaded + Math.random() * 500000
        }
    }

    const updateSettings = (newSettings: Partial<Settings>) => {
        settings.value = { ...settings.value, ...newSettings }
    }

    const setLastError = (error: string | null) => {
        lastError.value = error
    }

    onMounted(() => {
        loadServers()
        if (settings.value.autoConnect) {
            selectServer(fastestServer.value?.id || 'auto')
            connect()
        }
    })

    return {
        isConnected,
        isConnecting,
        currentServer,
        selectedServer,
        servers,
        recentServers,
        stats,
        connectionStartTime,
        connectionDuration,
        fastestServer,
        serversByRegion,
        lastError,
        settings,
        selectServer,
        connect,
        disconnect,
        setConnectionStatus,
        updateStats,
        refreshStats,
        updateSettings,
        setLastError
    }
})