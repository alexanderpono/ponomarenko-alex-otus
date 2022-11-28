import { IArray } from './array.types';
import { FactorArray } from './FactorArray';
import { MatrixArray } from './MatrixArray';
import { SingleArray } from './SingleArray';
import { VectorArray } from './VectorArray';

export class Program {
    public static main() {
        const singleArray = new SingleArray();
        const vectorArray = new VectorArray();
        const factorArray = new FactorArray();
        const matrixArray = new MatrixArray();
        Program.testAddArray(singleArray, 10000);
        Program.testAddArray(vectorArray, 100000);
        Program.testAddArray(factorArray, 1000000);
        Program.testAddArray(matrixArray, 100000);
    }

    public static testAddArray(data: IArray, total: number) {
        const start: number = Date.now();

        for (let j = 0; j < total; j++) {
            data.add(new Date());
        }

        console.log(` testAddArray(${data.myName}, ${total}): ${(Date.now() - start) / 1000} sec`);
    }
}
