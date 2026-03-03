import { API_URL } from 'src/constants/config';
import { AuthResult, RegisterBody } from './AuthAPI.types';
import { CONTENT_JSON } from 'src/constants/API';

export class AuthAPI {
    register = (params: RegisterBody): Promise<AuthResult> => {
        return fetch(API_URL + '/signup', {
            method: 'POST',
            headers: {
                'Content-type': CONTENT_JSON
            },
            body: JSON.stringify(params)
        }).then((response: Response) => response.json());
    };
}
