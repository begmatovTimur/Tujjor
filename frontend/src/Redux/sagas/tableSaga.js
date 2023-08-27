    import axios from "axios";
import {saveAs} from "file-saver";
import apiCall, {domen} from "../../Config/apiCall";
import {tableActions} from "../reducers/tableReducer"; // Make sure to import tableActions from the correct path
import {call, put, delay, select, takeEvery} from "redux-saga/effects";

function* watchGetFilteredData(action) {
    const currentState = yield select((state) => state.table);
    const x = currentState.formInputs;
    let obj = {
        active: getActiveArray(x.active),
        city: x.city,
        allWeeks: x.allWeeks.value,
        weekDays: x.weekDays,
        tin: x.tin.value ? x.tin.value : x.tin,
        customerCategories: x.customerCategories,
        quickSearch: x.quickSearch,
    };
    yield put(tableActions.setLoading(true));
    yield delay(400);
    yield put(tableActions.setLoading(false));
    let api = currentState.paginationApiState;
    api = api.replace("{page}", 0).replace("{limit}", currentState.limit);
    console.log(api)
    const res = yield apiCall(api, "get", null, JSON.stringify(obj));
    yield put(tableActions.changeCurrentPage(1));
    yield put(
        tableActions.changeTotalPages(
            currentState.limit === "All" ? "" : res.data.totalPages
        )
    );
    yield put(
        tableActions.changeData({
            data: res.data.content,
        })
    );
}

    function getActiveArray(value) {
    let myArr = []
    myArr.push(value)
    if (myArr[0] === "") {
        myArr = []
        myArr.push(true, false)
    }
    return myArr
}

function* watchQuickSearchData(action) {
    const currentState = yield select((state) => state.table);
    const x = currentState.formInputs;
    let obj = {
        active: getActiveArray(x.active),
        quickSearch: x.quickSearch,
        city: x.city,
        weekDays: x.weekDays,
        tin: x.tin.value ? x.tin.value : x.tin,
        customerCategories: x.customerCategories,
    };
    let api = currentState.paginationApiState;
    api = api.replace("{page}", 0).replace("{limit}", currentState.limit);
    const res = yield apiCall(api, "get", null, JSON.stringify(obj));
    yield put(
        tableActions.changeTotalPages(
            currentState.limit === "All" ? "" : res.data.totalPages
        )
    );
    yield put(tableActions.changeCurrentPage(1));
    yield put(
        tableActions.changeData({
            data: res.data.content,
        })
    );
}

function* changeSizeOfPage(action) {
    const currentState = yield select((state) => state.table);
    const LIMIT = action.payload.size;
    const SIZE_OF_PAGE = action.payload.page;
    let api = currentState.paginationApiState;
    api = api.replace("{page}", SIZE_OF_PAGE - 1).replace("{limit}", LIMIT);
    const x = currentState.formInputs;
    let obj = {
        active: getActiveArray(x.active),
        quickSearch: currentState.formInputs.quickSearch,
        city: "",
        weekDays: x.weekDays,
        tin: x.tin.value ? x.tin.value : x.tin,
        customerCategories: x.customerCategories,
    };
    const res = yield call(apiCall, api, "get", null, JSON.stringify(obj));
    yield put(
        tableActions.changeTotalPages(LIMIT === "All" ? "" : res.data.totalPages)
    );
    yield put({
        type: "table/changeData",
        payload: {
            data: res.data.content,
        },
    });
}

function* downloadExcelFile(action) {
    yield put({type: tableActions.setLoading.type, payload: true});
    yield delay(1000);
    const currentState = yield select((state) => state.table);
    const {columns} = yield select((state) => state.table);
    let columnsTitle = columns
        .filter(
            (item) => item.show === true && item.type != "jsx" && item.type != "index"
        )
        .map((item) => item.title)
        .join(".");

    const x = currentState.formInputs;
    let obj = {
        active: getActiveArray(x.active),
        city: x.city,
        allWeeks: x.allWeeks.value,
        weekDays: x.weekDays,
        tin: x.tin.value ? x.tin.value : x.tin,
        customerCategories: x.customerCategories,
        quickSearch: x.quickSearch,
        page:currentState.currentPage,
        limit:currentState.limit
    };
    if (obj.active === null) obj.active = "ALL";
    if (action.payload.excelWithoutSearch) {
        axios
            .get(
                domen +
                action.payload.path +
                "columns=" +
                JSON.stringify(columnsTitle),
                {
                    responseType: "blob",
                    headers: {
                        searchParam: JSON.stringify(obj),
                        token: localStorage.getItem("access_token"),
                    },
                }
            )
            .then((res) => {
                const file = new Blob([res.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                saveAs(file, action.payload.fileName + ".xlsx");
            });
    } else {
        axios
            .get(
                domen +
                action.payload.path +
                "columns=" +
                JSON.stringify(columnsTitle),
                {
                    responseType: "blob",
                    headers: {
                        searchParam: JSON.stringify(obj),
                        token: localStorage.getItem("access_token"),
                    },
                }
            )
            .then((res) => {
                const file = new Blob([res.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                saveAs(file, action.payload.fileName + ".xlsx");
            });
    }
    yield put({type: tableActions.setLoading.type, payload: false});
}

function* watchGetActiveData(action) {
    const currentState = yield select((state) => state.table);
    const x = currentState.formInputs;
    let obj = {
        active: getActiveArray(x.active),
        quickSearch: x.quickSearch,
        city: x.city,
        weekDays: x.weekDays,
        tin: x.tin.value ? x.tin.value : x.tin,
        customerCategories: x.customerCategories,
    };
    yield put(tableActions.setLoading(true));
    yield delay(400);
    yield put(tableActions.setLoading(false));
    let api = currentState.paginationApiState;
    api = api.replace("{page}", 0).replace("{limit}", currentState.limit);
    const res = yield call(apiCall, api, "get", null, JSON.stringify(obj));
    yield put(tableActions.changeCurrentPage(1));
    yield put(
        tableActions.changeTotalPages(
            currentState.limit === "All" ? "" : res.data.totalPages
        )
    );
    yield put(
        tableActions.changeData({
            data: res.data.content,
        })
    );
}

function* watchloading() {
    yield put({type: tableActions.setLoading.type, payload: true});
    yield delay(1000);
    yield put({type: tableActions.setLoading.type, payload: false});
}

function* tableSaga() {
    yield takeEvery(tableActions.changePaginationTo.type, changeSizeOfPage);
    yield takeEvery(tableActions.getExcelFile.type, downloadExcelFile);
    yield takeEvery(tableActions.getQuickSearchData.type, watchQuickSearchData);
    yield takeEvery(tableActions.getFilteredData.type, watchGetFilteredData);
    yield takeEvery(tableActions.getActiveData.type, watchGetActiveData);
    yield takeEvery(tableActions.loading.type, watchloading);
}

export default tableSaga;