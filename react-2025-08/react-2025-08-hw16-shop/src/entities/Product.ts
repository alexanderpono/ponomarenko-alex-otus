export enum ProductType {
    CAR = 'CAR',
    TOY = 'TOY',
    FOOD = 'FOOD'
}

export interface Product {
    type: ProductType;
    price: number;
}

export type UserTypeProductTypeDiscount = Record<string, number>;
