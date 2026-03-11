import { Cart, CartItem, defaultCart } from 'src/entities/Cart';

export class StorageService {
    getToken = () => {
        return localStorage.getItem('token');
    };

    setToken = (token: string) => {
        localStorage.setItem('token', token);
    };

    getLogin = () => {
        return localStorage.getItem('login');
    };

    setLogin = (login: string) => {
        localStorage.setItem('login', login);
    };

    setCart = (cart: Cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    getCart = () => {
        const storedCartString = localStorage.getItem('cart');
        if (typeof storedCartString !== 'string') {
            console.error('typeof storedCartString !== string');
            return { ...defaultCart };
        }

        try {
            const storedCartObject: Cart = JSON.parse(storedCartString);
            if (typeof storedCartObject?.totalPrice !== 'number') {
                console.error('typeof storedCartObject?.totalPrice !== number');
                return { ...defaultCart };
            }
            if (typeof storedCartObject?.totalCount !== 'number') {
                console.error('typeof storedCartObject?.totalCount !== number');
                return { ...defaultCart };
            }
            if (!Array.isArray(storedCartObject?.items)) {
                console.error('!Array.isArray(storedCartObject?.items)');
                return { ...defaultCart };
            }
            for (let i = 0; i < storedCartObject?.items.length; i++) {
                const cartItem: CartItem = storedCartObject?.items[0];
                if (typeof cartItem?.count !== 'number') {
                    console.error('typeof cartItem?.count !== number');
                    return { ...defaultCart };
                }
                if (typeof cartItem?.productId !== 'string') {
                    console.error('typeof cartItem?.productId !== string');
                    return { ...defaultCart };
                }
            }
            return storedCartObject;
        } catch (err) {
            return { ...defaultCart };
        }
    };
}
