import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../ConnectionSagas/rootSaga";
import loginReducer from "../../pages/Login/Redux/Reducers/loginReducer";
import dashboardDataReducer from "../../pages/Admin/Redux/Reducers/dashboardDataReducer";
import clientsReducer from 'pages/Clients/Redux/Reducers/clientsReducer';

import AgentReducer from 'pages/Agents/Redux/Reducers/agentReducer';
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

