import {createSlice} from "@reduxjs/toolkit";

const tableReducer = createSlice({
    name: "table",
    initialState: {
        columns:[],
        sizeOfPage: 1,
        copyOfColumns: [],
        currentDraggingColumn: 0,
        data: [],
        currentPage: 1,
        columnOrderModalVisibility: false,
        modalColumns: [],
        limit: "",
        page: "",
        paginationApi1: "",
        formInputs: {
            active: "",
            city: [],
            weekDays: [],
            tin: "",
            customerCategories: [],
            quickSearch: ""
        }
    },
    reducers: {
        claimData: (state, action) => {
            state.columns = action.payload.columns;
            state.data = action.payload.data;
            state.modalColumns = action.payload.columns;
        },
        setColumnModalVisibility: (state, action) => {
            state.columnOrderModalVisibility = action.payload;
        },
        setCurrentDragingColumn: (state, action) => {
            state.currentDraggingColumn = action.payload;
        },
        filterVisibility: (state, stateAction) => {
            const {action} = stateAction.payload;

            

            if (state.columns.length === 0) state.columns = state.copyOfColumns;

            switch (action.action) {
                case "clear":
                    state.columns.map((item) => {
                        item.show = true;
                    });
                    break;
                case "select-option":
                    let i = 0;
                    for (let j = 0; j < state.columns.length; j++) {
                        let item = state.columns[j];
                        if (item.show === false) i++;
                        if (action.option.value === item.id) {
                            item.show = false;
                        }
                    }
                    console.log(i,state.columns.length-1)
                    if (i === state.columns.length - 1) {
                        state.copyOfColumns = state.columns;
                        state.columns = [];
                    }
                    break;
            }

            if (action.action === "remove-value" || action.action === "pop-value") {
                state.columns.map((item) => {
                    if (item.id === action.removedValue.value) {
                        item.show = true;
                    }
                });
            }
            state.modalColumns = state.columns;
        },
        changePaginationTo: (state, action) => {
            state.limit = action.payload.size
            state.page = action.payload.page
            state.paginationApi1 = action.payload.api
        },
        changeData: (state, action) => {
            state.data = action.payload.data;
            state.sizeOfPage = action.payload.size;
        },
        changeSateOfData: (state, action) => {
            state.data = action.payload;
        },
        handlePageChange: (state, action) => {
            state.currentPage = action.payload;
        },
        changePage: (state, action) => {
            state.currentPage = action.payload.current;
        },
        dropColumn: (state, action) => {
            const {currentDraggingColumn} = state;
            const draggedElementIndex = currentDraggingColumn;
            const droppedElementIndex = action.payload;

            [
                state.modalColumns[draggedElementIndex],
                state.modalColumns[droppedElementIndex],
            ] = [
                state.modalColumns[droppedElementIndex],
                state.modalColumns[draggedElementIndex],
            ];
        },
        setModalColumns: (state, action) => {
            state.modalColumns = action.payload;
        },
        saveColumnOrder: (state, action) => {
            state.columns = state.modalColumns;
        },
        changeQuickSearch: (state, action) => {
            state.formInputs.quickSearch = action.payload;
        },
        getQuickSearchData:(state, action)=>{

        },
        getActiveData:(state, action)=>{

        },
        changeInputForms: (state, action) => {
            state.formInputs = action.payload
        },
        getFilteredData: (state, action) => {

        },
        getExcelFile:(state,action)=>{

        },
    },
});

export const tableActions = {...tableReducer.actions};
export default tableReducer.reducer;
