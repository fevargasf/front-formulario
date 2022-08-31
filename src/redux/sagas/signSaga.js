import {call, fork, put, takeEvery, all} from 'redux-saga/effects'
import { successSaveSign } from 'redux/reducers/signSaveSlice';
import { identifierSaveSignActions } from 'redux/reducers/signSaveSlice';
import { saveSign } from 'services/authServices';



function* sign(data){
    try{

        const {data, status, message}= yield call(saveSign.saveSignIt, data.dataSaveSign)
        
        yield put(successSaveSign(data))

    }catch(e){
        console.log(e);
    }
}

function* signRootSaga(){
    yield all([
        takeEvery(identifierSaveSignActions.FETCH_SAVE_SIGN, sign)
    ])
}

const signSaga = [fork(signRootSaga)]
export default signSaga;