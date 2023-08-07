import {createSlice} from "@reduxjs/toolkit";

const clientsReducer = createSlice({
    name: "clients",
    initialState: {
        clients:[],
        openModal: false,
        template: null,
        mapState: {center: [0, 0], zoom: 0},
        longitute: 0,
        latitute: 0,
        teritories: [],
        errMessage: "",
        teritoryId: "",
        name: "",
        address: "",
        telephone: "",
        tin: "",
        active: false,
        categoriesId: "",
        companyName: "",
        referencePoint: "",
        error:""
    },
    reducers: {
        openModal: (state, action) => {
            state.openModal = true
        },
        getTeritories:(state, action)=>{

        },
        getSuccessAllTeritories:(state, action)=>{
            state.teritories = action.payload.res
        },
        yourActionFailureTeritories:(state, action)=>{
            state.errMessage = action.payload
        },
        closeModal:(state, action)=>{
            state.openModal = false
        },
        handleTemplate: (state, action) => {
            state.template = action.payload
            state.longitute = state.template[0]
            state.latitute = state.template[1]
            // console.log("longitute: "+ state.longitute, "latitute"+ state.latitute)
        },
        handleMapState: (state, action) => {
            state.mapState = action.payload
        },
        clearAllclients: (state, action) => {
            state.longitute = 0;
            state.latitute = 0;
            state.mapState = {center: [0, 1], zoom: 10}
        },
        getClients: (state, action) => {

        },
        getClientsSuccess:(state,action)=>{
            state.clients = action.payload
        },
        yourActionFailureClients:(state, action)=>{
            state.error = action.payload
        },
        changeTeritoryId:(state, action)=>{
            state.teritoryId = action.payload;
        },
        changeName:(state, action)=>{
            state.name = action.payload;
        },
        changeAddress:(state, action)=>{
            state.address = action.payload;
        },
        changeTelephone:(state, action)=>{
            state.telephone = action.payload;
        },
        changeTin:(state, action)=>{
            state.tin = action.payload;
        },
        changeActive:(state, action)=>{
            state.active = action.payload;
        },
        changeCategoriesId:(state, action)=>{
            state.categoriesId = action.payload;
        },
        changeCompanyName:(state, action)=>{
            state.companyName = action.payload;
        },
        changeReferencePoint:(state, action)=>{
            state.referencePoint = action.payload;
        },
        saveClients:(state, action)=>{
            let obj = {
                teritoryId:state.teritoryId,
                name:state.name,
                address:state.address,
                telephone:state.telephone,
                tin:state.tin,
                active:state.active,
                categoriesId:state.categoriesId,
                companyName:state.companyName,
                referencePoint:state.referencePoint,
            }
            console.log(obj)
        }
    }
})
export const clientsAction = {...clientsReducer.actions};

export default clientsReducer.reducer