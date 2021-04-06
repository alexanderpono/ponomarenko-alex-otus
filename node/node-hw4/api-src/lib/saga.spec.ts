import { call, runSaga } from './saga';

function myFuncRetPromise() {
    return Promise.resolve(222);
}

function myFuncReturnSimpleVal() {
    return 333;
}

function* myFuncReturnIterator() {
    yield 51;
    yield 52;
    return 53;
}

describe('call()', () => {
    it('executes function:Promise and returnes Promise(222)', async () => {
        expect(call(myFuncRetPromise)).toBeInstanceOf(Promise);
        await expect(call(myFuncRetPromise)).resolves.toBe(222);
    });

    it('executes function:number and returnes Promise(333)', async () => {
        expect(call(myFuncReturnSimpleVal)).toBeInstanceOf(Promise);
        await expect(call(myFuncReturnSimpleVal)).resolves.toBe(333);
    });

    it('executes *function-generator and returnes Promise(53)', async () => {
        expect(call(myFuncReturnIterator)).toBeInstanceOf(Promise);
        await expect(call(myFuncReturnIterator)).resolves.toBe(53);
    });
});

describe('runSaga()', () => {
    let data1 = null;
    let data2 = null;
    let data3 = null;
    function* mySaga1() {
        data1 = yield call(myFuncRetPromise);
        data2 = yield call(myFuncReturnSimpleVal);
        data3 = yield call(myFuncReturnIterator);
        return data3;
    }

    it('executes *function-generator and yields 3 times', async () => {
        await runSaga(mySaga1);
        expect(data1).toEqual(222);
        expect(data2).toEqual(333);
        expect(data3).toEqual(53);
    });
});
