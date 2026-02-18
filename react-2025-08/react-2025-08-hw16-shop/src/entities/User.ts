export enum UserType {
    STANDARD = 'STANDARD',
    PREMIUM = 'PREMIUM',
    GOLD = 'GOLD',
    FREE = 'FREE'
}

export interface User {
    type: UserType;
    personalDiscountPercents: number;
}

export type UserTypeDiscount = Record<UserType, number>;
