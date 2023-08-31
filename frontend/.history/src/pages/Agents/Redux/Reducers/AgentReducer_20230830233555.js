import { createSlice } from "@reduxjs/toolkit";
const agentReducer = createSlice({
  name: "agent",
  initialState: {
    agents: [],
    username:"",
    phone:"",
    password:"",
    editingItem:"",
    modalVisibility:false
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
      action.payload={
        username:state.username,
        phone:state.phone,
        password:state.password
      }
    },
    openModal:(state,action)=>{
      state.modalVisibility=true
    },
    resetModal:(state,action)=>{
      state.username=""
      state.phone=""
      state.password=""
      state.editingItem=""
    },
    editAgent:(state,action)=>{
      state.username=action.payload.username
      state.phone=action.payload.phone
      state.password=action.payload.password
      state.editingItem
    }

  },
});
export const agentActions = { ...agentReducer.actions };
export default agentReducer.reducer;
