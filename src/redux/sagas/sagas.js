import {all} from "redux-saga/effects"
import assignamentSaga from "./assingnamentsSaga"
import authSaga from "./authSaga"
import deleteRecordSaga from "./deleteRecordSaga"
import informationSaga from "./informationSaga"
import querySignSaga from "./querySignSaga"
import recordExpSaga from "./recordExpSaga"
import saveRecordSaga from "./saveRecordSaga"
import seeRecordSaga from "./seeRecordSaga"
import signSaga from "./signSaga"

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
        ...querySignSaga
    ])
}