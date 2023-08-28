import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name:"login",
    initialState:{
        phone:"",
        password:"",
        loading:false,
        remember: false,
        navigateTo:"",
        showPassword: false
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setShowPassword:(state,action)=>{
            state.showPassword = !state.showPassword;
        },
        changePhone:(state, action)=>{
            state.phone = action.payload
        },
        changePassword:(state, action)=>{
            state.password = action.payload
        },
        rememberMe:(state, action)=>{
            state.remember = action.payload
        },
        changeLoading:(state, action)=>{
            state.loading = action.payload
        },
        loginHere:(state, action)=>{
            action.payload.preventDefault();
            console.log("hello")
            if (!state.loading){
                action.payload = {
                    phone: "+"+state.phone,
                    password: state.password,
                    rememberMe: state.remember,
                }
            }
        },
        hasPermissionRoleSuperVisor:(state, action)=>{}
    }
})

export const loginModel = slice.actions;

export default slice.reducer;