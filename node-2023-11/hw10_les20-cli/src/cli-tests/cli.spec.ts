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
        const app = `ts-node --project ./tsconfig.json -r tsconfig-paths/register ./src/cli.ts ${params}`;

        exec(app, function callback(error, stdout, stderr) {
            resolve(stdout);
        });
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

        test.each`
            cli    | params                                            | testName                                           | projection     | expected
            ${run} | ${''}                                             | ${'prints help from no params'}                    | ${null}        | ${help}
            ${run} | ${'-c reset'}                                     | ${'calls reset'}                                   | ${null}        | ${`{ result: 'post reset' }`}
            ${run} | ${'-c get-users -l tom -p p'}                     | ${'GET /api/users returns users(USER)'}            | ${USER_USER_P} | ${[PeterUser, NickUser, DelmeUser, TomUser]}
            ${run} | ${'-c get-users'}                                 | ${'GET /api/users (no creds) returns 401'}         | ${null}        | ${'401 Unauthorized'}
            ${run} | ${`-c get-user-byid -l tom -p p -p1 ${PETER_ID}`} | ${`GET /api/users/[PETER_ID] returns Peter(USER)`} | ${USER_USER_P} | ${PeterUser}
        `('$testName', async ({ cli, params, projection, expected }) => {
            const r = await cli(params);
            if (projection !== null) {
                try {
                    const srcJson = JSON.parse(r);
                    expect(getProjection(srcJson, projection)).toEqual(expected);
                } catch (e) {
                    console.log(r);
                    expect(false).toBe(true);
                }
            } else {
                expect(r.trim()).toEqual(expected);
            }
        });
    });
});
