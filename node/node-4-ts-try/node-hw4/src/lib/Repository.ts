export class Repository<T> {
    get entities(): T[] {
        return this._entities;
    }

    private _entities: T[] = [];

    public add(element: T): void {
        this._entities.push(element);
    }

    public find<K extends keyof T>(key: K, value): T | undefined {
        return this._entities.find((e) => e[key] === value);
    }

    public delete<K extends keyof T>(key: K, value): void {
        const index = this._entities.findIndex((e) => e[key] === value);
        if (index !== -1) {
            this._entities.splice(index, 1);
        }
    }
}
