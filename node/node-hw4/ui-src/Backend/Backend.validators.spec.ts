import { GetUsersAnswer, validateGetUsersAnswer } from './Backend.validators';
import faker from 'faker';

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
            users: [{ id: faker.random.number(), name: faker.random.word() }]
        };

        expect(validateGetUsersAnswer(input)).toEqual({
            errors: []
        });
    });

    it('returns error "Field required" if input.users[0] has no name', () => {
        const input: GetUsersAnswer = {
            success: true,
            users: [{ id: faker.random.number(), name: 'ss' }]
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

        expect(validateGetUsersAnswer(input)).toEqual({
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
