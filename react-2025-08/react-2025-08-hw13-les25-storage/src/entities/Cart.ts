export interface CartItem {
    productId: string;
    count: number;
}

export interface Cart {
    items: CartItem[];
    totalPrice: number;
    totalCount: number;
}

export const defaultCart: Cart = {
    items: [],
    totalPrice: 0,
    totalCount: 0
};
