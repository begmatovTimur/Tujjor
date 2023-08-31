import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"

export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAgents)
}