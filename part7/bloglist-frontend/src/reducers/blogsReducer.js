import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
      changeVote(state, action) {
        const id = action.payload.id
        return state.map(blog =>
          blog.id === id
            ? { ...blog, likes: action.payload.likes }
            : blog
        )
      },
      appendBlog(state, action) {
        state.push(action.payload)
      },
      setBlog(state, action) {
        return action.payload
      },
      deleteBlog(state, action){
        return state.filter((blog) => blog.id !== action.payload.id)
      }
    }
  })

  export const {changeVote, appendBlog, setBlog, deleteBlog } = blogSlice.actions

  export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        dispatch(setBlog(blogs))
    }
  }

  export const addNewBlog = blog => {
    return async dispatch => {
      const newBlog = await blogService.addNewBlog(blog)
      dispatch(appendBlog(newBlog))
    }
  }

  export const likeBlog = blog => {
    return async dispatch => {
      const blogToUpdate = { ...blog, likes: blog.likes + 1 }
      const updatedBlog = await blogService.updateBlog(blogToUpdate)
      dispatch(changeVote({ id: updatedBlog.id, likes: updatedBlog.likes }))
    }
  }

  export const blogToDeleteCall = id => {
    return async dispatch => {
      await blogService.deleteBlog(id)
      dispatch(deleteBlog({id}))
    }
  }


export default blogSlice.reducer


  