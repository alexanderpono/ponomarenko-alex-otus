import { defaultAppState } from '@src/store/ducks/game';
import { str } from '@src/testFramework/lib/reducer';
import { StorageService } from './StorageService';

describe('MyStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('.setState(state) writes state to localStorage.state', () => {
        const myStorage = new StorageService();
        const rndState = { ...defaultAppState, userName: str() };
        myStorage.setState(rndState);
        expect(JSON.parse(localStorage['state'])).toEqual(rndState);
    });

    describe('.getState', () => {
        it('returns null if localStorage.state == ""', () => {
            const myStorage = new StorageService();
            expect(myStorage.getState()).toBe(null);
        });

        it('returns localStorage.name if localStorage.state != ""', () => {
            const myStorage = new StorageService();
            const rndState = { ...defaultAppState, userName: str() };
            localStorage['state'] = JSON.stringify(rndState);
            expect(myStorage.getState()).toEqual(rndState);
        });

        it('returns null if JSON.parse(localStorage.state) throws', () => {
            const myStorage = new StorageService();
            localStorage['state'] = 'abc';
            expect(myStorage.getState()).toBe(null);
        });
    });

    describe('.loadState', () => {
        it('rejects if state is empty', () => {
            const myStorage = new StorageService();
            return expect(myStorage.loadState()).rejects.toBe(null);
        });

        it('resolves if state is not empty', () => {
            const myStorage = new StorageService();
            const rndState = { ...defaultAppState, userName: str() };
            localStorage['state'] = JSON.stringify(rndState);
            return expect(myStorage.loadState()).resolves.toEqual(rndState);
        });
    });

    describe('.saveState', () => {
        it('resolves', () => {
            const myStorage = new StorageService();
            const rndState = { ...defaultAppState, userName: str() };
            return expect(myStorage.saveState(rndState)).resolves.toEqual(undefined);
        });
    });
});
