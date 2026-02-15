import { Mode, speedToDelay } from '@src/consts';
import { RootState } from '@src/store';
import { call, put, select, take } from 'redux-saga/effects';
import { AppAction, AppActions, AppState, generation, setMode } from './game';

export const getGame = (s: RootState) => s.game;

export const sleep = (x: number) => new Promise((r) => setTimeout(r, x));
export const modePlay = (action: AppAction) =>
    action.type === AppActions.MODE && action.payload.mode === Mode.PLAY;

export function* watchPlaySaga() {
    while (true) {
        yield take(modePlay);
        yield put(setMode(Mode.PLAY));

        const state: AppState = yield select(getGame);
        if (state.mode === Mode.PLAY) {
            yield call(timerLoopSaga);
        }
    }
}

export function* timerLoopSaga() {
    let state: AppState = yield select(getGame);

    while (state.mode === Mode.PLAY) {
        yield put(generation());

        const delay = speedToDelay[state.speed];

        yield call(sleep, delay);
        state = yield select(getGame);
    }
}
