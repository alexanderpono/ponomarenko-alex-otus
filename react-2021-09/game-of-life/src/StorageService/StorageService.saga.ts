import { RootState } from '@src/store';
import { AppActions, AppState, replaceState, SaveStateAction } from '@src/store/ducks/game';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { StorageService } from '.';

export function getStorageService(): StorageService {
    return StorageService.create();
}

export function* loadStateSaga() {
    try {
        const storageService: StorageService = yield call(getStorageService);
        const state: AppState = yield call(storageService.loadState);
        yield put(replaceState(state));
    } catch (e) {
        console.error('loadStateSaga() error ', e);
    }
}

export const getAppState = (state: RootState): AppState => state.game;

export function* saveStateSaga(action: SaveStateAction) {
    try {
        const state = action.payload.state;
        const storageService: StorageService = yield call(getStorageService);
        yield call(storageService.saveState, state);
    } catch (e) {
        console.error('saveStateSaga() error ', e);
    }
}

export function* watchLoadState() {
    yield takeEvery(AppActions.LOAD_STATE, loadStateSaga);
}

export function* watchSaveState() {
    yield takeLatest(AppActions.SAVE_STATE, saveStateSaga);
}
