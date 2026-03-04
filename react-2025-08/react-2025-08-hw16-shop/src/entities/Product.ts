export interface Product {
    id: string;
    categoryId: string;

    price: number;
    name: string;
    photo?: string;
    desc?: string;
}
export const defaultProduct: Product = {
    id: '',
    categoryId: '',
    price: 0,
    name: '',
    photo: '',
    desc: ''
};

export type UserTypeProductTypeDiscount = Record<string, number>;
