import { AppState, defaultAppState, ioError, replaceState, saveState } from '@src/store/ducks/game';
import { str } from '@src/testFramework/lib/reducer';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';
import { StorageService } from './StorageService';
import { getStorageService, loadStateSaga, saveStateSaga } from './StorageService.saga';

describe('loadStateSaga', () => {
    let mockStorageService: StorageService;
    beforeEach(() => {
        mockStorageService = getStorageService();
    });

    it('dispatches REPLACE_STATE after storage.loadState returned', () => {
        const mockState = { ...defaultAppState, userName: str() };
        return expectSaga(loadStateSaga)
            .provide([
                [call(getStorageService), mockStorageService],
                [call(mockStorageService.loadState), mockState],
            ])
            .put(replaceState(mockState))
            .run();
    });

    it('dispatches IO_ERROR on storageService.loadState exception', () => {
        const error = new Error('error');
        return expectSaga(loadStateSaga)
            .provide([
                [call(getStorageService), mockStorageService],
                [call(mockStorageService.loadState), throwError(error)],
            ])
            .put(ioError('loadStateSaga'))
            .run();
    });
});

describe('saveStateSaga', () => {
    let mockStorageService: StorageService;
    let mockState: AppState;
    beforeEach(() => {
        mockStorageService = getStorageService();
        mockState = { ...defaultAppState, userName: str() };
    });

    it('calls storageService.saveState', () => {
        return expectSaga(saveStateSaga, saveState(mockState))
            .provide([[call(getStorageService), mockStorageService]])
            .call(mockStorageService.saveState, mockState)
            .run();
    });
    it('dispatches IO_ERROR on storageService.saveState exception', () => {
        const error = new Error('error');
        return expectSaga(saveStateSaga, saveState(mockState))
            .provide([
                [call(getStorageService), mockStorageService],
                [call(mockStorageService.saveState, mockState), throwError(error)],
            ])
            .put(ioError('saveStateSaga'))
            .run();
    });
});
