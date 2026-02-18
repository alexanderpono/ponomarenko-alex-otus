import { handleActions } from 'redux-actions';
import { Theme } from 'src/constants/Theme';
import { Product } from 'src/entities/Product';
import { Language } from 'src/shared/I18nContext/I18nContext.types';

export enum AppEvent {
    DEFAULT = '',
    PRODUCTS = 'APP/PRODUCTS',
    LANGUAGE = 'APP/LANGUAGE',
    COLOR_THEME = 'APP/COLOR_THEME'
}

export interface AppState {
    event: AppEvent;
    products: Product[];
    language: Language;
    colorTheme: Theme;
}

export const defaultAppState: AppState = {
    event: AppEvent.DEFAULT,
    products: [],
    language: Language.EN,
    colorTheme: Theme.GREY
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

export type AppAction = ProductsAction | LanguageAction | ColorSchemeAction;

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
    })
};

export const appReducer = handleActions(
    {
        [AppEvent.PRODUCTS]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.PRODUCTS,
            products: (action as ProductsAction).payload.products
        }),
        [AppEvent.LANGUAGE]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.LANGUAGE,
            language: (action as LanguageAction).payload.language
        }),
        [AppEvent.COLOR_THEME]: (state: AppState, action) => ({
            ...state,
            event: AppEvent.COLOR_THEME,
            colorTheme: (action as ColorSchemeAction).payload.colorTheme
        })
    },
    defaultAppState
);
