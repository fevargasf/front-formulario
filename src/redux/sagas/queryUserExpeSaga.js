import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { successQueryUser } from 'redux/reducers/queryUserExpeSlice';
import { identifierActionsQuser } from 'redux/reducers/queryUserExpeSlice';
import { queryUser } from 'services/authServices';


function* getQueryUserExp({payload}){

    try {
        const {data, status, message, response} = yield call(queryUser.queryUserIt, payload)
    
        yield put(successQueryUser(data.lista_usuario))
        console.log(data.lista_usuario)
    } catch (e) {
        console.log(e)
    }
}


function* queryUserExpRootSaga(){
    yield all([
        takeEvery(identifierActionsQuser.FETCH_USER_EXPEDIENTE, getQueryUserExp )
    ])
}

const queryUserExpeSaga = [fork(queryUserExpRootSaga)];

export default queryUserExpeSaga;