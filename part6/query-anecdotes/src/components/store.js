import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../reducers/reducer'


const store = configureStore({
    reducer: {
        notifications: notificationReducer
    }
})



store.subscribe(()=>{console.log(store.getState())}) 

export default store