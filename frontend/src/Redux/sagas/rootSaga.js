import {all,fork} from "redux-saga/effects"
import {dashboardDataSaga} from "./dashboardDataSaga";
import settingsSaga from "./settingsSaga";
import {tableSaga} from "./tableSaga";
// import teritorySaga from "./teritorySaga";
import {filterSaga} from "./filterSaga";


export function* rootSaga(){
    yield all([
        fork(tableSaga),
        fork(filterSaga),
        fork(settingsSaga),
        fork(dashboardDataSaga),
        // fork(teritorySaga),
    ])
}