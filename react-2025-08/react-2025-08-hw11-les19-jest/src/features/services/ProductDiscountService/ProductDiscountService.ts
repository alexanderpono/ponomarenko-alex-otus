import { ProductType } from 'src/entities/Product';
import { IProductDiscountService } from './ProductDiscountService.types';

export class ProductDiscountService implements IProductDiscountService {
    getProductDiscountPercent = (type: ProductType) => {
        return 0;
    };
}
