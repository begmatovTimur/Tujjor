import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";
import apiCall from "../../Config/apiCall";
import {clientsAction} from "../reducers/clientsReducer";
import {ErrorNotify, SuccessNotify} from "../../tools/Alerts";

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
      const res = yield apiCall(
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

export function* clientsSaga() {
  yield takeLatest("clients/saveClients", saveClients);
  yield takeEvery("clients/getClients", getClients);
}
