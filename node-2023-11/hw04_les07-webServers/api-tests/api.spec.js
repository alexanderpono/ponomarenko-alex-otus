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

describe('UsersApi-parameterized', () => {
    let peterId = null;
    beforeAll(async () => {
        const params = new builder().addUsualUser().generate();
        await apiProvider().reset().reset(params);
        const startUsers = await apiProvider().users()['get'](new builder());
        peterId = startUsers.body[0]._id;
    });
    const builder = ParamsBuilder;
    const newUser = new builder().addName('Masha').addLogin('masha').addPass('pwd');

    test.each`
        paramsBuilder                  | method       | testName                                    | expectedHttpCode | bodyField | projection           | expectedVal
        ${new builder()}               | ${'get'}     | ${'GET /api/user returns users'}            | ${200}           | ${null}   | ${'name login pass'} | ${[{ name: 'Peter', login: 'peter', pass: 'p' }]}
        ${newUser}                     | ${'post'}    | ${'POST /api/user returns new user'}        | ${201}           | ${null}   | ${'name login pass'} | ${{ name: 'Masha', login: 'masha', pass: 'pwd' }}
        ${{ generate: () => peterId }} | ${'getById'} | ${`GET /api/user/${peterId} returns Peter`} | ${200}           | ${null}   | ${'name login pass'} | ${{ name: 'Peter', login: 'peter', pass: 'p' }}
    `(
        '$testName',
        async ({ paramsBuilder, method, projection, expectedHttpCode, bodyField, expectedVal }) => {
            const params = paramsBuilder.generate();
            const r = await apiProvider().users()[method](params);
            expect(r.status).toEqual(expectedHttpCode);
            if (bodyField !== null) {
                expect(r.body[bodyField]).toEqual(expectedVal);
            }
            if (bodyField === null) {
                expect(getProjection(r.body, projection)).toEqual(expectedVal);
            }
        }
    );
});
