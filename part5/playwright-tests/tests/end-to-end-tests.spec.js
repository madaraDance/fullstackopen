const { test, expect, beforeEach, describe } = require('@playwright/test')
import { createTestBlog, loginWith } from './helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: 
        {
        name: 'Maksim Minenko',
        username: 'madaradance',
        password: 'password'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: 
      {
        name: 'Test Test',
        username: 'tester',
        password: 'password'
      }
    })


    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Please Login into Application')
    await expect(locator).toBeVisible()
  })

  test('user can login with right creds', async ({page}) => {

    await loginWith(page, 'madaradance', 'password')

    await expect(page.getByText('madaradance logged in')).toBeVisible()

  })

  test('user can not login with wrong creds', async ({page}) => {

    await page.getByRole('textbox').first().fill('madaradance')
    await page.getByRole('textbox').last().fill('wrongpassword')
    await page.getByRole('button', { name: 'login' }).click()

    await expect(page.getByText('Wrong username or password')).toBeVisible()

  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
  
      await page.getByRole('textbox').first().fill('madaradance')
      await page.getByRole('textbox').last().fill('password')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created and liked', async ({ page }) => {
      await expect(page.getByRole('button', { name: 'new blog' })).toBeVisible()
      await page.getByRole('button', { name: 'new blog' }).click()

      await expect(page.getByText('Author: ')).toBeVisible()
      
      await createTestBlog(page)

      //await expect(page.getByText('a new blog by Test Author added')).toBeVisible()
      await expect(page.getByText('Test Title Test Author')).toBeVisible()

      const blogEntryLocator = page.locator('div').filter({ hasText: /^Test Title Test AuthorShow$/ })
      
      await blogEntryLocator.getByRole('button').click()

      const likeButtonLocator = page.locator('div').filter({hasText: /^0like$/}).getByRole('button', { name: 'like' })

      await expect(page.locator('div').filter({hasText: /^0like$/}).getByRole('button', { name: 'like' })).toBeVisible()

      likeButtonLocator.click()

      await expect(page.locator('div').filter({hasText: /^1like$/}).getByRole('button', { name: 'like' })).toBeVisible()

    })

    test('a blog can be deleted', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await createTestBlog(page)

      await page.reload()

      const blogEntryLocator = page.locator('div').filter({ hasText: /^Test Title Test AuthorShow$/ })

      expect(blogEntryLocator).toBeVisible()
      
      await blogEntryLocator.getByRole('button').click()

      await page.locator('button', { hasText: 'Delete' }).click()
      
      await page.reload()

      expect(blogEntryLocator).not.toBeVisible()

    })

    test('users can only delete own blogs', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()

      await createTestBlog(page)

      await page.getByRole('button', { name: 'Log out' }).click()

      loginWith(page, 'tester', 'password')

      await expect(page.getByText('tester logged in')).toBeVisible()


      const blogEntryLocator = page.locator('div').filter({ hasText: /^Test Title Test AuthorShow$/ })

      await blogEntryLocator.getByRole('button').click()

      await expect(page.locator('button', { hasText: 'Delete' })).not.toBeVisible()

    })

  })

})


