import {createSlice} from "@reduxjs/toolkit";

const clientsReducer = createSlice({
    name: "clients",
    initialState: {
        clients:[],
        openModal: false,
        template: "",
        mapState: { center: ["",""], zoom: 10 },
        defaultCenter: [39.7756, 64.4253],
        longitute: "",
        latitute: "",
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
        isLoading:false,
        categoriesId: 0,
        categoryId: "",
        companyName: "",
        referencePoint: "",
        error:"",
        editeClient:"",
        allDataForClientOnTheMap:[],
        showActiveClient: true,
        showUnActiveClient:true,
        showTerritory: true,
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
            state.categoryId = "";
            state.telephone = "";
            state.tin = "";
            state.active = false;
            state.categoryId = "";
            state.companyName = "";
            state.referencePoint = ""
            state.longitute = "";
            state.latitute = "";
            state.editeClient = "";
            state.mapState = { center: ["",""], zoom: 10 };
            state.defaultCenter = [39.7756, 64.4253];
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
            state.longitute = "";
            state.latitute = "";
            state.mapState = { center: ["",""], zoom: 10 };
        },
        getClients: (state, action) => {

        },
        getClientsSuccess:(state,action)=>{
            state.clients = action.payload
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
            state.categoryId = "";
            state.companyName = "";
            state.referencePoint = ""
            state.longitute = "";
            state.latitute = "";
            state.editeClient = "";
            state.defaultCenter = [39.7756, 64.4253];
            state.mapState = { center: ["",""], zoom: 10 };
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
            state.teritoryId = action.payload.territoryId;
            state.name = action.payload.clientName;
            state.address = action.payload.address;
            state.telephone = action.payload.telephone;
            state.tin = action.payload.tin;
            state.active = action.payload.active;
            state.categoryId = action.payload.categoryId;
            state.companyName = action.payload.companyName;
            state.longitute = action.payload.longitude;
            state.latitute = action.payload.latitude;
            state.defaultCenter = [action.payload.latitude, action.payload.longitude]
            state.mapState = { center: [action.payload.latitude, action.payload.longitude], zoom: 10 }
        },
        changeLoadingActive: (state, action)=> {
            state.isLoading = action.payload
        },
        changeShowActiveClient: (state)=> {
            state.showActiveClient = true;
            state.showUnActiveClient = false;
            state.showTerritory = false;
        },
        changeShowUnActiveClient: (state)=> {
            state.showActiveClient = false;
            state.showUnActiveClient = true;
            state.showTerritory = false;
        },
        changeShowTerritory: (state)=> {
            state.showActiveClient = false;
            state.showUnActiveClient = false;
            state.showTerritory = true;
        },
        changeAllLocation: (state)=> {
            state.showActiveClient = true;
            state.showUnActiveClient = true;
            state.showTerritory = true;
        },
    }
})
export const clientsAction = {...clientsReducer.actions};

export default clientsReducer.reducer