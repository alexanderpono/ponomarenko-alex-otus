import { createData, randomFill, recreateData } from './playFieldUtils';
import { CellInfo } from '@src/types';
import {
    Size,
    sizeToWH,
    DEFAULT_HEIGHT,
    DEFAULT_WIDTH,
    FillPercent,
    DEFAULT_FILL_PERCENT,
    fillPercentToProbability,
} from '@src/consts';

export enum AppActions {
    DEFAULT = 'DEFAULT',
    FIELD_SIZE = 'FIELD_SIZE',
    INVERT = 'INVERT',
    DATA_FROM_BACK = 'DATA_FROM_BACK',
    MOUSE = 'MOUSE',
    FILL_PERCENT = 'FILL_PERCENT',
}

export interface AppState {
    event: AppActions;
    fieldWidth: number;
    fieldHeight: number;
    data: CellInfo[];
    size: Size;
    fillPercent: FillPercent;
}

export const defaultAppState: AppState = {
    event: AppActions.DEFAULT,
    fieldWidth: 5,
    fieldHeight: 5,
    data: randomFill(
        {
            width: DEFAULT_WIDTH,
            height: DEFAULT_HEIGHT,
            data: createData(DEFAULT_WIDTH, DEFAULT_HEIGHT),
        },
        fillPercentToProbability[DEFAULT_FILL_PERCENT]
    ).data,
    size: Size.SMALL,
    fillPercent: DEFAULT_FILL_PERCENT,
};

export interface FieldSizeAction {
    type: AppActions.FIELD_SIZE;
    payload: { size: Size };
}
export interface InvertAction {
    type: AppActions.INVERT;
    payload: { cellId: number };
}

export interface FillPercentAction {
    type: AppActions.FILL_PERCENT;
    payload: { fillPercent: FillPercent };
}

export const fieldSize = (size: Size): FieldSizeAction => ({
    type: AppActions.FIELD_SIZE,
    payload: { size },
});

export const invert = (cellId: number): InvertAction => ({
    type: AppActions.INVERT,
    payload: { cellId },
});

export const fillPercent = (fillPercent: FillPercent): FillPercentAction => ({
    type: AppActions.FILL_PERCENT,
    payload: { fillPercent },
});

export type AppAction = FieldSizeAction | InvertAction | FillPercentAction;
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
        case AppActions.FILL_PERCENT: {
            return {
                ...state,
                event: AppActions.FILL_PERCENT,
                fillPercent: action.payload.fillPercent,
            };
        }
    }
    return state;
}
