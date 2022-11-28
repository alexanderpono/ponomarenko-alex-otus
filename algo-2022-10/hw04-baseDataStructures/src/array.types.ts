export interface IArray {
    myName: string;
    add: (item: unknown) => void;
    get: (index: number) => unknown;
    size: () => number;
    resize: () => void;
    remove: (index: number) => unknown;
    getArray: () => unknown;
}
