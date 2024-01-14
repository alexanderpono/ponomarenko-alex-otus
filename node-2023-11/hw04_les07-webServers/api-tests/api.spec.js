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

describe('/api/user', () => {
    let peterId = null;
    beforeAll(async () => {
        const params = new builder().addUsualUser().generate();
        await apiProvider().reset().reset(params);
        const startUsers = await apiProvider().users()['get'](new builder());
        peterId = startUsers.body[0]._id;
    });
    const builder = ParamsBuilder;
    const Masha = { name: 'Masha', login: 'masha', pass: 'pwd' };
    const Peter = { name: 'Peter', login: 'peter', pass: 'p' };
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
        paramsBuilder                  | method       | testName                                         | expectedHttpCode | bodyField | projection           | expectedVal
        ${new builder()}               | ${'get'}     | ${'GET /api/user returns users'}                 | ${200}           | ${null}   | ${'name login pass'} | ${[Peter]}
        ${newUser}                     | ${'post'}    | ${'POST /api/user returns new user'}             | ${201}           | ${null}   | ${'name login pass'} | ${Masha}
        ${{ generate: () => peterId }} | ${'getById'} | ${`GET /api/user/[peterId] returns Peter`}       | ${200}           | ${null}   | ${'name login pass'} | ${Peter}
        ${putPeter}                    | ${'put'}     | ${`PUT /api/user/[peterId] returns HTTP 200`}    | ${200}           | ${null}   | ${null}              | ${null}
        ${{ generate: () => peterId }} | ${'delete'}  | ${`DELETE /api/user/[peterId] returns HTTP 200`} | ${200}           | ${null}   | ${null}              | ${null}
    `(
        '$testName',
        async ({ paramsBuilder, method, projection, expectedHttpCode, bodyField, expectedVal }) => {
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

describe('/api/user', () => {
    let peterId = null;
    beforeAll(async () => {
        const params = new builder().addUsualUser().generate();
        await apiProvider().reset().reset(params);
        const startUsers = await apiProvider().users()['get'](new builder());
        peterId = startUsers.body[0]._id;
    });
    const builder = ParamsBuilder;
    const Masha = { name: 'Masha', login: 'masha', pass: 'pwd' };
    const Peter = { name: 'Peter', login: 'peter', pass: 'p' };
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
        paramsBuilder                  | method       | testName                                         | expectedHttpCode | bodyField | projection           | expectedVal
        ${new builder()}               | ${'get'}     | ${'GET /api/user returns users'}                 | ${200}           | ${null}   | ${'name login pass'} | ${[Peter]}
        ${newUser}                     | ${'post'}    | ${'POST /api/user returns new user'}             | ${201}           | ${null}   | ${'name login pass'} | ${Masha}
        ${{ generate: () => peterId }} | ${'getById'} | ${`GET /api/user/[peterId] returns Peter`}       | ${200}           | ${null}   | ${'name login pass'} | ${Peter}
        ${putPeter}                    | ${'put'}     | ${`PUT /api/user/[peterId] returns HTTP 200`}    | ${200}           | ${null}   | ${null}              | ${null}
        ${{ generate: () => peterId }} | ${'delete'}  | ${`DELETE /api/user/[peterId] returns HTTP 200`} | ${200}           | ${null}   | ${null}              | ${null}
    `(
        '$testName',
        async ({ paramsBuilder, method, projection, expectedHttpCode, bodyField, expectedVal }) => {
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
