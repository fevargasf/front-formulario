import {all} from "redux-saga/effects"
import actsExpSaga from "./actsExpSaga"
import assignamentSaga from "./assingnamentsSaga"
import authSaga from "./authSaga"
import autogestionSaga from "./autogestionSaga"
import coordinateQuerySaga from "./coordinateQuerySaga"
import deleteRecordSaga from "./deleteRecordSaga"
import informationSaga from "./informationSaga"
import querySignSaga from "./querySignSaga"
import queryUserExpeSaga from "./queryUserExpeSaga"
import recordExpSaga from "./recordExpSaga"
import saveObligSaga from "./saveObligSaga"
import saveRecordSaga from "./saveRecordSaga"
import seeRecordSaga from "./seeRecordSaga"
import signSaga from "./signSaga"
import userQuerySaga from "./userQuerySaga"

export default function* sagas() {
    yield all([
        ...authSaga,
        ...assignamentSaga,
        ...recordExpSaga,
        ...informationSaga,
        ...saveRecordSaga,
        ...seeRecordSaga,
        ...deleteRecordSaga,
        ...signSaga,
        ...querySignSaga,
        ...autogestionSaga,
        ...userQuerySaga,
        ...queryUserExpeSaga,
        ...actsExpSaga,
        ...saveObligSaga,
        ...coordinateQuerySaga
    ])
}