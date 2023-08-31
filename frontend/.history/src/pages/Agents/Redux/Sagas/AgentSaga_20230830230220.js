import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"
import apiCall from "Config/apiCall"

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
   SuccessNotify("Teritory added Successfully!")
}
export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
  yield takeEvery("",addAgent)
}