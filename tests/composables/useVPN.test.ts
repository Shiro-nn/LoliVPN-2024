import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useVPN } from '~/composables/useVPN'

describe('useVPN', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('should initialize with disconnected state', () => {
        const { isConnected, currentServer } = useVPN()
        expect(isConnected.value).toBe(false)
        expect(currentServer.value).toBe(null)
    })

    it('should select a server', () => {
        const { selectServer, selectedServer } = useVPN()
        selectServer('us-ny')
        expect(selectedServer.value).toBe('us-ny')
    })

    it('should connect to VPN', async () => {
        const { connect, selectServer, isConnected, currentServer } = useVPN()
        selectServer('us-ny')
        await connect()
        expect(isConnected.value).toBe(true)
        expect(currentServer.value).toBe('us-ny')
    })

    it('should disconnect from VPN', async () => {
        const { connect, disconnect, selectServer, isConnected, currentServer } = useVPN()
        selectServer('us-ny')
        await connect()
        await disconnect()
        expect(isConnected.value).toBe(false)
        expect(currentServer.value).toBe(null)
    })

    it('should toggle connection', async () => {
        const { toggleConnection, selectServer, isConnected } = useVPN()
        selectServer('us-ny')
        await toggleConnection()
        expect(isConnected.value).toBe(true)
        await toggleConnection()
        expect(isConnected.value).toBe(false)
    })
})