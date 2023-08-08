import {createSlice} from "@reduxjs/toolkit";

const clientsReducer = createSlice({
    name: "clients",
    initialState: {
        data:[],
        openModal: false,
        template: null,
        mapState: {center: [0, 0], zoom: 0},
        longitute: 0,
        latitute: 0,
        regions:[],
        teritories: [],
        customCategories: [],
        errMessage: "",
        teritoryId: "",
        name: "",
        address: "",
        telephone: "",
        tin: "",
        active: false,
        categoryId: 0,
        companyName: "",
        referencePoint: "",
        error:"",
        editeClient:""
    },
    reducers: {
        openModal: (state, action) => {
            state.openModal = true
        },
        closeModal: (state, action) => {
            state.openModal = false
            state.teritoryId = "";
            state.name = "";
            state.address = "";
            state.categoryId = 0;
            state.telephone = "";
            state.tin = "";
            state.active = false;
            state.categoryId = 0;
            state.companyName = "";
            state.referencePoint = ""
            state.longitute = "";
            state.latitute = "";
            state.editeClient = "";
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
            state.data = action.payload
        },
        yourActionFailureClients:(state, action)=>{
            state.error = action.payload
        },
        yourActionFailureTeritories:(state, action)=>{
            state.errMessage = action.payload
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
        changeCategoryId:(state, action)=>{
            state.categoryId = action.payload;
        },
        changeTin:(state, action)=>{
            state.tin = action.payload;
        },
        changeActive:(state, action)=>{
            state.active = action.payload;
        },
        changeCompanyName:(state, action)=>{
            state.companyName = action.payload;
        },
        changeReferencePoint:(state, action)=>{
            state.referencePoint = action.payload;
        },
        getCustomCategory:(state, action)=>{

        },
        getCustomCategorySuccess:(state, action)=>{
            state.customCategories = action.payload;
        },
        yourActionFailureCustomCategory:(state, action)=>{
            state.error = action.payload;
        },
        resetAllClientsData:(state, action)=>{
            state.teritoryId = "";
            state.name = "";
            state.address = "";
            state.telephone = "";
            state.tin = "";
            state.active = false;
            state.categoryId = 0;
            state.companyName = "";
            state.referencePoint = ""
            state.longitute = "";
            state.latitute = "";
            state.editeClient = "";
        },
        saveClients:(state, action)=>{
            action.payload = {
                territoryId: state.teritoryId,
                name: state.name,
                address: state.address,
                phone: state.telephone,
                tin: state.tin,
                active: state.active,
                categoryId: state.categoryId,
                companyName: state.companyName,
                referencePoint: state.referencePoint,
                longitude: state.longitute,
                latitude: state.latitute,
            }
        },
        editeClients:(state, action)=>{
            state.editeClient = action.payload
            state.openModal = true;
            state.teritoryId = action.payload;
            state.name = action.payload.clientName;
            state.address = action.payload.address;
            state.telephone = action.payload.telephone;
            state.tin = action.payload;
            state.active = action.payload.active;
            state.categoryId = action.payload;
            state.companyName = action.payload.companyName;
            state.longitute = action.payload.longitude;
            state.latitute = action.payload.latitude;
        }
    }
})
export const clientsAction = {...clientsReducer.actions};

export default clientsReducer.reducer