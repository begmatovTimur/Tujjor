import {takeEvery, select, put, call} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {clientsAction} from "../reducers/clientsReducer";
function* getTeritories(action){
    try {
        const res = yield apiCall("/territory", "GET", null)
        yield put(clientsAction.getSuccessAllTeritories({res: res.data}))
    } catch (err) {
        yield put(clientsAction.yourActionFailureTeritories(err.message));
    }
}

function* getClients(action){
    try {
        const res = yield apiCall("/client", "GET")
        console.log(res.data)
        yield put(clientsAction.getClientsSuccess(res.data))
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}

export function* clientsSaga() {
    yield takeEvery("clients/getTeritories", getTeritories)
    yield takeEvery("clients/getClients", getClients)
    // yield takeEvery("clients/getTeritory", getTeritory)
}