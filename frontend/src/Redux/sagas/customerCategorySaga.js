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
    yield put(customerCategoryActions.changeModal(false));
    if (currentState.itemForTeritoryEdite !== "") {
      const res = yield apiCall(
        `/customer-category/${currentState.itemForTeritoryEdite.id}`,
        "PUT",
        action.payload
      );
      SuccessNotify("Category updated Successfully!");
      yield put(teritoryAction.resetAllTeritoryData());
    } else {
      const res = yield apiCall("/customer-category", "POST", action.payload);
      SuccessNotify("Category added Successfully!");
      yield put(customerCategoryActions.resetAllCategoryData());
    }
  yield getCategories();
  }
}
function* getCategories(action) {
  try {
    const res = yield apiCall("/customer-category", "GET", null);
    yield put(customerCategoryActions.getCategoriesSuccess({ res: res.data.content }));
  } catch (err) {
    yield put(customerCategoryActions.yourActionFailureCategories(err.message));
  }
}
export function* customerCategorySaga() {
  yield takeLatest("customerCategory/saveCategory", addCategory);
  yield takeEvery("customerCategory/getCategory", getCategories);
}
