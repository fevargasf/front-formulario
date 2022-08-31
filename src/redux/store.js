import { configureStore, getDefaultMiddleware ,compose,applyMiddleware} from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import saga from './sagas/sagas'
import reducers from "./reducers/reducers"
import { offline, createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from "redux-persist";
import storage from "redux-persist/lib/storage";


let sagaMiddleware = createSagaMiddleware();
//const { middleware, enhanceStore } = createOffline(offlineConfig);

const effect = (effectData, _action) => {
    const defaultRequest = offlineConfig.effect;
    const { customRequest } = effectData;
    if (customRequest) return customRequest(effectData);
    return defaultRequest(effectData, _action);
  };

  const offlineMiddleware = offline({ ...offlineConfig, effect });

const persistConfig = {
    key: "root",
    version: 1,
    storage,
   // blackList:['information']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getConfigMiddleware) => {
        return getConfigMiddleware({
            thunk: false,
            immutableCheck: false,
            thunk:false,
        }).prepend(sagaMiddleware).append(offlineMiddleware);
    }
})
  /* enhancers: (defaultEnhancers) => {
        return [offline, ...defaultEnhancers]
    } */
sagaMiddleware.run(saga)
export let persistor = persistStore(store);
export default store;