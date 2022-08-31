import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        viip: null,
        usuario: '',
        isLogged: false,
        voerror:null,
        error: {
            message:''
        }
    },
    reducers: {
        successLogin:(state, action)=> {
            
                state.token = action.payload.token;
                state.viip = action.payload.viip;
                state.usuario = action.payload.usuario;
                state.isLogged = true;
                state.voerror = null;
            
           
        },
        failureLogin: (state, action) => {
            state.token = null
            state.viip = null
            state.usuario = null
            state.isLogged = false;
            state.voerror = action.payload.voerror;
        
        },
        logout: (state) => {
            state.token = null
            state.viip = null
            state.usuario = null
            state.isLogged = false
            state.voerror = null
        }
    }
})


export const { successLogin, failureLogin, logout } = authSlice.actions

export const identifierActions = {
    FETCH_LOGIN: 'FETCH_LOGIN'
}

export const authPersistConfig = {
    key:'auth',
    storage: storage,
}

export const dataLogin = (state) => state.auth

export default authSlice.reducer