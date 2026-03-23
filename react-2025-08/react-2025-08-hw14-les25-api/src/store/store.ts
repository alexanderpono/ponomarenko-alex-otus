import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer } from './appReducer';

const rootReducer = combineReducers({
    app: appReducer
});

export type RootState = ReturnType<typeof store.getState>;
export const store = createStore(rootReducer, composeWithDevTools());

export const getStore = () => store;
