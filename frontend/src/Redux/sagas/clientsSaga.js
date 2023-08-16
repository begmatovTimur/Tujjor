import {takeLatest,takeEvery, select, put, call} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {clientsAction} from "../reducers/clientsReducer";
import {ErrorNotify, SuccessNotify} from "../../tools/Alerts";
import {tableActions} from "../reducers/tableReducer";

function* getClients(action) {
    try {
        const currentState = yield select((state) => state.table);
        yield put(tableActions.changeIsLoading(true))
        const res = yield apiCall("/client", "GET", null)
        yield put(tableActions.changeIsLoading(false))
        yield put(clientsAction.getClientsSuccess(res.data))
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}
function* getAllClientsTerritories(action) {
    try {
        const currentState = yield select((state) => state.table);
        const res = yield apiCall("/client/clientsLocation", "GET", null)
        yield put(clientsAction.getAllClientsTerritoriesSuccess(res.data))
    } catch (err) {
        yield put(clientsAction.getAllClientsTerritoriesError(err.message));
    }
}

function* saveClients(action) {
    const currentState = yield select((state) => state.clients);
    yield put(clientsAction.closeModal())
    if (action.payload.name === "" || action.payload.territoryId === "" || action.payload.address === "" || action.payload.phone === "" || action.payload.companyName === "" || action.payload.categoryId === "" || action.payload.longitude === "" || action.payload.latitude === "") {
        ErrorNotify("Please fill all fields!")
    } else {
        if (currentState.editeClient !== "") {
            const res = yield apiCall("/client?clientId=" + currentState.editeClient.id, "PUT", action.payload)
                yield put(clientsAction.resetAllClientsData())
                SuccessNotify("Client update Successfully!")
        } else {
            const res = yield apiCall("/client", "POST", action.payload)
              if(res){
                  yield put(clientsAction.resetAllClientsData())
                  SuccessNotify("Client added Successfully!")
              }
        }
    }
    yield call(getClients)
}

export function* clientsSaga() {
    yield takeEvery("clients/getAllClientsTerritories", getAllClientsTerritories)
    yield takeLatest("clients/saveClients", saveClients)
    yield takeEvery("clients/getClients", getClients)
}
