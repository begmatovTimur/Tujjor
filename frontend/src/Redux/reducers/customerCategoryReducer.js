import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name:"customerCategory",
    initialState:{
        phone:"",
        password:"",
        remember: false,
        navigateTo:""
    },
    reducers:{
        changePhone:(state, action)=>{
            state.phone = action.payload
        },
        changePassword:(state, action)=>{
            state.password = action.payload
        },
        rememberMe:(state, action)=>{
            state.remember = action.payload
        }
    }
})

export const loginModel = slice.actions;

export default slice.reducer;