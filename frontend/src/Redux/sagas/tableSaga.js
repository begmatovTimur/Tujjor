import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { tableActions } from "../reducers/tableReducer"; // Make sure to import tableActions from the correct path
import apiCall from "../../Config/apiCall"; // Make sure to import tableActions from the correct path
function* changeSizeOfPage(action) {
  const LIMIT = action.payload.size;
  const SIZE_OF_PAGE = action.payload.page;
  let api = action.payload.api;
  api = api.replace("{page}", SIZE_OF_PAGE).replace("{limit}", LIMIT);
  const { data } = yield axios.get(api);
  yield put({
    type: "table/changeData",
    payload: {
      data,
      size: LIMIT
    },
  });
}
function downloadExcelFile(action) {
}
function* tableSaga() {
  yield takeEvery(tableActions.changePaginationTo.type, changeSizeOfPage);
  yield takeEvery(tableActions.getExcelFile.type,downloadExcelFile);
}

export default tableSaga;
