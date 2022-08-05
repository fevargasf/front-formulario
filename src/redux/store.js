import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import saga from './sagas/sagas'

import reducers from "./reducers/reducers"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


let sagaMiddleware = createSagaMiddleware();

const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        thunk:false,
        serializableCheck:{
            ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),
    sagaMiddleware
];

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware,
})

sagaMiddleware.run(saga)
export let persistor = persistStore(store);
export default store;