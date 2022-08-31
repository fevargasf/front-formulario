import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { successDelete } from 'redux/reducers/deleteRecordSlice';
import { identifierDeleteRecordActions } from 'redux/reducers/deleteRecordSlice';
import { deleteRecord } from 'services/authServices';



function* deleteSeeRecord({payload}){

    try{
      const {data, status,message} = yield call(deleteRecord.deleteSeeRecord, payload)
       
      yield put(successDelete(data))
      console.log(data)
    }catch(e){
        console.log(e)
    }
}

function* deleteRootSaga(){
    yield all([
            takeEvery(identifierDeleteRecordActions.FETCH_DELETE_RECORD, deleteSeeRecord )
          ])
}

const deleteRecordSaga = [fork(deleteRootSaga)]

export default deleteRecordSaga;