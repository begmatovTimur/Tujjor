import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../ConnectionSagas/rootSaga";
import clientsReducer from 'pages/Clients/Redux/Reducers/clientsReducer';
import loginReducer from 'pages/Login/Redux/Reducers/loginReducer';
import AgentReducer from 'pages/Agents/Redux/Reducers/agentReducer';
import teritoryReducer from 'pages/Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer';
import dashboardDataReducer from 'pages/Admin/Redux/Reducers/dashboardDataReducer';
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
        clients: clientsReducer,
        agents: AgentReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store

