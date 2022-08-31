import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { successRecord } from 'redux/reducers/recordExpSlice';
import { identifierActions } from 'redux/reducers/recordExpSlice';
import { tableRecord } from 'services/authServices';



function* getAllRecord({payload}){

    try{

        const {data,status, message, response} = yield call(tableRecord.record, payload)

        yield put(successRecord(data));


        }catch (e){
            console.log(e);

        }
}
function * recordRootSaga(){

    yield all([
        takeEvery(identifierActions.FETCH_RECORD, getAllRecord)
    ])
}

const recordExpSaga = [fork(recordRootSaga)]

export default recordExpSaga;
