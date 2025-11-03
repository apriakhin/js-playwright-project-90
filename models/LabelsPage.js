import { fillByLabel  } from '../utils'

export default class LabelsPage {
  constructor(page) {
    this.page = page
  }

  async showLabels() {
    await this.page.getByRole('menuitem', { name: 'Labels' }).click()
  }

  async addLabel(label) {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await fillByLabel(this.page, 'Name', label.name)
    await this.page.getByRole('button', { name: 'Save' }).click()
    await this.showLabels()
  }

  async editLabel(oldLabel, newLabel) {
    await this.getLabel(oldLabel).click()
    await fillByLabel(this.page, 'Name', newLabel.name)
    await this.page.getByRole('button', { name: 'Save' }).click()
    await this.showLabels()
  }

  async removeLabel(label) {
    await this.getLabel(label).click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
    await this.showLabels()
  }

  async removeLabels(labels) {
    for (const label of labels) {
      await this.getLabel(label).getByLabel('Select this row').click()
    }

    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  getLabel(label) {
    return this.page.getByRole('row', { name: label.name })
  }
}
