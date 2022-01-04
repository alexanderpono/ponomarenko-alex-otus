import { combineReducers, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import * as reducers from './ducks';

const rootReducer = combineReducers(reducers);

export const store = createStore(rootReducer, composeWithDevTools());
