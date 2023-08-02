import {tableActions} from "../reducers/tableReducer";
import { put, takeEvery,select } from "redux-saga/effects";
import apiCall from "../../Config/apiCall";
import axios from "axios";

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
    console.log(res)
    // yield put(tableActions.changeData(res.data))
}

function* watchQuickSearchData(action){
    const currentState = yield select((state) => state.table);
    const x = currentState.formInputs
    let obj = {
        active : "",
        quickSearch:x.quickSearch
    }
    console.log(obj)
    const res = yield apiCall(
        action.payload,
        "get",
        null,
        JSON.stringify(obj)
    )
    console.log(res)
    // yield put(tableActions.changeData(res.data))
}

function* watchGetActiveData(action){
    const currentState = yield select((state) => state.table);
    const x = currentState.formInputs
    let obj = {
        active : x.active.value,
        quickSearch:x.quickSearch
    }
    console.log(obj)
    const res = yield apiCall(
        action.payload,
        "get",
        null,
        JSON.stringify(obj)
    )
    console.log(res)
    // yield put(tableActions.changeData(res.data))
}

export function* filterSaga() {
    yield takeEvery("table/getFilteredData", watchGetFilteredData);
    yield takeEvery("table/getQuickSearchData",watchQuickSearchData)
    yield takeEvery("table/getActiveData",watchGetActiveData)
}