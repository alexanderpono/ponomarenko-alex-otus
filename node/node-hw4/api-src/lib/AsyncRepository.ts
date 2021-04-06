export class AsyncRepository<T> {
    get entities(): Promise<T[]> {
        return Promise.resolve(this._entities);
    }

    public getNewId(): Promise<number> {
        this._id++;
        return Promise.resolve(this._id);
    }

    private _id = 0;
    private _entities: T[] = [];

    public add(element: T): Promise<void> {
        this._entities.push(element);
        return Promise.resolve();
    }

    public find<K extends keyof T>(key: K, value): Promise<T | undefined> {
        return Promise.resolve(this._entities.find((e) => e[key] == value));
    }

    public delete<K extends keyof T>(key: K, value): Promise<void> {
        const index = this._entities.findIndex((e) => e[key] == value);
        if (index !== -1) {
            this._entities.splice(index, 1);
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }

    public update<K extends keyof T>(key: K, value, newEntity: T): Promise<void> {
        const index = this._entities.findIndex((e) => e[key] == value);
        if (index !== -1) {
            this._entities[index] = newEntity;
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }
}
