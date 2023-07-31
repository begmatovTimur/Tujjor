import {all,fork} from "redux-saga/effects"
import tableSaga from "./tableSaga"
import settingsSaga from "./settingsSaga"

export function* rootSaga(){
    yield all([
        fork(tableSaga),
        fork(settingsSaga)
    ])
};