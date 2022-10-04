import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const coordinateQuerySlice = createSlice({
    name:"coordinate",
    initialState:{
        data:[],
        error:{
            message:''
        }
    },
    reducers:{
        successCoordinate:(state, action)=>{
            state.data = action.payload;
            state.error = {
                message:''
            }
        }
    }
});

export const {successCoordinate} = coordinateQuerySlice.actions;

export const identifierCoordAction = {
    FETCH_QUERY_COORDINATE : "FETCH_QUERY_COORDINATE"
}

export const coordinateQueryPersistConfig = {
    key:"coordinate",
    storage:storage
}

export const dataCoordinate = (state)=> state.coordinate.data;

export default coordinateQuerySlice.reducer;