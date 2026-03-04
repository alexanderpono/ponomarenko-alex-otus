import { Category } from 'src/entities/Category';
import { Product } from 'src/entities/Product';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';

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
    onProductsClick: () => void;
    onCategoriesClick: () => void;
    onCategoryClick: (evt: React.MouseEvent<HTMLLIElement>) => void;
    onEditCategorySubmit: (values: Category) => void;
    onAddCategoryClick: () => void;
    onAddProductClick: () => void;
    onCartClick: () => void;
    onPlusClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onMinusClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onCartItemDelClick: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

export enum Partition {
    DEFAULT = '',
    PRODUCTS = 'PRODUCTS',
    CATEGORIES = 'CATEGORIES',
    CART = 'CART'
}

export const NEW_ENTITY_ID = '-1';

export enum CartOperation {
    DEFAULT = '',
    PLUS = 'PLUS',
    MINUS = 'MINUS',
    DEL = 'DEL'
}
