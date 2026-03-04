import { API_URL } from 'src/constants/config';
import { CONTENT_JSON } from 'src/constants/API';
import { GetProductsAnswer } from './ProductAPI.types';
import { Product } from 'src/entities/Product';

export class ProductAPI {
    constructor(private token: string) {}

    getHeaders = () => {
        const headers: HeadersInit = {
            'Content-type': CONTENT_JSON
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        return headers;
    };

    getProducts = (): Promise<GetProductsAnswer> => {
        return fetch(API_URL + '/products', { headers: this.getHeaders() }).then((response: Response) => {
            return response.json().then((result) => {
                if (response.status !== 200) {
                    return Promise.reject(result);
                } else {
                    return result;
                }
            });
        });
    };

    addProduct = (productToSave: Product): Promise<unknown> => {
        const { ...restToSave } = productToSave;
        delete restToSave['id'];

        return fetch(API_URL + '/products', {
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

    updateProduct = (productToSave: Product): Promise<unknown> => {
        return fetch(API_URL + '/products/' + productToSave.id, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(productToSave)
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
