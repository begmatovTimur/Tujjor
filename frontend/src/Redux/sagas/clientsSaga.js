import {takeEvery, select, put, call} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {clientsAction} from "../reducers/clientsReducer";
import {ErrorNotify, SuccessNotify} from "../../tools/Alerts";
import {teritoryAction} from "../reducers/teritoryReducer";
function* getTeritories(action){
    try {
        const res = yield apiCall("/client/teritoriesForClients", "GET", null)
        yield put(clientsAction.getSuccessAllTeritories({res: res.data}))
    } catch (err) {
        yield put(clientsAction.yourActionFailureTeritories(err.message));
    }
}

function* getClients(action){
    try {
        const res = yield apiCall("/client", "GET", null)
        yield put(clientsAction.getClientsSuccess(res.data))
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}
function* getCustomCategory(action){
    try {
        const res = yield apiCall("/customer-category", "GET", null)
        yield put(clientsAction.getCustomCategorySuccess(res.data))
    } catch (err) {
        yield put(clientsAction.yourActionFailureCustomCategory(err.message));
    }
}
function* saveClients(action){
    const currentState = yield select((state) => state.clients);
    console.log(currentState)
    if (action.payload.name === "" || action.payload.territoryId === "" || action.payload.address === "" || action.payload.phone === "" || action.payload.tin === "" || action.payload.companyName === "" || action.payload.referencePoint === "" || action.payload.longitude === "" || action.payload.latitude === ""){
        ErrorNotify("Please fill all fields!")
    }else {
        if (currentState.editeClient !== ""){
            const res = yield apiCall("/client?clientId="+currentState.editeClient.id, "PUT", action.payload)
            SuccessNotify("Teritory update Successfully!")
            yield call(getTeritories)
            yield put(clientsAction.closeModal())
            yield put(clientsAction.resetAllClientsData())
        }
            const res = yield apiCall("/client", "POST", action.payload)
            SuccessNotify("Teritory added Successfully!")
            yield call(getTeritories)
            yield put(clientsAction.closeModal())
            yield put(clientsAction.resetAllClientsData())
        }

}

export function* clientsSaga() {
    yield takeEvery("clients/getTeritories", getTeritories)
    yield takeEvery("clients/getClients", getClients)
    yield takeEvery("clients/saveClients", saveClients)
    yield takeEvery("clients/getCustomCategory", getCustomCategory)
}
