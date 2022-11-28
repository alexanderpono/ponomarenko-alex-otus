import { IArray } from './array.types';
import { DummyArray } from './DummyArray';
import { FactorArray } from './FactorArray';
import { MatrixArray } from './MatrixArray';
import { SingleArray } from './SingleArray';
import { VectorArray } from './VectorArray';

class Factory {
    static createInstance(className: string): IArray {
        switch (className) {
            case 'SingleArray': {
                return new SingleArray();
            }
            case 'VectorArray': {
                return new VectorArray();
            }
            case 'FactorArray': {
                return new FactorArray();
            }
            case 'MatrixArray': {
                return new MatrixArray();
            }
            default: {
                return new DummyArray();
            }
        }
    }
}
describe('.remove()', () => {
    const u = undefined;
    test.each`
        arrayClass       | ar              | removeIndex | expectedReturn | expectedAr
        ${'SingleArray'} | ${[10, 20, 30]} | ${0}        | ${10}          | ${[20, 30]}
        ${'SingleArray'} | ${[10, 20, 30]} | ${1}        | ${20}          | ${[10, 30]}
        ${'SingleArray'} | ${[10, 20, 30]} | ${2}        | ${30}          | ${[10, 20]}
        ${'VectorArray'} | ${[10, 20, 30]} | ${0}        | ${10}          | ${[20, 30, u, u, u, u, u, u, u, u]}
        ${'VectorArray'} | ${[10, 20, 30]} | ${1}        | ${20}          | ${[10, 30, u, u, u, u, u, u, u, u]}
        ${'VectorArray'} | ${[10, 20, 30]} | ${2}        | ${30}          | ${[10, 20, u, u, u, u, u, u, u, u]}
        ${'FactorArray'} | ${[10, 20, 30]} | ${0}        | ${10}          | ${[20, 30, u, u, u, u, u, u, u, u]}
        ${'FactorArray'} | ${[10, 20, 30]} | ${1}        | ${20}          | ${[10, 30, u, u, u, u, u, u, u, u]}
        ${'FactorArray'} | ${[10, 20, 30]} | ${2}        | ${30}          | ${[10, 20, u, u, u, u, u, u, u, u]}
        ${'MatrixArray'} | ${[10, 20, 30]} | ${0}        | ${10}          | ${[20, 30, u, u, u, u, u, u, u, u]}
        ${'MatrixArray'} | ${[10, 20, 30]} | ${1}        | ${20}          | ${[10, 30, u, u, u, u, u, u, u, u]}
        ${'MatrixArray'} | ${[10, 20, 30]} | ${2}        | ${30}          | ${[10, 20, u, u, u, u, u, u, u, u]}
    `(
        '$arrayClass returns ($expectedReturn) from (ar=$ar and removeIndex=$removeIndex) ',
        ({ arrayClass, ar, removeIndex, expectedReturn, expectedAr }) => {
            const array: IArray = Factory.createInstance(arrayClass);
            for (let i = 0; i < ar.length; i++) {
                array.add(ar[i]);
            }
            const returnVal = array.remove(removeIndex);

            expect(returnVal).toEqual(expectedReturn);
            expect(array.getArray()).toEqual(expectedAr);
        }
    );
});
