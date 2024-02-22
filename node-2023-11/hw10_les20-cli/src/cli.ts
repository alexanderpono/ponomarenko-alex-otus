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
    .parse(process.argv);

const options: Options = program.opts();
if (Object.keys(options).length === 0) {
    program.help();
}

const url = {
    localCoursesApi: 'http://localhost:3000'
};
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
        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
        }
        axios
            .get(url.localCoursesApi + '/api/users', {
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
        break;
    }

    case 'get-user-byid': {
        const headers = {
            Accept: 'application/json'
        };
        if (options.login) {
            headers['Authorization'] = `Basic ${btoa(options.login + ':' + options.password)}`;
        }
        axios
            .get(url.localCoursesApi + `/api/users/${options.param1}`, {
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
        break;
    }
}
