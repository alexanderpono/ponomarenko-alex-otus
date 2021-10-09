export enum AppActions {
    DEFAULT = 'DEFAULT',
    FIELD_SIZE = 'FIELD_SIZE',
}

export interface AppState {
    event: AppActions;
    fieldWidth: number;
    fieldHeight: number;
}

export const defaultAppState: AppState = {
    event: AppActions.DEFAULT,
    fieldWidth: 5,
    fieldHeight: 5,
};

interface AppAction {
    type: string;
    payload: Record<string, string | number>;
}
export const fieldSize = (fieldWidth: number, fieldHeight: number): AppAction => ({
    type: AppActions.FIELD_SIZE,
    payload: { fieldWidth, fieldHeight },
});

export function appReducer(state: AppState = defaultAppState, action: AppAction): AppState {
    switch (action.type) {
        case AppActions.FIELD_SIZE: {
            return {
                ...state,
                event: AppActions.FIELD_SIZE,
                fieldWidth: Number(action.payload.fieldWidth),
                fieldHeight: Number(action.payload.fieldHeight),
            };
        }
    }
    return state;
}
