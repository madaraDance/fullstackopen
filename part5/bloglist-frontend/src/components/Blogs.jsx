import { useState, useRef  } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'
import Togglable from './Toggalable'

const Blogs = ({user, setUser, blogs, setBlogs}) => {
    const [notif, setNotif] = useState(0)
    const createBlogRef = useRef()
    
    return (
        <>  
            { 
                notif === 1 ? (
                    <Notification blog={blogs[blogs.length - 1]} message={null}/>
                ) : notif === 2 ? ( 
                    <ErrorNotification errorMessage={'An error occured. New blog was not added'} /> 
                ) : null
            }
            <h1 style={{margin: 0, padding: 0}}>Blogs</h1>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2>{user.username} logged in</h2>
                <button
                    style={{marginLeft: 5}}
                    onClick={() => {
                        window.localStorage.removeItem('loggedUser')
                        setUser({username: '', name: '', password: '', token: ''})
                        setBlogs([])
                        }
                }>Log out</button>
            </div>

            <Togglable buttonShowLabel='New Blog' buttonHideLabel='cancel'ref={createBlogRef}>
                <CreateBlog token={user.token} blogs={blogs} setBlogs={setBlogs} setNotif={setNotif} />
            </Togglable>

            <div style={{marginTop: 30}}>
                {blogs.map((blog, index) => (
                    <Blog key={index} blog={blog} user={user} setBlogs={setBlogs} />
                ))}
            </div>

          </>
    )
}

export default Blogs