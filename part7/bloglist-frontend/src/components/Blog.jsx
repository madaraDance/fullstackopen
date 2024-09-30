/* eslint-disable linebreak-style */
import { useState } from 'react'
import './Blog.css'
import { useSelector, useDispatch } from 'react-redux'
import { blogToDeleteCall, likeBlog } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'




const Blog = () => {
  const dispatch = useDispatch()
  const authUser = useSelector( state => state.auth)
  const blogs = useSelector( state => state.blogs)
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)
  if (!blog) {
    return null
  }
  /*const [visibility, setVisibility] = useState(false)

  let controlDisplay = { display: visibility ? '' : 'none' }*/
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'flex',
    flexDirection: 'column'
  }

  const handleDelete = () => {
    if(!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      return null
    }
    dispatch(blogToDeleteCall(blog.id))
  }


  return (
    <>
    <h1 style={{margin: 0, padding: 0}}>Blogs</h1>
    <div style={{display: 'flex', alignItems: 'center'}}>
        <h2>{authUser?.username} logged in</h2>
        <button
            style={{marginLeft: 5}}
            onClick={() => {
                dispatch(logout())
                }
        }>Log out</button>
    </div>

    <div style={blogStyle}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 5, paddingTop: 5, paddingBottom: 5,alignItems: 'center' }}>
        
        
      </div>
      <div id={blog.title} /*style={controlDisplay}*/>
        <p>{blog.url}</p>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <p>{blog.likes}</p>
          <button onClick={() => dispatch(likeBlog(blog))}>like</button> 
        </div>
        <p>{blog.author}</p>
        {blog.user.id === authUser.id ? (
                  <button
                  onClick={handleDelete}
                  style={{ marginTop: 5, marginBottom:5 }}
                >Delete</button>
        ): null}

      </div>

    </div>
    </> 
  )
}

export default Blog