import { combineReducers } from 'redux';
import { createStore } from 'redux';

export const reducerAll = combineReducers({});

export interface AppState {}

export const defaultState: AppState = {};

export const store = createStore(
    reducerAll,
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);
