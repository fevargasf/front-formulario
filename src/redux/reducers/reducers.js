import {combineReducers} from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import asignacionSlice, { asignacionPersistConfig } from "./asignacionSlice";
import authSlice, {authPersistConfig} from './authSlice'
import deleteRecordSlice, { deleteRecordPersistConfig } from "./deleteRecordSlice";
import informationSlice, { informationPersistConfig } from "./informationSlice";
import querySignSlice, {  querySignPersistConfig } from "./querySignSlice";
import recordExpSlice, { recordPersistConfig } from "./recordExpSlice";
import saveRecordSlice, { saveRecordPersistConfig } from "./saveRecordSlice";
import seeRecordSlice, { seeRecordPersistConfig } from "./seeRecordSlice";
import signSaveSlice, { saveSignPersistConfig } from "./signSaveSlice";

const slices = combineReducers({
    auth: persistReducer(authPersistConfig,authSlice),
    asignacion: persistReducer(asignacionPersistConfig, asignacionSlice),
    record: persistReducer(recordPersistConfig, recordExpSlice),
    information: persistReducer(informationPersistConfig, informationSlice),
    saveinformation: persistReducer(saveRecordPersistConfig, saveRecordSlice),
    seeRecord:persistReducer(seeRecordPersistConfig,  seeRecordSlice),
    deleteSeeRecord: persistReducer(deleteRecordPersistConfig, deleteRecordSlice),
    saveSignIt: persistReducer(saveSignPersistConfig, signSaveSlice),
    queryOfSign: persistReducer(querySignPersistConfig, querySignSlice)
})

export default slices;