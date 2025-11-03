import { test, expect } from '@playwright/test'
import AuthPage from '../models/AuthPage'
import StatusesPage from '../models/StatusesPage'
import { newStatus, editedStatus, statuses } from '../stubs/statuses.stub'

let statusesPage

test.beforeEach(async ({ page }) => {
  const authPage = new AuthPage(page)
  await authPage.goto()
  await authPage.singIn()

  statusesPage = new StatusesPage(page)
  await statusesPage.showStatuses()
})

test('add status', async () => {
  await statusesPage.addStatus(newStatus)

  await expect(statusesPage.getStatus(newStatus)).toBeVisible()
})

test('show statuses', async () => {
  for (const status of statuses) {
    await expect(statusesPage.getStatus(status)).toBeVisible()
  }
})

test('edit status', async () => {
  const oldStatus = statuses[1]

  await statusesPage.editStatus(oldStatus, editedStatus)

  await expect(statusesPage.getStatus(oldStatus)).not.toBeVisible()
  await expect(statusesPage.getStatus(editedStatus)).toBeVisible()
})

test('remove status', async () => {
  const deletedStatus = statuses[3]

  await statusesPage.removeStatus(deletedStatus)

  await expect(statusesPage.getStatus(deletedStatus)).not.toBeVisible()
})

test('remove statuses', async () => {
  const deletedStatuses = [statuses[0], statuses[2], statuses[4]]

  await statusesPage.removeStatuses(deletedStatuses)

  for (const status of deletedStatuses) {
    await expect(statusesPage.getStatus(status)).not.toBeVisible()
  }
})
