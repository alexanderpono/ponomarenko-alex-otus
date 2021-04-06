import { CallEffect, PutEffect, Result } from '@api-src/lib/saga';
import Validator from 'schema-validator';
import { Auth } from '@api-src/models/Auth';
import { getUsers } from './ApiUserController.saga';
import { User } from '@api-src/models/User';

export function validateAuth(input: Auth) {
    return new Promise((resolve, reject) => {
        const rootSchema = {
            userName: {
                type: String,
                required: true
            }
        };
        const validator = new Validator(rootSchema);
        const check = validator.check(input);

        if (check._error === true) {
            const errors = Object.entries(check).filter((entry) => {
                return entry[0] !== '_error';
            });
            reject({ success: false, errors });
        } else {
            resolve(input);
        }
    });
}

export function* authSaga(res: Result, input: Auth, call: CallEffect, put: PutEffect) {
    try {
        yield call(validateAuth, input);
    } catch (err) {
        yield put(res, 'status', 400);
        yield put(res, 'json', err);
        return res;
    }

    let users: User[] | null = null;
    try {
        users = yield call(getUsers);
        // return { success: true, users };
    } catch (err) {
        yield put(res, 'status', 500);
        yield put(res, 'json', { success: false, data: err });
        return res;
    }

    users = users as User[];

    const user = users.find((user: User) => {
        return user.name === input.userName;
    });

    if (typeof user === 'undefined') {
        yield put(res, 'status', 401);
        yield put(res, 'json', { success: false, message: 'user not found' });
        return res;
    }

    const role = typeof user.role !== 'undefined' ? user.role : 'user';

    yield put(res, 'status', 200);
    yield put(res, 'json', { success: true, role });
    return res;
}
