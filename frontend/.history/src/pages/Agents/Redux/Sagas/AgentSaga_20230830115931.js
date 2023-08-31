import {pull,takeEvery,select,call,takeLatest, put} from "redux-saga/effects"
import apiCall from "../../../../../../Config/apiCall";
import { agentAction } from "../Reducers/AgentReducer";
function* getAgents(action){
    try{

       const res=yield apiCall("/agent","GET",null)
       yield put(agentAction.getAgentsSuccess({res:res.data}))
    }catch(error){
        yield put(agentAction,alert(error))
    }
}
export function* agentSaga(){
    yield takeEvery("agent/getAgents",getAgents)
}