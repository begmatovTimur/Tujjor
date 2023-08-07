import {takeEvery, select, put, call} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {clientsAction} from "../reducers/clientsReducer";

function* getClients(action){
    try {
        const res = yield apiCall("/client", "GET")
        console.log(res.data)
        yield put(clientsAction.getClientsSuccess(res.data))
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}

export function* clientSaga() {
    yield takeEvery("clients/getClients", getClients)
}