import { program } from 'commander';
import { Options } from './cli.types';
const { description, name, version } = require('../package.json');
import axios from 'axios';

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
            if (e.response.status === 401) {
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

    default: {
        console.log('CLI: unknown command', options.command);
    }
}
