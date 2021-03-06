export enum Status {
    DEFAULT = 'DEFAULT',
    USER_ROLE = 'USER_ROLE',
    USER_NAME = 'USER_NAME',
    FETCH_ERROR = 'FETCH_ERROR',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    ACCESS_GRANTED = 'ACCESS_GRANTED',
    LOGOUT = 'LOGOUT'
}
enum Action {
    USER_NAME = 'USER/USER_NAME',
    USER_ROLE = 'USER/USER_ROLE',
    FETCH_ERROR = 'USER/FETCH_ERROR',
    USER_NOT_FOUND = 'USER/USER_NOT_FOUND',
    ACCESS_GRANTED = 'USER/ACCESS_GRANTED',
    LOGOUT = 'USER/LOGOUT'
}

export interface UserState {
    name: string;
    role: string | null;
    status: Status;
    errorInfo: string | null;
}

export const defaultState: UserState = {
    name: '',
    role: null,
    status: Status.DEFAULT,
    errorInfo: null
};

interface UserAction {
    type: string;
    payload: Record<string, string>;
}
export const userName = (name: string): UserAction => ({
    type: Action.USER_NAME,
    payload: { name }
});
export const userRole = (role: string): UserAction => ({
    type: Action.USER_ROLE,
    payload: { role }
});
export const fetchError = (errorInfo: string): UserAction => ({
    type: Action.FETCH_ERROR,
    payload: { errorInfo }
});
export const userNotFound = (userName: string): UserAction => ({
    type: Action.USER_NOT_FOUND,
    payload: { userName }
});
export const accessGranted = (): UserAction => ({
    type: Action.ACCESS_GRANTED,
    payload: {}
});
export const userLogout = (): UserAction => ({
    type: Action.LOGOUT,
    payload: {}
});

export function userReducer(state: UserState = defaultState, action: UserAction): UserState {
    switch (action.type) {
        case Action.USER_NAME: {
            return {
                ...state,
                status: Status.USER_NAME,
                name: action.payload.name,
                errorInfo: ''
            };
        }
        case Action.USER_ROLE: {
            return {
                ...state,
                status: Status.USER_ROLE,
                role: action.payload.role,
                errorInfo: ''
            };
        }
        case Action.FETCH_ERROR: {
            return {
                ...state,
                status: Status.FETCH_ERROR,
                errorInfo: action.payload.errorInfo
            };
        }
        case Action.USER_NOT_FOUND: {
            return {
                ...state,
                status: Status.USER_NOT_FOUND,
                name: '',
                errorInfo: action.payload.userName
            };
        }
        case Action.ACCESS_GRANTED: {
            return {
                ...state,
                status: Status.ACCESS_GRANTED,
                errorInfo: ''
            };
        }
        case Action.LOGOUT: {
            return {
                ...state,
                status: Status.LOGOUT,
                name: '',
                errorInfo: ''
            };
        }
    }
    return state;
}

interface AppState {
    user: UserState;
}

export const selectUser = (state: AppState) => state.user;
