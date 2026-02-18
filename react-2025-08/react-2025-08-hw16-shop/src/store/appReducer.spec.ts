import { getFromState, getVal, rndAr, rndSize, str } from 'src/testFramework';
import { defaultAppState, app, AppEvent, appReducer, AppState } from './appReducer';
import { defaultProduct, Product } from 'src/entities/Product';
import { Action } from 'redux-actions';
import { Language } from 'src/shared/I18nContext/I18nContext.types';
import { Theme } from 'src/constants/Theme';

describe('appReducer', () => {
    const products: Product[] = rndAr<Product>(rndSize(3, 5), (): Product => {
        return { ...defaultProduct, date: str() } as Product;
    });
    const rndLanguage = str() as Language;
    const rndTheme = str() as Theme;

    test.each`
        actions                        | testName                                               | event                   | stateSelector   | value
        ${[app.products(products)]}    | ${'sets .products for AppEvent.PRODUCTS action'}       | ${AppEvent.PRODUCTS}    | ${'products'}   | ${products}
        ${[app.language(rndLanguage)]} | ${'sets .language for AppEvent.LANGUAGE action'}       | ${AppEvent.LANGUAGE}    | ${'language'}   | ${rndLanguage}
        ${[app.colorTheme(rndTheme)]}  | ${'sets .colorScheme for AppEvent.COLOR_THEME action'} | ${AppEvent.COLOR_THEME} | ${'colorTheme'} | ${rndTheme}
    `('$testName', async ({ actions, event, stateSelector, value }) => {
        let state: AppState = { ...defaultAppState };
        (actions as Action<AppState>[]).forEach((action) => {
            state = appReducer(state, action) as AppState;
        });
        expect(state.event).toEqual(event);
        if (stateSelector !== null) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
        }
    });
});
