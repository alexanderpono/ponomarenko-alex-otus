import { Product } from 'src/entities/Product';
import { User } from 'src/entities/User';
import { IAccountService } from './AccountService.types';
import { IProductDiscountService } from 'src/features/services/ProductDiscountService/ProductDiscountService.types';

export class AccountService implements IAccountService {
    constructor(private productDiscounts: IProductDiscountService) {}

    getDiscount = (user: User, product: Product) => {
        return (
            product.price *
            (1 - user.personalDiscountPercents - this.productDiscounts.getProductDiscountPercent(product.type) / 100)
        );
    };
}
