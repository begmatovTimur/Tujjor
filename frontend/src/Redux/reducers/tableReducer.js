import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tableReducer = createSlice({
  initialState: {
    columns: [],
    sizeOfPage: 10,
    copyOfColumns: [],
    data: [],
    currentPage: 0,
  },
  name: "table",
  reducers: {
    claimData: (state, action) => {
      state.columns = action.payload.columns;
      state.data = action.payload.data;
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
  },
});

export const tableActions = { ...tableReducer.actions };
export default tableReducer.reducer;
