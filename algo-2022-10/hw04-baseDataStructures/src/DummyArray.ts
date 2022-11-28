import { IArray } from './array.types';

export class DummyArray implements IArray {
    public myName = 'DummyArray';

    constructor() {}

    public setArray(array) {}

    public getArray() {}

    public add(item: unknown) {}

    public get(index: number) {}

    public size() {
        return 0;
    }

    public resize() {}

    public remove(index: number) {}
}
