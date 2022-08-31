import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";


const saveSignSlice = createSlice({

    name:"saveSign",
    initialState:{
        data:{},
        error: {
            message:''
        }
    },
    reducers:{
        successSaveSign:(state,action)=>{
            state.data= action.payload;
            state.error = {
                message:''
            }
        }
    }
});

export const {successSaveSign} = saveSignSlice.actions;

export const identifierSaveSignActions ={
    FETCH_SAVE_SIGN:'FETCH_SAVE_SIGN'
}
export const saveSignPersistConfig ={
    key:'saveSign',
    storage:storage
}

export const dataSaveSign =(state)=>state.saveSign.data;

export default saveSignSlice.reducer