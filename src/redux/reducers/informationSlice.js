import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const informationSlice = createSlice({

    name:"information",
    initialState:{
        data:{},
        error: {
            message:''
        }
    },
    reducers:{
        successInformation:(state, action)=>{
            state.data= action.payload;
            state.error = {
                message:''
            }
        }
       
    }
})

export const {successInformation} = informationSlice.actions;

export const identifierActions = {
    FETCH_INFORMATION :'FETCH_INFORMATION'
}

export const informationPersistConfig = { 
    key:'information',
    storage:storage,
   // blackList:['data']
}

export const dataInformation =(state)=> state.information.data;

export default informationSlice.reducer;