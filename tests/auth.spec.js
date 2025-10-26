import { test, expect } from '@playwright/test'
import AuthPage from '../models/AuthPage'

let authPage

test.beforeEach(async ({ page }) => {
  authPage = new AuthPage(page)
  await authPage.goto()
})

test('sign in', async () => {
  await authPage.singIn()

await expect(authPage.getProfile()).toBeVisible()
})

test('sign out', async () => {
  await authPage.singIn()
  await authPage.signOut()

  await expect(authPage.getProfile()).not.toBeVisible()
})
