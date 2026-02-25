import { handleActions } from 'redux-actions';
import { Theme } from 'src/constants/Theme';
import { defaultProduct, Product } from 'src/entities/Product';
import { Language } from 'src/constants/i18n';
import { Partition } from 'src/app/AppController.types';

export enum AppEvent {
    DEFAULT = '',
    PRODUCTS = 'APP/PRODUCTS',
    LANGUAGE = 'APP/LANGUAGE',
    COLOR_THEME = 'APP/COLOR_THEME',
    IS_USER_AUTORIZED = 'APP/IS_USER_AUTORIZED',
    IS_LOGIN_FORM_VISIBLE = 'APP/IS_LOGIN_FORM_VISIBLE',
    IS_REGISTERING = 'APP/IS_REGISTERING',
    IS_EDIT_PRODUCT_VISIBLE = 'APP/IS_EDIT_PRODUCT_VISIBLE',
    EDITED_PRODUCT = 'APP/EDITED_PRODUCT',
    CUR_PARTITION = 'APP/CUR_PARTITION'
}

export interface AppState {
    event: AppEvent;
    products: Product[];
    language: Language;
    colorTheme: Theme;
    isUserAuthorized: boolean;
    isLoginFormVisible: boolean;
    isRegistering: boolean;
    isEditProductVisible: boolean;
    editedProduct: Product;
    curPartition: Partition;
}

export const defaultAppState: AppState = {
    event: AppEvent.DEFAULT,
    products: [],
    language: Language.EN,
    colorTheme: Theme.GREY,
    isUserAuthorized: false,
    isLoginFormVisible: false,
    isRegistering: false,
    isEditProductVisible: false,
    editedProduct: { ...defaultProduct },
    curPartition: Partition.DEFAULT
};

export interface ProductsAction {
    type: AppEvent.PRODUCTS;
    payload: {
        products: Product[];
    };
}

export interface LanguageAction {
    type: AppEvent.LANGUAGE;
    payload: {
        language: Language;
    };
}

export interface ColorSchemeAction {
    type: AppEvent.COLOR_THEME;
    payload: {
        colorTheme: Theme;
    };
}

export interface IsUserAuthorizedAction {
    type: AppEvent.IS_USER_AUTORIZED;
    payload: {
        isUserAuthorized: boolean;
    };
}

export interface IsLoginFormVisibleAction {
    type: AppEvent.IS_LOGIN_FORM_VISIBLE;
    payload: {
        isLoginFormVisible: boolean;
    };
}

export interface IsRegisteringAction {
    type: AppEvent.IS_REGISTERING;
    payload: {
        isRegistering: boolean;
    };
}

export interface IsEditProductVisibleAction {
    type: AppEvent.IS_EDIT_PRODUCT_VISIBLE;
    payload: {
        isEditProductVisible: boolean;
    };
}

export interface EditedProductAction {
    type: AppEvent.EDITED_PRODUCT;
    payload: {
        editedProduct: Product;
    };
}

export interface CurPartitionAction {
    type: AppEvent.CUR_PARTITION;
    payload: {
        curPartition: Partition;
    };
}

export type AppAction =
    | ProductsAction
    | LanguageAction
    | ColorSchemeAction
    | IsUserAuthorizedAction
    | IsLoginFormVisibleAction
    | IsRegisteringAction
    | IsEditProductVisibleAction
    | EditedProductAction
    | CurPartitionAction;

export const app = {
    products: (products: Product[]): ProductsAction => ({
        type: AppEvent.PRODUCTS,
        payload: { products }
    }),
    language: (language: Language): LanguageAction => ({
        type: AppEvent.LANGUAGE,
        payload: { language }
    }),
    colorTheme: (colorTheme: Theme): ColorSchemeAction => ({
        type: AppEvent.COLOR_THEME,
        payload: { colorTheme }
    }),
    isUserAuthorized: (isUserAuthorized: boolean): IsUserAuthorizedAction => ({
        type: AppEvent.IS_USER_AUTORIZED,
        payload: { isUserAuthorized }
    }),
    isLoginFormVisible: (isLoginFormVisible: boolean): IsLoginFormVisibleAction => ({
        type: AppEvent.IS_LOGIN_FORM_VISIBLE,
        payload: { isLoginFormVisible }
    }),
    isRegistering: (isRegistering: boolean): IsRegisteringAction => ({
        type: AppEvent.IS_REGISTERING,
        payload: { isRegistering }
    }),
    isEditProductVisible: (isEditProductVisible: boolean): IsEditProductVisibleAction => ({
        type: AppEvent.IS_EDIT_PRODUCT_VISIBLE,
        payload: { isEditProductVisible }
    }),
    editedProduct: (editedProduct: Product): EditedProductAction => ({
        type: AppEvent.EDITED_PRODUCT,
        payload: { editedProduct }
    }),
    curPartition: (curPartition: Partition): CurPartitionAction => ({
        type: AppEvent.CUR_PARTITION,
        payload: { curPartition }
    })
};

export const appReducer = handleActions(
    {
        [AppEvent.PRODUCTS]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.PRODUCTS,
            products: (action as unknown as ProductsAction).payload.products
        }),
        [AppEvent.LANGUAGE]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.LANGUAGE,
            language: (action as unknown as LanguageAction).payload.language
        }),
        [AppEvent.COLOR_THEME]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.COLOR_THEME,
            colorTheme: (action as unknown as ColorSchemeAction).payload.colorTheme
        }),
        [AppEvent.IS_USER_AUTORIZED]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.IS_USER_AUTORIZED,
            isUserAuthorized: (action as unknown as IsUserAuthorizedAction).payload.isUserAuthorized
        }),
        [AppEvent.IS_LOGIN_FORM_VISIBLE]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.IS_LOGIN_FORM_VISIBLE,
            isLoginFormVisible: (action as unknown as IsLoginFormVisibleAction).payload.isLoginFormVisible
        }),
        [AppEvent.IS_REGISTERING]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.IS_REGISTERING,
            isRegistering: (action as unknown as IsRegisteringAction).payload.isRegistering
        }),
        [AppEvent.IS_EDIT_PRODUCT_VISIBLE]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.IS_EDIT_PRODUCT_VISIBLE,
            isEditProductVisible: (action as unknown as IsEditProductVisibleAction).payload.isEditProductVisible
        }),
        [AppEvent.EDITED_PRODUCT]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.EDITED_PRODUCT,
            editedProduct: (action as unknown as EditedProductAction).payload.editedProduct
        }),
        [AppEvent.CUR_PARTITION]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.CUR_PARTITION,
            curPartition: (action as unknown as CurPartitionAction).payload.curPartition
        })
    },
    defaultAppState
);
