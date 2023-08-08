import { createSlice } from "@reduxjs/toolkit";

const teritoryReducer = createSlice({
    initialState: {
        openModal:false,
        template:null,
        mapState:{ center: [0, 0], zoom: 0 },
        longitute: 0,
        latitute: 0,
        title: "",
        code: "",
        active: false,
        region: "",
        teritories: [],
        error: "",
        itemForTeritoryEdite: "",
    },
    name: "teritory",
    reducers: {
        handleOpen:(state, action)=>{
            state.openModal = true
        },
        handleClose:(state, action)=>{
            state.openModal = false
            state.longitute = 0
            state.latitute = 0
            state.title = ""
            state.code = ""
            state.region = ""
            state.active = false
            state.mapState = { center: [0, 1], zoom: 10 }
            state.itemForTeritoryEdite = ""
        },
        getTeritory:(state, action)=>{

        },
        getteritoriesSuccess:(state, action)=>{
            state.teritories = action.payload.res;
        },
        yourActionFailureTeritories:(state, action)=>{
            state.error = action.payload
        },
        handleTemplate:(state, action)=>{
            state.template = action.payload
            state.longitute = state.template[0]
            state.latitute = state.template[1]
        },
        handleMapState:(state, action)=>{
            state.mapState = action.payload
        },
        handleTitle:(state, action)=>{
            state.title = action.payload
            console.log(state.title)
        },
        handleCode:(state, action)=>{
            state.code = action.payload
        },
        handleActive:(state, action)=>{
            state.active = action.payload
        },
        handleRegion:(state, action)=>{
            state.region = action.payload
        },
        clearAllTeritory:(state, action)=>{
            state.longitute = 0;
            state.latitute = 0;
            state.mapState = { center: [0, 1], zoom: 10 }
        },
        changeModal:(state, action)=>{
            state.openModal = action.payload
        },
        resetAllTeritoryData:(state, action)=>{
            state.longitute = 0
            state.latitute = 0
            state.title = ""
            state.code = ""
            state.region = ""
            state.active = false
            state.mapState = { center: [0, 1], zoom: 10 }
            state.itemForTeritoryEdite = ""
        },
        saveTeritory:(state, action)=>{
            action.payload = {
                name: state.title,
                region: state.region,
                code: state.code,
                active: state.active,
                longitude: state.longitute,
                latitude: state.latitute,
            }
        },
        editeTeritory:(state, action)=>{
            state.itemForTeritoryEdite = action.payload
            state.openModal = true
            state.longitute = action.payload.latitude
            state.latitute = action.payload.longitude
            state.title = action.payload.name
            state.code = action.payload.code
            state.region = action.payload.region
            state.active = action.payload.active
            state.mapState = { center: [action.payload.latitude, action.payload.longitude], zoom: 10 }
        }
    },
});

export const teritoryAction = { ...teritoryReducer.actions };
export default teritoryReducer.reducer;
