import { useState } from 'react'
import LoginService from '../services/login'
import './Login.css'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'

const Login = ({user, setUser}) => {

    const [notif, setNotif] = useState(0)

    const handleChange = (event) => {
        setUser((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        const loggedInUser = await LoginService.loginUser({username: user.username, password: user.password})
        if (loggedInUser) {
            setUser((prev) => ({
                ...prev,
                token: loggedInUser.token,
                name: loggedInUser.name,
                password: '',
                id: loggedInUser.id,
            }))
            window.localStorage.setItem(
                'loggedUser', JSON.stringify(loggedInUser)
              ) 
            setNotif(1)
        } else {
            setNotif(2)
        }

        setTimeout(() => {
            setNotif(0)
        }, 2000)
        
    }
    
    return (
        <>
            <h1>Please Login into Application</h1>
            { notif === 1 ? (
                <Notification message={`Welcome ${user.username}!`} />
            ) : notif === 2 ? (
                <ErrorNotification errorMessage={'Wrong username or password'} />
            ) : null}
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Enter Username" 
                    onChange={handleChange}
                    className="input-field"
                /> <br/>
                <input 
                    type="text" 
                    name="password" 
                    placeholder="Enter Password" 
                    onChange={handleChange}
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