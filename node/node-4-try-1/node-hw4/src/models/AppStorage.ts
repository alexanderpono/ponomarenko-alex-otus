import { Course, User } from 'src/interfaces';
import { getDbClientPromise } from '../db';

export class AppStorage {
    getCourses(): Promise<void | Course[]> {
        const getCoursesPromise = getDbClientPromise()
            .then(function resolved(client) {
                return new Promise(function (resolve, reject) {
                    const db = client.db('courses');
                    db.collection('user')
                        .find(
                            { markID: '1.1.2.1' },
                            { projection: { _id: 0, messageID: 1, text: 1 } }
                        )
                        .toArray(function (err, result: User[]) {
                            // console.log('err1=', err);
                            // console.log('result1=', result);
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
        return getCoursesPromise as Promise<Course[]>;
    }

    getUsers(): Promise<void | User[]> {
        const getUsersPromise = getDbClientPromise()
            .then(function resolved(client) {
                return new Promise(function (resolve, reject) {
                    const db = client.db('courses');
                    db.collection('user')
                        .find(
                            { markID: '1.1.2.1' },
                            { projection: { _id: 0, messageID: 1, text: 1 } }
                        )
                        .toArray(function (err, result: User[]) {
                            if (err) {
                                reject(err);
                            }
                            resolve(result);
                            // writeResultToFile(result);
                            // client.close();
                        });
                });
            })
            .catch(function rejected(err) {
                return Promise.reject(err);
            });
        return getUsersPromise as Promise<User[]>;
        // }
        // const client = getDbClient();
        // if (client === null) {
        //     return Promise.resolve(this.users);
        // }
        // // const me = this;
        // return new Promise(function (resolve, reject) {
        //     const db = client.db('courses');
        //     db.collection('user')
        //         .find({ markID: '1.1.2.1' }, { projection: { _id: 0, messageID: 1, text: 1 } })
        //         .toArray(function (err: any, result: any) {
        //             if (err) {
        //                 reject(err);
        //                 return;
        //                 // throw err;
        //             }
        //             resolve(result);
        //             // writeResultToFile(result);
        //             // client.close();
        //         });
        // });

        // // return Promise.resolve(this.users);
    }

}
