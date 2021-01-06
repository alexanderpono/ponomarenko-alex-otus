import { getDbClientPromise } from '../lib/db';
import { User } from 'src/models/User';
import { AsyncRepository } from '../lib/AsyncRepository';

export class UserDbRepository extends AsyncRepository<User> {
    get entities(): Promise<User[]> {
        const dbP = getDbClientPromise().then((client) => Promise.resolve(client.db('courses')));
        const collectionP = dbP.then((db) => Promise.resolve(db.collection('user')));

        const usersP = collectionP
            .then((collection) => {
                return new Promise(function (resolve, reject) {
                    collection.find().toArray(function (err, result: User[]) {
                        if (err) {
                            reject(err);
                        }
                        let result2 = result.concat();
                        result2 = result2.map((item) => {
                            delete item['_id'];
                            return item;
                        });
                        resolve(result2);
                    });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });
        return usersP as Promise<User[]>;
    }

    public getNewId(): Promise<number> {
        const dbP = getDbClientPromise().then((client) => Promise.resolve(client.db('courses')));
        const collectionP = dbP.then((db) => Promise.resolve(db.collection('user')));

        const biggestId = collectionP
            .then((collection) => {
                return new Promise(function (resolve, reject) {
                    collection
                        .find()
                        .sort({ id: -1 })
                        .limit(1)
                        .toArray(function (err, result: User[]) {
                            if (err) {
                                reject(err);
                            }
                            let result2 = result.concat();
                            result2 = result2.map((item) => {
                                delete item['_id'];
                                return item;
                            });
                            resolve(result2);
                        });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });

        const resultP = biggestId.then((result) => {
            if (!Array.isArray(result)) {
                return Promise.reject('biggestId is not array');
            }
            if (result.length <= 0) {
                return Promise.resolve(1);
            }
            const result0 = result[0];
            const biggestId = parseInt(result0.id);
            if (isNaN(biggestId)) {
                return Promise.resolve(1);
            }
            return Promise.resolve(biggestId + 1);
        });

        return resultP;
    }

    public add(element: User): Promise<void> {
        const dbP = getDbClientPromise().then((client) => Promise.resolve(client.db('courses')));
        const collectionP = dbP.then((db) => Promise.resolve(db.collection('user')));
        const newIdP = this.getNewId();
        const addP = Promise.all([newIdP, collectionP])
            .then(([newId, collection]) => {
                return new Promise(function (resolve, reject) {
                    const newElement = Object.assign({}, element, { id: newId });
                    collection.insertOne(newElement, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve(result);
                    });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });
        return addP as Promise<void>;
    }

    public find<K extends keyof User>(key: K, value): Promise<User | undefined> {
        const dbP = getDbClientPromise().then((client) => Promise.resolve(client.db('courses')));
        const collectionP = dbP.then((db) => Promise.resolve(db.collection('user')));
        const userP = collectionP
            .then((collection) => {
                const criteria = { [key]: value };
                return new Promise(function (resolve, reject) {
                    collection.findOne(criteria, function (err, user: User) {
                        if (err) {
                            reject(err);
                        }
                        if (user === null) {
                            resolve(undefined);
                        }
                        const user2 = Object.assign({}, user);
                        delete user2['_id'];
                        resolve(user2);
                    });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });
        return userP as Promise<User>;
    }

    public delete<K extends keyof User>(key: K, value): Promise<void> {
        const dbP = getDbClientPromise().then((client) => Promise.resolve(client.db('courses')));
        const collectionP = dbP.then((db) => Promise.resolve(db.collection('user')));
        const deleteP = collectionP
            .then((collection) => {
                const criteria = { [key]: value };
                return new Promise(function (resolve, reject) {
                    collection.deleteOne(criteria, function (err) {
                        if (err) {
                            reject(err);
                        }
                        resolve(true);
                    });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });

        return deleteP as Promise<void>;
    }

    public update<K extends keyof User>(key: K, value, newEntity: User): Promise<void> {
        const dbP = getDbClientPromise().then((client) => Promise.resolve(client.db('courses')));
        const collectionP = dbP.then((db) => Promise.resolve(db.collection('user')));
        const updateP = collectionP
            .then((collection) => {
                const criteria = { [key]: value };
                return new Promise(function (resolve, reject) {
                    collection.updateOne(criteria, { $set: newEntity }, function (err) {
                        if (err) {
                            reject(err);
                        }
                        resolve(true);
                    });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });

        return updateP as Promise<void>;
    }
}
