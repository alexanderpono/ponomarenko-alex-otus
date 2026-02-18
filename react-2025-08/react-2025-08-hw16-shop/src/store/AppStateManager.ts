import { getStore } from './store';
import { app, AppAction, AppState } from './appReducer';
import { Product } from 'src/entities/Product';

const dispatch = (action: AppAction) => getStore().dispatch(action);

export class AppStateManager {
    getApp = (): AppState => getStore().getState().app as AppState;
    products = (products: Product[]) => dispatch(app.products(products));

    static create(): AppStateManager {
        return new AppStateManager();
    }
}
