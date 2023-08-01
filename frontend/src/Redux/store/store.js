import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "../sagas/rootSaga";
import loginReducer from "../reducers/loginReducer";
import tableReducer from '../reducers/tableReducer';
import settingsReducer from '../reducers/settingsReducer';
import teritoryReducer from "../reducers/teritoryReducer";

const sagaMiddleware = createSagaMiddleware();

const store =  configureStore({
    reducer: {
        loginReducer,
        table:tableReducer,
        settings:settingsReducer,
        teritory:teritoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store

