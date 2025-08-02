import { test, expect } from '@playwright/test'

test.describe('VPN Connection Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('should display VPN interface', async ({ page }) => {
        await expect(page.locator('.app-container')).toBeVisible()
        await expect(page.locator('.sidebar')).toBeVisible()
        await expect(page.locator('.main-content')).toBeVisible()
    })

    test('should show connection card', async ({ page }) => {
        await expect(page.locator('.connection-card')).toBeVisible()
        await expect(page.locator('.status-text')).toContainText('Disconnected')
    })

    test('should display server list', async ({ page }) => {
        await expect(page.locator('.server-list')).toBeVisible()
        await expect(page.locator('.server-item')).toHaveCount(12)
    })

    test('should select a server', async ({ page }) => {
        const serverItem = page.locator('.server-item').first()
        await serverItem.click()
        await expect(serverItem).toHaveClass(/active/)
    })

    test('should show quick connect actions when disconnected', async ({ page }) => {
        await expect(page.locator('.quick-actions')).toBeVisible()
        await expect(page.locator('.quick-action-card')).toHaveCount(4)
    })

    test('should connect to VPN', async ({ page }) => {
        await page.locator('.server-item[data-server="us-ny"]').click()
        await page.locator('.quick-connect-btn').click()
        await expect(page.locator('.status-text')).toContainText('Connected', { timeout: 10000 })
        await expect(page.locator('.connection-card')).toHaveClass(/connected/)
    })

    test('should show connection info when connected', async ({ page }) => {
        await page.evaluate(() => {
            window.mockConnectedState = true
        })
        await page.reload()
        await expect(page.locator('.connection-info')).toBeVisible()
    })

    test('should open settings modal', async ({ page }) => {
        await page.locator('#settingsBtn').click()
        await expect(page.locator('.modal-overlay')).toBeVisible()
        await expect(page.locator('.modal-title')).toContainText('Settings')
    })

    test('should search servers', async ({ page }) => {
        const searchInput = page.locator('#serverSearch')
        await searchInput.fill('New York')
        const visibleServers = page.locator('.server-item:visible')
        await expect(visibleServers).toHaveCount(1)
        await expect(visibleServers.first()).toContainText('New York')
    })

    test('should handle keyboard shortcuts', async ({ page }) => {
        await page.locator('.server-item').first().click()
        await page.keyboard.press('Control+Enter')
        await expect(page.locator('.loading-overlay')).toBeVisible()
    })
})