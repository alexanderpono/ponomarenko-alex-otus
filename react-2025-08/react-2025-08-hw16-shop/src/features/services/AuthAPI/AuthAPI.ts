import { COMMAND_ID } from 'src/constants/config';
import { AuthResult, LoginParams, RegisterParams } from './AuthAPI.types';
import { CONTENT_JSON } from 'src/constants/API';

export class AuthAPI {
    constructor(private apiUrl: string) {}

    register = (params: RegisterParams): Promise<AuthResult> => {
        return fetch(this.apiUrl + '/signup', {
            method: 'POST',
            headers: {
                'Content-type': CONTENT_JSON
            },
            body: JSON.stringify({ ...params, commandId: COMMAND_ID })
        }).then((response: Response) => {
            return response.json().then((result) => {
                if (response.status !== 200) {
                    return Promise.reject(result);
                } else {
                    return result;
                }
            });
        });
    };

    login = (params: LoginParams): Promise<AuthResult> => {
        return fetch(this.apiUrl + '/signin', {
            method: 'POST',
            headers: {
                'Content-type': CONTENT_JSON
            },
            body: JSON.stringify({ ...params, commandId: COMMAND_ID })
        }).then((response: Response) => response.json());
    };
}
