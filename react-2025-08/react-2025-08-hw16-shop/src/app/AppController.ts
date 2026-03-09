import { AppStateManager } from 'src/store/AppStateManager';
import { CartOperation, IAppController, NEW_ENTITY_ID, Partition } from './AppController.types';
import { defaultProduct, Product } from 'src/entities/Product';
import { Theme } from 'src/constants/Theme';
import { Language } from 'src/constants/i18n';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';
import { findNodeWithDataAttr } from 'src/utils/findNodeWithDataAttr';
import { Category, defaultCategory } from 'src/entities/Category';
import { CartItem } from 'src/entities/Cart';
import { AuthAPI } from 'src/features/services/AuthAPI/AuthAPI';
import { AuthErrorAnswer, AuthResult } from 'src/features/services/AuthAPI/AuthAPI.types';
import { StorageService } from 'src/features/services/StorageService/StorageService';
import { CategoryAPI } from 'src/features/services/CategoryAPI/CategoryAPI';
import { GetGategoriesAnswer } from 'src/features/services/CategoryAPI/CategoryAPI.types';
import { ProductAPI } from 'src/features/services/ProductAPI/ProductAPI';
import { GetProductsAnswer, ProductFromAPI } from 'src/features/services/ProductAPI/ProductAPI.types';
import { getApiUrl } from 'src/constants/config';

const COLOR_THEME = 'colorTheme';
const LANGUAGE = 'language';

export class AppController implements IAppController {
    private appSTM: AppStateManager = null;
    private storage: StorageService = null;
    private authAPI: AuthAPI = null;
    private categoryAPI: CategoryAPI = null;
    private productAPI: ProductAPI = null;

    constructor() {
        this.appSTM = AppStateManager.create();
        this.storage = new StorageService();
    }

    onAppMount = () => {
        const themeStr = localStorage.getItem(COLOR_THEME);
        this.appSTM.colorTheme(themeStr === Theme.BLUE ? Theme.BLUE : Theme.GREY);

        const languageStr = localStorage.getItem(LANGUAGE);
        this.appSTM.language(languageStr === Language.RU ? Language.RU : Language.EN);
        this.appSTM.curPartition(Partition.PRODUCTS);
        // this.appSTM.curPartition(Partition.CATEGORIES);
        // this.appSTM.curPartition(Partition.CART);

        // this.onLoginClick();
        // this.onAddProductClick();

        const apiUrl = getApiUrl();
        this.authAPI = new AuthAPI(apiUrl);
        const token = this.storage.getToken();
        this.appSTM.isUserAuthorized(typeof token === 'string' && token !== '' && token !== 'undefined');

        const login = this.storage.getLogin();
        this.appSTM.login(login);

        this.categoryAPI = new CategoryAPI(apiUrl, token);
        this.productAPI = new ProductAPI(apiUrl, token);

        this.reloadCategories();

        this.reloadProducts();
    };

    reloadCategories = () => {
        const isUserAuthorized = this.appSTM.getApp().isUserAuthorized;
        if (!isUserAuthorized) {
            console.warn('reloadCategories() !isUserAuthorized');
            return;
        }
        this.categoryAPI.getCategories().then((answer: GetGategoriesAnswer) => {
            this.appSTM.categories(answer.data);
        });
    };

    reloadProducts = () => {
        const isUserAuthorized = this.appSTM.getApp().isUserAuthorized;
        if (!isUserAuthorized) {
            console.warn('reloadProducts() !isUserAuthorized');
            return;
        }
        this.productAPI.getProducts().then((answer: GetProductsAnswer) => {
            this.appSTM.products(
                answer.data.map((api: ProductFromAPI) => ({
                    id: api.id,
                    categoryId: api.category.id,
                    price: api.price,
                    name: api.name,
                    photo: api.photo,
                    desc: api.desc
                }))
            );
        });
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
        this.appSTM.isLoginFormVisible(true);
        this.appSTM.isRegistering(false);
        this.appSTM.apiErrorMessage('');
    };

    onLogoutClick = () => {
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
                this.storage.setLogin(values.login);
                this.appSTM.login(values.login);
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
        this.openEditProduct(id);
    };

    openEditProduct = (id: string) => {
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
        const api =
            productToSave.id && productToSave.id !== NEW_ENTITY_ID
                ? this.productAPI.updateProduct
                : this.productAPI.addProduct;
        api(productToSave).then(() => {
            this.reloadProducts();
            this.appSTM.isEditProductVisible(false);
        });
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
        const id = el.dataset['id'];
        this.appSTM.curCategoryId(id);

        const categories = this.appSTM.getApp().categories;
        const curCategory = categories.find((category) => category.id === id);
        this.appSTM.editedCategory(curCategory);
    };

    onEditCategorySubmit = (categoryToSave: Category) => {
        if (categoryToSave.id && categoryToSave.id !== NEW_ENTITY_ID) {
            this.categoryAPI.updateCategory(categoryToSave).then(() => {
                this.reloadCategories();
            });
        } else {
            this.categoryAPI.addCategory(categoryToSave).then(() => {
                this.reloadCategories();
            });
        }
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

    getUpdatedCartItems = (items: CartItem[], operation: CartOperation, productId: string): CartItem[] => {
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
        const newCartItems = this.getUpdatedCartItems(cart.items, operation, id);
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
        const newCartItems = this.getUpdatedCartItems(cart.items, CartOperation.DEL, id);
        const totalPrice = this.getTotalPrice(newCartItems);
        const totalCount = this.getTotalCount(newCartItems);

        const newCart = { ...cart, items: newCartItems, totalPrice, totalCount };
        this.appSTM.cart(newCart);
    };
}
