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
