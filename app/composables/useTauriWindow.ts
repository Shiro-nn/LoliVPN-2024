import { getCurrentWindow } from '@tauri-apps/api/window'
import { computed } from 'vue'

export function useTauriWindow() {
    const isTauri = computed(() => typeof window.__TAURI__ !== 'undefined')

    const closeApp = async () => {
        if (!isTauri.value) return console.log('Simulating window close')
        const appWindow = getCurrentWindow();
        await appWindow.close()
    }

    const minimizeApp = async () => {
        if (!isTauri.value) return console.log('Simulating window minimize')
        const appWindow = getCurrentWindow();
        await appWindow.minimize()
    }

    const toggleMaximize = async () => {
        if (!isTauri.value) return console.log('Simulating window maximize')
        const appWindow = getCurrentWindow();
        if (await appWindow.isMaximized()) {
            await appWindow.unmaximize()
        } else {
            await appWindow.maximize()
        }
    }

    return { closeApp, minimizeApp, toggleMaximize }
}