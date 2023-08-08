import {createSlice} from "@reduxjs/toolkit";

const customerCategory = createSlice({
    initialState: {
        openModal: false,
        template: null,
        mapState: {center: [0, 0], zoom: 0},
        code: "",
        active: false,
        region: "",
        categories: [],
        error: "",
        description:"",
        itemForTeritoryEdite: "",
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
            state.title = ""
            state.code = ""
            state.region = ""
            state.name = "";
            state.description = "";
            state.active = false
            state.mapState = {center: [[0], [1]], zoom: 10}
            state.itemForTeritoryEdite = ""
        },
        getCategory: (state, action) => {

        },
        getCategoriesSuccess: (state, action) => {
            state.categories = action.payload.res;
        },
        yourActionFailureCategories: (state, action) => {
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
        clearAllCategory: (state, action) => {
            state.longitute = 0;
            state.latitute = 0;
            state.mapState = {center: [[0], [1]], zoom: 10}
        },
        changeModal: (state, action) => {
            state.openModal = action.payload
        },
        resetAllCategoryData: (state, action) => {
            state.title = ""
            state.code = ""
            state.region = ""
            state.description = "";
            state.name = "";
            state.active = false
            state.itemForTeritoryEdite = ""
        },
        saveCategory: (state, action) => {

            action.payload = {
                name: state.name,
                description:state.description,
                region: state.region,
                code: state.code,
                active: state.active,
            }
        },
        editeCategory: (state, action) => {
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

export const customerCategoryActions = {...customerCategory.actions};
export default customerCategory.reducer;
