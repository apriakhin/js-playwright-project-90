import { fillByLabel  } from '../utils'

export default class UsersPage {
  constructor(page) {
    this.page = page
  }

  async showUsers() {
    await this.page.getByRole('menuitem', { name: 'Users' }).click()
  }

  async addUser(user) {
    await this.page.getByRole('link', { name: 'Create' }).click()
    await fillByLabel(this.page, 'Email', user.email)
    await fillByLabel(this.page, 'First name', user.firstName)
    await fillByLabel(this.page, 'Last name', user.lastName)
    await this.page.getByRole('button', { name: 'Save' }).click()
    await this.showUsers()
  }

  async editUser(oldUser, newUser) {
    await this.getUser(oldUser).click()
    await fillByLabel(this.page, 'Email', newUser.email)
    await fillByLabel(this.page, 'First name', newUser.firstName)
    await fillByLabel(this.page, 'Last name', newUser.lastName)
    await this.page.getByRole('button', { name: 'Save' }).click()
    await this.showUsers()
  }

  async removeUser(user) {
    await this.getUser(user).click()
    await this.page.getByRole('button', { name: 'Delete' }).click()
    await this.showUsers()
  }

  async removeUsers(users) {
    for (const user of users) {
      await this.getUser(user).getByLabel('Select this row').click()
    }

    await this.page.getByRole('button', { name: 'Delete' }).click()
  }

  getUser(user) {
    return this.page.getByRole('row', { name: `${user.email} ${user.firstName} ${user.lastName}` })
  }
}
