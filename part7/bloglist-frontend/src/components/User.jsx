import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import {
    useParams
  } from 'react-router-dom'

const User = () => {
    const dispatch = useDispatch()
    const id = useParams().id

    const authUser = useSelector(state => {
        return state.auth
    })

    const users = useSelector(state => {
        return state.users
    })


    const user = users.find(user => user.id === id)

    if (!user) {
        return null
      }

    return (
        <>  
            <h1 style={{margin: 0, padding: 0}}>blogs</h1>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h2>{authUser?.username} logged in</h2>
                <button
                    style={{marginLeft: 5}}
                    onClick={() => {
                        dispatch(logout())
                        }
                }>Log out</button>
            </div>
            <h2>{user.username}</h2>
            <h3>Added Blogs</h3>
                {user.blogs.map((blog, index) => (
                    <li key={index}>
                        {blog.title}
                    </li>
                ))}

          </>
    )
}

export default User