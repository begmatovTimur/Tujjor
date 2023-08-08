import {createSlice} from "@reduxjs/toolkit";

const companyProfile = createSlice({
    initialState: {
        openModal: false,
        template: null,
        mapState: {center: [0, 0], zoom: 0},
        code: "",
        active: false,
        region: "",
        companies: [],
        error: "",
        description:"",
        itemForTeritoryEdite: "",
    },
    name: "companyProfile",
    reducers: {
        handleOpen: (state, action) => {
            state.openModal = true
        },
        handleName: (state, action) => {
            state.name = action.payload;
        },
        handleDescription: (state, action) => {
            state.description = action.payload;
        },
        handleClose: (state, action) => {
            state.openModal = false
            state.title = ""
            state.code = ""
            state.region = ""
            state.name = "";
            state.description = "";
            state.active = false
            state.mapState = {center: [[0], [1]], zoom: 10}
            state.itemForTeritoryEdite = ""
        },
        getCompanies: (state, action) => {

        },
        getCompaniesSuccess: (state, action) => {
            state.companies = action.payload;
        },
        yourActionFailureCompanies: (state, action) => {
            state.error = action.payload
        },
        handleTemplate: (state, action) => {
            state.template = action.payload
        },
        handleMapState: (state, action) => {
            state.mapState = action.payload
        },
        handleTitle: (state, action) => {
            state.title = action.payload
            console.log(state.title)
        },
        handleCode: (state, action) => {
            state.code = action.payload
        },
        handleActive: (state, action) => {
            state.active = action.payload
        },
        handleRegion: (state, action) => {
            state.region = action.payload
        },
        clearAllCompany: (state, action) => {
            state.longitute = 0;
            state.latitute = 0;
            state.mapState = {center: [[0], [1]], zoom: 10}
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllCompaniesData: (state, action) => {
            state.title = ""
            state.code = ""
            state.region = ""
            state.active = false
            state.mapState = {center: [[0], [1]], zoom: 10}
            state.itemForTeritoryEdite = ""
        },
        saveCompany: (state, action) => {

            action.payload = {
                name: state.name,
                description:state.description,
                region: state.region,
                code: state.code,
                active: state.active,
            }
        },
        editCompany: (state, action) => {
            console.log(action.payload)
            state.itemForTeritoryEdite = action.payload
            state.openModal = true
            state.name = action.payload.name
            state.code = action.payload.code
            state.description = action.payload.description;
            state.region = action.payload.region
            state.active = action.payload.active
            state.mapState = {center: [[action.payload.latitude], [action.payload.longitude]], zoom: 10}
            console.log(state.itemForTeritoryEdite)
        }
    },
});

export const companyProfileActions = {...companyProfile.actions};
const companyProfileReducer = companyProfile.reducer;
export default companyProfileReducer;