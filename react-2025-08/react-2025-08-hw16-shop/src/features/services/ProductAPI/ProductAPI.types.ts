export interface ProductFromAPI {
    id: string;
    category: {
        id: string;
    };

    price: number;
    name: string;
    photo?: string;
    desc?: string;
}
export interface GetProductsAnswer {
    data: ProductFromAPI[];
}
