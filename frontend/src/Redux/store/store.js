import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../sagas/rootSaga";
import loginReducer from "../reducers/loginReducer";
import dashboardDataReducer from "../reducers/dashboardDataReducer";

const sagaMiddleware = createSagaMiddleware();

const store =  configureStore({
    reducer: {
        loginReducer,
        dashboardDataReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store

