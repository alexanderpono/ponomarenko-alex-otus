import axios from 'axios';
import { validateGetUsersAnswer } from './Backend.validators';
import { config } from '../deploy';
import { getUserSession } from '../auth';

interface BackendConfig {
    apiUrl: string;
    authHeader: string;
}

interface User {
    name: string;
    id: number;
    role: string;
}

export interface GetUsersAnswer {
    success: boolean;
    users: User[];
}

export interface LoginAnswer {
    success: boolean;
    role: string;
}

export class Backend {
    config: BackendConfig;

    constructor(config: BackendConfig) {
        this.config = config;
    }

    getUsers() {
        const fullUrl = `${this.config.apiUrl}/users`;
        const user = getUserSession();
        return axios
            .get(fullUrl, {
                headers: {
                    authorization: this.config.authHeader,
                    'X-User-name': user
                }
            })
            .then(function unpackData(response) {
                return response.data;
            })
            .then(function validate(data) {
                const validateResult = validateGetUsersAnswer(data as GetUsersAnswer);
                if (Array.isArray(validateResult.errors) && validateResult.errors.length === 0) {
                    return data;
                } else {
                    console.error('validate error: ', validateResult.errors);
                    throw new Error(JSON.stringify(validateResult.errors));
                }
            });
    }

    async postAuth(userName: string) {
        const fullUrl = `${this.config.apiUrl}/auth`;
        const result = await fetch(fullUrl, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ userName })
        });

        return Promise.all([
            Promise.resolve(result),
            decodeBodyPromise(result.body as ReadableStream<Uint8Array>)
        ]);
    }
}

let _back: Backend | null = null;
export function getBackend(): Backend {
    if (_back === null) {
        _back = new Backend({
            apiUrl: config.apiUrl,
            authHeader: config.apiAuthHeader
        });
    }
    return _back;
}

function decodeBodyPromise(body: ReadableStream<Uint8Array>) {
    return new Promise((resolve) => {
        const reader = body.getReader();
        let result: Uint8Array[] = [];
        reader.read().then(function processText({ done, value }) {
            if (done) {
                resolve(result);
                return;
            }
            const chunk = (value as unknown) as Uint8Array[];
            result = result.concat(...chunk);
            return reader.read().then(processText);
        });
    })
        .then((bytesArray) => {
            const s = String.fromCharCode.apply(null, bytesArray as number[]);
            return s;
        })
        .then((str: string) => {
            const json = JSON.parse(str);
            return json;
        });
}
