import {createSlice} from "@reduxjs/toolkit";

const customerCategoryReducer = createSlice({
    initialState: {
        openModal: false,
        code: "",
        name: "",
        active: false,
        region: "",
        categories: [],
        error: "",
        description:"",
        itemForCustomerCategoryEdite: "",
        image:"",
        fileVal:""
    },
    name: "customerCategory",
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
            state.code = ""
            state.region = ""
            state.name = "";
            state.fileVal = "";
            state.image = "";
            state.hasImage = "";
            state.description = "";
            state.active = false
            state.itemForCustomerCategoryEdite = ""
        },
        getCategory: (state, action) => {

        },
        getCategoriesSuccess: (state, action) => {
            state.categories = action.payload.res;
        },
        yourActionFailureCategories: (state, action) => {
            state.error = action.payload
        },
        handleTitle: (state, action) => {
            state.title = action.payload
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
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllCategoryData: (state, action) => {
            state.title = ""
            state.code = ""
            state.region = ""
            state.name = "";
            state.description = "";
            state.image = "";
            state.fileVal = "";
            state.active = false
            state.itemForCustomerCategoryEdite = ""
        },
        saveCategory: (state, action) => {
            action.payload = {
                name: state.name,
                description:state.description,
                region: state.region,
                code: state.code,
                active: state.active,
                photoId: state.image
            }
        },
        editeCategory: (state, action) => {
            state.itemForCustomerCategoryEdite = action.payload
            state.openModal = true
            state.name = action.payload.name
            state.code = action.payload.code
            state.description = action.payload.description;
            state.region = action.payload.region
            state.active = action.payload.active
            state.image = action.payload.photoId
        },
        handlePhoto:(state, action)=>{
            state.fileVal = action.payload
        },
        saveOptionPhoto:(state, action)=>{
            state.selectedOption = action.payload
        },
        changeImage:(state, action)=>{
            state.image = action.payload
        },
        changeSelectedOption:(state, action)=>{
            state.selectedOption = action.payload
        },
        getPhoto:(state, action)=>{

        }
    },
});

export const customerCategoryActions = {...customerCategoryReducer.actions};
export default customerCategoryReducer.reducer;
