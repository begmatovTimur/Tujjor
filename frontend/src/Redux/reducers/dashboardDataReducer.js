import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    dashboardData: {},
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
        }
    }
})

export const dashboardDataModel = dashboardDataSlice.actions

export default dashboardDataSlice.reducer