import {companyProfileActions} from "../reducers/companyProfile";
import apiCall from "../../Config/apiCall";
import {put,takeEvery} from "redux-saga/effects";


function* getData() {
    const {data} = yield apiCall("/company","GET");
    yield put({
        type:companyProfileActions.getCompaniesSuccess.type,
        payload:data
    })
};

function* companyProfileSaga() {
    yield takeEvery(companyProfileActions.getCompanies.type,getData);
};


export default companyProfileSaga;