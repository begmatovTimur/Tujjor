import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dashboardData: {},
    showUserSettingsModal: false,
    error: null,
    userBox:false,
    isHovered: false,
}

const dashboardDataSlice = createSlice({
    name: "dashboardData",
    initialState,
    reducers: {
        setUserBox:(state)=>{
            state.userBox = !state.userBox;
        },
        getDashboardDataSuccess: (state, action) => {
            state.dashboardData = action.payload
        },
        getDashboardDataFailure: (state, action) => {
            state.error = action.payload
        },
        getDashboardData: (state, action) => {
        },
        setShowUserSettingsModalSuccess: (state, action) => {
            state.showUserSettingsModal = !state.showUserSettingsModal
        },
        setShowUserSettingsModalFailure: (state, action) => {
            state.error = action.payload
        },
        setShowUserSettingsModal: (state, action) => {
            state.showUserSettingsModal = !state.showUserSettingsModal
        },
        changeIsHovered: (state, action) => {
            state.isHovered = action.payload
        },
        nextPermission: (state, action) => {
            if (
                localStorage.getItem("no_token") === null ||
                localStorage.getItem("access_token") === null
            ) {
                window.location = "/login"
            }
        }
    }
})

export const dashboardDataModel = {...dashboardDataSlice.actions};

export default dashboardDataSlice.reducer