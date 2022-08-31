import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { identifierSeeAction } from 'redux/reducers/seeRecordSlice';
import { successSeeRecord } from 'redux/reducers/seeRecordSlice';
import { seeAntecedentes } from 'services/authServices';



function* getSeeRecord({payload}){

    try{
        const {data, status, message, response} = yield call(seeAntecedentes.seeRecord, payload)
        
        yield put(successSeeRecord(data));
   
    }catch(e){
        console.log(e)
    }
}

function* seeRecordRootSaga(){
    yield all([
        takeEvery(identifierSeeAction.FETCH_SEE_RECORD, getSeeRecord)
    ]);
}

const seeRecordSaga = [fork(seeRecordRootSaga)]

export default seeRecordSaga;