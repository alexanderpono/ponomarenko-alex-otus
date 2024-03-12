import { exec } from 'child_process';
import path from 'path';

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
  -pr, --pretty              pretty output
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

        const MATH_ID = to24Str('0101');
        const COURSE_P = 'description author_id difficulty lessons';
        const Physics = { description: 'Physics', author_id: PETER_ID, difficulty: 4, lessons: [] };
        const p1Physics = JSON.stringify(JSON.stringify(Physics));
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
            ...Math,
            description: 'super Math!'
        };
        const p2PutMath = JSON.stringify(JSON.stringify(putMath));
        const ADMIN_FILE_P = 'name size type';
        const song = { name: '1.png', size: 369, type: 'picture' };

        const fileMeta = { name: '2.png', size: 369, type: 'image/png' };
        const FILE_ID = to24Str('0201');
        const fName = path.join(__dirname, '2.png');
        const downloadTarget = path.join(__dirname, 'temp/target.png');

        test.each`
            cli    | params                                                                  | testName                                                    | projection      | expected
            ${run} | ${''}                                                                   | ${'prints help from no params'}                             | ${null}         | ${help}
            ${run} | ${'-c reset'}                                                           | ${'reset calls reset'}                                      | ${null}         | ${`{ result: 'post reset' }`}
            ${run} | ${'-c get-users -l tom -p p'}                                           | ${'get-users returns users(USER)'}                          | ${USER_USER_P}  | ${[PeterUser, NickUser, DelmeUser, TomUser]}
            ${run} | ${'-c get-users'}                                                       | ${'get-users (no creds) returns 401'}                       | ${null}         | ${'401 Unauthorized'}
            ${run} | ${`-c get-users-byid -l tom -p p -p1 ${PETER_ID}`}                      | ${`get-users-byid [PETER_ID] returns Peter(USER)`}          | ${USER_USER_P}  | ${PeterUser}
            ${run} | ${`-c admin-get-users -l nick -p p`}                                    | ${'admin-get-users returns users'}                          | ${USER_P}       | ${[Peter, Nick, Delme, Tom]}
            ${run} | ${`-c admin-get-users`}                                                 | ${'admin-get-users (no creds) returns 401'}                 | ${null}         | ${'401 Unauthorized'}
            ${run} | ${`-c admin-get-users -l micle -p 123`}                                 | ${'admin-get-users (user not found) returns 401'}           | ${null}         | ${'401 Unauthorized'}
            ${run} | ${`-c admin-get-users -l peter -p wrongPass`}                           | ${'admin-get-users (wrong password) returns 401'}           | ${null}         | ${'401 Unauthorized'}
            ${run} | ${`-c admin-get-users-byid -l nick -p p -p1 ${PETER_ID}`}               | ${`admin-get-users-byid [PETER_ID] returns Peter`}          | ${USER_P}       | ${Peter}
            ${run} | ${`-c admin-post-users -l tom -p p -p1 ${p1Masha}`}                     | ${'admin-post-users (not enough privileges) returns 403'}   | ${null}         | ${"403 { error: 'not enough privileges' }"}
            ${run} | ${`-c admin-post-users -l nick -p p -p1 ${p1Masha}`}                    | ${'admin-post-users returns new user'}                      | ${USER_P}       | ${Masha}
            ${run} | ${`-c admin-put-users -l nick -p p -p1 ${PETER_ID} -p2 ${p2PutPeter}`}  | ${`admin-put-users [PETER_ID] returns updated Peter`}       | ${USER_P}       | ${{ ...Peter, pass: 'newPass' }}
            ${run} | ${`-c admin-delete-users -l nick -p p -p1 ${DELME_ID}`}                 | ${`admin-delete-users [DELME_ID] returns HTTP 204`}         | ${null}         | ${'""'}
            ${run} | ${`-c admin-delete-users -l tom -p p -p1 ${DELME_ID}`}                  | ${'admin-delete-users (not enough privileges) returns 403'} | ${null}         | ${"403 { error: 'not enough privileges' }"}
            ${run} | ${'-c get-courses -l tom -p p'}                                         | ${'get-courses returns courses'}                            | ${COURSE_P}     | ${[Math, History]}
            ${run} | ${'-c get-courses'}                                                     | ${'get-courses (no creds) returns 401'}                     | ${null}         | ${'401 Unauthorized'}
            ${run} | ${`-c post-courses -l tom -p p -p1 ${p1Physics}`}                       | ${'post-courses returns new course'}                        | ${COURSE_P}     | ${Physics}
            ${run} | ${`-c get-courses-byid -l tom -p p -p1 ${MATH_ID}`}                     | ${`get-courses-byid [MATH_ID] returns Math`}                | ${COURSE_P}     | ${Math}
            ${run} | ${`-c put-courses -l tom -p p -p1 ${MATH_ID} -p2 ${p2PutMath}`}         | ${`put-courses [MATH_ID] returns updated Math`}             | ${COURSE_P}     | ${{ ...Math, description: 'super Math!' }}
            ${run} | ${`-c delete-courses -l tom -p p -p1 ${MATH_ID}`}                       | ${`delete-courses [MATH_ID] returns HTTP 204`}              | ${null}         | ${'""'}
            ${run} | ${`-c delete-courses -l tom -p p -p1 ${MATH_ID}`}                       | ${`second -c delete-courses [MATH_ID] returns HTTP 204`}    | ${null}         | ${'""'}
            ${run} | ${`-c admin-get-files -l tom -p p`}                                     | ${'admin-get-files (not enough privileges) returns 403'}    | ${null}         | ${"403 { error: 'not enough privileges' }"}
            ${run} | ${`-c admin-get-files -l nick -p p`}                                    | ${'admin-get-files returns files'}                          | ${ADMIN_FILE_P} | ${[song]}
            ${run} | ${`-c get-files-byid -l tom -p p -p1 ${FILE_ID} -p2 ${downloadTarget}`} | ${`get-files-byid [FILE_ID] returns file`}                  | ${null}         | ${downloadTarget}
            ${run} | ${`-c get-files-byid -p1 ${FILE_ID} -p2 104.png`}                       | ${`get-files-byid [FILE_ID] (no creds) returns 401`}        | ${null}         | ${'401 Unauthorized'}
            ${run} | ${`-c post-files -l tom -p p -p1 ${fName}`}                             | ${'post-files returns file metadata'}                       | ${ADMIN_FILE_P} | ${fileMeta}
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
