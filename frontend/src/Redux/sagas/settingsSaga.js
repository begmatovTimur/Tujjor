import {put, takeEvery} from 'redux-saga/effects';
import apiCall from "../../Config/apiCall";
import settingsReducer from '../reducers/settingsReducer';


function* getAllData() {
  const { data } = yield apiCall("/settings", "GET");
  yield put({
    type:"settings/exchangeData",
    payload:{
        data,
    }
  })
}

function* settingsSaga() {
    yield takeEvery("settings/getData",getAllData);
}

export default settingsSaga;
