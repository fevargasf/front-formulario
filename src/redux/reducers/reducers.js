import {combineReducers} from "@reduxjs/toolkit"
import authSlice from './authSlice'

const slices = combineReducers({
    auth: authSlice
})

export default slices;