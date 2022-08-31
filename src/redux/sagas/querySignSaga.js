import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { identifierQueryAction } from 'redux/reducers/querySignSlice';
import { successQuery } from 'redux/reducers/querySignSlice';
import { querySign } from 'services/authServices';


function* getQuerySign({payload}){
    try{
       
        const {data, status, message, response} = yield call(querySign.queryOfSign, payload)

        yield put(successQuery(data));
        console.log(data)
    }catch(e){
        console.log(e)
    }
}

function* queryListRootSaga(){
    yield all([
         takeEvery(identifierQueryAction.FETCH_QUERY_SIGN, getQuerySign)
    ]);
}

const querySignSaga = [fork(queryListRootSaga)]
export default querySignSaga;