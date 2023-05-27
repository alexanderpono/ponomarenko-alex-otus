import { RouteController } from '../decorator/classes';
import { get, logPostBody, post } from '../decorator/methods';

function* getClient() {
    return {
        db: function (dbName) {
            return { name: dbName };
        }
    };
}
function getCollection() {
    return 1;
}
function fetchAllCourses() {
    return [
        {
            id: 1,
            name: 'Ali'
        },
        {
            id: 2,
            name: 'Can'
        },
        {
            id: 3,
            name: 'Ahmet'
        }
    ];
}

function* getData(call) {
    const client = yield call(getClient);
    const db = client.db('tasks');
    const collection = yield call(getCollection, db, 'courses');
    const allCourses = yield call(fetchAllCourses, collection);
    return allCourses;
}

function myCall(f, ...params) {
    let value = f(...params);

    if (typeof value.next === 'function') {
        const task = value;
        let result = task.next();

        function step() {
            if (!result.done) {
                if (typeof result.value === 'function') {
                    result.value(function (err, data) {
                        if (err) {
                            result = task.throw(err);
                            return;
                        }
                        result = task.next(data);
                        step();
                    });
                } else {
                    result = task.next(result.value);
                    step();
                }
            } else {
                value = result.value;
            }
        }
        step();
    }
    return value;
}

function run(taskDef) {
    const task = taskDef();

    let result = task.next();

    function step() {
        if (!result.done) {
            if (typeof result.value === 'function') {
                result.value(function (err, data) {
                    if (err) {
                        result = task.throw(err);
                        return;
                    }

                    result = task.next(data);
                    step();
                });
            } else {
                result = task.next(result.value);
                step();
            }
        }
    }
    step();
}

@RouteController('/')
export class HomeController {
    @get('/')
    index() {
        return new Promise(function (resolve) {
            run(function* () {
                const contents = yield* getData(myCall);
                console.log('run() contents=', contents);
                resolve(contents);
                console.log('run() Done');
            });
        });

        // return new Promise(function (resolve, reject) {
        //     resolve([
        //         {
        //             id: 1,
        //             name: 'Ali'
        //         },
        //         {
        //             id: 2,
        //             name: 'Can'
        //         },
        //         {
        //             id: 3,
        //             name: 'Ahmet'
        //         }
        //     ]);
        // });
        // return [
        //     {
        //         id: 1,
        //         name: 'Ali'
        //     },
        //     {
        //         id: 2,
        //         name: 'Can'
        //     },
        //     {
        //         id: 3,
        //         name: 'Ahmet'
        //     }
        // ];
    }

    @get('/get')
    get() {
        return [
            {
                id: 1,
                name: 'Ali'
            },
            {
                id: 2,
                name: 'Can'
            },
            {
                id: 3,
                name: 'Ahmet'
            }
        ];
    }

    @logPostBody('home-post')
    @post('/post')
    post() {
        return { postCode: true };
    }
}
