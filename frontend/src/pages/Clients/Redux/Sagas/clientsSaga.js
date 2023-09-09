import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";
import apiCall from "../../../../Config/apiCall";
import {clientsAction} from "../Reducers/clientsReducer";
import {ErrorNotify, SuccessNotify} from "../../../../tools/Alerts";

function* getClients() {
  try {
    const res = yield apiCall("/client", "GET", null);
    yield put(clientsAction.getClientsSuccess(res.data));
  } catch (err) {
    yield put(clientsAction.yourActionFailureClients(err.message));
  }
}

function* saveClients(action) {
  const currentState = yield select((state) => state.clients);
  if (
    action.payload.name === "" ||
    !action.payload.phone.startsWith("998") ||
    action.payload.territoryId === "" ||
    action.payload.address === "" ||
    action.payload.phone === "" ||
    action.payload.companyName === "" ||
    action.payload.categoryId === "" ||
    action.payload.longitude === "" ||
    action.payload.latitude === ""
  ) {
    if (!action.payload.phone.startsWith("998")) {
        ErrorNotify("Invalid phone number!")
    } else {
      ErrorNotify("Please fill all fields!");
    }
  } else {
    yield put(clientsAction.closeModal());
    if (currentState.editeClient !== "") {
      yield apiCall(
        "/client?clientId=" + currentState.editeClient.id,
        "PUT",
        action.payload
      );
      yield put(clientsAction.resetAllClientsData());
      SuccessNotify("Client updated Successfully!");
    } else {
      const res = yield apiCall("/client", "POST", action.payload);
      if (res) {
        yield put(clientsAction.resetAllClientsData());
        SuccessNotify("Client added Successfully!");
      }
    }
    yield call(getClients);
  }
}
function* getClientsPlans(action) {
  try {
    const res = yield apiCall("/plane?clientId="+action.payload, "GET", null);
    yield put(clientsAction.getSuccessPlans(res.data));
    yield put(clientsAction.changeAddPlaneForThisMonth(res.data.addPlaneForThisMonth));
  } catch (err) {
    yield put(clientsAction.getFailurePlans(err.message));
  }
}
function* addNewClientPlane(action) {
  const currentState = yield select((state) => state.clients);
  if (action.payload.date === "" || action.payload.amount === ""){
    ErrorNotify("Enter the details completely")
  } else {
    yield put(clientsAction.resetDataForPlansMap());
    if (currentState.currentPlane === ""){
      yield apiCall("/plane", "POST", action.payload);
      SuccessNotify("New Plane added Successfully!");
    }else {
      yield apiCall("/plane?planeId="+currentState.currentPlane.id, "PUT", action.payload);
      SuccessNotify("Plane Updated Successfully!");
    }
    const res = yield apiCall("/plane?clientId="+currentState.currentClientId, "GET", null);
    yield put(clientsAction.getSuccessPlans(res.data));
  }
}
function* getPlanForMap(action) {
  try {
    const res = yield apiCall("/plane/forMap?clientId="+action.payload, "GET", null);
    yield put(clientsAction.getPlanForMapSuccess(res.data));
  } catch (err) {
    yield put(clientsAction.getPlanForMapFailure(err.message));
  }
}

export function* clientsSaga() {
  yield takeLatest("clients/saveClients", saveClients);
  yield takeEvery("clients/getClients", getClients);
  yield takeEvery("clients/savePlane", addNewClientPlane);
  yield takeEvery("clients/getPlans", getClientsPlans);
  yield takeEvery("clients/openModalForPlan", getClientsPlans);
  yield takeEvery("clients/getPlanForMap", getPlanForMap);
}
