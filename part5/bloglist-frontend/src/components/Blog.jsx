/* eslint-disable linebreak-style */
import { useState } from 'react'
import blogService from '../services/blogs'
import './Blog.css'



const Blog = ({ blog, user, setBlogs }) => {

  const [visibility, setVisibility] = useState(false)

  let controlDisplay = { display: visibility ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column'
  }

  const handleDelete = async () => {
    if(!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      return null
    }
    const BlogToDeleteId = blog.id
    const response = await blogService.deleteBlog(BlogToDeleteId, user.token)

    if (!response) {
      console.log('unable to delete')
      return null
    }

    setBlogs((prev) => prev.filter((blog) => blog.id !== BlogToDeleteId))

  }

  const handleLikeUpdate = async () => {

    const blogToUpdate = {
      likes: blog.likes += 1,
      id: blog.id,
      userId: user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url
    }

    const updatedBlog = await blogService.updateBlog(blogToUpdate, user.token)

    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)).sort((a, b) => b.likes - a.likes))

  }

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5, paddingTop: 5, paddingBottom: 5,alignItems: 'center' }}>
        {blog.title}
        {blog.author}
        <button onClick={() => setVisibility(!visibility)}>{visibility ? 'Hide' : 'Show'}</button>
      </div>
      <div style={controlDisplay}>
        <p>{blog.url}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <p>{blog.likes}</p>
          <button onClick={handleLikeUpdate}>like</button>
        </div>
        <p>{blog.author}</p>
        <button
          onClick={handleDelete}
          style={{ marginTop: 5, marginBottom:5 }}

        >Delete</button>
      </div>

    </div>
  )
}

export default Blog