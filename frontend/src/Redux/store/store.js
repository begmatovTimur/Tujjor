import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../ConnectionSagas/rootSaga";
import loginReducer from "../../pages/Login/Redux/Reducers/loginReducer";
import dashboardDataReducer from "../../pages/Admin/Redux/Reducers/dashboardDataReducer";
import tableReducer from '../../pages/universal/Table/Redux/Reducers/tableReducer';
import settingsReducer from '../../pages/Settings/Redux/Reducers/settingsReducer';
import teritoryReducer from "../../pages/Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import dropdownReducer from '../../pages/Admin/Redux/Reducers/dropdownReducer';
import customerCategory from "../../pages/Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer";
import companyProfileReducer from "../../pages/Settings/ChildComponents/Company/Redux/Reducers/companyProfileReducer";
import clientsReducer from "../../pages/Clients/Redux/Reducers/clientsReducer";

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

