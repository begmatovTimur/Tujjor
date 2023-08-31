import { createSlice } from "@reduxjs/toolkit";
const agentReducer=createSlice({
    name:"agent",
    initialState:{
        agents:[]
    },
    reducers:{
        getAgents:(state,action)=>{

        },
        getAgentsSuccess:(state,action)=>{
            state.agents=action.payload
        }
    }
})
export const agentActions={...agentReducer.actions}
export default agentReducer.reducer