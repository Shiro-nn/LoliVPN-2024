import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'

beforeEach(() => {
    const pinia = createPinia()
    config.global.plugins = [pinia]
})

vi.mock('@tauri-apps/api/tauri', () => ({
    invoke: vi.fn()
}))

vi.mock('@tauri-apps/api/window', () => ({
    appWindow: {
        close: vi.fn(),
        minimize: vi.fn(),
        maximize: vi.fn(),
        unmaximize: vi.fn(),
        isMaximized: vi.fn().mockResolvedValue(false),
        hide: vi.fn(),
        show: vi.fn()
    }
}))

vi.mock('@tauri-apps/api/event', () => ({
    listen: vi.fn()
}))