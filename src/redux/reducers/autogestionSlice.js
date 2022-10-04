import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const autogestionSlice = createSlice({

    name:"queryOfAutogestion",
    initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successAutogestion:(state, action)=>{
            state.data = action.payload.lista_obligaciones;
            state.error= {
                message:''
            }
        }
    }
});

export const {successAutogestion} = autogestionSlice.actions;

export const identifierAutogestionAction ={
    FETCH_QUERY_AUTOGESTION: 'FETCH_QUERY_AUTOGESTION'
}

export const autogestionPersistConfig = {
    key:'queryOfAutogestion',
    storage:storage
}

export const dataAutogestion = (state)=> state.queryOfAutogestion.data;

export default autogestionSlice.reducer;