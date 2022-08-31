import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const seeRecordSlice = createSlice({
    name:"seeRecord",
    initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successSeeRecord:(state,action)=>{
            state.data = action.payload.lista_antecedentes;
            state.error= {
                message:''
            }
        }
    }
});

export const {successSeeRecord} = seeRecordSlice.actions;

export const identifierSeeAction ={
    FETCH_SEE_RECORD : 'FETCH_SEE_RECORD'
}
export const seeRecordPersistConfig ={
    key:'seeRecord',
    storage:storage
}

export const dataSeeRecord = (state) => state.seeRecord.data

export default seeRecordSlice.reducer;