const { apiProvider } = require('./framework/services');
const { ParamsBuilder } = require('./framework/ParamsBuilder');

describe('UsersApi-parameterized', () => {
    beforeAll(async () => {
        const params = new builder().addUsualUser().generate();
        const r = await apiProvider().reset().reset(params);
        console.log('resetDB r.body=', r.body);
    });

    const builder = ParamsBuilder;
    test.each`
        paramsBuilder                   | method   | testName                  | expectedHttpCode | bodyField  | expectedVal
        ${new builder().addUsualUser()} | ${'get'} | ${'admin can view users'} | ${200}           | ${'users'} | ${[{ id: 1, name: 'Peter' }]}
    `(
        '$testName',
        async ({ paramsBuilder, method, testName, expectedHttpCode, bodyField, expectedVal }) => {
            const params = paramsBuilder.generate();
            const r = await apiProvider().users()[method](params);
            expect(r.status).toEqual(expectedHttpCode);
            if (bodyField !== null) {
                expect(r.body[bodyField]).toEqual(expectedVal);
            }
        }
    );
});
