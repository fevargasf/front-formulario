import {combineReducers} from "@reduxjs/toolkit"
import { persistReducer } from 'redux-persist'
import actsExpSlice, { actsPersistConfig } from "./actsExpSlice";
import asignacionSlice, { asignacionPersistConfig } from "./asignacionSlice";
import authSlice, {authPersistConfig} from './authSlice'
import autogestionSlice, { autogestionPersistConfig } from "./autogestionSlice";
import coordinateQuerySlice, { coordinateQueryPersistConfig } from "./coordinateQuerySlice";
import deleteRecordSlice, { deleteRecordPersistConfig } from "./deleteRecordSlice";
import informationSlice, { informationPersistConfig } from "./informationSlice";
import querySignSlice, {  querySignPersistConfig } from "./querySignSlice";
import queryUserExpeSlice, { userExpedientPersistConfig } from "./queryUserExpeSlice";
import recordExpSlice, { recordPersistConfig } from "./recordExpSlice";
import saveObligSlice, { obligaPersistConfig } from "./saveObligSlice";
import saveRecordSlice, { saveRecordPersistConfig } from "./saveRecordSlice";
import seeRecordSlice, { seeRecordPersistConfig } from "./seeRecordSlice";
import signSaveSlice, { saveSignPersistConfig } from "./signSaveSlice";
import userQuerySlice, { userPersistConfig } from "./userQuerySlice";

const slices = combineReducers({
    auth: persistReducer(authPersistConfig,authSlice),
    asignacion: persistReducer(asignacionPersistConfig, asignacionSlice),
    record: persistReducer(recordPersistConfig, recordExpSlice),
    information: persistReducer(informationPersistConfig, informationSlice),
    saveinformation: persistReducer(saveRecordPersistConfig, saveRecordSlice),
    seeRecord:persistReducer(seeRecordPersistConfig,  seeRecordSlice),
    deleteSeeRecord: persistReducer(deleteRecordPersistConfig, deleteRecordSlice),
    saveSignIt: persistReducer(saveSignPersistConfig, signSaveSlice),
    queryOfSign: persistReducer(querySignPersistConfig, querySignSlice),
    queryOfAutogestion: persistReducer(autogestionPersistConfig,autogestionSlice),
    userExpediente: persistReducer(userPersistConfig,userQuerySlice),
    user: persistReducer(userExpedientPersistConfig,queryUserExpeSlice),
    acts: persistReducer(actsPersistConfig, actsExpSlice),
    saveObligation: persistReducer(obligaPersistConfig, saveObligSlice),
    coordinate: persistReducer(coordinateQueryPersistConfig,coordinateQuerySlice)
})   

export default slices;