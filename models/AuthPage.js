import { fillByLabel  } from '../utils'

export default class AuthPage {
  constructor(page) {
    this.page = page
  }

  async goto() {
    await this.page.goto('')
  }

  async singIn() {
    await fillByLabel(this.page, 'Username', 'Username')
    await fillByLabel(this.page, 'Password', 'Password')
    await this.page.getByRole('button', { name: 'Sign in' }).click()
  }

  async signOut() {
    await this.page.getByRole('button', { name: 'Profile' }).click()
    await this.page.getByRole('menuitem', { name: 'Logout' }).click()
  }

  getProfile() {
    return this.page.getByRole('button', { name: 'Profile' })
  }
}