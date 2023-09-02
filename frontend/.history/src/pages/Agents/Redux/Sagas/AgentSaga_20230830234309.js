import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"
import apiCall from "Config/apiCall"
import { SuccessNotify } from "tools/Alerts"

function* getAllAgents(action){
         try{
            const res = yield apiCall("/agent", "GET", null)
            yield put(agentActions.getAgentsSuccess(res.data))
         }catch(err){
            console.log("Mistake",err);
         }
}
function* addAgent(action){
  yield apiCall("/agent", "POST", action.payload)
   SuccessNotify("Agent added Successfully!")
   yield put(agentActions.resetModal())
   yield call(get)
}
export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
  yield takeEvery("agent/saveAgent",addAgent)
}