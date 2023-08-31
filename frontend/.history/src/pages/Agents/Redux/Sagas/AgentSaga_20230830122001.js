import {takeEvery, select, put, call, takeLatest} from "redux-saga/effects"
import { agentActions } from "../Reducers/agentReducer"
import apiCall from "Config/apiCall";

function getAllAgents(){
         try{
           const res=yield apiCall
         }catch(err){
            console.log("Mistake",err);
         }
}


export function* agentSaga() {
  yield takeEvery("agent/getAgents",getAllAgents)
}