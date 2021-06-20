import { GetUsersAnswer, validateGetUsersAnswer, validateLoginAnswer } from './Backend.validators';
import faker from 'faker';
import { LoginAnswer } from './Backend';

describe('validateGetUsersAnswer()', () => {
    it('returns 0 errors from epmty result', () => {
        const answer: GetUsersAnswer = {
            success: true,
            users: []
        };

        expect(validateGetUsersAnswer(answer)).toEqual({
            errors: []
        });
    });

    it('returns error "Field required" if input has no success', () => {
        const input: GetUsersAnswer = {
            success: true,
            users: []
        };
        delete input.success;

        expect(validateGetUsersAnswer(input)).toEqual({
            errors: [{ field: 'success', message: 'Missing required field' }]
        });
    });

    it('returns error "Invalid data type" input.success is not Boolean', () => {
        const input = {
            success: 123,
            users: []
        };

        expect(validateGetUsersAnswer((input as unknown) as GetUsersAnswer)).toEqual({
            errors: [
                {
                    field: 'success',
                    message: 'Invalid data type',
                    received: 'number',
                    expected: 'Boolean'
                }
            ]
        });
    });

    it('returns ok if input.users[0] ok', () => {
        const input: GetUsersAnswer = {
            success: true,
            users: [{ id: faker.datatype.number(), name: faker.random.word() }]
        };

        expect(validateGetUsersAnswer(input)).toEqual({
            errors: []
        });
    });

    it('returns error "Field required" if input.users[0] has no name', () => {
        const input: GetUsersAnswer = {
            success: true,
            users: [{ id: faker.datatype.number(), name: 'ss' }]
        };
        delete input.users[0].name;

        expect(validateGetUsersAnswer(input)).toEqual({
            errors: [{ field: 'users[0].name', message: 'Missing required field' }]
        });
    });

    it('returns error "Invalid data type" if input.users[0].id is not a number', () => {
        const input = {
            success: true,
            users: [{ id: faker.random.word(), name: faker.random.word() }]
        };

        expect(validateGetUsersAnswer((input as unknown) as GetUsersAnswer)).toEqual({
            errors: [
                {
                    field: 'users[0].id',
                    message: 'Invalid data type',
                    received: 'string',
                    expected: 'Number'
                }
            ]
        });
    });
});

describe('validateLoginAnswer()', () => {
    it('returns 0 errors from epmty LoginAnswer', () => {
        const answer: LoginAnswer = {
            success: true,
            role: ''
        };

        expect(validateLoginAnswer(answer)).toEqual({
            errors: []
        });
    });

    it('returns error "Field required" if LoginAnswer has no success', () => {
        const input: LoginAnswer = {
            success: true,
            role: ''
        };
        delete input.success;

        expect(validateLoginAnswer((input as unknown) as LoginAnswer)).toEqual({
            errors: [{ field: 'success', message: 'Missing required field' }]
        });
    });

    it('returns error "Invalid data type" LoginAnswer.success is not Boolean', () => {
        const input = {
            success: 123,
            role: ''
        };

        expect(validateLoginAnswer((input as unknown) as LoginAnswer)).toEqual({
            errors: [
                {
                    field: 'success',
                    message: 'Invalid data type',
                    received: 'number',
                    expected: 'Boolean'
                }
            ]
        });
    });

    it('returns ok if LoginAnswer.role ok', () => {
        const input: LoginAnswer = {
            success: true,
            role: faker.random.word()
        };

        expect(validateLoginAnswer(input)).toEqual({
            errors: []
        });
    });

    it('returns error "Invalid data type" if LoginAnswer.role is not a string', () => {
        const input = {
            success: true,
            role: faker.datatype.number()
        };

        expect(validateLoginAnswer((input as unknown) as LoginAnswer)).toEqual({
            errors: [
                {
                    field: 'role',
                    message: 'Invalid data type',
                    received: 'number',
                    expected: 'String'
                }
            ]
        });
    });
});
