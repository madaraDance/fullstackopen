import { useRef  } from 'react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Toggalable'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const dispatch = useDispatch()

    const authUser = useSelector(state => {
        return state.auth
    })
    

    const blogs = useSelector(state => {
        return state.blogs
    })
    
    const createBlogRef = useRef()
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'column'
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

            <Togglable buttonShowLabel='New Blog' buttonHideLabel='cancel'ref={createBlogRef}>
                <CreateBlog token={authUser?.token} blogs={blogs} />
            </Togglable>

            <div style={{marginTop: 30}}>
                {blogs.map((blog, index) => (
                    <div key={index} style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                    </div>

                ))}
            </div>

          </>
    )
}

export default Blogs