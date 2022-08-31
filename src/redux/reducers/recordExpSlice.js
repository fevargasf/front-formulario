import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const recordExpSlice = createSlice({
    name:"record",
    initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successRecord:(state, action)=>{
            state.data= action.payload.lista_antecedentes;
            state.error= {
                message:''
            }
        }
    }
});

export const {successRecord} = recordExpSlice.actions;

export const identifierActions = {
    FETCH_RECORD:'FETCH_RECORD'
}

export const recordPersistConfig = {
    key:'record',
    storage: storage,
}

export const dataRecord = (state) => state.record.data
export default recordExpSlice.reducer;