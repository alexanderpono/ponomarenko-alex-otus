import { exec } from 'child_process';

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
                        let itemToPush: null | string | object = null;
                        if (typeof item === 'string') {
                            itemToPush = item;
                        } else {
                            itemToPush = { ...item };
                            if (itemToPush) {
                                delete itemToPush['_id'];
                            }
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
                let itemToPush: null | string | object = null;
                if (typeof item === 'string') {
                    itemToPush = item;
                } else {
                    itemToPush = { ...item };
                    if (itemToPush) {
                        delete itemToPush['_id'];
                    }
                }
                result[field].push(itemToPush);
            });
        }
    });
    return result;
};

const run = (params: string) => {
    return new Promise((resolve) => {
        // const app = `ts-node --project ./tsconfig.json -r tsconfig-paths/register ./src/cli.ts ${params}`;
        const app = `node ./temp/build/cli.js ${params}`;

        exec(app, function callback(error, stdout, stderr) {
            resolve(stdout);
        });
    });
};

const run2 = (params: string) => {
    return new Promise((resolve) => {
        // const app = `ts-node --project ./tsconfig.json -r tsconfig-paths/register ./src/cli.ts ${params}`;
        const app = `node ./temp/build/cli.js ${params}`;

        resolve(app);
    });
};

describe('cli', () => {
    beforeAll(async () => {
        await run('-c reset');
    });

    const help = `Usage: courses_cli [options]

Options:
  -V, --version              output the version number
  -l, --login <login>        user login
  -p, --password <password>  user password
  -c, --command <command>    command
  -p1, --param1 <param1>     parameter 1
  -p2, --param2 <param2>     parameter 2
  -h, --help                 display help for command`;

    const to24Str = (hexNum) => {
        const zeros = new Array(24 - hexNum.length).fill('0').join('');
        return `${zeros}${hexNum}`;
    };

    describe('CLI', () => {
        const USER_USER_P = 'name login';
        const PeterUser = { name: 'Peter', login: 'peter' };
        const NickUser = { name: 'nick', login: 'nick' };
        const DelmeUser = { name: 'delme', login: 'delme' };
        const TomUser = { name: 'tom', login: 'tom' };
        const PETER_ID = to24Str('01');
        const DELME_ID = to24Str('03');

        const USER_P = 'name login pass privileges';
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
        const Masha = { name: 'Masha', login: 'masha', pass: 'pwd', privileges: [] };
        const p1Masha = JSON.stringify(JSON.stringify(Masha));
        const putPeter = {
            ...Peter,
            pass: 'newPass'
        };
        const p2PutPeter = JSON.stringify(JSON.stringify(putPeter));

        test.each`
            cli    | params                                                                 | testName                                                   | projection     | expected
            ${run} | ${''}                                                                  | ${'prints help from no params'}                            | ${null}        | ${help}
            ${run} | ${'-c reset'}                                                          | ${'calls reset'}                                           | ${null}        | ${`{ result: 'post reset' }`}
            ${run} | ${'-c get-users -l tom -p p'}                                          | ${'GET /api/users returns users(USER)'}                    | ${USER_USER_P} | ${[PeterUser, NickUser, DelmeUser, TomUser]}
            ${run} | ${'-c get-users'}                                                      | ${'GET /api/users (no creds) returns 401'}                 | ${null}        | ${'401 Unauthorized'}
            ${run} | ${`-c get-user-byid -l tom -p p -p1 ${PETER_ID}`}                      | ${`GET /api/users/[PETER_ID] returns Peter(USER)`}         | ${USER_USER_P} | ${PeterUser}
            ${run} | ${`-c admin-get-users -l nick -p p`}                                   | ${'GET /admin/users returns users'}                        | ${USER_P}      | ${[Peter, Nick, Delme, Tom]}
            ${run} | ${`-c admin-get-users`}                                                | ${'GET /admin/users (no creds) returns 401'}               | ${null}        | ${'401 Unauthorized'}
            ${run} | ${`-c admin-get-users -l micle -p 123`}                                | ${'GET /admin/users (user not found) returns 401'}         | ${null}        | ${'401 Unauthorized'}
            ${run} | ${`-c admin-get-users -l peter -p wrongPass`}                          | ${'GET /admin/users (wrong password) returns 401'}         | ${null}        | ${'401 Unauthorized'}
            ${run} | ${`-c admin-get-user-byid -l nick -p p -p1 ${PETER_ID}`}               | ${`GET /admin/users/[PETER_ID] returns Peter`}             | ${USER_P}      | ${Peter}
            ${run} | ${`-c admin-post-users -l tom -p p -p1 ${p1Masha}`}                    | ${'POST /admin/users (not enough privileges) returns 403'} | ${null}        | ${"403 { error: 'not enough privileges' }"}
            ${run} | ${`-c admin-post-users -l nick -p p -p1 ${p1Masha}`}                   | ${'POST /admin/users returns new user'}                    | ${USER_P}      | ${Masha}
            ${run} | ${`-c admin-put-users -l nick -p p -p1 ${PETER_ID} -p2 ${p2PutPeter}`} | ${`PUT /admin/users/[PETER_ID] returns updated Peter`}     | ${USER_P}      | ${{ ...Peter, pass: 'newPass' }}
            ${run} | ${`-c admin-delete-users -l nick -p p -p1 ${DELME_ID}`}                | ${`DELETE /admin/users/[DELME_ID] returns HTTP 204`}       | ${null}        | ${'""'}
            ${run} | ${`-c admin-delete-users -l tom -p p -p1 ${DELME_ID}`}                 | ${'GET /admin/users (not enough privileges) returns 403'}  | ${null}        | ${"403 { error: 'not enough privileges' }"}
        `('$testName', async ({ cli, params, projection, expected }) => {
            const r = await cli(params);
            if (projection !== null) {
                try {
                    const srcJson = JSON.parse(r);
                    expect(getProjection(srcJson, projection)).toEqual(expected);
                } catch (e) {
                    console.log('test catch() e=', e);
                    expect(r).toEqual(expected);
                }
            } else {
                expect(r.trim()).toEqual(expected);
            }
        });
    });
});
