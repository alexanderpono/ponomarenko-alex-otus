import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer } from './appReducer';
import { all, AllEffect } from 'redux-saga/effects';
import { helloSaga, watchRegister } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    app: appReducer
});

export type RootState = ReturnType<typeof store.getState>;
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

export function* rootSaga(): Generator<AllEffect<unknown>> {
    yield all([helloSaga(), watchRegister()]); //watchLoadState(), watchSaveState()
}

sagaMiddleware.run(rootSaga);
export const getStore = () => store;
