import ApiCall from "../../Config/apiCall";
import {put, takeEvery} from "redux-saga/effects";
import {dashboardDataModel} from "../reducers/dashboardDataReducer";
import {GET_DASHBOARD_DATA} from "../constants/dashboardDataConstants";

function* watchGetDashboardData() {
    try {
        const {data} = yield ApiCall("/api/dashboard-data", "GET")
        yield put(dashboardDataModel.getDashboardDataSuccess(data))
    } catch (e) {
        yield put(dashboardDataModel.getDashboardDataFailure(e.data()))
    }
}

export function* dashboardDataSaga() {
    yield takeEvery(GET_DASHBOARD_DATA, watchGetDashboardData)
}