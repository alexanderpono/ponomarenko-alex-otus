import { getStore } from './store';
import { app, AppAction, AppState } from './appReducer';
import { Product } from 'src/entities/Product';
import { Language } from 'src/constants/i18n';
import { Theme } from 'src/constants/Theme';
import { Category } from 'src/entities/Category';
import { Cart } from 'src/entities/Cart';

const dispatch = (action: AppAction) => getStore().dispatch(action);

export class AppStateManager {
    getApp = (): AppState => getStore().getState().app as AppState;
    products = (products: Product[]) => dispatch(app.products(products));
    language = (language: Language) => dispatch(app.language(language));
    colorTheme = (colorTheme: Theme) => dispatch(app.colorTheme(colorTheme));
    isUserAuthorized = (isUserAuthorized: boolean) => dispatch(app.isUserAuthorized(isUserAuthorized));
    isLoginFormVisible = (isLoginFormVisible: boolean) => dispatch(app.isLoginFormVisible(isLoginFormVisible));
    isRegistering = (isRegistering: boolean) => dispatch(app.isRegistering(isRegistering));
    isEditProductVisible = (isEditProductVisible: boolean) => dispatch(app.isEditProductVisible(isEditProductVisible));
    editedProduct = (editedProduct: Product) => dispatch(app.editedProduct(editedProduct));
    categories = (categories: Category[]) => dispatch(app.categories(categories));
    curCategoryId = (curCategoryId: string) => dispatch(app.curCategoryId(curCategoryId));
    editedCategory = (editedCategory: Category) => dispatch(app.editedCategory(editedCategory));
    cart = (cart: Cart) => dispatch(app.cart(cart));
    apiErrorMessage = (apiErrorMessage: string) => dispatch(app.apiErrorMessage(apiErrorMessage));
    login = (login: string) => dispatch(app.login(login));
    isUpdatePasswordVisible = (isUpdatePasswordVisible: boolean) =>
        dispatch(app.isUpdatePasswordVisible(isUpdatePasswordVisible));

    static create(): AppStateManager {
        return new AppStateManager();
    }
}
