import { GetGategoriesAnswer } from './CategoryAPI.types';
import { CONTENT_JSON } from 'src/constants/API';
import { Category } from 'src/entities/Category';

export class CategoryAPI {
    private token: string;

    constructor(private apiUrl: string) {}

    setToken = (token: string) => {
        this.token = token;
    };

    getHeaders = () => {
        const headers: HeadersInit = {
            'Content-type': CONTENT_JSON
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    };

    getCategories = (): Promise<GetGategoriesAnswer> => {
        return fetch(this.apiUrl + '/categories', { headers: this.getHeaders() }).then((response: Response) => {
            return response.json().then((result) => {
                if (response.status !== 200) {
                    return Promise.reject(result);
                } else {
                    return result;
                }
            });
        });
    };

    addCategory = (categoryToSave: Category): Promise<unknown> => {
        const { ...restToSave } = categoryToSave;
        delete restToSave['id'];

        return fetch(this.apiUrl + '/categories', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(restToSave)
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

    updateCategory = (categoryToSave: Category): Promise<unknown> => {
        return fetch(this.apiUrl + '/categories/' + categoryToSave.id, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(categoryToSave)
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
