import { IArray } from './array.types';
import { SingleArray } from './SingleArray';
import { VectorArray } from './VecrorArray';

export class MatrixArray implements IArray {
    public myName = 'MatrixArray';
    private array: SingleArray;
    private _size: number;
    private vector: number;

    constructor(vector: number = 10) {
        this.vector = vector;
        this.array = new SingleArray();
        this._size = 0;
    }

    public size() {
        return this._size;
    }

    public add(item: unknown) {
        if (this._size == this.array.size() * this.vector) {
            this.resize();
        }

        const segment = this.array.get(Math.floor(this._size / this.vector)) as VectorArray;
        segment.add(item);
        this._size++;
    }

    public get(index: number): unknown {
        const segment = this.array.get(Math.floor(index / this.vector)) as VectorArray;
        return segment.get[index % this.vector];
    }

    public resize() {
        this.array.add(new VectorArray(this.vector));
    }
}
