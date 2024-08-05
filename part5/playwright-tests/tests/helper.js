import { title } from "process"

const loginWith = async (page, username, password)  => {

    await page.getByRole('textbox').first().fill(username)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

const createTestBlog = async (page) => {

    const textboxes = await page.getByRole('textbox').all()

    await textboxes[0].fill('Test Title')
    await textboxes[1].fill('Test Author')
    await textboxes[2].fill('no url')

    await page.getByRole('button', { name: 'Add new blog' }).click()
}
  
  export { loginWith, createTestBlog }