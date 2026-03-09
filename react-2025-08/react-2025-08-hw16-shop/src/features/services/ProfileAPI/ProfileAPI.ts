import { CONTENT_JSON } from 'src/constants/API';
import { GetProfileAnswer } from './ProfileAPI.types';
import { UpdatePasswordFormValues } from 'src/features/forms/UpdatePasswordForm/UpdatePasswordForm.types';

export class ProfileAPI {
    constructor(private apiUrl: string, private token: string) {}

    getHeaders = () => {
        const headers: HeadersInit = {
            'Content-type': CONTENT_JSON
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    };

    getProfile = (): Promise<GetProfileAnswer> => {
        return fetch(this.apiUrl + '/profile', { headers: this.getHeaders() }).then((response: Response) => {
            return response.json().then((result) => {
                if (response.status !== 200) {
                    return Promise.reject(result);
                } else {
                    return result;
                }
            });
        });
    };

    updatePassword = (toSave: UpdatePasswordFormValues): Promise<unknown> => {
        return fetch(this.apiUrl + '/profile/change-password', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(toSave)
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
}
