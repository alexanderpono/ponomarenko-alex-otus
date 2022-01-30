import { watchLoadState, watchSaveState } from '@src/StorageService/StorageService.saga';
import { all, AllEffect } from 'redux-saga/effects';

export function* rootSaga(): Generator<AllEffect<unknown>> {
    yield all([watchLoadState(), watchSaveState()]);
}
