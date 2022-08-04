import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import saga from './sagas/sagas'

import reducers from "./reducers/reducers"

let sagaMiddleware = createSagaMiddleware();

const middleware = [
    ...getDefaultMiddleware(),
    sagaMiddleware
];

const store = configureStore({
    reducer: reducers,
    middleware,
})

sagaMiddleware.run(saga)

export default store;