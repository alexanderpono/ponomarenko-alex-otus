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
    curPartition: (state: RootState) => state.app.curPartition,
    categories: (state: RootState) => state.app.categories
};
