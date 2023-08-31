import { createSlice } from "@reduxjs/toolkit";
const agentReducer = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    username:"",
    phone:"",
    password:""
  },
  reducers: {
    getAgents: (state, action) => {},
    getAgentsSuccess: (state, action) => {
      state.agents = action.payload;
    },
    setUserName:(state,action)=>{
        state.username=action.payload
    },
    setPhone:(state,action)=>{
       state
    },
    setPassword:(state,action)=>{

    }
  },
});
export const agentActions = { ...agentReducer.actions };
export default agentReducer.reducer;
