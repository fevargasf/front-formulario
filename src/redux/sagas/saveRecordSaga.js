import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { identifierSaveRecordActions } from 'redux/reducers/saveRecordSlice';
import { successSave } from 'redux/reducers/saveRecordSlice';
import { failureRecord } from 'redux/reducers/saveRecordSlice'
import { saveRecord } from 'services/authServices'




function* saveRecordData({payload}){
    try{
       const {data, status, message} = yield call(saveRecord.saveinformation, payload)
        
       yield put(successSave(data))


    }catch(e){
        console.log(e);
    }
}

function* saveRootSaga(){
    yield all([
        takeEvery(identifierSaveRecordActions.FETCH_SAVE_RECORD,saveRecordData)
    ])
}

const saveRecordSaga=[fork(saveRootSaga)]

export default saveRecordSaga;