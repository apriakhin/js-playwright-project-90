import { test, expect } from '@playwright/test'

test('start', async ({ page }) => {
  await page.goto('')
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
})
