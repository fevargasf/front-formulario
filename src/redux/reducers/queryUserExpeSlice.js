import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const queryUserExpeSlice = createSlice({
    name:"user",
    initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successQueryUser:(state, action)=>{
            state.data = action.payload;
            state.error = {
                message:''
            }

        }
    }
});

export const {successQueryUser} = queryUserExpeSlice.actions;

export const identifierActionsQuser = {
    FETCH_USER_EXPEDIENTE :'FETCH_USER_EXPEDIENTE'
}

export const userExpedientPersistConfig = {
    key:'user',
    storage:storage
}

export const dataUserEx = (state)=> state.user.data;

export default queryUserExpeSlice.reducer;

