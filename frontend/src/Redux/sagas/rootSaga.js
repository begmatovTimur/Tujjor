import {all,fork} from "redux-saga/effects"
import {dashboardDataSaga} from "./dashboardDataSaga";
import settingsSaga from "./settingsSaga";
import {filterSaga} from "./filterSaga";
import tableSaga from "./tableSaga";


export function* rootSaga(){
    yield all([
        fork(tableSaga),
        fork(filterSaga),
        fork(settingsSaga),
        fork(dashboardDataSaga),
    ])
}