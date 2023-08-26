import {all,fork} from "redux-saga/effects"
import dashboardDataSaga from "./dashboardDataSaga";
import settingsSaga from "./settingsSaga";
import {territorySaga} from "./teritorySaga";
import tableSaga from "./tableSaga";
import {customerCategorySaga} from "./customerCategorySaga";
import companyProfileSaga from "./companyProfileSaga";
import {clientsSaga} from "./clientsSaga";
import {loginSaga} from "./loginSaga";


export function* rootSaga(){
    try {
        yield all([
            fork(tableSaga),
            fork(settingsSaga),
            fork(dashboardDataSaga),
            fork(territorySaga),
            fork(customerCategorySaga),
            fork(companyProfileSaga),
            fork(clientsSaga),
            fork(loginSaga),
        ])
    }catch (error) {
        console.log(error)
    }
}