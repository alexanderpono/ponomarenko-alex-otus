import { CONTENT_JSON } from 'src/constants/API';
import { GetProductsAnswer, PRODUCT_PAGE_SIZE } from './ProductAPI.types';
import { Product } from 'src/entities/Product';

export class ProductAPI {
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

    getProducts = (pageNo = 0): Promise<GetProductsAnswer> => {
        const s = new URLSearchParams({
            pagination: JSON.stringify({
                pageSize: PRODUCT_PAGE_SIZE,
                pageNumber: pageNo
            })
        }).toString();
        return fetch(this.apiUrl + '/products?' + s, { headers: this.getHeaders() }).then((response: Response) => {
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

        return fetch(this.apiUrl + '/products', {
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
        return fetch(this.apiUrl + '/products/' + productToSave.id, {
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
