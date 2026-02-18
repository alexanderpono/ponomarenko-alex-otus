import { handleActions } from 'redux-actions';
import { Product } from 'src/entities/Product';

export enum AppEvent {
    DEFAULT = '',
    PRODUCTS = 'APP/PRODUCTS'
}

export interface AppState {
    event: AppEvent;
    products: Product[];
}

export const defaultAppState: AppState = {
    event: AppEvent.DEFAULT,
    products: []
};

export interface ProductsAction {
    type: AppEvent.PRODUCTS;
    payload: {
        products: Product[];
    };
}
export type AppAction = ProductsAction;

export const app = {
    products: (products: Product[]): ProductsAction => ({
        type: AppEvent.PRODUCTS,
        payload: { products }
    })
};

export const appReducer = handleActions(
    {
        [AppEvent.PRODUCTS]: (state: AppState, action: ProductsAction) => ({
            ...state,
            event: AppEvent.PRODUCTS,
            products: action.payload.products
        })
    },
    defaultAppState
);
