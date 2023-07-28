import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootWatcher from './sagas/rootWatcher';
import channelsReducer from './reducers/channelsReducer';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
    channels: channelsReducer,
});

const store = configureStore({
    reducer, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootWatcher);

export default store;