import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const ActsExpSlice = createSlice({

    name:'acts',
    initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successActs: (state, action)=>{
            state.data = action.payload.lista_actos;
            state.error = {
                message:''
            }
        }
    }
});

export const {successActs} = ActsExpSlice.actions;

export const identifierActionsActs =  {FETCH_ACTS :'FETCH_ACTS'}

export const actsPersistConfig = {
    key:'acts',
    storage:storage
}

export const actsData = (state)=> state.acts.data;

export default ActsExpSlice.reducer;