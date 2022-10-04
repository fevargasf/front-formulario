import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const saveObligSlice = createSlice({

    name:"saveObligation",
    initialState:{
        data:{},
        error:{
            message:''
        }
    },
    reducers:{
        successObligation:(state,action)=>{
            state.data = action.payload;
            state.error={
                message:''
            }
        }
    }
});

export const {successObligation} = saveObligSlice.actions;

export const identifierObliActions = {
    FETCH_SAVE_OBLIGA:'FETCH_SAVE_OBLIGA'
}

export const obligaPersistConfig = {
    key:'saveObligation',
    storage:storage
}

export const dataObligaSave = (state)=> state.saveObligation.data;

export default saveObligSlice.reducer;