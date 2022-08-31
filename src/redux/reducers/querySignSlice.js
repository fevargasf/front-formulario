import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const querySignSlice = createSlice({

     name:"queryOfSign",
     initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successQuery:(state, action)=>{
            state.data = action.payload;
            state.error= {
                message:''
            }
        }
    }
});

export const {successQuery} = querySignSlice.actions;

export const identifierQueryAction ={
    FETCH_QUERY_SIGN: 'FETCH_QUERY_SIGN'
}

export const querySignPersistConfig = {
    key:'queryOfSign',
    storage:storage
}

export const dataQuerySign = (state)=> state.queryOfSign.data;

export default querySignSlice.reducer;