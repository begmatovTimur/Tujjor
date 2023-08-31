import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"
import apiCall from "Config/apiCall"
import { ErrorNotify, SuccessNotify } from "tools/Alerts"

function* getAllAgents(action){
         try{
            const res = yield apiCall("/agent", "GET", null)
            yield put(agentActions.getAgentsSuccess(res.data))
         }catch(err){
            console.log("Mistake",err);
         }
}
function* addAgent(action){
   if(action.payload.username===""||action.payload.phone===""||action.payload.password===""){
         ErrorNotify
   }
  yield apiCall("/agent", "POST", action.payload)
   SuccessNotify("Agent added Successfully!")
   yield put(agentActions.resetModal())
   yield call(getAllAgents)
}
export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
  yield takeEvery("agent/saveAgent",addAgent)
}