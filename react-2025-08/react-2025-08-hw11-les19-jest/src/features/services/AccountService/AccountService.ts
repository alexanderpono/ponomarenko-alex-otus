import { Product } from 'src/entities/Product';
import { User } from 'src/entities/User';
import { IAccountService } from './AccountService.types';
import { IProductDiscountService } from 'src/features/services/ProductDiscountService/ProductDiscountService.types';
import { IUserDiscountService } from 'src/features/services/UserDiscountService/UserDiscountService.types';

export class AccountService implements IAccountService {
    constructor(private productDiscounts: IProductDiscountService, private usersDiscounts: IUserDiscountService) {}

    getDiscount = (user: User, product: Product) => {
        const price =
            product.price *
            (1 -
                user.personalDiscountPercents / 100 -
                this.usersDiscounts.getUserTypeDiscountPercent(user.type) / 100 -
                this.productDiscounts.getProductDiscountPercent(product.type) / 100);
        return price > 0 ? price : 0;
    };
}
