import { createData, recreateData } from './playFieldUtils';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './playField.consts';
import { CellInfo } from './playField.types';

export enum AppActions {
    DEFAULT = 'DEFAULT',
    FIELD_SIZE = 'FIELD_SIZE',
    INVERT = 'INVERT',
    DATA_FROM_BACK = 'DATA_FROM_BACK',
    MOUSE = 'MOUSE',
}

export interface AppState {
    event: AppActions;
    fieldWidth: number;
    fieldHeight: number;
    data: CellInfo[];
}

export const defaultAppState: AppState = {
    event: AppActions.DEFAULT,
    fieldWidth: 5,
    fieldHeight: 5,
    data: createData(DEFAULT_WIDTH, DEFAULT_HEIGHT),
};

export interface FieldSizeAction {
    type: AppActions.FIELD_SIZE;
    payload: { fieldWidth: number; fieldHeight: number };
}
export interface InvertAction {
    type: AppActions.INVERT;
    payload: { cellId: number };
}

export const fieldSize = (fieldWidth: number, fieldHeight: number): FieldSizeAction => ({
    type: AppActions.FIELD_SIZE,
    payload: { fieldWidth, fieldHeight },
});

export const invert = (cellId: number): InvertAction => ({
    type: AppActions.INVERT,
    payload: { cellId },
});

export type AppAction = FieldSizeAction | InvertAction;

export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case AppActions.FIELD_SIZE: {
            return {
                ...state,
                event: AppActions.FIELD_SIZE,
                fieldWidth: Number(action.payload.fieldWidth),
                fieldHeight: Number(action.payload.fieldHeight),
                data: recreateData(
                    state.data,
                    state.fieldWidth,
                    state.fieldHeight,
                    Number(action.payload.fieldWidth),
                    Number(action.payload.fieldHeight)
                ),
            };
        }
        case AppActions.INVERT: {
            const newData = state.data.concat();
            newData[action.payload.cellId].visible = !newData[action.payload.cellId].visible;
            return {
                ...state,
                event: AppActions.INVERT,
                data: newData,
            };
        }
    }
}
