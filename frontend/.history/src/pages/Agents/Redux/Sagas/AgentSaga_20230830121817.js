import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"

function getAgents(){

}


export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
}