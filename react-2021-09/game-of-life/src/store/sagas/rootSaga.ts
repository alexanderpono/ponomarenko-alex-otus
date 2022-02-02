import { watchLoadState, watchSaveState } from '@src/StorageService/StorageService.saga';
import { all, AllEffect } from 'redux-saga/effects';
import { watchPlay } from '@src/store/ducks/game';

export function* rootSaga(): Generator<AllEffect<unknown>> {
    yield all([watchLoadState(), watchSaveState(), watchPlay()]);
}
