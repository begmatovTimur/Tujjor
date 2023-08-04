import axios from "axios";
import { put,select,call, takeEvery } from "redux-saga/effects";
import { tableActions } from "../reducers/tableReducer"; // Make sure to import tableActions from the correct path
import apiCall from "../../Config/apiCall"; // Make sure to import tableActions from the correct path

function downloadExcelFile(action) {

}

function* watchGetFilteredData(action){
  const currentState = yield select((state) => state.table);
  const x = currentState.formInputs
  let obj = {
    active : x.active.value,
    city: x.city,
    weekDays: x.weekDays,
    tin: x.tin.value,
    customerCategories: x.customerCategories,
    quickSearch:x.quickSearch
  }
  let api = currentState.paginationApi1
  api = api.replace("{page}", currentState.page-1).replace("{limit}", currentState.limit);
  const res = yield apiCall(
      api,
      "get",
      null,
      JSON.stringify(obj)
  )
  yield put(tableActions.changeTotalPages(res.data.totalPages))
  yield put(tableActions.changeData({
    data:res.data.content,
    size: currentState.sizeOfPage===""? 1 : currentState.sizeOfPage
  }))
}

function* watchQuickSearchData(action){
  const currentState = yield select((state) => state.table);
  const x = currentState.formInputs
  let obj = {
    active : "",
    quickSearch:x.quickSearch
  }
  let api = currentState.paginationApi1
  api = api.replace("{page}", currentState.page-1).replace("{limit}", currentState.limit);
  const res = yield apiCall(
      api,
      "get",
      null,
      JSON.stringify(obj)
  )
  yield put(tableActions.changeTotalPages(res.data.totalPages))
  yield put(tableActions.changeData({
    data:res.data.content,
    size: currentState.sizeOfPage===""? 1 : currentState.sizeOfPage
  }))
}

function* changeSizeOfPage(action) {
  const LIMIT = action.payload.size;
  const SIZE_OF_PAGE = action.payload.page;
  let api = action.payload.api;
  api = api.replace("{page}", SIZE_OF_PAGE-1).replace("{limit}", LIMIT);
  let obj = {
    active : "",
    quickSearch:""
  }
  const res = yield apiCall(
      api,
      "get",
      null,
      JSON.stringify(obj)
  )
  yield put(tableActions.changeTotalPages(res.data.totalPages))
  yield put({
    type: "table/changeData",
    payload: {
      data: res.data.content,
      size: LIMIT,
    },
  });
}

function* watchGetActiveData(action){
  const currentState = yield select((state) => state.table);
  const x = currentState.formInputs
  let obj = {
    active : x.active.value,
    quickSearch:x.quickSearch
  }
  let api = currentState.paginationApi1
  api = api.replace("{page}", currentState.page-1).replace("{limit}", currentState.limit);
  const res = yield apiCall(
      api,
      "get",
      null,
      JSON.stringify(obj)
  )
  yield put(tableActions.changeTotalPages(res.data.totalPages))
  yield put(tableActions.changeData({
    data:res.data.content,
    size: currentState.sizeOfPage
  }))
  }
function* tableSaga() {
  yield takeEvery(tableActions.changePaginationTo.type, changeSizeOfPage);
  yield takeEvery(tableActions.getExcelFile.type,downloadExcelFile);
  yield takeEvery("table/getQuickSearchData",watchQuickSearchData)
  yield takeEvery("table/getFilteredData", watchGetFilteredData);
  yield takeEvery("table/getActiveData",watchGetActiveData)
}

export default tableSaga;
