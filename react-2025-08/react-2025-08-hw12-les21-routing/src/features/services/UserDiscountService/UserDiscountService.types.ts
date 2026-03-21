import { UserType } from 'src/entities/User';

export interface IUserDiscountService {
    getUserTypeDiscountPercent: (userType: UserType) => number;
}
