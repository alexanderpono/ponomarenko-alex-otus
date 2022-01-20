import { combineReducers, createStore, applyMiddleware, Store, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './ducks';
import { rootSaga } from './sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';

const rootReducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
