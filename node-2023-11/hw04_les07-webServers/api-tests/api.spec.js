const { apiProvider } = require('./framework/services');
const { ParamsBuilder } = require('./framework/ParamsBuilder');
const db = require('../service/db');
const PETER_ID = require('./constants').PETER_ID;
const NICK_ID = require('./constants').NICK_ID;
const MATH_ID = require('./constants').MATH_ID;

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
                        const itemToPush = { ...item };
                        delete itemToPush._id;
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
                const itemToPush = { ...item };
                delete itemToPush._id;
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
        const Masha = { name: 'Masha', login: 'masha', pass: 'pwd' };
        const Peter = { name: 'Peter', login: 'peter', pass: 'p' };
        const Nick = { name: 'nick', login: 'nick', pass: 'p' };
        const putPeter = {
            id: db.toObjectId(PETER_ID),
            params: { ...Peter, pass: 'newPass' }
        };
        const USER_P = 'name login pass';

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

        test.each`
            api                                   | params      | testName                                                   | expectedHttpCode | projection     | expectedVal
            ${apiProvider().users().get}          | ${{}}       | ${'GET /api/users returns users(USER)'}                    | ${200}           | ${USER_USER_P} | ${[PeterUser, NickUser]}
            ${apiProvider().users().getById}      | ${PETER_ID} | ${`GET /api/users/[PETER_ID] returns Peter(USER)`}         | ${200}           | ${USER_USER_P} | ${PeterUser}
            ${apiProvider().adminUsers().get}     | ${{}}       | ${'GET /admin/users returns users'}                        | ${200}           | ${USER_P}      | ${[Peter, Nick]}
            ${apiProvider().adminUsers().post}    | ${Masha}    | ${'POST /admin/users returns new user'}                    | ${201}           | ${USER_P}      | ${Masha}
            ${apiProvider().adminUsers().getById} | ${PETER_ID} | ${`GET /admin/users/[PETER_ID] returns Peter`}             | ${200}           | ${USER_P}      | ${Peter}
            ${apiProvider().adminUsers().put}     | ${putPeter} | ${`PUT /admin/users/[PETER_ID] returns updated Peter`}     | ${200}           | ${USER_P}      | ${{ ...Peter, pass: 'newPass' }}
            ${apiProvider().adminUsers().delete}  | ${NICK_ID}  | ${`DELETE /admin/users/[NICK_ID] returns HTTP 200`}        | ${204}           | ${null}        | ${null}
            ${apiProvider().courses().get}        | ${{}}       | ${'GET /api/courses returns courses'}                      | ${200}           | ${COURSE_P}    | ${[Math, History]}
            ${apiProvider().courses().post}       | ${Physics}  | ${'POST /api/courses returns new course'}                  | ${201}           | ${COURSE_P}    | ${Physics}
            ${apiProvider().courses().getById}    | ${MATH_ID}  | ${`GET /api/courses/[MATH_ID] returns Math`}               | ${200}           | ${COURSE_P}    | ${Math}
            ${apiProvider().courses().put}        | ${putMath}  | ${`PUT /api/courses/[MATH_ID] returns updated Math`}       | ${200}           | ${COURSE_P}    | ${{ ...Math, description: 'super Math!' }}
            ${apiProvider().courses().delete}     | ${MATH_ID}  | ${`DELETE /api/courses/[MATH_ID] returns HTTP 204`}        | ${204}           | ${null}        | ${null}
            ${apiProvider().courses().delete}     | ${MATH_ID}  | ${`second DELETE /api/courses/[MATH_ID] returns HTTP 204`} | ${204}           | ${null}        | ${null}
        `('$testName', async ({ api, params, projection, expectedHttpCode, expectedVal }) => {
            const r = await api(params);

            expect(r.status).toEqual(expectedHttpCode);
            if (projection !== null) {
                expect(getProjection(r.body, projection)).toEqual(expectedVal);
            }
        });
    });
});
