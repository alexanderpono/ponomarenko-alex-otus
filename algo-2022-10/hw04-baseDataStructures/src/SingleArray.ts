import { IArray } from './array.types';

export class SingleArray implements IArray {
    private array: unknown[];
    public myName = 'SingleArray';

    constructor() {
        this.array = [];
    }

    public getArray(): unknown[] {
        return this.array;
    }

    public add(item: unknown) {
        this.resize();
        this.array[this.size() - 1] = item;
    }

    public get(index: number): unknown {
        return this.array[index];
    }

    public size() {
        return this.array.length;
    }

    public resize() {
        const newArray = new Array(this.size() + 1);
        for (let i = 0; i < this.size(); i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }

    public remove(index: number) {
        const result = this.array[index];
        const newAr: unknown[] = [...this.array.slice(0, index), ...this.array.slice(index + 1)];
        this.array = newAr;
        return result;
    }
}
