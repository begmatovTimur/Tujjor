import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"
import apiCall from "../../../../../../Config/apiCall";

function getAllAgents(action){
         try{
            const res = yield apiCall("/", "GET", null)
            yield put(teritoryAction.getteritoriesSuccess({res: res.data}))
         }catch(err){
            console.log("Mistake",err);
         }
}


export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
}