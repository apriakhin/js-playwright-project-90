import { test, expect } from '@playwright/test'
import AuthPage from '../models/AuthPage'
import UsersPage from '../models/UsersPage'
import { newUser, editedUser, users } from '../stubs/users.stub'

let usersPage

test.beforeEach(async ({ page }) => {
  const authPage = new AuthPage(page)
  await authPage.goto()
  await authPage.singIn()

  usersPage = new UsersPage(page)
  await usersPage.showUsers()
})

test('add user', async () => {
  await usersPage.addUser(newUser)

  await expect(usersPage.getUser(newUser)).toBeVisible()
})

test('show users', async () => {
  for (const user of users) {
    await expect(usersPage.getUser(user)).toBeVisible()
  }
})

test('edit user', async () => {
  const oldUser = users[2]

  await usersPage.editUser(oldUser, editedUser)

  await expect(usersPage.getUser(users[2])).not.toBeVisible()
  await expect(usersPage.getUser(editedUser)).toBeVisible()
})

test('remove user', async () => {
  const deletedUser = users[5]

  await usersPage.removeUser(deletedUser)

  await expect(usersPage.getUser(deletedUser)).not.toBeVisible()
})

test('remove users', async () => {
  const deletedUsers = [users[2], users[5], users[7]]

  await usersPage.removeUsers(deletedUsers)

  for (const user of deletedUsers) {
    await expect(usersPage.getUser(user)).not.toBeVisible()
  }
})
