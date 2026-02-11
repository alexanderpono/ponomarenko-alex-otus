import { UserType } from 'src/entities/User';
import { IUserDiscountService } from './UserDiscountService.types';

export class UserDiscountService implements IUserDiscountService {
    getUserTypeDiscountPercent: (userType: UserType) => 0;
}
