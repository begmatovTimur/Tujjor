import {all,fork} from "redux-saga/effects"
import {loginSaga} from "./loginSaga";
import tableSaga from "./tableSaga";



export function* rootSaga(){
    yield all([
            fork(loginSaga),
            fork(tableSaga)
    ])
}