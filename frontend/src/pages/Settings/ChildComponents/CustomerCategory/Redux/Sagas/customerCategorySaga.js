import {put, select, takeEvery, takeLatest} from "redux-saga/effects";
import apiCall, {domen} from "../../../../../../Config/apiCall";
import {ErrorNotify, SuccessNotify} from "../../../../../../tools/Alerts";
import {customerCategoryActions,} from "../Reducers/customerCategoryReducer";
import axios from "axios";

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
        yield put(customerCategoryActions.getCategoriesSuccess({res: res.data}));
    } catch (err) {
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}

function* getPhoto(action) {
    try {
        const currentState = yield select((state) => state.customerCategory);
        const res = yield axios
            .get(
                domen + "/file/getFile/" + currentState.image,
                {
                    responseType: "arraybuffer",
                    headers: {
                        token: localStorage.getItem("access_token"),
                    },
                }
            )
        let file = new Blob([res.data], {
            type: "image/png",
        });
        const imageUrl = URL.createObjectURL(file);
        const imgElement = document.getElementById('imageCategory');
        imgElement.src = imageUrl;
    } catch (err) {
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}

function* saveOptionPhoto(action) {
    try {
        let formData = new FormData
        const base64ImageData = action.payload; // Your long base64 string here
        const base64Image = base64ImageData.replace(/^data:image\/(png|jpg);base64,/, '');
        const byteArray = Uint8Array.from(atob(base64Image), (c) => c.charCodeAt(0));
        const blob = new Blob([byteArray], { type: 'image/png' });
        const fileName = "image.png";
        const file =  new File([blob], fileName, { type: 'image/png' })
        formData.append("file", file)
        formData.append("prefix", "/Images/customerCategoryImages")
        const res = yield apiCall("/file/upload", "post", formData);
        yield put(customerCategoryActions.changeImage(res.data));
    } catch (err) {
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}

function* handlePhoto(action) {
    try {
        if(!action.payload.target.files[0]){
            return;
        }
        let formData = new FormData
        formData.append("file", action.payload.target.files[0])
        formData.append("prefix", "/Images/customerCategoryImages")
        const res = yield apiCall("/file/upload", "post", formData);
        yield put(customerCategoryActions.changeImage(res.data));
    } catch (err) {
        yield put(customerCategoryActions.yourActionFailureCategories(err.message));
    }
}

export function* customerCategorySaga() {
    yield takeLatest("customerCategory/saveCategory", addCategory);
    yield takeEvery("customerCategory/getCategory", getCategories);
    yield takeLatest("customerCategory/handlePhoto", handlePhoto);
    yield takeLatest("customerCategory/saveOptionPhoto", saveOptionPhoto);
    yield takeLatest("customerCategory/getPhoto", getPhoto);
}
