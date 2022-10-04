import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { identifierAutogestionAction } from 'redux/reducers/autogestionSlice';
import { successAutogestion } from 'redux/reducers/autogestionSlice';
import { queryAutogestion } from 'services/authServices';



function* getAutogestion({payload}){

    try {
        const {data, status, message, response} = yield call(queryAutogestion.queryOfAutogestion, payload)
        
        yield put(successAutogestion(data));
        console.log(data)
    }catch(e){

        console.log(e)

    }
}

function* autogestionListRootSaga(){

    yield all([
        takeEvery(identifierAutogestionAction.FETCH_QUERY_AUTOGESTION, getAutogestion)
    ]);
}

const autogestionSaga = [fork(autogestionListRootSaga)]

export default autogestionSaga;