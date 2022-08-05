import {call, fork, put, takeEvery, all} from 'redux-saga/effects'
import { failureLogin } from 'redux/reducers/authSlice';
import { identifierActions } from 'redux/reducers/authSlice'
import { successLogin } from 'redux/reducers/authSlice'
import { authService } from 'services/authServices'



function* login(payload) {
    try{
   
        const response = yield call(authService.login, payload.dataLogin)

        const data = {
            token: response.token,
            viip: payload.viip,
            usuaio: response.usuario
        }
            
        yield put(successLogin(data))

    }catch(e) {

        yield put(failureLogin())
        console.log(e)
    }
    

} 


function* authRootSaga() {
    yield all([
        takeEvery(identifierActions.FETCH_LOGIN, login)
    ])
}

const authSaga = [fork(authRootSaga)];

export default authSaga;