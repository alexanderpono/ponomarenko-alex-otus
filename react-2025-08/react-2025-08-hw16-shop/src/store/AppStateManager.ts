import { getStore } from './store';
import { app, AppAction, AppState } from './appReducer';
import { Product } from 'src/entities/Product';
import { Language } from 'src/shared/I18nContext/I18nContext.types';
import { Theme } from 'src/constants/Theme';

const dispatch = (action: AppAction) => getStore().dispatch(action);

export class AppStateManager {
    getApp = (): AppState => getStore().getState().app as AppState;
    products = (products: Product[]) => dispatch(app.products(products));
    language = (language: Language) => dispatch(app.language(language));
    colorTheme = (colorTheme: Theme) => dispatch(app.colorTheme(colorTheme));

    static create(): AppStateManager {
        return new AppStateManager();
    }
}
