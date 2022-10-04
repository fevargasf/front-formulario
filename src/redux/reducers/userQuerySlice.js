import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const userQuerySlice = createSlice({
    name:"userExpediente",
    initialState:{
        data:[],
        error:{
            message:""
        }
    },
    reducers:{
        successUser:(state, action)=>{
            state.data = action.payload;
            state.error = {
                message:""
            }
        }
    }
 });

 export const {successUser} = userQuerySlice.actions;

 export const identifierActionsUser ={
    FETCH_USER_IT :'FETCH_USER_IT'
  }

  export const userPersistConfig = {
      key:'userExpediente',
      storage: storage
  }

  export const dataUserQuery =(state)=> state.userExpediente.data;
  export default userQuerySlice.reducer;