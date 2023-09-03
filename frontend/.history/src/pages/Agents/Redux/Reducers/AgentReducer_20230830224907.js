import { createSlice } from "@reduxjs/toolkit";
const agentReducer = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    username:"",
    phone:"",
    password:"",
    editingItem:""
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
       state.phone=action.payload
    },
    setPassword:(state,action)=>{
       state.password=action.payload
    },
    saveAgent:(state,action)=>{
      action.payload
    }
  },
});
export const agentActions = { ...agentReducer.actions };
export default agentReducer.reducer;
