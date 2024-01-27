const { apiProvider } = require('./framework/services');
const { ParamsBuilder } = require('./framework/ParamsBuilder');
const db = require('../service/db');
const { DELME_ID } = require('./constants');
const PETER_ID = require('./constants').PETER_ID;
const NICK_ID = require('./constants').NICK_ID;
const MATH_ID = require('./constants').MATH_ID;
const FILE_ID = require('./constants').FILE_ID;

const getProjection = (items, projection) => {
    const projectionAr = projection.split(' ');
    if (Array.isArray(items)) {
        return items.map((item) => {
            const result = {};
            projectionAr.forEach((field) => {
                result[field] = item[field];
                if (Array.isArray(item[field])) {
                    result[field] = [];
                    item[field].forEach((item) => {
                        let itemToPush = null;
                        if (typeof item === 'string') {
                            itemToPush = item;
                        } else {
                            itemToPush = { ...item };
                            delete itemToPush._id;
                        }
                        result[field].push(itemToPush);
                    });
                }
            });
            return result;
        });
    }
    const result = {};
    projectionAr.forEach((field) => {
        result[field] = items[field];
        if (Array.isArray(items[field])) {
            result[field] = [];
            items[field].forEach((item) => {
                let itemToPush = null;
                if (typeof item === 'string') {
                    itemToPush = item;
                } else {
                    itemToPush = { ...item };
                    delete itemToPush._id;
                }
                result[field].push(itemToPush);
            });
        }
    });
    return result;
};

describe('api', () => {
    const builder = ParamsBuilder;
    beforeAll(async () => {
        const params = new builder().addUsualUser().generate();
        await apiProvider().reset().reset(params);
    });

    describe('API', () => {
        const Masha = { name: 'Masha', login: 'masha', pass: 'pwd', privileges: [] };
        const Peter = { name: 'Peter', login: 'peter', pass: 'p', privileges: ['users'] };
        const Nick = {
            name: 'nick',
            login: 'nick',
            pass: 'p',
            privileges: ['users.admin', 'files.admin']
        };
        const Delme = { name: 'delme', login: 'delme', pass: 'p', privileges: [] };
        const Tom = {
            name: 'tom',
            login: 'tom',
            pass: 'p',
            privileges: ['users', 'courses', 'files']
        };
        const putPeter = {
            id: db.toObjectId(PETER_ID),
            params: { ...Peter, pass: 'newPass' }
        };
        const USER_P = 'name login pass privileges';

        const COURSE_P = 'description author_id difficulty lessons';
        const Physics = { description: 'Physics', author_id: PETER_ID, difficulty: 4, lessons: [] };
        const Math = {
            description: 'Math',
            author_id: PETER_ID,
            difficulty: 3,
            lessons: [{ description: '1. Математика - вводный урок' }]
        };
        const History = {
            description: 'History',
            author_id: PETER_ID,
            difficulty: 3,
            lessons: [{ description: '1. История - вводный урок' }]
        };
        const putMath = {
            id: db.toObjectId(MATH_ID),
            params: { ...Math, description: 'super Math!' }
        };

        const USER_USER_P = 'name login';
        const PeterUser = { name: 'Peter', login: 'peter' };
        const NickUser = { name: 'nick', login: 'nick' };
        const DelmeUser = { name: 'delme', login: 'delme' };
        const TomUser = { name: 'tom', login: 'tom' };

        const ADMIN_FILE_P = 'name size type';
        const song = { name: '1.png', size: 369, type: 'picture' };

        const fileMeta = { name: '1.png', size: 369, type: 'image/png' };

        test.each`
            api                                               | params      | testName                                                                | expectedHttpCode | projection      | expectedVal
            ${apiProvider().users().get}                      | ${{}}       | ${'GET /api/users returns users(USER)'}                                 | ${200}           | ${USER_USER_P}  | ${[PeterUser, NickUser, DelmeUser, TomUser]}
            ${apiProvider().users().getNoCreds}               | ${{}}       | ${'GET /api/users (no creds) returns 401'}                              | ${401}           | ${null}         | ${null}
            ${apiProvider().users().getById}                  | ${PETER_ID} | ${`GET /api/users/[PETER_ID] returns Peter(USER)`}                      | ${200}           | ${USER_USER_P}  | ${PeterUser}
            ${apiProvider().users().getByIdNoCreds}           | ${PETER_ID} | ${'GET /api/users/[PETER_ID] (no creds) returns 401'}                   | ${401}           | ${null}         | ${null}
            ${apiProvider().adminUsers().get}                 | ${{}}       | ${'GET /admin/users returns users'}                                     | ${200}           | ${USER_P}       | ${[Peter, Nick, Delme, Tom]}
            ${apiProvider().adminUsers().getNoCreds}          | ${{}}       | ${'GET /admin/users (no creds) returns 401'}                            | ${401}           | ${null}         | ${null}
            ${apiProvider().adminUsers().getUserNotFound}     | ${{}}       | ${'GET /admin/users (user not found) returns 401'}                      | ${401}           | ${null}         | ${null}
            ${apiProvider().adminUsers().getWrongPassword}    | ${{}}       | ${'GET /admin/users (wrong password) returns 401'}                      | ${401}           | ${null}         | ${null}
            ${apiProvider().adminUsers().postNoPrivileges}    | ${Masha}    | ${'POST /admin/users (not enough privileges) returns 403'}              | ${403}           | ${null}         | ${null}
            ${apiProvider().adminUsers().post}                | ${Masha}    | ${'POST /admin/users returns new user'}                                 | ${201}           | ${USER_P}       | ${Masha}
            ${apiProvider().adminUsers().getByIdNoPrivileges} | ${PETER_ID} | ${`GET /admin/users/[PETER_ID] (not enough privileges) returns 403`}    | ${403}           | ${null}         | ${null}
            ${apiProvider().adminUsers().getById}             | ${PETER_ID} | ${`GET /admin/users/[PETER_ID] returns Peter`}                          | ${200}           | ${USER_P}       | ${Peter}
            ${apiProvider().adminUsers().putNoPrivileges}     | ${putPeter} | ${`PUT /admin/users/[PETER_ID] (not enough privileges) returns 403`}    | ${403}           | ${null}         | ${null}
            ${apiProvider().adminUsers().put}                 | ${putPeter} | ${`PUT /admin/users/[PETER_ID] returns updated Peter`}                  | ${200}           | ${USER_P}       | ${{ ...Peter, pass: 'newPass' }}
            ${apiProvider().adminUsers().deleteNoPrivileges}  | ${DELME_ID} | ${`DELETE /admin/users/[DELME_ID] (not enough privileges) returns 403`} | ${403}           | ${null}         | ${null}
            ${apiProvider().adminUsers().delete}              | ${DELME_ID} | ${`DELETE /admin/users/[DELME_ID] returns HTTP 204`}                    | ${204}           | ${null}         | ${null}
            ${apiProvider().adminUsers().getNoPrivileges}     | ${{}}       | ${'GET /admin/users (not enough privileges) returns 403'}               | ${403}           | ${null}         | ${null}
            ${apiProvider().courses().get}                    | ${{}}       | ${'GET /api/courses returns courses'}                                   | ${200}           | ${COURSE_P}     | ${[Math, History]}
            ${apiProvider().courses().getNoCreds}             | ${{}}       | ${'GET /api/courses (no creds) returns 401'}                            | ${401}           | ${null}         | ${null}
            ${apiProvider().courses().post}                   | ${Physics}  | ${'POST /api/courses returns new course'}                               | ${201}           | ${COURSE_P}     | ${Physics}
            ${apiProvider().courses().postNoCreds}            | ${Physics}  | ${'POST /api/courses (no creds) returns 401'}                           | ${401}           | ${null}         | ${null}
            ${apiProvider().courses().getById}                | ${MATH_ID}  | ${`GET /api/courses/[MATH_ID] returns Math`}                            | ${200}           | ${COURSE_P}     | ${Math}
            ${apiProvider().courses().getByIdNoCreds}         | ${MATH_ID}  | ${`GET /api/courses/[MATH_ID] (no creds) returns 401`}                  | ${401}           | ${null}         | ${null}
            ${apiProvider().courses().put}                    | ${putMath}  | ${`PUT /api/courses/[MATH_ID] returns updated Math`}                    | ${200}           | ${COURSE_P}     | ${{ ...Math, description: 'super Math!' }}
            ${apiProvider().courses().putNoCreds}             | ${putMath}  | ${`PUT /api/courses/[MATH_ID] (no creds) returns 401`}                  | ${401}           | ${null}         | ${null}
            ${apiProvider().courses().deleteNoCreds}          | ${MATH_ID}  | ${`DELETE /api/courses/[MATH_ID] (no creds) returns 401`}               | ${401}           | ${null}         | ${null}
            ${apiProvider().courses().delete}                 | ${MATH_ID}  | ${`DELETE /api/courses/[MATH_ID] returns HTTP 204`}                     | ${204}           | ${null}         | ${null}
            ${apiProvider().courses().delete}                 | ${MATH_ID}  | ${`second DELETE /api/courses/[MATH_ID] returns HTTP 204`}              | ${204}           | ${null}         | ${null}
            ${apiProvider().adminFiles().getNoPrivileges}     | ${{}}       | ${'GET /admin/files (not enough privileges) returns 403'}               | ${403}           | ${null}         | ${null}
            ${apiProvider().adminFiles().get}                 | ${{}}       | ${'GET /admin/files returns files'}                                     | ${200}           | ${ADMIN_FILE_P} | ${[song]}
            ${apiProvider().files().getById}                  | ${FILE_ID}  | ${`GET /api/api/[FILE_ID] returns file`}                                | ${200}           | ${null}         | ${null}
            ${apiProvider().files().getByIdNoCreds}           | ${FILE_ID}  | ${`GET /api/api/[FILE_ID] (no creds) returns 401`}                      | ${401}           | ${null}         | ${null}
            ${apiProvider().files().post}                     | ${'1.png'}  | ${'POST /api/api returns file metadata'}                                | ${201}           | ${ADMIN_FILE_P} | ${fileMeta}
            ${apiProvider().files().postNoCreds}              | ${'1.png'}  | ${'POST /api/api returns (no creds) returns 401'}                       | ${401}           | ${null}         | ${null}
        `('$testName', async ({ api, params, projection, expectedHttpCode, expectedVal }) => {
            const r = await api(params);

            expect(r.status).toEqual(expectedHttpCode);
            if (projection !== null) {
                expect(getProjection(r.body, projection)).toEqual(expectedVal);
            }
        });
    });
});
