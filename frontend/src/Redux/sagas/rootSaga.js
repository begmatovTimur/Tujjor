import {all,fork} from "redux-saga/effects"
import tableSaga from "./tableSaga"

export function* rootSaga(){
    yield all([
        fork(tableSaga)
    ])
}