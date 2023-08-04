import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dashboardData: {},
    showUserSettingsModal: false,
    error: null
}

const dashboardDataSlice = createSlice({
    name: "dashboardData",
    initialState,
    reducers: {
        getDashboardDataSuccess: (state, action) => {
            state.dashboardData = action.payload
        },
        getDashboardDataFailure: (state, action) => {
            state.error = action.payload
        },
        getDashboardData: (state, action) => {
            console.log(action);
        },
        setShowUserSettingsModalSuccess: (state, action) => {
            state.showUserSettingsModal = !state.showUserSettingsModal
        },
        setShowUserSettingsModalFailure: (state, action) => {
            state.error = action.payload
        },
        setShowUserSettingsModal: (state, action) => {
            state.showUserSettingsModal = !state.showUserSettingsModal
        }
    }
})

export const dashboardDataModel = {...dashboardDataSlice.actions};

export default dashboardDataSlice.reducer