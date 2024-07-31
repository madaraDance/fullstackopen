/* eslint-disable linebreak-style */
import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Blogs from './components/Blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({ username: '', name: '', password: '', token: '', id: '' })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (JSON.parse(loggedUserJSON)) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    if (user.token) {
      blogService.getAll(user.token).then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      }
      )
    }
  }, [user.token])

  return (
    <div>
      {user.token === '' ? (
        <Login user={user} setUser={setUser} />
      ) : (
        <Blogs user={user} setUser={setUser} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App