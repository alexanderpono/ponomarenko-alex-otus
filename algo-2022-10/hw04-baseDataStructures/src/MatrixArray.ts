import { IArray } from './array.types';
import { SingleArray } from './SingleArray';
import { VectorArray } from './VectorArray';

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

    public remove(index: number) {
        const segmentIndex = Math.floor(index / this.vector);
        const segment = this.array.get(segmentIndex) as VectorArray;
        const localIndex = index % this.vector;
        const result = segment.remove(localIndex);
        return result;
    }

    public getArray(): unknown[] {
        let result: unknown[] = [];
        const arSize = this.array.size();
        for (let i = 0; i < this.array.size(); i++) {
            const segment: VectorArray = this.array.get(i) as VectorArray;
            const segmentArray = segment.getArray();
            result = [...result, ...segmentArray];
        }
        return result;
    }
}
