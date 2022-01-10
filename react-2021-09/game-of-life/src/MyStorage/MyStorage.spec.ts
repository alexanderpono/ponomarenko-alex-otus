import { defaultAppState } from '@src/store/ducks/game';
import { str } from '@src/testFramework/lib/reducer';
import { MyStorage } from './MyStorage';

describe('MyStorage', () => {
    // by Holben888@github from https://bholmes.dev/blog/mocking-browser-apis-fetch-localstorage-dates-the-easy-way-with-jest/
    // let's make a mock fridge (storage) for all our tests to use
    let mockFridge: Record<string, string> = {};

    beforeAll(() => {
        global.Storage.prototype.setItem = jest.fn((key, value) => {
            mockFridge[key] = value;
        });
        global.Storage.prototype.getItem = jest.fn((key) => mockFridge[key]);
    });

    beforeEach(() => {
        // make sure the fridge starts out empty for each test
        mockFridge = {};
    });

    afterAll(() => {
        // return our mocks to their original values
        // 🚨 THIS IS VERY IMPORTANT to avoid polluting future tests!
        (global.Storage.prototype.setItem as jest.Mock).mockReset();
        (global.Storage.prototype.getItem as jest.Mock).mockReset();
    });

    test('.setState(state) writes state to localStorage.state', () => {
        const myStorage = new MyStorage();
        const rndState = { ...defaultAppState, userName: str() };
        myStorage.setState(rndState);
        expect(JSON.parse(mockFridge['state'])).toEqual(rndState);
    });

    describe('.getState', () => {
        it('returns null if localStorage.state == ""', () => {
            const myStorage = new MyStorage();
            expect(myStorage.getState()).toBe(null);
        });

        it('returns localStorage.name if localStorage.state != ""', () => {
            const myStorage = new MyStorage();
            const rndState = { ...defaultAppState, userName: str() };
            mockFridge['state'] = JSON.stringify(rndState);
            expect(myStorage.getState()).toEqual(rndState);
        });

        it('returns null if JSON.parse(localStorage.state) throws', () => {
            const myStorage = new MyStorage();
            mockFridge['state'] = 'abc';
            expect(myStorage.getState()).toBe(null);
        });
    });

    describe('.loadState', () => {
        it('rejects if state is empty', () => {
            const myStorage = new MyStorage();
            return expect(myStorage.loadState()).rejects.toBe(null);
        });

        it('resolves if state is not empty', () => {
            const myStorage = new MyStorage();
            const rndState = { ...defaultAppState, userName: str() };
            mockFridge['state'] = JSON.stringify(rndState);
            return expect(myStorage.loadState()).resolves.toEqual(rndState);
        });
    });

    describe('.saveState', () => {
        it('resolves', () => {
            const myStorage = new MyStorage();
            const rndState = { ...defaultAppState, userName: str() };
            return expect(myStorage.saveState(rndState)).resolves.toEqual(undefined);
        });
    });
});
