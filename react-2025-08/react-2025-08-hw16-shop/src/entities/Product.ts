export enum ProductType {
    CAR = 'CAR',
    TOY = 'TOY',
    FOOD = 'FOOD'
}

export interface Product {
    id: string;
    type: ProductType;

    price: number;
    name: string;
    photo?: string;
    desc?: string;
}
export const defaultProduct: Product = {
    id: '',
    type: ProductType.CAR,
    price: 0,
    name: '',
    photo: '',
    desc: ''
};

export type UserTypeProductTypeDiscount = Record<string, number>;
