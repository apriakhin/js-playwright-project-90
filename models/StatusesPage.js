import { fillByLabel  } from '../utils'

export default class StatusesPage {
  constructor(page) {
    this.page = page
  }

  async showStatuses() {
    await this.page.getByRole('menuitem', { name: 'Task statuses' }).click()
  }

  async addStatus(status) {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await fillByLabel(this.page, 'Name', status.name)
    await fillByLabel(this.page, 'Slug', status.slug)
    await this.page.getByRole('button', { name: 'Save' }).click()
    await this.showStatuses()
  }

  async editStatus(oldStatus, newStatus) {
    await this.getStatus(oldStatus).click()
    await fillByLabel(this.page, 'Name', newStatus.name)
    await fillByLabel(this.page, 'Slug', newStatus.slug)
    await this.page.getByRole('button', { name: 'Save' }).click()
    await this.showStatuses()
  }

  async removeStatus(status) {
    await this.getStatus(status).click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
    await this.showStatuses()
  }

  async removeStatuses(statuses) {
    for (const status of statuses) {
      await this.getStatus(status).getByLabel('Select this row').click()
    }

    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  getStatus(status) {
    return this.page.getByRole('row', { name: `${status.name} ${status.slug}` })
  }
}
