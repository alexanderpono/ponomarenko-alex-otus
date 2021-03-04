import { fetchError, Status, userName, userReducer, userRole } from './userReducer';
import faker from 'faker';

describe('userReducer', () => {
    it('sets name when receives USER_NAME action', () => {
        const name = faker.random.word();
        const state = userReducer(undefined, userName(name));
        expect(state.name).toBe(name);
        expect(state.status).toBe(Status.USER_NAME);
        expect(state.errorInfo).toBe('');
    });

    it('sets role when receives USER_ROLE action', () => {
        const role = faker.random.word();
        const state = userReducer(undefined, userRole(role));
        expect(state.role).toBe(role);
        expect(state.status).toBe(Status.USER_ROLE);
        expect(state.errorInfo).toBe('');
    });

    it('sets errorInfo when receives FETCH_ERROR action', () => {
        const errorInfo = faker.random.word();
        const state = userReducer(undefined, fetchError(errorInfo));
        expect(state.errorInfo).toBe(errorInfo);
        expect(state.status).toBe(Status.FETCH_ERROR);
    });
});
