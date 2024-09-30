/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import Login from './components/Login'
import User from './components/User'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/authReducer'
import { initializeAllUsers } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const authUser = useSelector( state => state.auth)
  const padding = {
    padding: 5,
    border: 'solid 1px'
  }

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeAllUsers())
  }, [dispatch])

  return (
    <Router>
      <div style={{display: 'flex', justifyContent: "space-around", width: '6%'}}>
        <Link to="/blogs" style={padding}>blogs</Link>
        <Link to="/users" style={padding}>users</Link>
      </div>
      <Routes>
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />    
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  )
  
}


export default App