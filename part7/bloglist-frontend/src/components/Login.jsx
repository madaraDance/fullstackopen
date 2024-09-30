import './Login.css'
import { login } from '../reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    const handleLogin = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        event.target.username.value = ''
        event.target.password.value = ''
        dispatch(login(username, password))
    }
    
    return (
        <>
            <h1>Please Login into Application</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter Username" 
                    className="input-field"
                /> <br/>
                <input 
                    type="text" 
                    name="password" 
                    placeholder="Enter Password" 
                    className="input-field"
                /> <br/>
                <button 
                    type="submit"
                    className="button"
                >Login</button>
            </form>
        </>
    )
}

export default Login