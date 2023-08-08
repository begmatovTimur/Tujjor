import {takeEvery, select, put, call} from "redux-saga/effects"
import apiCall from "../../Config/apiCall";
import {clientsAction} from "../reducers/clientsReducer";
import {ErrorNotify, SuccessNotify} from "../../tools/Alerts";
import {teritoryAction} from "../reducers/teritoryReducer";

function* getClients(action){
    try {
        const res = yield apiCall("/client", "GET", null)
        yield put(clientsAction.getClientsSuccess(res.data))
    } catch (err) {
        yield put(clientsAction.yourActionFailureClients(err.message));
    }
}
function* saveClients(action){
    const currentState = yield select((state) => state.clients);
    console.log(currentState)
    if (action.payload.name === "" || action.payload.territoryId === "" || action.payload.address === "" || action.payload.phone === "" || action.payload.tin === "" || action.payload.companyName === "" || action.payload.referencePoint === "" || action.payload.longitude === "" || action.payload.latitude === ""){
        ErrorNotify("Please fill all fields!")
    }else {
        if (currentState.editeClient !== ""){
            const res = yield apiCall("/client?clientId="+action.payload.id, "PUT", action.payload)
            try {
                yield call(getClients())
                yield put(clientsAction.closeModal())
                yield put(clientsAction.resetAllClientsData())
                SuccessNotify("Territory update Successfully!")
            }catch (err){
                if (err.response.status === 500){

                }else {

                }
            }
        }else {
            const res = yield apiCall("/client", "POST", action.payload)
            SuccessNotify("Teritory added Successfully!")
            yield call(getClients())
            yield put(clientsAction.closeModal())
            yield put(clientsAction.resetAllClientsData())
        }
    }
}

export function* clientsSaga() {
    yield takeEvery("clients/getClients", getClients)
    yield takeEvery("clients/saveClients", saveClients)
}
