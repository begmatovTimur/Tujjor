import {all,fork} from "redux-saga/effects"
import {dashboardDataSaga} from "./dashboardDataSaga";
import tableSaga from "./tableSaga";
import settingsSaga from "./settingsSaga";
import {territorySaga} from "./teritorySaga";


export function* rootSaga(){
    yield all([
        fork(tableSaga),
        fork(settingsSaga),
        fork(dashboardDataSaga),
        fork(territorySaga),
        ])
};