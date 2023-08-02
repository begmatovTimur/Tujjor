import ApiCall from "../../Config/apiCall";
import {put, takeEvery} from "redux-saga/effects";
import {dashboardDataModel} from "../reducers/dashboardDataReducer";
import {GET_DASHBOARD_DATA, SET_SHOW_USER_MODAL} from "../constants/dashboardDataConstants";

function* watchGetDashboardData() {
    try {
        const {data} = yield ApiCall("/api/dashboard-data", "GET")
        yield put(dashboardDataModel.getDashboardDataSuccess(data))
    } catch (e) {
        yield put(dashboardDataModel.getDashboardDataFailure(e.data()))
    }
}

function* watchSetShowUserModalData(action){
    try {
        yield put(dashboardDataModel.setShowUserSettingsModalSuccess(action.payload))
    } catch (e) {
        yield put(dashboardDataModel.setShowUserSettingsModalFailure(e))
    }
}

export function* dashboardDataSaga() {
    yield takeEvery(GET_DASHBOARD_DATA, watchGetDashboardData)
    yield takeEvery(SET_SHOW_USER_MODAL, watchSetShowUserModalData)
}