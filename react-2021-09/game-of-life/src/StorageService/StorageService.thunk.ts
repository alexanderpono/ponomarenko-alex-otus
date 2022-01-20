import { StorageService } from '@src/StorageService';
import { AppState, replaceState } from '@src/store/ducks/game';
import { store } from '@src/store/store';

export type AppDispatch = typeof store.dispatch;
export const loadStateThunk = (storage: StorageService) => (dispatch: AppDispatch) => {
    return storage.loadState().then((st: AppState) => {
        dispatch(replaceState(st));
    });
};

export const saveStateThunk = (storage: StorageService, st: AppState) => () => {
    return storage.saveState(st);
};
