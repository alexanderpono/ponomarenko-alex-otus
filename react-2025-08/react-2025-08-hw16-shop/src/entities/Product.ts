export enum ProductType {
    CAR = 'CAR',
    TOY = 'TOY',
    FOOD = 'FOOD'
}

export interface Product {
    id: number;
    type: ProductType;

    price: number;
    name: string;
    photo?: string;
    desc?: string;
    count?: number;
}
export const defaultProduct: Product = {
    id: 0,
    type: ProductType.CAR,
    price: 0,
    name: '',
    photo: '',
    desc: '',
    count: 0
};

export type UserTypeProductTypeDiscount = Record<string, number>;
