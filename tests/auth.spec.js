import { test, expect } from '@playwright/test'
import AuthPage from '../models/AuthPage'

test('sign in', async ({ page }) => {
  let authPage = new AuthPage(page)
  await authPage.goto()

  await authPage.singIn()

  await expect(authPage.isSignedIn()).toBeTruthy()
})

test('sign out', async ({ page }) => {
  let authPage = new AuthPage(page)
  await authPage.goto()

  await authPage.singIn()
  await authPage.signOut()

  await expect(await authPage.isSignedIn()).toBeFalsy()
})
