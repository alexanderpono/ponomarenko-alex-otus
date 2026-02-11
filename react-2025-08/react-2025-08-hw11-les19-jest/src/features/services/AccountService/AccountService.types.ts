import { Product } from 'src/entities/Product';
import { User } from 'src/entities/User';

export interface IAccountService {
    getDiscount: (user: User, product: Product) => number;
}
