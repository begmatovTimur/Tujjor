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
            state.code = ""
            state.region = ""
            state.name = "";
            state.description = "";
            state.active = false
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
            state.name = ""
            state.description = ""
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
        }
    },
});

export const customerCategoryActions = {...customerCategoryReducer.actions};
export default customerCategoryReducer.reducer;
