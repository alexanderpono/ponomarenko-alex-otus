"use strict";
exports.__esModule = true;
exports.AppStorage = void 0;
var db_1 = require("../db");
var AppStorage = /** @class */ (function () {
    function AppStorage() {
    }
    AppStorage.prototype.getCourses = function () {
        var getCoursesPromise = db_1.getDbClientPromise()
            .then(function resolved(client) {
            return new Promise(function (resolve, reject) {
                var db = client.db('courses');
                db.collection('user')
                    .find({ markID: '1.1.2.1' }, { projection: { _id: 0, messageID: 1, text: 1 } })
                    .toArray(function (err, result) {
                    // console.log('err1=', err);
                    // console.log('result1=', result);
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            });
        })["catch"](function rejected(err) {
            return Promise.reject(err);
        });
        return getCoursesPromise;
    };
    AppStorage.prototype.getUsers = function () {
        var getUsersPromise = db_1.getDbClientPromise()
            .then(function resolved(client) {
            return new Promise(function (resolve, reject) {
                var db = client.db('courses');
                db.collection('user')
                    .find({ markID: '1.1.2.1' }, { projection: { _id: 0, messageID: 1, text: 1 } })
                    .toArray(function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                    // writeResultToFile(result);
                    // client.close();
                });
            });
        })["catch"](function rejected(err) {
            return Promise.reject(err);
        });
        return getUsersPromise;
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
    };
    return AppStorage;
}());
exports.AppStorage = AppStorage;
