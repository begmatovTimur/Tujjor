import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"
import apiCall from "Config/apiCall"

function* getAllAgents(action){
         try{
            const res = yield apiCall("/agent", "GET", null)
            yield put(agentActions.getteritoriesSuccess({res: res.data}))
            const reschik = yield apiCall("/agent", "POST", {username:"beki",phone:"9999",password:"99"})
            alert("Phehe")
         }catch(err){
            console.log("Mistake",err);
         }
}


export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
}