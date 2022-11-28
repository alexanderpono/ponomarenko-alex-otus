import { IArray } from './array.types';

export class VectorArray implements IArray {
    public myName = 'VectorArray';
    private array: unknown[];
    private _size: number;
    private vector: number;

    constructor(vector: number = 10) {
        this.array = [];
        this._size = 0;
        this.vector = vector;
    }

    public add(item: unknown) {
        if (this.size() === this.array.length) {
            this.resize();
        }

        this.array[this._size] = item;
        this._size++;
    }

    public get(index: number): unknown {
        return this.array[index];
    }

    public size() {
        return this._size;
    }

    public resize() {
        const newArray = new Array(this.size() + this.vector);
        for (let i = 0; i < this.size(); i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }

    public remove(index: number) {
        const result = this.array[index];
        const newAr: unknown[] = [
            ...this.array.slice(0, index),
            ...this.array.slice(index + 1),
            undefined
        ];
        this.array = newAr;
        return result;
    }

    public getArray(): unknown[] {
        return this.array;
    }
}
