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
}

export enum Partition {
    DEFAULT = '',
    PRODUCTS = 'PRODUCTS',
    CATEGORIES = 'CATEGORIES'
}
