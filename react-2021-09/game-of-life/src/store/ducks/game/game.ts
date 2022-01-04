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
    DEFAULT = 'g-o-l/game/DEFAULT',
    FIELD_SIZE = 'g-o-l/game/FIELD_SIZE',
    INVERT = 'g-o-l/game/INVERT',
    DATA_FROM_BACK = 'g-o-l/game/DATA_FROM_BACK',
    MOUSE = 'g-o-l/game/MOUSE',
    FILL_PERCENT = 'g-o-l/game/FILL_PERCENT',
    CLEAR = 'g-o-l/game/CLEAR',
    USER = 'g-o-l/game/USER',
}

export interface AppState {
    event: AppActions;
    fieldWidth: number;
    fieldHeight: number;
    data: CellInfo[];
    size: Size;
    fillPercent: FillPercent;
    userName: string;
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
    userName: '',
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

export interface UserAction {
    type: AppActions.USER;
    payload: { userName: string };
}

export interface ClearAction {
    type: AppActions.CLEAR;
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

export const clear = (): ClearAction => ({
    type: AppActions.CLEAR,
});

export const user = (userName: string): UserAction => ({
    type: AppActions.USER,
    payload: { userName },
});

export type AppAction =
    | FieldSizeAction
    | InvertAction
    | FillPercentAction
    | ClearAction
    | UserAction;
interface SizePair {
    w: number;
    h: number;
}

export default function gameReducer(
    state: AppState = defaultAppState,
    action: AppAction
): AppState {
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
            newData[action.payload.cellId] =
                newData[action.payload.cellId] === CellInfo.alive ? CellInfo.dead : CellInfo.alive;
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
                data: randomFill(
                    { width: state.fieldWidth, height: state.fieldHeight, data: state.data },
                    fillPercentToProbability[action.payload.fillPercent]
                ).data,
            };
        }
        case AppActions.CLEAR: {
            return {
                ...state,
                event: AppActions.CLEAR,
                fillPercent: FillPercent.P0,
                data: createData(state.fieldWidth, state.fieldHeight),
            };
        }
        case AppActions.USER: {
            return {
                ...state,
                event: AppActions.USER,
                userName: action.payload.userName,
            };
        }
    }
    return state;
}
