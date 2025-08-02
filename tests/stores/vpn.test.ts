import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useVPNStore } from '~/stores/vpn'

describe('VPN Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should initialize with default state', () => {
        const store = useVPNStore()
        expect(store.isConnected).toBe(false)
        expect(store.currentServer).toBe(null)
        expect(store.stats.downloadSpeed).toBe(0)
        expect(store.stats.uploadSpeed).toBe(0)
    })

    it('should select a server', () => {
        const store = useVPNStore()
        store.selectServer('us-ny')
        expect(store.selectedServer).toBe('us-ny')
    })

    it('should connect to VPN', async () => {
    ⎯    const store = useVPNStore()
        store.selectServer('us-ny')
        await store.connect()
        expect(store.isConnected).toBe(true)
        expect(store.currentServer).toBe('us-ny')
        expect(store.connectionStartTime).toBeTruthy()
    })

    it('should update settings', () => {
        const store = useVPNStore()
        store.updateSettings({ killSwitch: false })
        expect(store.settings.killSwitch).toBe(false)
    })

    it('should calculate connection duration', () => {
        const store = useVPNStore()
        const startTime = Date.now() - 5000
        store.connectionStartTime = startTime
        expect(store.connectionDuration).toBeGreaterThan(4000)
        expect(store.connectionDuration).toBeLessThan(6000)
    })

    it('should group servers by region', () => {
        const store = useVPNStore()
        const grouped = store.serversByRegion
        expect(grouped.americas).toBeDefined()
        expect(grouped.europe).toBeDefined()
        expect(grouped.asia).toBeDefined()
        expect(grouped.americas.length).toBeGreaterThan(0)
    })
})