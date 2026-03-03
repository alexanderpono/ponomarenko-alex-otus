import { AppStateManager } from 'src/store/AppStateManager';
import { CartOperation, IAppController, NEW_ENTITY_ID, Partition } from './AppController.types';
import { defaultProduct, Product, ProductType } from 'src/entities/Product';
import { middleText } from 'src/constants/middleText';
import { Theme } from 'src/constants/Theme';
import { Language } from 'src/constants/i18n';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';
import { findNodeWithDataAttr } from 'src/utils/findNodeWithDataAttr';
import { Category, defaultCategory } from 'src/entities/Category';
import { CartItem, defaultCart } from 'src/entities/Cart';
import { AuthAPI } from 'src/features/services/AuthAPI/AuthAPI';
import { AuthErrorAnswer, AuthResult } from 'src/features/services/AuthAPI/AuthAPI.types';
import { StorageService } from 'src/features/services/StorageService/StorageService';

const COLOR_THEME = 'colorTheme';
const LANGUAGE = 'language';

export class AppController implements IAppController {
    private appSTM: AppStateManager = null;
    private storage: StorageService = null;
    private authAPI: AuthAPI = null;

    constructor() {
        this.appSTM = AppStateManager.create();
        this.storage = new StorageService();
        this.authAPI = new AuthAPI();
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
            },
            {
                ...defaultProduct,
                id: 4,
                type: ProductType.CAR,
                price: 1999,
                name: 'Машинка2',
                desc: 'Дешево2 и сердито'
            }
        ]);

        const themeStr = localStorage.getItem(COLOR_THEME);
        this.appSTM.colorTheme(themeStr === Theme.BLUE ? Theme.BLUE : Theme.GREY);

        const languageStr = localStorage.getItem(LANGUAGE);
        this.appSTM.language(languageStr === Language.RU ? Language.RU : Language.EN);
        this.appSTM.curPartition(Partition.PRODUCTS);
        // this.appSTM.curPartition(Partition.CATEGORIES);
        // this.appSTM.curPartition(Partition.CART);

        this.appSTM.categories([
            {
                ...defaultCategory,
                id: 1,
                name: 'CAR'
            },
            {
                ...defaultCategory,
                id: 2,
                name: 'TOY'
            },
            {
                ...defaultCategory,
                id: 3,
                name: 'FOOD'
            }
        ]);
        // this.onLoginClick();
        // this.onAddProductClick();

        this.appSTM.cart({
            ...defaultCart,
            items: [
                { productId: 1, count: 2 },
                { productId: 2, count: 1 }
            ],
            totalPrice: 100
        });

        const token = this.storage.getToken();
        this.appSTM.isUserAuthorized(typeof token === 'string' && token !== '');
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
        this.appSTM.apiErrorMessage('');
    };

    onLogoutClick = () => {
        console.log('onLogoutClick()');
        this.storage.setToken('');
        this.appSTM.isUserAuthorized(false);
    };

    onLoginSubmit = (values: LoginFormValues) => {
        const api = values.repeatPassword !== '' ? this.authAPI.register : this.authAPI.login;
        api({
            email: values.login,
            password: values.password
        })
            .then((result: AuthResult) => {
                this.storage.setToken(result.token);
                this.appSTM.isUserAuthorized(true);
                this.appSTM.isLoginFormVisible(false);
            })
            .catch((answer: AuthErrorAnswer) => {
                if (Array.isArray(answer?.errors) && answer?.errors?.length > 0) {
                    const errorInfo = answer?.errors[0];
                    this.appSTM.apiErrorMessage(errorInfo.message);
                }
            });
    };

    onSelectLogin = () => {
        this.appSTM.isRegistering(false);
        this.appSTM.apiErrorMessage('');
    };
    onSelectRegister = () => {
        this.appSTM.isRegistering(true);
        this.appSTM.apiErrorMessage('');
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
        const appState = this.appSTM.getApp();
        const products = appState.products;
        const newProducts =
            productToSave.id !== NEW_ENTITY_ID
                ? products.map((product) => (product.id === productToSave.id ? { ...productToSave } : product))
                : [...products, { ...productToSave, id: products.length + 1 }];

        this.appSTM.products(newProducts);
        this.appSTM.isEditProductVisible(false);
    };

    onProductsClick = () => {
        this.appSTM.curPartition(Partition.PRODUCTS);
    };

    onCategoriesClick = () => {
        this.appSTM.curPartition(Partition.CATEGORIES);
    };

    onCategoryClick = (evt: React.MouseEvent<HTMLLIElement>) => {
        const el = findNodeWithDataAttr(evt.target as HTMLElement, 'id', 8);
        if (!el) {
            return;
        }
        const idS = el.dataset['id'];
        const id = parseInt(idS);
        this.appSTM.curCategoryId(id);

        const categories = this.appSTM.getApp().categories;
        const curCategory = categories.find((category) => category.id === id);
        this.appSTM.editedCategory(curCategory);
    };

    onEditCategorySubmit = (categoryToSave: Category) => {
        const categories = this.appSTM.getApp().categories;

        const newCategories =
            categoryToSave.id !== NEW_ENTITY_ID
                ? categories.map((category) => (category.id === categoryToSave.id ? { ...categoryToSave } : category))
                : [...categories, { ...categoryToSave, id: categories.length + 1 }];

        this.appSTM.categories(newCategories);
    };

    onAddCategoryClick = () => {
        this.appSTM.curCategoryId(NEW_ENTITY_ID);
        this.appSTM.editedCategory({ ...defaultCategory, id: NEW_ENTITY_ID });
    };

    onAddProductClick = () => {
        this.appSTM.editedProduct({ ...defaultProduct, id: NEW_ENTITY_ID });
        this.appSTM.isEditProductVisible(true);
    };

    onCartClick = () => {
        this.appSTM.curPartition(Partition.CART);
    };

    getUpdatedCartItems = (items: CartItem[], operation: CartOperation, productId: number): CartItem[] => {
        const curCartItem = items.find((cartItem) => cartItem.productId === productId);
        let newCartItems = items;
        if (typeof curCartItem === 'undefined') {
            const newCartItem: CartItem = { productId, count: 1 };
            newCartItems = [...newCartItems, newCartItem];
        } else {
            newCartItems = newCartItems.map((cartItem) => {
                let newCount = 0;
                if (operation === CartOperation.MINUS) {
                    newCount = cartItem.count - 1;
                } else if (operation === CartOperation.PLUS) {
                    newCount = cartItem.count + 1;
                }

                return cartItem.productId === productId ? { ...cartItem, count: newCount } : cartItem;
            });
        }
        newCartItems = newCartItems.filter((cartItem) => cartItem.count > 0);
        return newCartItems;
    };

    getTotalPrice = (items: CartItem[]): number => {
        const products = this.appSTM.getApp().products;
        const totalPrice = items.reduce((acc: number, cartItem: CartItem) => {
            const curProduct = products.find((product) => product.id === cartItem.productId);
            if (typeof curProduct !== 'undefined') {
                return acc + curProduct.price * cartItem.count;
            } else {
                return acc;
            }
        }, 0);
        return totalPrice;
    };

    getTotalCount = (items: CartItem[]): number => {
        const totalCount = items.reduce((acc: number, cartItem: CartItem) => {
            return acc + cartItem.count;
        }, 0);
        return totalCount;
    };

    processPlusMinus = (evt: React.MouseEvent<HTMLDivElement>, operation: CartOperation) => {
        const el = findNodeWithDataAttr(evt.target as HTMLElement, 'productid', 8);
        if (!el) {
            return;
        }
        const id = el.dataset['productid'];
        const cart = this.appSTM.getApp().cart;
        const newCartItems = this.getUpdatedCartItems(cart.items, operation, parseInt(id));
        const totalPrice = this.getTotalPrice(newCartItems);
        const totalCount = this.getTotalCount(newCartItems);

        const newCart = { ...cart, items: newCartItems, totalPrice, totalCount };
        this.appSTM.cart(newCart);
    };

    onPlusClick = (evt: React.MouseEvent<HTMLDivElement>) => {
        this.processPlusMinus(evt, CartOperation.PLUS);
    };

    onMinusClick = (evt: React.MouseEvent<HTMLDivElement>) => {
        this.processPlusMinus(evt, CartOperation.MINUS);
    };

    onCartItemDelClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        const el = findNodeWithDataAttr(evt.target as HTMLElement, 'productid', 8);
        if (!el) {
            return;
        }
        const id = el.dataset['productid'];

        const cart = this.appSTM.getApp().cart;
        const newCartItems = this.getUpdatedCartItems(cart.items, CartOperation.DEL, parseInt(id));
        const totalPrice = this.getTotalPrice(newCartItems);
        const totalCount = this.getTotalCount(newCartItems);

        const newCart = { ...cart, items: newCartItems, totalPrice, totalCount };
        this.appSTM.cart(newCart);
    };
}
