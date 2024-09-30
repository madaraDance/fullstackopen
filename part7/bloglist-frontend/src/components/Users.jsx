import { useRef  } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/authReducer'
import { Link } from 'react-router-dom'

const Users = () => {
    const dispatch = useDispatch()

    const authUser = useSelector(state => {
        return state.auth
    })
    

    const users = useSelector(state => {
        return state.users
    })
    
    const createBlogRef = useRef()
    
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
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Blogs Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                        <tr key={index}>
                            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>


          </>
    )
}

export default Users