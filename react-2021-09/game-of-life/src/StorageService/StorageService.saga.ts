import {
    AppActions,
    AppState,
    ioError,
    replaceState,
    SaveStateAction,
} from '@src/store/ducks/game';
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
        yield put(ioError('loadStateSaga'));
    }
}

export function* saveStateSaga(action: SaveStateAction) {
    try {
        const state = action.payload.state;
        const storageService: StorageService = yield call(getStorageService);
        yield call(storageService.saveState, state);
    } catch (e) {
        yield put(ioError('saveStateSaga'));
    }
}

export function* watchLoadState() {
    yield takeEvery(AppActions.LOAD_STATE, loadStateSaga);
}

export function* watchSaveState() {
    yield takeLatest(AppActions.SAVE_STATE, saveStateSaga);
}
