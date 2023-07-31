import {all,fork} from "redux-saga/effects"
import {dashboardDataSaga} from "./dashboardDataSaga";

export function* rootSaga(){
    yield all([
        fork(dashboardDataSaga)
    ])
}