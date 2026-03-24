import { Category } from 'src/entities/Category';
import { Product } from 'src/entities/Product';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';
import { UpdatePasswordFormValues } from 'src/features/forms/UpdatePasswordForm/UpdatePasswordForm.types';
import { AuthAPI } from 'src/features/services/AuthAPI/AuthAPI';
import { ApiErrorAnswer, AuthResult } from 'src/features/services/AuthAPI/AuthAPI.types';
import { AppStateManager } from 'src/store/AppStateManager';

export interface IAppController {
    onAppMount: () => void;
    onThemeChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    onLanguageChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onLoginSubmit: (values: LoginFormValues) => void;
    onSelectLogin: () => void;
    onSelectRegister: () => void;
    onLoginCloseClick: () => void;
    onProductEditClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onEditProductCloseClick: () => void;
    onEditProductCancelClick: () => void;
    onEditProductSubmit: (values: Product) => void;
    onCategoryClick: (evt: React.MouseEvent<HTMLLIElement>) => void;
    onEditCategorySubmit: (values: Category) => void;
    onAddCategoryClick: () => void;
    onAddProductClick: () => void;
    onPlusClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onMinusClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onCartItemDelClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
    onChangePasswordClick: () => void;
    onUpdatePasswordCloseClick: () => void;
    onUpdatePasswordSubmit: (values: UpdatePasswordFormValues) => void;
    processScrollProductsEvent: (observers: IntersectionObserverEntry[]) => void;
    getAuthAPI: () => AuthAPI;
    getAppStateManager: () => AppStateManager;
    onLoginSubmitThen: (result: AuthResult, login: string) => void;
    onLoginSubmitCatch: (answer: ApiErrorAnswer) => void;
}

export enum Partition {
    DEFAULT = '',
    PRODUCTS = 'PRODUCTS',
    CATEGORIES = 'CATEGORIES',
    CART = 'CART',
    PROFILE = 'PROFILE'
}

export const NEW_ENTITY_ID = '-1';

export enum CartOperation {
    DEFAULT = '',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    DEL = 'DEL'
}
