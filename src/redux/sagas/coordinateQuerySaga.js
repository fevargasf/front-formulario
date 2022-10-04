import {call, fork, put, takeEvery, all} from 'redux-saga/effects';
import { successCoordinate } from 'redux/reducers/coordinateQuerySlice';
import { identifierCoordAction } from 'redux/reducers/coordinateQuerySlice';
import { queryCoordinates } from 'services/authServices';


function* getCoordinateQuery({payload}){

    try {
      const {data, status, message, response} = yield call(queryCoordinates.coordinatesProcedure, payload)
      
      yield put(successCoordinate(data));
    } catch (e) {
        console.log(e)
    }

}

function* coordinatesqRootSaga(){
      yield all([
        takeEvery(identifierCoordAction.FETCH_QUERY_COORDINATE, getCoordinateQuery)
      ]);

}

const coordinateQuerySaga = [fork(coordinatesqRootSaga)]

export default coordinateQuerySaga;