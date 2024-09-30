import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'
import CreateBlog from './CreateBlog'

const blog = {
    title: 'TestTitle',
    author: 'Tester',
    url: 'testurl/',
    likes: 0,
    user: {
        id: 'testuser',
        name: 'Test User',
        token: 'testtoken',
    },
}

test('render content', () => {

    render(<Blog blog={blog}/>)

    const author = screen.getByText('Tester')
    expect(author).toBeDefined()

    const title = screen.getByText(/TestTitle/)
    expect(title).toBeDefined()

    let hiddenDiv = screen.getByText('testurl/').parentElement
    expect(hiddenDiv).toHaveStyle('display: none')

    hiddenDiv = screen.getByText(0).parentElement.parentElement
    expect(hiddenDiv).toHaveStyle('display: none')

})

test('check likes and url are visible after user clicks show', async () => {

    render(<Blog blog={blog} />)

    const btn = screen.getByText('Show')
    expect(btn).toBeDefined()

    const user = userEvent.setup()
    await user.click(btn)

    let hiddenDiv = screen.getByText('testurl/').parentElement
    expect(hiddenDiv).toHaveStyle('display: block')

    hiddenDiv = screen.getByText(0).parentElement.parentElement
    expect(hiddenDiv).toHaveStyle('display: block')
})

test('check that like button was cliked twice', async () => {

    const mockSetBlogs = vi.fn()
    const mockUpdateBlog = vi.fn().mockResolvedValue({
        ...blog,
        likes: blog.likes + 1,
    })

    blogService.updateBlog = mockUpdateBlog
    const user = userEvent.setup()

    render(<Blog blog={blog} user={blog.user} setBlogs={mockSetBlogs} />)

    const showButton = screen.getByText('Show')
    await user.click(showButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateBlog).toHaveBeenCalledTimes(2)
})

test('check that like button was cliked twice', async () => {
    const mockSetBlogs = vi.fn()
    const mockSetNotif = vi.fn()
    const mockAddNewBlog = vi.fn().mockResolvedValue({
        title: 'New Blog Title',
        author: 'New Blog Author',
        url: 'https://newblog.com',
    })

    blogService.addNewBlog = mockAddNewBlog

    render(
        <CreateBlog
            token="test-token"
            blogs={[]}
            setBlogs={mockSetBlogs}
            setNotif={mockSetNotif}
        />
    )

    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('Title')
    const authorInput = screen.getByPlaceholderText('Author')
    const urlInput = screen.getByPlaceholderText('URL')
    const submitButton = screen.getByText('Add new Blog')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'someurl/')

    await user.click(submitButton)

    expect(mockAddNewBlog).toHaveBeenCalledWith('test-token', {
        title: 'Test Title',
        author: 'Test Author',
        url: 'someurl/',
    })

    expect(mockSetBlogs).toHaveBeenCalled()
    expect(mockSetNotif).toHaveBeenCalledWith(1)
})

