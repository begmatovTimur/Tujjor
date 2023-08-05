import axios from "axios";
import {saveAs} from 'file-saver';
import { select,call, put, takeEvery } from "redux-saga/effects";
import apiCall from '../../Config/apiCall';
import { tableActions } from "../reducers/tableReducer"; // Make sure to import tableActions from the correct path
import Cookie from 'js-cookie';

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
  console.log(x.quickSearch + "a")
  let obj = {
    active : currentState.formInputs.active!==""?currentState.formInputs.active.value: currentState.formInputs.active,
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
  const currentState = yield select((state) => state.table);
  const LIMIT = action.payload.size;
  const SIZE_OF_PAGE = action.payload.page;
  let api = action.payload.api;
  api = api.replace("{page}", SIZE_OF_PAGE-1).replace("{limit}", LIMIT);
  let obj = {
    active : currentState.formInputs.active!==""?currentState.formInputs.active.value: currentState.formInputs.active,
    quickSearch:currentState.formInputs.quickSearch
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
function* downloadExcelFile(action) {
  const currentState = yield select((state) => state.table);
  const x = currentState.formInputs
  let obj = {
    active : x.active.value,
    quickSearch:x.quickSearch
  }
  if(obj.active===undefined) obj.active = "ALL";
  console.log(obj);
  axios
  .get("http://localhost:8080/api/territory/excel", { responseType: 'blob', headers:{
    active:obj.active,
    quickSearch:obj.quickSearch,
  }})
  .then((res) => {
    const file = new Blob([res.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(file, "territory.xlsx");
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
