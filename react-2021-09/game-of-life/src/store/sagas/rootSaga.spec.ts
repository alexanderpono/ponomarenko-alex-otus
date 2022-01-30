import { expectSaga } from 'redux-saga-test-plan';
import { rootSaga } from './rootSaga';
import { AppActions } from '../ducks/game';

describe('rootSaga', () => {
    it('watches AppActions.LOAD_STATE, AppActions.SAVE_STATE', () => {
        return expectSaga(rootSaga)
            .take(AppActions.LOAD_STATE)
            .take(AppActions.SAVE_STATE)
            .silentRun();
    });
});
