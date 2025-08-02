import { invoke } from '@tauri-apps/api/core'
import { listen } from '@tauri-apps/api/event'
import { ref, onUnmounted } from 'vue'
import { useVPNStore } from '~/stores/vpn'

export function useTauri() {
    const store = useVPNStore()
    const isTauri = computed(() => typeof window.__TAURI__ !== 'undefined')

    const setupEventListeners = async () => {
        if (!isTauri.value) return

        await listen('vpn-status', (event: any) => {
            store.setConnectionStatus(event.payload.connected)
            if (event.payload.error) {
                store.setLastError(event.payload.error)
            }
        })

        await listen('vpn-stats', (event: any) => {
            store.updateStats({
                downloadSpeed: event.payload.download_speed,
                uploadSpeed: event.payload.upload_speed,
                bytesDownloaded: event.payload.bytes_downloaded,
                bytesUploaded: event.payload.bytes_uploaded
            })
        })
    }

    const connectVPN = async (serverId: string) => {
        if (!isTauri.value) {
            console.log('Simulating VPN connection:', serverId)
            return
        }
        try {
            await invoke('connect_vpn', { serverId })
        } catch (error) {
            store.setLastError(String(error))
        }
    }

    const disconnectVPN = async () => {
        if (!isTauri.value) {
            console.log('Simulating VPN disconnection')
            return
        }
        try {
            await invoke('disconnect_vpn')
        } catch (error) {
            store.setLastError(String(error))
        }
    }

    const getServerList = async () => {
        if (!isTauri.value) {
            return {
                'us-ny': { name: 'New York', flag: '🇺🇸', ping: '45ms', load: 'low', x: 20, y: 30, premium: false, region: 'americas' },
                'uk-lon': { name: 'London', flag: '🇬🇧', ping: '72ms', load: 'medium', x: 40, y: 20, premium: true, region: 'europe' },
                'jp-tky': { name: 'Tokyo', flag: '🇯🇵', ping: '120ms', load: 'high', x: 80, y: 35, premium: false, region: 'asia' },
                'auto': { name: 'Auto', flag: '🌍', ping: '0ms', load: 'low', x: 0, y: 0, premium: false, region: 'global' }
            }
        }
        try {
            return await invoke('get_servers')
        } catch (error) {
            store.setLastError(String(error))
            return {}
        }
    }

    return { isTauri, setupEventListeners, connectVPN, disconnectVPN, getServerList }
}