export enum ProductType {
    CAR = 'CAR',
    TOY = 'TOY',
    FOOD = 'FOOD'
}

export interface Product {
    type: ProductType;
}

export type UserTypeProductTypeDiscount = Record<string, number>;
