import {call, fork, put, takeEvery, all} from 'redux-saga/effects'
import { successAsignacion } from 'redux/reducers/asignacionSlice';

import { identifierActions } from "redux/reducers/asignacionSlice";
import {tableAssignment } from 'services/authServices';
import Swal from 'sweetalert2';


function* getAllAssignament({payload}) {
    try {

        const { data, status, message, response } = yield call(tableAssignment.asignacion, payload)
    
        yield put(successAsignacion(data));

            
        }catch(e) {
                console.log(e)
        }

}




function* assignamentRootSaga() {
    yield all([
        takeEvery(identifierActions.FETCH_ALL_ASINGNAMENTS, getAllAssignament)
    ])
}

const assignamentSaga = [fork(assignamentRootSaga)];

export default assignamentSaga;