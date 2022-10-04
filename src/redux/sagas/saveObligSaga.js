import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { identifierObliActions } from 'redux/reducers/saveObligSlice';
import { successObligation } from 'redux/reducers/saveObligSlice';
import { saveObligaIt } from 'services/authServices';


function* saveObligData(payload){

    try {

        const {data}= yield call(saveObligaIt.saveItObliga, payload )
        yield put(successObligation(data))
        console.log(data,"oblig")
    } catch (e) {
        console.log(e);
    }
}

function* obligationRootSaga(){
    yield all([
        takeEvery(identifierObliActions.FETCH_SAVE_OBLIGA, saveObligData)
    ])
}

const saveObligSaga = [fork(obligationRootSaga)]
export default saveObligSaga;