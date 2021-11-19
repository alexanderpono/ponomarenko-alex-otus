export enum AppActions {
    DEFAULT = 'DEFAULT',
    FIELD_SIZE = 'FIELD_SIZE',
    INVERT = 'INVERT',
    DATA_FROM_BACK = 'DATA_FROM_BACK',
    MOUSE = 'MOUSE',
}
export const CELL_DEAD = false;
export const CELL_LIVE = true;
export const DEFAULT_WIDTH = 5;
export const DEFAULT_HEIGHT = 5;
export const DEFAULT_CELL_STATE = CELL_LIVE;

export interface CellInfo {
    id: string;
    visible: boolean;
}

type DataFromBack = Record<string, unknown>;
export interface MousePos {
    x: number;
    y: number;
}

export interface AppState {
    event: AppActions;
    fieldWidth: number;
    fieldHeight: number;
    data: CellInfo[];
    dataFromBack: DataFromBack;
    mouse: MousePos;
}

function createData(width: number, height: number): CellInfo[] {
    const cellsNumber = width * height;
    const startCellState = DEFAULT_CELL_STATE;
    const newData: CellInfo[] = [];
    for (let i = 0; i < cellsNumber; i++) {
        newData.push({ id: String(i), visible: startCellState });
    }
    return newData;
}

export const defaultAppState: AppState = {
    event: AppActions.DEFAULT,
    fieldWidth: 5,
    fieldHeight: 5,
    data: createData(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    dataFromBack: {},
    mouse: { x: 0, y: 0 },
};

export interface FieldSizeAction {
    type: AppActions.FIELD_SIZE;
    payload: { fieldWidth: number; fieldHeight: number };
}
export interface InvertAction {
    type: AppActions.INVERT;
    payload: { cellId: number };
}

export interface DataFromBackAction {
    type: AppActions.DATA_FROM_BACK;
    payload: { data: DataFromBack };
}

export interface MouseAction {
    type: AppActions.MOUSE;
    payload: { mouse: MousePos };
}

export const fieldSize = (fieldWidth: number, fieldHeight: number): FieldSizeAction => ({
    type: AppActions.FIELD_SIZE,
    payload: { fieldWidth, fieldHeight },
});

export const invert = (cellId: number): InvertAction => ({
    type: AppActions.INVERT,
    payload: { cellId },
});

export const dataFromBack = (data: DataFromBack): DataFromBackAction => ({
    type: AppActions.DATA_FROM_BACK,
    payload: { data },
});

export const mouse = (mouse: MousePos): MouseAction => ({
    type: AppActions.MOUSE,
    payload: { mouse },
});

export type AppAction = FieldSizeAction | InvertAction | DataFromBackAction | MouseAction;

export function appReducer(state: AppState, action: AppAction): AppState {
    switch (action.type) {
        case AppActions.FIELD_SIZE: {
            return {
                ...state,
                event: AppActions.FIELD_SIZE,
                fieldWidth: action.payload.fieldWidth,
                fieldHeight: action.payload.fieldHeight,
                data: createData(action.payload.fieldWidth, action.payload.fieldHeight),
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
        case AppActions.DATA_FROM_BACK: {
            return {
                ...state,
                event: AppActions.DATA_FROM_BACK,
                dataFromBack: action.payload.data,
            };
        }
        case AppActions.MOUSE: {
            return {
                ...state,
                event: AppActions.MOUSE,
                mouse: action.payload.mouse,
            };
        }
    }
}
