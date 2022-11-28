import { IArray } from './array.types';

export class FactorArray implements IArray {
    public myName = 'FactorArray';
    private array: unknown[];
    private _size: number;
    private factor: number;

    constructor(factor: number = 50, initLength: number = 10) {
        this.factor = factor;
        this.array = new Array(initLength);
        this._size = 0;
    }

    public size() {
        return this._size;
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

    public resize() {
        const newArray = new Array(
            this.array.length + this.array.length * Math.round(this.factor / 100)
        );
        for (let i = 0; i < this.size(); i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }
}
