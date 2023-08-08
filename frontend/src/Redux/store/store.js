import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../sagas/rootSaga";
import loginReducer from "../reducers/loginReducer";
import dashboardDataReducer from "../reducers/dashboardDataReducer";
import tableReducer from '../reducers/tableReducer';
import settingsReducer from '../reducers/settingsReducer';
import teritoryReducer from "../reducers/teritoryReducer";
import dropdownReducer from '../reducers/dropdownReducer';
import customerCategoryReducer from "../reducers/customerCategoryReducer";
import customerCategory from "../reducers/customerCategoryReducer";
import companyProfile from "../reducers/companyProfile";
import companyProfileReducer from "../reducers/companyProfile";
import clientsReducer from "../reducers/clientsReducer";
const sagaMiddleware = createSagaMiddleware();

const store =  configureStore({
    reducer: {
        loginReducer,
        dashboardDataReducer,
        table:tableReducer,
        settings:settingsReducer,
        teritory:teritoryReducer,
        dropdown:dropdownReducer,
        customerCategory:customerCategory,
        companyProfile:companyProfileReducer,
        clients: clientsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store

