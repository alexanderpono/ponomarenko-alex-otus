import { Cart } from 'src/entities/Cart';
import { RootState } from './store';

export const appSelector = {
    products: (state: RootState) => state.app.products,
    colorTheme: (state: RootState) => state.app.colorTheme,
    language: (state: RootState) => state.app.language,
    isUserAuthorized: (state: RootState) => state.app.isUserAuthorized,
    isLoginFormVisible: (state: RootState) => state.app.isLoginFormVisible,
    isRegistering: (state: RootState) => state.app.isRegistering,
    isEditProductVisible: (state: RootState) => state.app.isEditProductVisible,
    editedProduct: (state: RootState) => state.app.editedProduct,
    categories: (state: RootState) => state.app.categories,
    curCategoryId: (state: RootState) => state.app.curCategoryId,
    editedCategory: (state: RootState) => state.app.editedCategory,
    cart: (state: RootState) => state.app.cart,
    apiErrorMessage: (state: RootState) => state.app.apiErrorMessage,
    login: (state: RootState) => state.app.login,
    isUpdatePasswordVisible: (state: RootState) => state.app.isUpdatePasswordVisible
};

export const getCartProductCount = (cart: Cart, productId: string): number => {
    const curCartItem = cart.items.find((cartItem) => cartItem.productId === productId);
    return curCartItem?.count ? curCartItem?.count : 0;
};
