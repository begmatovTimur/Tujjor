import {all,fork} from "redux-saga/effects"
import dashboardDataSaga from "./dashboardDataSaga";
import settingsSaga from "./settingsSaga";
import {territorySaga} from "./teritorySaga";
import tableSaga from "./tableSaga";
import {clientSaga} from "./clientSaga";


export function* rootSaga(){
    yield all([
        fork(tableSaga),
        fork(settingsSaga),
        fork(dashboardDataSaga),
        fork(territorySaga),
        fork(clientSaga),
    ])
}