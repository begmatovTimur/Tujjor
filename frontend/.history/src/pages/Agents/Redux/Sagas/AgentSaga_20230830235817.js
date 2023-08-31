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
         ErrorNotify("There should be no empty field!Please fill all fields")
   }
  const currentState=yield select((state)=>state.agents)
  console.log(currentState);
  if(currentState.editingItem!==""){
   yield apiCall("/agent/"+currentState.editingItem.id,"PUT",action.payload)
   SuccessNotify("Agent edited successfully")
  }else{
   yield apiCall("/agent", "POST", action.payload)
   SuccessNotify("Agent added Successfully!")
  }
  yield put(agentActions.resetModal())
  yield call(getAllAgents)
}
export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
  yield takeEvery("agent/saveAgent",addAgent)
}