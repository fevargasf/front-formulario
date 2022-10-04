import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { successInformation } from 'redux/reducers/informationSlice';
import { identifierActions } from 'redux/reducers/informationSlice';
import { tableInformation } from 'services/authServices';



function* getAllInformation({payload}){

    try{
        const {data, status, message, response} = yield call(tableInformation.information, payload)

        yield put(successInformation(data));

    }catch(e){
        

    }

}
 function*  informationRootSaga(){
    yield all([
        takeEvery(identifierActions.FETCH_INFORMATION,getAllInformation )
    ])
 }

 const informationSaga =[fork(informationRootSaga)];

export default informationSaga;