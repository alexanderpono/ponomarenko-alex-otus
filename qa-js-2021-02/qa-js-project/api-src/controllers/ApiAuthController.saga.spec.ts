import { authSaga, validateAuth } from './ApiAuthController.saga';
import { callStub as call, putStub as put, Result } from '../lib/saga';

import faker from 'faker';
import { Auth } from '../models/Auth';
import { getUsers } from './ApiUserController.saga';
import { User } from '../models/User';

describe('authSaga()', () => {
    const res: Result = { status: () => faker.random.word(), json: () => faker.datatype.number() };

    it('calls 1) validateAuth 2) getUsers 3) http(201),res  if all is ok', () => {
        const newAuth: Auth = {
            userName: 'Kate'
        };
        const users: User[] = [
            { id: 1, name: 'Anton', role: 'admin' },
            { id: 2, name: 'Kate', role: 'user' }
        ];
        const gen = authSaga(res, newAuth, call, put);

        expect(gen.next().value).toEqual(call(validateAuth, newAuth));
        expect(gen.next().value).toEqual(call(getUsers));
        expect(gen.next(users).value).toEqual(put(res, 'status', 200));
        expect(gen.next().value).toEqual(put(res, 'json', { success: true, role: 'user' }));
        expect(gen.next().value).toEqual(res);
    });

    it('returns http(400) if call(validateUser, input) failed', () => {
        const newAuth: Auth = {
            userName: 'Kate'
        };
        const err = new Error('errrrr');
        const gen = authSaga(res, newAuth, call, put);

        expect(gen.next().value).toEqual(call(validateAuth, newAuth));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 400));
        expect(gen.next().value).toEqual(put(res, 'json', err));
    });

    it('returns http(500) if call(getUsers) failed', () => {
        const newAuth: Auth = {
            userName: 'Kate'
        };
        const err = new Error('errrrr');
        const gen = authSaga(res, newAuth, call, put);

        expect(gen.next().value).toEqual(call(validateAuth, newAuth));
        expect(gen.next().value).toEqual(call(getUsers));
        expect(gen.throw(err).value).toEqual(put(res, 'status', 500));
        expect(gen.next().value).toEqual(put(res, 'json', { success: false, data: err }));
    });

    it('returns http(401) if user with such name is not found', () => {
        const newAuth: Auth = {
            userName: 'Peter'
        };
        const users: User[] = [
            { id: 1, name: 'Anton', role: 'admin' },
            { id: 2, name: 'Kate', role: 'user' }
        ];

        const gen = authSaga(res, newAuth, call, put);

        expect(gen.next().value).toEqual(call(validateAuth, newAuth));
        expect(gen.next().value).toEqual(call(getUsers));
        expect(gen.next(users).value).toEqual(put(res, 'status', 401));
        expect(gen.next().value).toEqual(
            put(res, 'json', { success: false, message: 'user not found' })
        );
        expect(gen.next().value).toEqual(res);
    });
});
