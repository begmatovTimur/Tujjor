import {takeEvery,put} from "redux-saga/effects"
import {loginModel} from "../reducers/loginReducer";
import axios from "axios";

function* watchLoginUser(action){
     const res = yield axios({
        url:"http://localhost:8080/api/auth/login",
        method:"post",
        data: action.payload
    })
    const resString = JSON.stringify(res);
    yield put(loginModel.navigateTo({res:resString}))
}

export function* loginSaga(){
    yield takeEvery("login/loginUser",watchLoginUser)
}