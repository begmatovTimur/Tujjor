import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"

function getAllAgents(){
         try{

         }catch(err){
               yield put(agentActions,alert(err))
         }
}


export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
}