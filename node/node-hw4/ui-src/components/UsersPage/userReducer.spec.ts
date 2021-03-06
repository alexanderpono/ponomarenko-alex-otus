import {
    accessGranted,
    fetchError,
    Status,
    userLogout,
    userName,
    userNotFound,
    userReducer,
    userRole
} from './userReducer';
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

    it('sets status when receives USER_NOT_FOUND action', () => {
        const name = faker.random.word();
        const userState = userReducer(undefined, userName(name));
        const state = userReducer(userState, userNotFound(name));
        expect(state.errorInfo).toBe(name);
        expect(state.name).toBe('');
        expect(state.status).toBe(Status.USER_NOT_FOUND);
    });

    it('sets status when receives ACCESS_GRANTED action', () => {
        const state = userReducer(undefined, accessGranted());
        expect(state.errorInfo).toBe('');
        expect(state.status).toBe(Status.ACCESS_GRANTED);
    });

    it('sets state when receives LOGOUT action', () => {
        const name = faker.random.word();
        const userState = userReducer(undefined, userName(name));
        const roleState = userReducer(userState, userRole('admin'));
        const grantedState = userReducer(roleState, accessGranted());
        const state = userReducer(grantedState, userLogout());
        expect(state.errorInfo).toBe('');
        expect(state.name).toBe('');
        expect(state.role).toBe('');
        expect(state.status).toBe(Status.LOGOUT);
    });
});
