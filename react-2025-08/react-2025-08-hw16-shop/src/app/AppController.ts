import { AppStateManager } from 'src/store/AppStateManager';
import { IAppController, Partition } from './AppController.types';
import { defaultProduct, Product, ProductType } from 'src/entities/Product';
import { middleText } from 'src/constants/middleText';
import { Theme } from 'src/constants/Theme';
import { Language } from 'src/constants/i18n';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';
import { findNodeWithDataAttr } from 'src/utils/findNodeWithDataAttr';

const COLOR_THEME = 'colorTheme';
const LANGUAGE = 'language';

export class AppController implements IAppController {
    private appSTM: AppStateManager = null;

    constructor() {
        this.appSTM = AppStateManager.create();
    }

    onAppMount = () => {
        this.appSTM.products([
            {
                ...defaultProduct,
                id: 1,
                type: ProductType.TOY,
                price: 2999,
                name: 'Котик',
                desc: middleText,
                photo: 'cat.jpg'
            },
            {
                ...defaultProduct,
                id: 2,
                type: ProductType.TOY,
                price: 1999,
                name: 'Sed ut perspiciatis, unde omnis',
                desc: middleText
            },
            {
                ...defaultProduct,
                id: 3,
                type: ProductType.CAR,
                price: 999,
                name: 'Машинка',
                desc: 'Дешево и сердито'
            }
        ]);

        const themeStr = localStorage.getItem(COLOR_THEME);
        this.appSTM.colorTheme(themeStr === Theme.BLUE ? Theme.BLUE : Theme.GREY);

        const languageStr = localStorage.getItem(LANGUAGE);
        this.appSTM.language(languageStr === Language.RU ? Language.RU : Language.EN);
        // this.appSTM.curPartition(Partition.PRODUCTS);
        this.appSTM.curPartition(Partition.CATEGORIES);

        // this.onLoginClick();
    };

    onThemeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newColorTheme = evt.target.value === Theme.BLUE ? Theme.BLUE : Theme.GREY;
        this.appSTM.colorTheme(newColorTheme);
        localStorage.setItem(COLOR_THEME, newColorTheme);
    };

    onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = evt.target.value === Language.RU ? Language.RU : Language.EN;
        this.appSTM.language(newLanguage);
        localStorage.setItem(LANGUAGE, newLanguage);
    };

    onLoginClick = () => {
        console.log('onLoginClick()');
        this.appSTM.isLoginFormVisible(true);
        this.appSTM.isRegistering(false);
    };

    onLogoutClick = () => {
        console.log('onLogoutClick()');
    };

    onLoginSubmit = (values: LoginFormValues) => {
        console.log('onSubmit() values=', values);
        this.appSTM.isLoginFormVisible(false);
    };

    onSelectLogin = () => {
        this.appSTM.isRegistering(false);
    };
    onSelectRegister = () => {
        this.appSTM.isRegistering(true);
    };

    onLoginCloseClick = () => {
        this.appSTM.isLoginFormVisible(false);
    };

    onProductEditClick = (evt: React.MouseEvent<HTMLDivElement>) => {
        const el = findNodeWithDataAttr(evt.target as HTMLElement, 'id', 8);
        if (!el) {
            return;
        }
        const id = el.dataset['id'];
        this.openEditProduct(parseInt(id));
    };

    openEditProduct = (id: number) => {
        const products = this.appSTM.getApp().products;
        const productToEdit = products.find((product) => '' + product.id === '' + id);
        this.appSTM.editedProduct(productToEdit);
        this.appSTM.isEditProductVisible(true);
    };

    onEditProductCloseClick = () => {
        this.appSTM.isEditProductVisible(false);
    };

    onEditProductCancelClick = () => {
        this.appSTM.isEditProductVisible(false);
    };

    onEditProductSubmit = (productToSave: Product) => {
        const products = this.appSTM.getApp().products;
        const newProducts = products.map((product) =>
            product.id === productToSave.id ? { ...productToSave } : product
        );
        this.appSTM.products(newProducts);
        this.appSTM.isEditProductVisible(false);
    };

    onProductsClick = () => {
        this.appSTM.curPartition(Partition.PRODUCTS);
    };

    onCategoriesClick = () => {
        this.appSTM.curPartition(Partition.CATEGORIES);
    };
}
