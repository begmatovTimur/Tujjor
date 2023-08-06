import {createSlice} from "@reduxjs/toolkit";

const tableReducer = createSlice({
    name: "table",
    initialState: {
        columns: [],
        layer: false,
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
            quickSearch: "",
        },
        totalPages: "",
    },
    reducers: {
        setLayer: (state, action) => {
            state.layer = action.payload;
        },
        changeCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        claimData: (state, action) => {
            state.columns = action.payload.columns;
            state.data = action.payload.data;
            state.modalColumns = action.payload.columns;
        },
        setColumnModalVisibility:
            (state, action) => {
                state.columnOrderModalVisibility = action.payload;
            },
        setCurrentDragingColumn:
            (state, action) => {
                state.currentDraggingColumn = action.payload;
            },
        filterVisibility:
            (state, action) => {
                if (state.columns.length === 0) {
                    state.columns = state.copyOfColumns;
                }
                let i = 0;
                state.columns.map((item) => {
                    if (action.payload.includes(item.title)) {
                        item.show = true;
                    } else {
                        i++;
                        item.show = false;
                    }
                });
                if (i === state.columns.length) {
                    state.copyOfColumns = state.columns;
                    state.columns = [];
                }
                state.modalColumns = state.columns;
            },
        changePaginationTo:
            (state, action) => {
                state.limit = action.payload.size;
                state.page = action.payload.page;
                state.paginationApi1 = action.payload.api;
            },
        changeData:
            (state, action) => {
                state.data = action.payload.data;
                state.sizeOfPage = action.payload.size;
            },
        changeTotalPages:
            (state, action) => {
                state.totalPages = action.payload;
            },
        changeSateOfData:
            (state, action) => {
                state.data = action.payload;
            },
        handlePageChange:
            (state, action) => {
                state.currentPage = action.payload;
            },
        changePage:
            (state, action) => {
                state.currentPage = action.payload.current;
            },
        dropColumn:
            (state, action) => {
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
            state.columnOrderModalVisibility = false;
            state.columns = state.modalColumns;
        },
        changeQuickSearch: (state, action) => {
            state.formInputs.quickSearch = action.payload;
        },
        getQuickSearchData: (state, action) => {
        },
        getActiveData: (state, action) => {
        },
        changeInputForms: (state, action) => {
            state.formInputs = action.payload;
        },
        getFilteredData: (state, action) => {
        },
        getExcelFile: (state, action) => {
        },
    },
});

export const tableActions = {...tableReducer.actions};
export default tableReducer.reducer;
