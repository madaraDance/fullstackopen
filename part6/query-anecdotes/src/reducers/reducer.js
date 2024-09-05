import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
        hideNotification() {
            return '';  // No need to take action as parameter since it always returns an empty string
        }
    }
});

let timeoutId;

export const setNotification = (text, timeout) => {
    return dispatch => {
        dispatch(showNotification(text));
        
        if (timeoutId) {
            clearTimeout(timeoutId);  // Clear the previous timeout if exists
        }
        
        timeoutId = setTimeout(() => {
            dispatch(hideNotification());
        }, timeout * 1000);
    };
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
