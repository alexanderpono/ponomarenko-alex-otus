import { expect } from '@jest/globals';
import { coursesApiProvider as apiProvider } from './framework';
import { ParamsBuilder } from './framework/builder/ParamsBuilder';
import { user } from './framework/config';
import faker from 'faker';

interface User {
    name: string;
    role: string;
    id: number;
}
describe('Courses', () => {
    const getAllUsers = async () => {
        const params = new ParamsBuilder().addGoodToken().addAdminUser().generate();
        const r = await apiProvider().users().get(params);
        return r;
    };
    const getUsersWithRoleUser = (users: User[]) =>
        users.filter((item: User) => item.role === user.localCourses.userRole);

    const getMaxId = (users: User[]): number => {
        let maxId = users[0].id;
        users.forEach((user: User) => {
            if (user.id > maxId) {
                maxId = user.id;
            }
        });
        return maxId;
    };

    it('gets a user by id', async () => {
        const r = await getAllUsers();
        expect(r.status).toEqual(200);
        expect(Array.isArray(r.body.users)).toEqual(true);
        const users = getUsersWithRoleUser(r.body.users);
        expect(users.length).toBeGreaterThan(0);
        const user2 = users[0];

        const params2 = new ParamsBuilder()
            .addGoodToken()
            .addAdminUser()
            .addUserId(user2.id)
            .generate();
        const r2 = await apiProvider().users().getById(params2);
        expect(r2.status).toEqual(200);
        expect(typeof r2.body.user).toBe('object');
        expect(r2.body.user.name).toBe(user2.name);
    });

    it('updates a user by id', async () => {
        const r = await getAllUsers();
        expect(r.status).toEqual(200);
        expect(Array.isArray(r.body.users)).toEqual(true);
        const users = r.body.users.filter((item: User) => item.role === user.localCourses.userRole);
        expect(users.length).toBeGreaterThan(0);

        const lastUser = users[users.length - 1];
        lastUser.name = lastUser.name + faker.random.word();

        const params2 = new ParamsBuilder()
            .addGoodToken()
            .addAdminUser()
            .addUserId(lastUser.id)
            .addCoursesUser(lastUser.name)
            .addCoursesUserRole(lastUser.role)
            .generate();
        const r2 = await apiProvider().users().put(params2);
        expect(r2.status).toEqual(200);
    });

    it('deletes a user by id', async () => {
        const r = await getAllUsers();
        expect(r.status).toEqual(200);
        expect(Array.isArray(r.body.users)).toEqual(true);
        const users = getUsersWithRoleUser(r.body.users);
        expect(users.length).toBeGreaterThan(0);
        const maxId = getMaxId(users);

        const params2 = new ParamsBuilder()
            .addGoodToken()
            .addAdminUser()
            .addUserId(maxId)
            .generate();
        const r2 = await apiProvider().users().delete(params2);
        expect(r2.status).toEqual(200);
    });
});

describe('CoursesAPI-users-parameterized', () => {
    const builder = ParamsBuilder;
    test.each`
        paramsBuilder                                                                                    | method       | testName                                     | expectedHttpCode | bodyField | expectedVal
        ${new builder().addGoodToken().addAdminUser()}                                                   | ${'get'}     | ${'admin can view users'}                    | ${200}           | ${null}   | ${null}
        ${new builder().addGoodToken().addUsualUser()}                                                   | ${'get'}     | ${'not admin cannot view users'}             | ${403}           | ${null}   | ${null}
        ${new builder().addBadToken().addAdminUser()}                                                    | ${'get'}     | ${'rejects to get users without api key'}    | ${401}           | ${null}   | ${null}
        ${new builder().addGoodToken().addAdminUser().addCoursesRndUserName().addCoursesUserUsualRole()} | ${'post'}    | ${'successfully adds usual user'}            | ${201}           | ${null}   | ${null}
        ${new builder().addGoodToken().addAdminUser().addUserId(-1)}                                     | ${'getById'} | ${'rejects to get user with unknown id'}     | ${400}           | ${null}   | ${null}
        ${new builder().addGoodToken().addAdminUser().addUserId(-1)}                                     | ${'delete'}  | ${'rejects to delete users with unknown id'} | ${400}           | ${null}   | ${null}
        ${new builder().addGoodToken().addAdminUser().addUserId(-1)}                                     | ${'put'}     | ${'rejects to update user with unknown id'}  | ${400}           | ${null}   | ${null}
    `(
        '$testName',
        async ({
            paramsBuilder,
            method,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            testName,
            expectedHttpCode,
            bodyField,
            expectedVal
        }) => {
            const params = paramsBuilder.generate();
            const r = await apiProvider().users()[method](params);
            expect(r.status).toEqual(expectedHttpCode);
            if (bodyField !== null) {
                expect(r.body[bodyField]).toEqual(expectedVal);
            }
        }
    );
});
