import { ProductType } from 'src/entities/Product';

export interface IProductDiscountService {
    getProductDiscountPercent: (type: ProductType) => number;
}
