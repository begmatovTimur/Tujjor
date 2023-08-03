import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name:"login",
    initialState:{
        phone:"",
        password:"",
        loading:false,
        remember: false,
        navigateTo:""
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
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