import {createSlice} from "@reduxjs/toolkit";

const clientsReducer = createSlice({
    name:"clients",
    initialState:{
        openModal: false,
        template: null,
        mapState: { center: [0, 0], zoom: 0 },
        longitute: 0,
        latitute: 0,
    },
    reducers:{
        openModal:(state, action)=>{
            state.openModal = true
        },
        closeModal:(state, action)=>{
            state.openModal = false
        },
        handleTemplate:(state, action)=>{
            state.template = action.payload
            state.longitute = state.template[0]
            state.latitute = state.template[1]
            // console.log("longitute: "+ state.longitute, "latitute"+ state.latitute)
        },
        handleMapState:(state, action)=>{
            state.mapState = action.payload
        },
        clearAllclients:(state, action)=>{
            state.longitute = 0;
            state.latitute = 0;
            state.mapState = { center: [0, 1], zoom: 10 }
        },
    }
})
export const clientsAction = {...clientsReducer.actions};

export default clientsReducer.reducer