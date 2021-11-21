import { createData, recreateData } from './playFieldUtils';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './playField.consts';
import { CellInfo } from './playField.types';
import { Size, sizeToWH } from '@src/consts';

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
    size: Size;
}

export const defaultAppState: AppState = {
    event: AppActions.DEFAULT,
    fieldWidth: 5,
    fieldHeight: 5,
    data: createData(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    size: Size.SMALL,
};

export interface FieldSizeAction {
    type: AppActions.FIELD_SIZE;
    payload: { size: Size };
}
export interface InvertAction {
    type: AppActions.INVERT;
    payload: { cellId: number };
}

export const fieldSize = (size: Size): FieldSizeAction => ({
    type: AppActions.FIELD_SIZE,
    payload: { size },
});

export const invert = (cellId: number): InvertAction => ({
    type: AppActions.INVERT,
    payload: { cellId },
});

export type AppAction = FieldSizeAction | InvertAction;
interface SizePair {
    w: number;
    h: number;
}

export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case AppActions.FIELD_SIZE: {
            let sizePair: SizePair = sizeToWH[action.payload.size];
            let sizeName: Size = action.payload.size;
            if (typeof sizePair === 'undefined') {
                sizePair = sizeToWH[Size.SMALL];
                sizeName = Size.SMALL;
            }
            return {
                ...state,
                event: AppActions.FIELD_SIZE,
                fieldWidth: sizePair.w,
                fieldHeight: sizePair.h,
                size: sizeName,
                data: recreateData(
                    state.data,
                    state.fieldWidth,
                    state.fieldHeight,
                    sizePair.w,
                    sizePair.h
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
