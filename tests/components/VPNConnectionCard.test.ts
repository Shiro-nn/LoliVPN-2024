import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VPNConnectionCard from '~/components/VPN/VPNConnectionCard.vue'

describe('VPNConnectionCard', () => {
    it('should render disconnected state', () => {
        const wrapper = mount(VPNConnectionCard, {
            props: {
                isConnected: false,
                currentServer: null,
                selectedServer: null
            }
        })
        expect(wrapper.text()).toContain('Disconnected')
        expect(wrapper.find('.status-circle').classes()).toContain('disconnected')
    })

    it('should render connected state', () => {
        const wrapper = mount(VPNConnectionCard, {
            props: {
                isConnected: true,
                currentServer: 'us-ny',
                selectedServer: 'us-ny'
            }
        })
        expect(wrapper.text()).toContain('Connected')
        expect(wrapper.find('.status-circle').classes()).toContain('connected')
    })

    it('should emit toggle-connection event', async () => {
        const wrapper = mount(VPNConnectionCard, {
            props: {
                isConnected: false,
                currentServer: null,
                selectedServer: 'us-ny'
            }
        })
        await wrapper.find('.quick-connect-btn').trigger('click')
        expect(wrapper.emitted('toggle-connection')).toBeTruthy()
    })

    it('should show correct button text', () => {
        const disconnectedWrapper = mount(VPNConnectionCard, {
            props: {
                isConnected: false,
                currentServer: null,
                selectedServer: null
            }
        })
        expect(disconnectedWrapper.find('.quick-connect-btn').text()).toBe('Quick Connect')

        const connectedWrapper = mount(VPNConnectionCard, {
            props: {
                isConnected: true,
                currentServer: 'us-ny',
                selectedServer: 'us-ny'
            }
        })
        expect(connectedWrapper.find('.quick-connect-btn').text()).toBe('Disconnect')
    })
})