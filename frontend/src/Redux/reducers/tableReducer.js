import { createSlice } from "@reduxjs/toolkit";

const tableReducer = createSlice({
  name: "table",
  initialState: {
    columns: [],
    layer: false,
    sizeOfPage: 1,
    localPath: "",
    copyOfColumns: [],
    currentDraggingColumn: 0,
    dragOverColumn: -1,
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
      allWeeks: "",
      weekDays: [],
      tin: "",
      customerCategories: [],
      quickSearch: "",
      offset: "",
    },
    totalPages: "",
    selectedForms: {
      customerCategories: [],
      city: [],
    },
  },
  reducers: {
    setCurrentDraggingColumn: (state, action) => {
      state.currentDraggingColumn = action.payload;
    },
    addPlace: (state, action) => {
      state.dragOverColumn = action.payload;
    },
    removePlace: (state) => {
      state.dragOverColumn = -1;
      state.dragOverStable = false;
    },
    setDragOverStable: (state, action) => {
      state.dragOverStable = action.payload;
    },
    setLayer: (state, action) => {
      state.layer = action.payload;
    },
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    claimData: (state, action) => {
      let i = 0;
      
      action.payload.columns.map(item=>{
        if(item.show===false)i++;
      })
      if(i===(action.payload.columns.length)) {
        state.columns = [];
        localStorage.removeItem(state.localPath)
      }
      else state.columns = action.payload.columns;
      state.data = action.payload.data;
      state.copyOfColumns = action.payload.columns;
      state.modalColumns = action.payload.columns;
      state.localPath = action.payload.localPath;
    },
    emptyFilters:(state,action)=>{
      state.selectedForms = {
        customerCategories: [],
        city: [],
      }
      state.formInputs= {
        active: "",
        city: [],
        allWeeks: "",
        weekDays: [],
        tin: "",
        customerCategories: [],
        quickSearch: "",
        offset: "",
      }
    },
    setColumnModalVisibility: (state, action) => {
      state.columnOrderModalVisibility = action.payload;
    },
    setCurrentDragingColumn: (state, action) => {
      state.currentDraggingColumn = action.payload;
    },
    filterVisibility: (state, action) => {
      if (state.columns.length === 0) {
        state.columns = state.copyOfColumns;
      }
      let i = 0;
      state.columns.forEach((item) => {
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
        localStorage.removeItem(state.localPath);
      } else {
        localStorage.setItem(
          state.localPath,
          JSON.stringify(
            state.columns.map((item, index) => ({
              id: item.id,
              show: item.show,
            }))
          )
        );
      }
      state.modalColumns = state.columns;
    },
    changePaginationTo: (state, action) => {
      state.limit = action.payload.size;
      state.page = action.payload.page;
      state.paginationApi1 = action.payload.api;
    },
    changeData: (state, action) => {
      state.data = action.payload.data;
      state.sizeOfPage = action.payload.size;
    },
    changeTotalPages: (state, action) => {
      state.totalPages = action.payload;
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
      const { currentDraggingColumn } = state;
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
      localStorage.setItem(
        state.localPath,
        JSON.stringify(
          state.columns.map((item, index) => ({ id: item.id, show: item.show }))
        )
      );
    },
    changeSelectedForms: (state, action) => {
      state.selectedForms = action.payload;
    },
    reorderColumns: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const updatedColumns = [...state.modalColumns];
      const [draggedColumn] = updatedColumns.splice(sourceIndex, 1);
      updatedColumns.splice(destinationIndex, 0, draggedColumn);

      state.modalColumns = updatedColumns;
    },
    changeQuickSearch: (state, action) => {
      state.formInputs.quickSearch = action.payload;
    },
    getQuickSearchData: (state, action) => {},
    getActiveData: (state, action) => {},
    changeLoadingActive: (state, action) => {
      state.isLoading = action.payload;
    },
    changeInputForms: (state, action) => {
      state.formInputs = action.payload;
    },
    getFilteredData: (state, action) => {},
    getExcelFile: (state, action) => {},
    resetFormInputs: (state, action) => {
      state.formInputs.active = "";
      state.formInputs.city = [];
      state.formInputs.allWeeks = "";
      state.formInputs.weekDays = [];
      state.formInputs.tin = "";
      state.formInputs.customerCategories = [];
      state.formInputs.quickSearch = "";
      state.formInputs.offset = "";
    },
  },
});

export const tableActions = { ...tableReducer.actions };
export default tableReducer.reducer;
