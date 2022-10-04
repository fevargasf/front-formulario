import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";


const saveRecordSlice =createSlice({

    name:"saveRecord",
    initialState:{
        data:{},
        error: {
            message:''
        }
    },
    reducers:{
        successSave:(state,action)=>{
            state.data= action.payload;
            state.error = {
                message:''
            }
        },
        failureRecord: (state, action) => {
            state.niSecEEta = null
            state.niSecDoc = null
            state.viIdUsuario = ''
        }
    }
})


export const {successSave,failureRecord}=saveRecordSlice.actions;

export const identifierSaveRecordActions ={
    FETCH_SAVE_RECORD:'FETCH_SAVE_RECORD'
}
export const saveRecordPersistConfig ={
    key:'saveRecord',
    storage:storage
}

export const dataSaveRecord =(state)=>state.saveRecord.data;

export default saveRecordSlice.reducer;