import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { successUser } from 'redux/reducers/userQuerySlice';
import { identifierActionsUser } from 'redux/reducers/userQuerySlice';
import { obligaIt } from 'services/authServices';

function* getUserQuery({payload}){
    try {
        const {data, status, message, response} = yield call(obligaIt.queryObligaIt, payload)

        yield put(successUser(data));
    } catch (e) {
        console.log(e)
    }
}

function* userQueryRootSaga(){
    yield all([
        takeEvery(identifierActionsUser.FETCH_USER_IT,getUserQuery )
    ])
}

const userQuerySaga = [fork(userQueryRootSaga)];

export default userQuerySaga;