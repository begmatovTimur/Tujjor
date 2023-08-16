import { takeLatest, takeEvery, select, put, call } from "redux-saga/effects";
import apiCall from "../../Config/apiCall";
import { teritoryAction } from "../reducers/teritoryReducer";
import { ErrorNotify } from "../../tools/Alerts";
import { SuccessNotify } from "../../tools/Alerts";
import customerCategory, {
  customerCategoryActions,
} from "../reducers/customerCategoryReducer";
function* addCategory(action) {
  const currentState = yield select((state) => state.customerCategory);
  if (
    action.payload.name === "" ||
    action.payload.region === "" ||
    action.payload.code === "" ||
    action.payload.description === ""
  ) {
    ErrorNotify("Please fill all fields!");
  } else {
    if (currentState.itemForTeritoryEdite !== "") {
      const res = yield apiCall(
        `/customer-category/${currentState.itemForTeritoryEdite.id}`,
        "PUT",
        action.payload
      );
      yield getCategories();
      yield put(customerCategoryActions.changeModal(false));
      yield put(teritoryAction.resetAllTeritoryData());
    } else {
      const res = yield apiCall("/customer-category", "POST", action.payload);
      SuccessNotify("Category added Successfully!");
      yield getCategories();
      yield put(customerCategoryActions.changeModal(false));
      yield put(customerCategoryActions.resetAllCategoryData());
    }
  }
}
function* getCategories(action) {
  try {
    const res = yield apiCall("/customer-category", "GET", null);
    yield put(customerCategoryActions.getCategoriesSuccess({ res: res.data }));
  } catch (err) {
    yield put(customerCategoryActions.yourActionFailureCategories(err.message));
  }
}
export function* customerCategorySaga() {
  yield takeLatest("customerCategory/saveCategory", addCategory);
  yield takeEvery("customerCategory/getCategory", getCategories);
}
