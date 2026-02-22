import { handleActions } from 'redux-actions';
import { Theme } from 'src/constants/Theme';
import { Product } from 'src/entities/Product';
import { Language } from 'src/constants/i18n';

export enum AppEvent {
    DEFAULT = '',
    PRODUCTS = 'APP/PRODUCTS',
    LANGUAGE = 'APP/LANGUAGE',
    COLOR_THEME = 'APP/COLOR_THEME',
    IS_USER_AUTORIZED = 'APP/IS_USER_AUTORIZED'
}

export interface AppState {
    event: AppEvent;
    products: Product[];
    language: Language;
    colorTheme: Theme;
    isUserAuthorized: boolean;
}

export const defaultAppState: AppState = {
    event: AppEvent.DEFAULT,
    products: [],
    language: Language.EN,
    colorTheme: Theme.GREY,
    isUserAuthorized: false
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

export type AppAction = ProductsAction | LanguageAction | ColorSchemeAction | IsUserAuthorizedAction;

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
        })
    },
    defaultAppState
);
