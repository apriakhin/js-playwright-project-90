import { test, expect } from '@playwright/test'
import AuthPage from '../models/AuthPage'
import LabelsPage from '../models/LabelsPage'
import { newLabel, editedLabel, labels } from '../stubs/labels.stub'

let labelsPage

test.beforeEach(async ({ page }) => {
  const authPage = new AuthPage(page)
  await authPage.goto()
  await authPage.singIn()

  labelsPage = new LabelsPage(page)
  await labelsPage.showLabels()
})

test('add label', async () => {
  await labelsPage.addLabel(newLabel)

  await expect(labelsPage.getLabel(newLabel)).toBeVisible()
})

test('show labels', async () => {
  for (const label of labels) {
    await expect(labelsPage.getLabel(label)).toBeVisible()
  }
})

test('edit label', async () => {
  const oldLabel = labels[1]

  await labelsPage.editLabel(oldLabel, editedLabel)

  await expect(labelsPage.getLabel(oldLabel)).not.toBeVisible()
  await expect(labelsPage.getLabel(editedLabel)).toBeVisible()
})

test('remove label', async () => {
  const deletedLabel = labels[3]

  await labelsPage.removeLabel(deletedLabel)

  await expect(labelsPage.getLabel(deletedLabel)).not.toBeVisible()
})

test('remove labels', async () => {
  const deletedLabels = [labels[0], labels[2], labels[4]]

  await labelsPage.removeLabels(deletedLabels)

  for (const label of deletedLabels) {
    await expect(labelsPage.getLabel(label)).not.toBeVisible()
  }
})
