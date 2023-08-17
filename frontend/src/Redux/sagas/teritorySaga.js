import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {teritoryAction} from  "../reducers/teritoryReducer"
import { ErrorNotify } from "../../tools/Alerts";
import { SuccessNotify } from "../../tools/Alerts";
function* addTeritory(action){
    const currentState = yield select((state) => state.teritory);
    if (action.payload.name === "" || action.payload.region === "" || action.payload.code === "" || action.payload.longitude === "" || action.payload.latitude === ""){
        ErrorNotify("Please fill all fields!")
    }else {
        yield put(teritoryAction.changeModal(false))
        if (currentState.itemForTeritoryEdite !== ""){
            const res = yield apiCall(`/territory/${currentState.itemForTeritoryEdite.id}`, "PUT", action.payload)
            yield put(teritoryAction.resetAllTeritoryData())
        }else {
            const res = yield apiCall("/territory", "POST", action.payload)
            SuccessNotify("Teritory added Successfully!")
            yield put(teritoryAction.resetAllTeritoryData())
        }
        
        yield call(getTeritory)
    }
}
function* getTeritory(action){
    try {
        const res = yield apiCall("/territory", "GET", null)
        yield put(teritoryAction.getteritoriesSuccess({res: res.data}))
    } catch (err) {
        yield put(teritoryAction.yourActionFailureTeritories(err.message));
    }
}
function* getCities(action){
    try {
        const res = yield apiCall("/territory/region", "GET")
        yield put(teritoryAction.getCitiesSuccess({res: res.data}))
    } catch (err) {
        yield put(teritoryAction.yourActionFailureTeritories(err.message));
    }
}
export function* territorySaga() {
    yield takeLatest("teritory/saveTeritory", addTeritory)
    yield takeEvery("teritory/getTeritory", getTeritory)
    yield takeEvery("teritory/getCities", getCities)
}