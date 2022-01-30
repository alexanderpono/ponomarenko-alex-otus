import { combineReducers, createStore, compose, Store, applyMiddleware } from 'redux';
import * as reducers from '@src/store/ducks';
import thunkMiddleware from 'redux-thunk';
const rootReducer = combineReducers(reducers);
export const createMockStore = () =>
    createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));
