import axios from "axios";
import {saveAs} from 'file-saver';
import { put, takeEvery } from "redux-saga/effects";
import apiCall from '../../Config/apiCall';
import { tableActions } from "../reducers/tableReducer"; // Make sure to import tableActions from the correct path
import Cookie from 'js-cookie';
function* changeSizeOfPage(action) {
  const LIMIT = action.payload.size;
  const SIZE_OF_PAGE = action.payload.page;
  let api = action.payload.api;
  api = api.replace("{page}", SIZE_OF_PAGE - 1).replace("{limit}", LIMIT);
  const { data } = yield axios.get(api, {
    headers: {
      token: localStorage.getItem("access_token"),
    },
  });
  yield put({
    type: "table/changeData",
    payload: {
      data: data.content,
      size: LIMIT,
    },
  });
}
function* downloadExcelFile(action) {
  const res = apiCall("/territory/excel","GET",action.payload);
  
  // const file = new Blob([res.data], {
  //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  // });
  // saveAs(file, "territory.xlsx");
}
function* tableSaga() {
  yield takeEvery(tableActions.changePaginationTo.type, changeSizeOfPage);
  yield takeEvery(tableActions.getExcelFile.type, downloadExcelFile);
}

export default tableSaga;
