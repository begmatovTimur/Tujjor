import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../ConnectionSagas/rootSaga";
import clientsReducer from 'pages/Clients/Redux/Reducers/clientsReducer';
import loginReducer from 'pages/Login/Redux/Reducers/loginReducer';
import AgentReducer from 'pages/Agents/Redux/Reducers/agentReducer';
import teritoryReducer from 'pages/Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer';
import dashboardDataReducer from 'pages/Admin/Redux/Reducers/dashboardDataReducer';
import tableReducer from 'pages/universal/Table/Redux/Reducers/tableReducer';
import settingsReducer from 'pages/Settings/Redux/Reducers/settingsReducer';
import dropdownReducer from 'pages/Admin/Redux/Reducers/dropdownReducer';
import customerCategoryReducer
    from 'pages/Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer';
import companyProfileReducer from 'pages/Settings/ChildComponents/Company/Redux/Reducers/companyProfileReducer';
import telegramClientReducer from "../../pages/Telegram/Redux/Reducers/telegramClientReducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        loginReducer,
        dashboardDataReducer,
        table: tableReducer,
        settings: settingsReducer,
        teritory: teritoryReducer,
        dropdown: dropdownReducer,
        customerCategory: customerCategoryReducer,
        companyProfile: companyProfileReducer,
        clients: clientsReducer,
        agents: AgentReducer,
        telegramClients: telegramClientReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store

