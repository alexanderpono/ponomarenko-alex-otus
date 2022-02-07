import { Mode, speedToDelay } from '@src/consts';
import { RootState } from '@src/store';
import { call, put, select, take } from 'redux-saga/effects';
import { AppAction, AppActions, AppState, generation, setMode } from './game';

async function waitTimeout(waitTime: number) {
    await sleep(waitTime);
}
const getGame = (s: RootState) => s.game;

export const sleep = (x: number) => new Promise((r) => setTimeout(r, x));

export function* watchPlay() {
    while (true) {
        yield take(
            (action: AppAction) =>
                action.type === AppActions.MODE && action.payload.mode === Mode.PLAY
        );
        yield put(setMode(Mode.PLAY));

        const state: AppState = yield select(getGame);
        if (state.mode === Mode.PLAY) {
            yield call(timerLoop);
        }
    }
}

export function* timerLoop() {
    let state: AppState = yield select(getGame);

    while (state.mode === Mode.PLAY) {
        yield put(generation());

        const delay = speedToDelay[state.speed];

        yield call(waitTimeout, delay);
        state = yield select(getGame);
    }
}
