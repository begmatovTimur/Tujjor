import {takeEvery, select, put, call} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {teritoryAction} from  "../reducers/teritoryReducer"
import { ErrorNotify } from "../../tools/Alerts";
import { SuccessNotify } from "../../tools/Alerts";
function* addTeritory(action){
    const currentState = yield select((state) => state.teritory);
    if (action.payload.name === "" || action.payload.region === "" || action.payload.code === "" || action.payload.longitude === 0 || action.payload.latitude === 0){
        ErrorNotify("Please fill all fields!")
    }else {
        if (currentState.itemForTeritoryEdite !== ""){
            const res = yield apiCall(`/territory/${currentState.itemForTeritoryEdite.id}`, "PUT", action.payload)
            yield call(getTeritory)
            yield put(teritoryAction.changeModal(false))
            yield put(teritoryAction.resetAllTeritoryData())
        }else {
            const res = yield apiCall("/territory", "POST", action.payload)
            SuccessNotify("Teritory added Successfully!")
            yield call(getTeritory)
            yield put(teritoryAction.changeModal(false))
            yield put(teritoryAction.resetAllTeritoryData())
        }
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
export function* territorySaga() {
    yield takeEvery("teritory/saveTeritory", addTeritory)
    yield takeEvery("teritory/getTeritory", getTeritory)
}