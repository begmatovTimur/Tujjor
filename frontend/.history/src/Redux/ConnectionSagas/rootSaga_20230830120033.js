import {all,fork} from "redux-saga/effects"
import dashboardDataSaga from "../../pages/Admin/Redux/Sagas/dashboardDataSaga";
import settingsSaga from "../../pages/Settings/Redux/Sagas/settingsSaga";
import {territorySaga} from "../../pages/Settings/ChildComponents/Teritory/Redux/Sagas/teritorySaga";
import tableSaga from "../../pages/universal/Table/Redux/Sagas/tableSaga";
import {customerCategorySaga} from "../../pages/Settings/ChildComponents/CustomerCategory/Redux/Sagas/customerCategorySaga";
import companyProfileSaga from "../../pages/Settings/ChildComponents/Company/Redux/Sagas/companyProfileSaga";
import {clientsSaga} from "../../pages/Clients/Redux/Sagas/clientsSaga";
import {loginSaga} from "../../pages/Login/Redux/Sagas/loginSaga";
import {agentSaga} from '../'


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
            fork(agentSaga)
        ])
    }catch (error) {
        console.log(error)
    }
}