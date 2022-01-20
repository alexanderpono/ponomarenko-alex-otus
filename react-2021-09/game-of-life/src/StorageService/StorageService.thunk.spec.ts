import { AppState, defaultAppState } from '@src/store/ducks/game';
import { StorageService } from './StorageService';
import { loadStateThunk } from './StorageService.thunk';

test('loadStateThunk() calls dispatch() if storage.loadState resolves', (done) => {
    const storageMock = {
        state: defaultAppState,

        setState(state: AppState) {
            this.state = state;
        },

        getState(): AppState {
            if (this.state) {
                return this.state;
            }
            return defaultAppState;
        },

        loadState: (): Promise<AppState> => {
            return new Promise((resolve, reject) => resolve(defaultAppState));
        },

        saveState: (): Promise<void> => Promise.resolve(),
    };
    const storage = storageMock as StorageService;

    const thunkAction = loadStateThunk(storage);
    const dispatch = jest.fn();
    thunkAction(dispatch).then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        done();
    });
});
