import {createSlice} from "@reduxjs/toolkit";

const reducer = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    }
})

export const setNotificationThunk = (message, time) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, time * 1000)
    }
}
export const { setNotification, clearNotification } = reducer.actions
export default reducer.reducer