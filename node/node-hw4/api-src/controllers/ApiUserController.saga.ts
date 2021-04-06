import { User } from '../models/User';
import { getUserRepository } from '../repositories/UserRepository';
import Validator from 'schema-validator';
import { CallEffect, PutEffect, Result } from '@api-src/lib/saga';

export function* getAllSaga(res: Result, call: CallEffect, put: PutEffect) {
    try {
        const users = yield call(getUsers);
        return { success: true, users };
    } catch (err) {
        yield put(res, 'status', 500);
        yield put(res, 'json', { success: false, data: err });
        return res;
    }
}

export function* getOneSaga(res: Result, id: number, call: CallEffect, put: PutEffect) {
    try {
        const user = yield call(findUser, id);
        return { success: true, user };
    } catch (err) {
        yield put(res, 'status', 400);
        yield put(res, 'json', err);
        return res;
    }
}

export async function getUsers(): Promise<User[]> {
    try {
        const repo = await getUserRepository();
        const result = repo.entities;
        return result;
    } catch (err) {
        return Promise.reject({ success: false, data: err });
    }
}

export async function findUser(id: number): Promise<User> {
    const repo = await getUserRepository();
    const record = await repo.find('id', Number(id));
    if (typeof record === 'undefined') {
        return Promise.reject({ result: false, data: { id, message: 'NOT FOUND' } });
    }
    return Promise.resolve(record);
}

export async function updateUser(id: number, newUser: User): Promise<void> {
    const repo = await getUserRepository();
    await repo.update('id', id, newUser);
    return Promise.resolve();
}

export function* postSaga(res: Result, input: User, call: CallEffect, put: PutEffect) {
    try {
        yield call(validateUser, input);
    } catch (err) {
        yield put(res, 'status', 400);
        yield put(res, 'json', err);
        return res;
    }

    try {
        yield call(insertUser, input);
    } catch (err) {
        yield put(res, 'status', 500);
        yield put(res, 'json', err);
        return res;
    }

    yield put(res, 'status', 201);
    yield put(res, 'json', { success: true });
    return res;
}

export function validateUser(input: User) {
    return new Promise((resolve, reject) => {
        const rootSchema = {
            name: {
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

export async function insertUser(user: User): Promise<void> {
    const repo = await getUserRepository();
    const newUser: User = JSON.parse(JSON.stringify(user));
    newUser.id = await repo.getNewId();
    return repo.add(newUser);
}

export async function deleteUser(id: number): Promise<void> {
    const repo = await getUserRepository();
    await repo.delete('id', Number(id));
    return Promise.resolve();
}

export function* putSaga(res: Result, id: number, input: User, call: CallEffect, put: PutEffect) {
    try {
        yield call(validateUser, input);
    } catch (err) {
        yield put(res, 'status', 400);
        yield put(res, 'json', err);
        return res;
    }

    let dbUser: User | null = null;
    try {
        dbUser = yield call(findUser, Number(id));
    } catch (err) {
        yield put(res, 'status', 400);
        yield put(res, 'json', err);
        return res;
    }

    dbUser = dbUser as User;
    if (dbUser.id !== input['id']) {
        yield put(res, 'status', 400);
        yield put(res, 'json', {
            result: false,
            data: { id: dbUser.id, message: 'CANNOT CHANGE KEY FIELD', newId: input['id'] }
        });
        return res;
    }

    try {
        yield call(updateUser, Number(id), input);
    } catch (err) {
        yield put(res, 'status', 500);
        yield put(res, 'json', err);
        return res;
    }

    return { success: true };
}

export function* deleteSaga(res: Result, id: number, call: CallEffect, put: PutEffect) {
    try {
        yield call(findUser, Number(id));
    } catch (err) {
        yield put(res, 'status', 400);
        yield put(res, 'json', err);
        return res;
    }

    try {
        yield call(deleteUser, Number(id));
    } catch (err) {
        yield put(res, 'status', 500);
        yield put(res, 'json', err);
        return res;
    }

    return { success: true };
}
