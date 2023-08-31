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

    },
    setPhone:(state,action)=>{

    },
    setPassword:()=>{
      
    }
  },
});
export const agentActions = { ...agentReducer.actions };
export default agentReducer.reducer;
