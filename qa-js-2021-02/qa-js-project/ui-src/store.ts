import { combineReducers } from 'redux';
import { createStore } from 'redux';

import {
    userReducer,
    UserState,
    defaultState as defaultUserState
} from './components/UsersPage/userReducer';

export const reducerAll = combineReducers({
    user: userReducer
});

export interface AppState {
    user: UserState;
}

export const defaultState: AppState = {
    user: defaultUserState
};

export const store = createStore(
    reducerAll,
    window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()
);
