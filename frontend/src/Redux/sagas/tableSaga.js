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
  const res = yield apiCall(
      action.payload,
      "get",
      null,
      JSON.stringify(obj)
  )
  yield put(tableActions.changeData({
    data:res.data,
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
  console.log(action.payload);
  const res = yield apiCall(
    action.payload + `?page=${currentState.sizeOfPage-1}&limit=${currentState.limit}`,
    "get",
    null,
    JSON.stringify(obj)
)
  yield put(tableActions.changeData({
    data:res.data.content,
    size: currentState.sizeOfPage===""? 1 : currentState.sizeOfPage
  }))
}

function* changeSizeOfPage(action) {
  const LIMIT = action.payload.size;
  const SIZE_OF_PAGE = action.payload.page;
  let api = action.payload.api;
  console.log(api)
  api = api.replace("{page}", SIZE_OF_PAGE-1).replace("{limit}", LIMIT);
  let obj = {
    active : "",
    quickSearch:""
  }
  const { data } = yield axios.get(api,{
    headers:{
      token:localStorage.getItem("access_token"),
      searchParam: JSON.stringify(obj)
    }
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

function* watchGetActiveData(action){
  const currentState = yield select((state) => state.table);
  const x = currentState.formInputs
  let obj = {
    active : x.active.value,
    quickSearch:x.quickSearch
  }
  const res = yield apiCall(
      action.payload + `?page=${currentState.sizeOfPage-1}&limit=${currentState.limit}`,
      "get",
      null,
      JSON.stringify(obj)
  )
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
