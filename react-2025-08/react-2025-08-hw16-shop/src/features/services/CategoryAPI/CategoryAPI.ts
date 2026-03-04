import { API_URL } from 'src/constants/config';
import { GetGategoriesAnswer } from './CategoryAPI.types';
import { CONTENT_JSON } from 'src/constants/API';
import { Category } from 'src/entities/Category';

export class CategoryAPI {
    constructor(private token: string) {}

    getCategories = (): Promise<GetGategoriesAnswer> => {
        const headers: HeadersInit = {
            'Content-type': CONTENT_JSON
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return fetch(API_URL + '/categories', { headers }).then((response: Response) => {
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
        const { id, ...restToSave } = categoryToSave;

        const headers: HeadersInit = {
            'Content-type': CONTENT_JSON
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return fetch(API_URL + '/categories', {
            method: 'POST',
            headers,
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
        const headers: HeadersInit = {
            'Content-type': CONTENT_JSON
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        return fetch(API_URL + '/categories/' + categoryToSave.id, {
            method: 'PUT',
            headers,
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
