import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { identifierActionsActs } from 'redux/reducers/actsExpSlice';
import { successActs } from 'redux/reducers/actsExpSlice';
import { seeActs } from 'services/authServices';

function* getActs({payload}){

    try {

        const {data}= yield call(seeActs.ActsExp, payload)

        yield put(successActs(data))
        console.log(data)
        
    } catch (e) {
        console.log(e)
 }
}

function* actsExpRootSaga(){
    yield all([
        takeEvery(identifierActionsActs.FETCH_ACTS, getActs)
    ]);
}

const actsExpSaga = [fork(actsExpRootSaga)];

export default actsExpSaga;