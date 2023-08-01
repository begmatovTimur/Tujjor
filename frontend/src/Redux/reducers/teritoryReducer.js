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
    },
    name: "teritory",
    reducers: {
        handleOpen:(state, action)=>{
            state.openModal = !state.openModal
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
            state.mapState = { center: [[0], [1]], zoom: 10 }
        },
        saveTeritory:(state, action)=>{
            if (state.title === "" || state.region === "" || state.code === "" || state.longitute === 0 || state.latitute === 0){
                alert("Iltimos malumotlarni yo'liq kiriting!!!")
            }else {
                let obj = {
                    title: state.title,
                    region: state.region,
                    code: state.code,
                    active: state.active,
                    longitute: state.longitute,
                    latitute: state.latitute,
                }



                state.longitute = 0
                state.latitute = 0
                state.title = ""
                state.code = ""
                state.region = ""
                state.active = false
                state.openModal = false
                state.mapState = { center: [[0], [1]], zoom: 10 }
            }
        }
    },
});

export const teritoryAction = { ...teritoryReducer.actions };
export default teritoryReducer.reducer;
