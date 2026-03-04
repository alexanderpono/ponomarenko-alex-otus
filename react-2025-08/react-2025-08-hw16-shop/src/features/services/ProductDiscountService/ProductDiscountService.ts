import { IProductDiscountService } from './ProductDiscountService.types';

export class ProductDiscountService implements IProductDiscountService {
    getProductDiscountPercent = (type: string) => {
        return 0;
    };
}
