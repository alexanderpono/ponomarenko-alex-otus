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

    test('.setName(name) writes name to localStorage.name', () => {
        const myStorage = new MyStorage();
        const rndName = str();
        myStorage.setName(rndName);
        expect(mockFridge['name']).toBe(rndName);
    });

    test('.clearName() writes "" to localStorage.name', () => {
        const myStorage = new MyStorage();
        myStorage.clearName();
        expect(mockFridge['name']).toBe('');
    });

    describe('.getName', () => {
        it('returns null if localStorage.name == ""', () => {
            const myStorage = new MyStorage();
            // myStorage.clearName();
            expect(myStorage.getName()).toBe(null);
        });

        it('returns localStorage.name if localStorage.name != ""', () => {
            const myStorage = new MyStorage();
            // myStorage.clearName();
            const rndName = str();
            mockFridge['name'] = rndName;
            expect(myStorage.getName()).toBe(rndName);
        });
    });
});
