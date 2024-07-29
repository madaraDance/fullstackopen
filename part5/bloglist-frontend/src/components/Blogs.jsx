import { useState } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'

const Blogs = ({user, setUser, blogs, setBlogs}) => {
    const [notif, setNotif] = useState(0)
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
                        }
                }>Log out</button>
            </div>

            <CreateBlog token={user.token} blogs={blogs} setBlogs={setBlogs} setNotif={setNotif} />

            <div style={{marginTop: 30}}>
                {blogs.map((blog, index) => (
                    <Blog key={index} blog={blog} />
                ))}
            </div>

          </>
    )
}

export default Blogs