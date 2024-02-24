import { program } from 'commander';
import { Options } from './cli.types';
const { description, name, version } = require('../package.json');
import axios from 'axios';
import fs from 'fs';
import stream from 'stream';
import util from 'util';
import FormData from 'form-data';
import path from 'path';

const pipeline = util.promisify(stream.pipeline);

program
    .name(name)
    .version(version)
    .description(description)
    .option('-l, --login <login>', 'user login')
    .option('-p, --password <password>', 'user password')
    .option('-c, --command <command>', 'command')
    .option('-p1, --param1 <param1>', 'parameter 1')
    .option('-p2, --param2 <param2>', 'parameter 2')
    .parse(process.argv);

const options: Options = program.opts();
if (Object.keys(options).length === 0) {
    program.help();
}

const url = {
    localCoursesApi: 'http://localhost:3000'
};
function get(url: string) {
    const headers = {
        Accept: 'application/json'
    };
    if (options.login) {
        headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
    }
    axios
        .get(url, {
            headers
        })
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((e) => {
            if (e.response.status === 401 || e.response.status === 403) {
                console.log(e.response.status, e.response.data);
            } else {
                console.log(e);
            }
        });
}

function post(url: string, data: Record<string, any>) {
    const headers = {
        Accept: 'application/json'
    };
    if (options.login) {
        headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
    }
    axios
        .post(url, data, {
            headers
        })
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((e) => {
            if (e.response.status === 401 || e.response.status === 403) {
                console.log(e.response.status, e.response.data);
            } else {
                console.log(e);
            }
        });
}

function put(url: string, data: Record<string, any>) {
    const headers = {
        Accept: 'application/json'
    };
    if (options.login) {
        headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
    }
    axios
        .put(url, data, {
            headers
        })
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((e) => {
            if (e.response.status === 401 || e.response.status === 403) {
                console.log(e.response.status, e.response.data);
            } else {
                console.log(e);
            }
        });
}

function del(url: string) {
    const headers = {
        Accept: 'application/json'
    };
    if (options.login) {
        headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
    }
    axios
        .delete(url, {
            headers
        })
        .then((res) => {
            console.log(JSON.stringify(res.data));
        })
        .catch((e) => {
            if (e.response.status === 401 || e.response.status === 403) {
                console.log(e.response.status, e.response.data);
            } else {
                console.log(e);
            }
        });
}

switch (options.command) {
    case 'reset': {
        axios
            .post(url.localCoursesApi + '/api/reset', {
                responseType: 'application/json'
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
        break;
    }

    case 'get-users': {
        get(url.localCoursesApi + '/api/users');
        break;
    }

    case 'get-users-byid': {
        get(url.localCoursesApi + `/api/users/${options.param1}`);
        break;
    }

    case 'admin-get-users': {
        get(url.localCoursesApi + `/admin/users`);
        break;
    }

    case 'admin-get-users-byid': {
        get(url.localCoursesApi + `/admin/users/${options.param1}`);
        break;
    }

    case 'admin-post-users': {
        let data = {};
        try {
            data = options.param1 ? JSON.parse(options.param1) : {};
        } catch (e) {}
        post(url.localCoursesApi + `/admin/users`, data);
        break;
    }

    case 'admin-put-users': {
        let data = {};
        try {
            data = options.param2 ? JSON.parse(options.param2) : {};
        } catch (e) {}
        put(url.localCoursesApi + `/admin/users/${options.param1}`, data);
        break;
    }

    case 'admin-delete-users': {
        del(url.localCoursesApi + `/admin/users/${options.param1}`);
        break;
    }

    case 'get-courses': {
        get(url.localCoursesApi + `/api/courses`);
        break;
    }

    case 'post-courses': {
        let data = {};
        try {
            data = options.param1 ? JSON.parse(options.param1) : {};
        } catch (e) {}
        post(url.localCoursesApi + `/api/courses`, data);
        break;
    }

    case 'get-courses-byid': {
        get(url.localCoursesApi + `/api/courses/${options.param1}`);
        break;
    }

    case 'put-courses': {
        let data = {};
        try {
            data = options.param2 ? JSON.parse(options.param2) : {};
        } catch (e) {}
        put(url.localCoursesApi + `/api/courses/${options.param1}`, data);
        break;
    }

    case 'delete-courses': {
        del(url.localCoursesApi + `/api/courses/${options.param1}`);
        break;
    }

    case 'admin-get-files': {
        get(url.localCoursesApi + `/admin/files`);
        break;
    }

    case 'get-files-byid': {
        if (!options.param1) {
            console.log('-p1 required');
            break;
        }
        if (!options.param2) {
            console.log('-p2 required');
            break;
        }
        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
        }
        axios
            .get(url.localCoursesApi + `/api/files/${options.param1}`, {
                headers,
                responseType: 'stream'
            })
            .then((res) => {
                const wrStream = fs.createWriteStream(options.param2);
                pipeline(res.data, wrStream).then(() => {
                    console.log(options.param2);
                });
            })
            .catch((e) => {
                if (e.response.status === 401 || e.response.status === 403) {
                    console.log(e.response.status, e.response?.data?.statusMessage);
                } else {
                    console.log(e);
                }
            });

        break;
    }

    case 'post-files': {
        if (!options.param1) {
            console.log('-p1 required');
            break;
        }

        let fileData;
        try {
            fileData = fs.readFileSync(options.param1);
        } catch (e) {
            console.log('error reading', options.param1);
            break;
        }

        const form = new FormData();
        form.append('file', fileData, path.basename(options.param1));

        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
        }
        axios
            .post(url.localCoursesApi + '/api/files', form, {
                headers
            })
            .then((res) => {
                console.log(JSON.stringify(res.data));
            })
            .catch((e) => {
                if (e.response.status === 401 || e.response.status === 403) {
                    console.log(e.response.status, e.response.data);
                } else {
                    console.log(e);
                }
            });

        break;
    }

    default: {
        console.log('CLI: unknown command', options.command);
    }
}
