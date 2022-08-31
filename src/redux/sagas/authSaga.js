import {call, fork, put, takeEvery, all} from 'redux-saga/effects'
import { failureLogin } from 'redux/reducers/authSlice';
import { identifierActions } from 'redux/reducers/authSlice'
import { successLogin } from 'redux/reducers/authSlice'
import { authService } from 'services/authServices'
import Swal from 'sweetalert2';



function* login(payload) {
    try{
   
        const {data, status, message} = yield call(authService.login, payload.dataLogin)
        console.log(data)
        if (data === null) {
            
            yield put(failureLogin({message: 'error'}))
             console.log(data)
             Swal.fire(message)

        } else {
             const _data = {
            token: data.token,
            voerror:data.voerror,
            viip: data.viip,
            usuario: data.usuario
        }
            
        yield put(successLogin(_data))
        
       // const errorLogin = sessionStorage.setItem('error',_data.voerror)
        
        }
       

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