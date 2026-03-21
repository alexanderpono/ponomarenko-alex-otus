import { User, UserType } from 'src/entities/User';
import { AccountService } from './AccountService';
import { defaultProduct, Product } from 'src/entities/Product';
import { ProductDiscountService } from 'src/features/services/ProductDiscountService/ProductDiscountService';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { IUserDiscountService } from 'src/features/services/UserDiscountService/UserDiscountService.types';

describe('AccountService', () => {
    describe('getDiscount()', () => {
        const stdUserPD0: User = {
            type: UserType.STANDARD,
            personalDiscountPercents: 0
        };
        const stdUserPD2: User = {
            type: UserType.STANDARD,
            personalDiscountPercents: 2
        };
        const premiumUserPD0: User = {
            type: UserType.PREMIUM,
            personalDiscountPercents: 0
        };
        const premiumUserPD10: User = {
            type: UserType.PREMIUM,
            personalDiscountPercents: 10
        };
        const apple: Product = {
            ...defaultProduct,
            categoryId: '3',
            price: 10
        };
        const ford: Product = {
            ...defaultProduct,
            categoryId: '1',
            price: 10000
        };
        const noDiscounts = {
            1: 0,
            2: 0,
            3: 0
        };
        const foodWeek = {
            1: 0,
            2: 0,
            3: 10
        };
        const carWeek = {
            1: 3,
            2: 0,
            3: 0
        };
        test.each`
            about                                | user               | product  | discounts      | expected
            ${'std(0) & food(10) & noDiscounts'} | ${stdUserPD0}      | ${apple} | ${noDiscounts} | ${10}
            ${'std(0) & food(10) & foodWeek'}    | ${stdUserPD0}      | ${apple} | ${foodWeek}    | ${9}
            ${'std(0) & ford & carWeek'}         | ${stdUserPD0}      | ${ford}  | ${carWeek}     | ${9700}
            ${'std(2) & ford & carWeek'}         | ${stdUserPD2}      | ${ford}  | ${carWeek}     | ${9500}
            ${'prem(0) & ford & foodWeek'}       | ${premiumUserPD0}  | ${ford}  | ${foodWeek}    | ${8000}
            ${'prem(10) & ford & foodWeek'}      | ${premiumUserPD10} | ${ford}  | ${foodWeek}    | ${7000}
        `('returns $expected from $about', ({ user, product, discounts, expected }) => {
            const productDiscounts: ProductDiscountService = castPartialTo<ProductDiscountService>({
                getProductDiscountPercent(type: string) {
                    return discounts[type];
                }
            });

            const userDiscounts: IUserDiscountService = {
                getUserTypeDiscountPercent(userType: UserType) {
                    const discounts = {
                        [UserType.STANDARD]: 0,
                        [UserType.PREMIUM]: 20,
                        [UserType.GOLD]: 10,
                        [UserType.FREE]: 1
                    };
                    return discounts[userType];
                }
            };
            const accountService = new AccountService(productDiscounts, userDiscounts);
            expect(accountService.getDiscount(user, product)).toEqual(expected);
        });
    });
});
