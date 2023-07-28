import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name:"login",
    initialState:{
        phone:"",
        password:"",
        navigateTo:""
    },
    reducers:{
        changePhone:(state, action)=>{
            state.phone = action.payload
        },
        changePassword:(state, action)=>{
            state.password = action.payload
        },
        loginUser:(state, action)=>{
            let obj = {
                phone: state.phone,
                password:state.password
                }
                action.payload = obj
            },
        navigateTo:(state, action)=>{
            let x = JSON.parse(action.payload.res)
            let data = x.data
            let accessToken = data.access_token;
            let refreshToken = data.refresh_token;
            let roles = data.role;
            localStorage.setItem("token", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name==="ROLE_ADMIN"){
                    state.navigateTo = "/adminHome"
                    return
                }else if(roles[i].name==="ROLE_USER") {
                    state.navigateTo = "/"
                    return;
                }
            }
        }
    }
})

export const loginModel = slice.actions;

export default slice.reducer;