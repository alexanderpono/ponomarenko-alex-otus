import { getStore } from './store';
import { app, AppAction, AppState } from './appReducer';
import { Product } from 'src/entities/Product';
import { Language } from 'src/constants/i18n';
import { Theme } from 'src/constants/Theme';
import { Partition } from 'src/app/AppController.types';
import { Category } from 'src/entities/Category';

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
    curPartition = (curPartition: Partition) => dispatch(app.curPartition(curPartition));
    categories = (categories: Category[]) => dispatch(app.categories(categories));
    curCategoryId = (curCategoryId: number) => dispatch(app.curCategoryId(curCategoryId));
    editedCategory = (editedCategory: Category) => dispatch(app.editedCategory(editedCategory));

    static create(): AppStateManager {
        return new AppStateManager();
    }
}
