export enum Status {
    DEFAULT = 'DEFAULT',
    USER_ROLE = 'USER_ROLE',
    USER_NAME = 'USER_NAME',
    FETCH_ERROR = 'FETCH_ERROR'
}
enum Action {
    USER_NAME = 'USER/USER_NAME',
    USER_ROLE = 'USER/USER_ROLE',
    FETCH_ERROR = 'USER/FETCH_ERROR'
}

export interface UserState {
    name: string | null;
    role: string | null;
    status: Status;
    errorInfo: string | null;
}

export const defaultState: UserState = {
    name: null,
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
    }
    return state;
}
