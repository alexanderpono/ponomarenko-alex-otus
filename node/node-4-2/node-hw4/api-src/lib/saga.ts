export type CallEffect = (f, ...params) => void;

export interface Result {
    status: (val) => void;
    json: (val) => void;
}
export type PutEffect = (res: Result, targetName: string, value) => void;

export const call: CallEffect = (f, ...params) => {
    let value = f(...params);
    if (typeof value.next === 'function') {
        return new Promise(function (resolve) {
            const task = value;
            let result = task.next();
            (function step() {
                if (!result.done) {
                    const promise = Promise.resolve(result.value);
                    promise
                        .then(function (value) {
                            result = task.next(value);
                            step();
                        })
                        .catch(function (error) {
                            result = task.throw(error);
                            step();
                        });
                } else {
                    value = result.value;
                    resolve(value);
                }
            })();
        });
    }

    if (!(value instanceof Promise)) {
        value = Promise.resolve(value);
    }
    return value;
};

export const put: PutEffect = (res: Result, targetName: string, value) => {
    if (targetName === 'status') {
        res.status(value);
    }
    if (targetName === 'json') {
        res.json(value);
    }
};

export function runSaga(taskDef, ...params) {
    const task = taskDef(...params);

    let result = task.next();

    return new Promise(function (resolve) {
        (function step() {
            if (!result.done) {
                const promise = Promise.resolve(result.value);
                promise
                    .then(function (value) {
                        result = task.next(value);
                        step();
                    })
                    .catch(function (error) {
                        result = task.throw(error);
                        step();
                    });
            } else {
                resolve(result.value);
            }
        })();
    });
}

export const callStub: CallEffect = (f, ...params) => ({ effect: 'call', f, params });

export const putStub: PutEffect = (res, targetName: string, value) => ({
    effect: 'put',
    res,
    targetName,
    value
});
