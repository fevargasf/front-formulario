import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";


const deleteRecordSlice = createSlice({
    name:"deleteRecord",
    initialState:{
        data:{},
        error: {
            message:''
        }
    },
    reducers:{
        successDelete:(state, action)=>{
            state.data= action.payload;
            state.error = {
                message:''
            }  
        }
    }
});

export const {successDelete} = deleteRecordSlice.actions;

export const identifierDeleteRecordActions = {
    FETCH_DELETE_RECORD : 'FETCH_DELETE_RECORD'
}

export const deleteRecordPersistConfig  = {
    key:'deleteRecord',
    storage:storage
}

export const dataDeleteRecord = (state)=> state.deleteRecord.data;

export default deleteRecordSlice.reducer