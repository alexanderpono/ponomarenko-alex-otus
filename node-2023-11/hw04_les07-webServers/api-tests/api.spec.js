const { apiProvider } = require('./framework/services');
const { ParamsBuilder } = require('./framework/ParamsBuilder');

const getProjection = (items, projection) => {
    const projectionAr = projection.split(' ');
    if (Array.isArray(items)) {
        return items.map((item) => {
            const result = {};
            projectionAr.forEach((field) => {
                result[field] = item[field];
            });
            return result;
        });
    }
    const result = {};
    projectionAr.forEach((field) => {
        result[field] = items[field];
    });
    return result;
};

describe('api', () => {
    let peterId = null;
    let toDelId = null;
    let Physics = null;
    let Math = null;
    let mathId = null;
    const builder = ParamsBuilder;
    beforeAll(async () => {
        const params = new builder().addUsualUser().generate();
        await apiProvider().reset().reset(params);
        const startUsers = await apiProvider().users()['get'](new builder());
        peterId = startUsers.body[0]._id;
        toDelId = startUsers.body[1]._id;

        Physics = { description: 'Physics', author_id: peterId, difficulty: 4 };
        Math = { description: 'Math', author_id: peterId, difficulty: 3 };
        const startCourses = await apiProvider().courses()['get'](new builder());
        mathId = startCourses.body[0]._id;
    });

    describe('/api/users', () => {
        const Masha = { name: 'Masha', login: 'masha', pass: 'pwd' };
        const Peter = { name: 'Peter', login: 'peter', pass: 'p' };
        const Nick = { name: 'nick', login: 'nick', pass: 'p' };
        const newUser = new builder().addName('Masha').addLogin('masha').addPass('pwd');
        const PeterNewPass = { ...Peter, pass: 'newPass' };
        const putPeter = {
            generate: () => ({
                id: peterId,
                params: new builder()
                    .addName(PeterNewPass.name)
                    .addLogin(PeterNewPass.login)
                    .addPass(PeterNewPass.pass)
            })
        };

        test.each`
            paramsBuilder                  | method       | testName                                          | expectedHttpCode | bodyField | projection           | expectedVal
            ${new builder()}               | ${'get'}     | ${'GET /api/users returns users'}                 | ${200}           | ${null}   | ${'name login pass'} | ${[Peter, Nick]}
            ${newUser}                     | ${'post'}    | ${'POST /api/users returns new user'}             | ${201}           | ${null}   | ${'name login pass'} | ${Masha}
            ${{ generate: () => peterId }} | ${'getById'} | ${`GET /api/users/[peterId] returns Peter`}       | ${200}           | ${null}   | ${'name login pass'} | ${Peter}
            ${putPeter}                    | ${'put'}     | ${`PUT /api/users/[peterId] returns HTTP 200`}    | ${200}           | ${null}   | ${null}              | ${null}
            ${{ generate: () => toDelId }} | ${'delete'}  | ${`DELETE /api/users/[toDelId] returns HTTP 200`} | ${204}           | ${null}   | ${null}              | ${null}
        `(
            '$testName',
            async ({
                paramsBuilder,
                method,
                projection,
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
                if (bodyField === null && projection !== null) {
                    expect(getProjection(r.body, projection)).toEqual(expectedVal);
                }
            }
        );
    });

    describe('/api/courses', () => {
        const run = async (method, paramsBuilder) => {
            const params = paramsBuilder.generate();
            const r = await apiProvider().courses()[method](params);
            return r;
        };
        const getMyProjection = (r) => getProjection(r.body, 'description author_id difficulty');

        test('GET /api/courses returns courses', async () => {
            const paramsBuilder = new builder();
            const r = await run('get', paramsBuilder);

            expect(r.status).toEqual(200);
            expect(getMyProjection(r)).toEqual([Math]);
        });

        test('POST /api/courses returns new course', async () => {
            const paramsBuilder = new builder()
                .addDescription(Physics.description)
                .addAuthorId(Physics.author_id)
                .addDifficulty(Physics.difficulty);
            const r = await run('post', paramsBuilder);

            expect(r.status).toEqual(201);
            expect(getMyProjection(r)).toEqual(Physics);
        });

        test('GET /api/courses/[mathId] returns Peter', async () => {
            const paramsBuilder = { generate: () => mathId };
            const r = await run('getById', paramsBuilder);

            expect(r.status).toEqual(200);
            expect(getMyProjection(r)).toEqual(Math);
        });

        test(`PUT /api/courses/[mathId] returns HTTP 200`, async () => {
            const paramsBuilder = {
                generate: () => ({
                    id: mathId,
                    params: new builder()
                        .addDescription('newDescription')
                        .addAuthorId(Math.author_id)
                        .addDifficulty(Math.difficulty)
                })
            };
            const r = await run('put', paramsBuilder);

            expect(r.status).toEqual(200);
            expect(getMyProjection(r)).toEqual({});
        });

        test(`DELETE /api/courses/[mathId] returns HTTP 204`, async () => {
            const paramsBuilder = { generate: () => mathId };
            const r = await run('delete', paramsBuilder);

            expect(r.status).toEqual(204);
            expect(getMyProjection(r)).toEqual({});
        });
    });
});
