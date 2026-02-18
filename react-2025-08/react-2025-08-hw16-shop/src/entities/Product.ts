export enum ProductType {
    CAR = 'CAR',
    TOY = 'TOY',
    FOOD = 'FOOD'
}

export interface Product {
    type: ProductType;
    price: number;
}
export const defaultProduct: Product = {
    type: ProductType.CAR,
    price: 0
};

export type UserTypeProductTypeDiscount = Record<string, number>;
