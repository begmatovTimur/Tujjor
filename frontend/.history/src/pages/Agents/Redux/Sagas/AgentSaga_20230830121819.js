import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"

function getAllAgents(){

}


export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
}