import { watchLoadStateSaga, watchSaveStateSaga } from '@src/StorageService/StorageService.saga';
import { all, AllEffect } from 'redux-saga/effects';
import { watchPlaySaga } from '@src/store/ducks/game';

export function* rootSaga(): Generator<AllEffect<unknown>> {
    yield all([watchLoadStateSaga(), watchSaveStateSaga(), watchPlaySaga()]);
}
