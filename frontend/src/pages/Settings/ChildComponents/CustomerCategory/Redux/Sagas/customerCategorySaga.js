import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import apiCall from "../../../../../../Config/apiCall";
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";
import {customerCategoryActions,} from "../Reducers/customerCategoryReducer";

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
    yield put(customerCategoryActions.resetAllCategoryData());
    if (currentState.itemForCustomerCategoryEdite !== "") {
      yield apiCall(
        `/customer-category/${currentState.itemForCustomerCategoryEdite.id}`,
        "PUT",
        action.payload
      );
      SuccessNotify("Category updated Successfully!");
    } else {
      const res = yield apiCall("/customer-category", "POST", action.payload);
      SuccessNotify("Category added Successfully!");
    }
  yield getCategories();
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
