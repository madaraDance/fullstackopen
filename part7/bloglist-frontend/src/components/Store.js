import { configureStore } from '@reduxjs/toolkit'
import blogReducer  from '../reducers/blogsReducer'
import authReducer from '../reducers/authReducer'
import notificationReducer from '../reducers/notificationReducer'
import userReducer from '../reducers/userReducer'

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        auth: authReducer,
        notifications: notificationReducer,
        users: userReducer
    }
})



store.subscribe(()=>{console.log(store.getState())}) 

export default store