import {createSlice} from "@reduxjs/toolkit";

const reducer = createSlice({
    name: "filter",
    initialState: '',
    reducers: {
        setFilter: (state, action) => action.payload
    },
})

export const {setFilter} = reducer.actions
export default reducer.reducer