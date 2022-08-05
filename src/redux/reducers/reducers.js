import {combineReducers} from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import authSlice, {authPersistConfig} from './authSlice'

const slices = combineReducers({
    auth: persistReducer(authPersistConfig,authSlice)
})

export default slices;