import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tableReducer = createSlice({
  initialState: {
    columns: [],
    sizeOfPage: 10,
    copyOfColumns: [],
    currentDraggingColumn: 0,
    data: [],
    currentPage: 0,
    columnOrderModalVisibility: false,
    modalColumns:[],
    formInputs:{
      active : "",
      city: [],
      weekDays: [],
      tin: "",
      customerCategories:[],
      quickSearch:""
    }
  },
  name: "table",
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
      const { action } = stateAction.payload;
      if (state.columns.length === 0) state.columns = state.copyOfColumns;
      if (action.action === "clear") {
        state.columns.map((item) => {
          item.show = true;
        });
      } else if (action.action === "select-option") {
        let i = 0;
        state.columns.map((item) => {
          if (item.show === false) i++;
          if (action.option.value === item.id) {
            item.show = false;
          }
        });
        if (i === state.columns.length - 1) {
          state.copyOfColumns = state.columns;
          state.columns = [];
        }
      } else if (
        action.action === "remove-value" ||
        action.action === "pop-value"
      ) {
        state.columns.map((item) => {
          if (item.id === action.removedValue.value) {
            item.show = true;
          }
        });
      }
      state.modalColumns = state.columns;
    },
    chageSizeOfPage: (state, action) => {},
    changeData: (state, action) => {
      state.data = action.payload.data;
      state.sizeOfPage = action.payload.size;
    },
    handlePageChange: (state, action) => {
      state.currentPage = action.payload;
    },
    changePage: (state, action) => {
      if (
        action.payload.current !== -1 &&
        action.payload.current != action.payload.size
      ) {
        state.currentPage = action.payload.current;
      }
    },
    dropColumn: (state, action) => {
      const { currentDraggingColumn } = state;
      const draggedElementIndex = currentDraggingColumn;
      const droppedElementIndex = action.payload;

      [state.modalColumns[draggedElementIndex], state.modalColumns[droppedElementIndex]] =
        [
          state.modalColumns[droppedElementIndex],
          state.modalColumns[draggedElementIndex],
        ];

      state.currentDraggingColumn = -1;
    },
    setModalColumns:(state,action)=>{
      state.modalColumns = action.payload;
    },
    saveColumnOrder:(state,action)=>{
      state.columns = state.modalColumns;
    },
    changeInputForms:(state,action)=>{
      state.formInputs = action.payload
    },
    getFilteredData:(state, action)=>{

    }
  },
});

export const tableActions = { ...tableReducer.actions };
export default tableReducer.reducer;
