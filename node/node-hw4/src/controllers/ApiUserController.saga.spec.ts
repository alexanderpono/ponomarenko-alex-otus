import {
    getAllSaga,
    getOneSaga,
    getUsers,
    findUser,
    postSaga,
    validateUser,
    insertUser,
    putSaga,
    updateUser,
    deleteSaga,
    deleteUser
} from './ApiUserController.saga';
import { callStub as call, putStub as put, Result } from '../lib/saga';

import faker from 'faker';
import { User } from '../models/User';

describe('getAllSaga()', () => {
    const res: Result = { status: () => null, json: () => null };

    it('yields call(getUsers) and returns found records if all is ok', () => {
        const gen = getAllSaga(res, call, put);

        expect(gen.next().value).toEqual(call(getUsers));
        const getUsersReturned = [{ id: faker.random.number(), name: faker.random.word() }];
        expect(gen.next(getUsersReturned).value).toEqual({
            success: true,
            users: getUsersReturned
        });
    });

    it('yields call(getUsers) and returns http(500) if call(getUsers) failed', () => {
        const gen = getAllSaga(res, call, put);
        const err = new Error('errrrr');

        expect(gen.next().value).toEqual(call(getUsers));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 500));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });
});

describe('getOneSaga()', () => {
    const res: Result = { status: () => faker.random.word(), json: () => faker.random.number() };

    it('yields call(findUser, id) and returns 1 record if all is ok', () => {
        const recordNumber = faker.random.number();
        const gen = getOneSaga(res, recordNumber, call, put);

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        const findUserReturned = [{ id: faker.random.number(), name: faker.random.word() }];
        expect(gen.next(findUserReturned).value).toEqual({
            success: true,
            user: findUserReturned
        });
    });

    it('yields call(findUser) and returns http(500) if call(getUsers) failed', () => {
        const recordNumber = faker.random.number();
        const gen = getOneSaga(res, recordNumber, call, put);
        const err = new Error('errrrr');

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });
});

describe('postSaga()', () => {
    const res: Result = { status: () => faker.random.word(), json: () => faker.random.number() };

    it('calls 1) validateUser 2) insertUser 3) http(201),res  if all is ok', () => {
        const newUser: User = {
            id: 2,
            name: 'Kate'
        };
        const gen = postSaga(res, newUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, newUser));
        expect(gen.next().value).toEqual(call(insertUser, newUser));
        expect(gen.next().value).toEqual(put(res, 'status', 201));
        expect(gen.next().value).toEqual(put(res, 'json', { success: true }));
        expect(gen.next().value).toEqual(res);
    });

    it('returns http(400) if call(validateUser, input) failed', () => {
        const newUser: User = {
            id: 2,
            name: 'Kate'
        };
        const err = new Error('errrrr');
        const gen = postSaga(res, newUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, newUser));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });

    it('returns http(500) if call(insertUser) failed', () => {
        const newUser: User = {
            id: 2,
            name: 'Kate'
        };
        const err = new Error('errrrr');
        const gen = postSaga(res, newUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, newUser));
        expect(gen.next().value).toEqual(call(insertUser, newUser));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 500));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });
});

describe('putSaga()', () => {
    const res: Result = { status: () => faker.random.word(), json: () => faker.random.number() };

    it('yields call(validateUser, input)', () => {
        const updatedUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
    });

    it('returns http(400) if call(validateUser) failed', () => {
        const updatedUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);
        const err = new Error('errrrr');

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });

    it('yields call(findUser) if call(validateUser) succeed', () => {
        const updatedUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
        expect(gen.next().value).toEqual(call(findUser, recordNumber));
    });

    it('returns http(400) if call(findUser) failed', () => {
        const updatedUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);
        const err = new Error('errrrr');

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });

    it('returns http(400), "CANNOT CHANGE KEY FIELD" foundUser.id != updatedUser.id', () => {
        const foundUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const updatedUser: User = {
            id: foundUser.id + 1,
            name: faker.random.word()
        };

        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.next(foundUser).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(
            put(res, 'json', {
                result: false,
                data: {
                    id: foundUser.id,
                    message: 'CANNOT CHANGE KEY FIELD',
                    newId: updatedUser.id
                }
            })
        );
    });

    it('yields call(updateUser) if call(findUser) succeed and old.id==new.id', () => {
        const foundUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const updatedUser: User = {
            id: foundUser.id,
            name: faker.random.word()
        };
        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.next(foundUser).value).toEqual(call(updateUser, recordNumber, updatedUser));
    });

    it('returns success=true if all is ok', () => {
        const foundUser: User = {
            id: faker.random.number(),
            name: faker.random.word()
        };
        const updatedUser: User = {
            id: foundUser.id,
            name: faker.random.word()
        };
        const recordNumber = faker.random.number();
        const gen = putSaga(res, recordNumber, updatedUser, call, put);

        expect(gen.next().value).toEqual(call(validateUser, updatedUser));
        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.next(foundUser).value).toEqual(call(updateUser, recordNumber, updatedUser));
        expect(gen.next().value).toEqual({ success: true });
    });
});

describe('deleteSaga()', () => {
    const res: Result = { status: () => faker.random.word(), json: () => faker.random.number() };

    it('yields call(findUser)', () => {
        const recordNumber = faker.random.number();
        const gen = deleteSaga(res, recordNumber, call, put);

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
    });

    it('deleteSaga() returns http(400) if call(findUser) failed', () => {
        const recordNumber = faker.random.number();
        const gen = deleteSaga(res, recordNumber, call, put);
        const err = new Error('errrrr');

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });

    it('yields call(deleteUser)', () => {
        const recordNumber = faker.random.number();
        const gen = deleteSaga(res, recordNumber, call, put);

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.next().value).toEqual(call(deleteUser, recordNumber));
    });

    it('deleteSaga() returns http(500) if call(deleteUser) failed', () => {
        const recordNumber = faker.random.number();
        const gen = deleteSaga(res, recordNumber, call, put);
        const err = new Error('errrrr');

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.next().value).toEqual(call(deleteUser, recordNumber));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 500));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });

    it('returns success=true if call(deleteUser) succeed', () => {
        const recordNumber = faker.random.number();
        const gen = deleteSaga(res, recordNumber, call, put);

        expect(gen.next().value).toEqual(call(findUser, recordNumber));
        expect(gen.next().value).toEqual(call(deleteUser, recordNumber));
        expect(gen.next().value).toEqual({ success: true });
    });
});
