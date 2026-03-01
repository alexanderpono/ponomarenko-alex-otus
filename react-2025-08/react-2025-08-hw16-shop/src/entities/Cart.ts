export interface CartItem {
    productId: number;
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
