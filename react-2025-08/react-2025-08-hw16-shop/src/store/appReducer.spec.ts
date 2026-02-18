import { getFromState, getVal, rndAr, rndSize, str } from 'src/testFramework';
import { defaultAppState, app, AppEvent, appReducer, AppState, AppAction } from './appReducer';
import { defaultProduct, Product } from 'src/entities/Product';

describe('appReducer', () => {
    const products: Product[] = rndAr<Product>(rndSize(3, 5), (): Product => {
        return { ...defaultProduct, date: str() } as Product;
    });

    test.each`
        actions                     | testName                                         | event                | stateSelector | value
        ${[app.products(products)]} | ${'sets .products for AppEvent.PRODUCTS action'} | ${AppEvent.PRODUCTS} | ${'products'} | ${products}
    `('$testName', async ({ actions, event, stateSelector, value }) => {
        let state: AppState = { ...defaultAppState };
        (actions as AppAction[]).forEach((action) => {
            state = appReducer(state, action) as AppState;
        });
        expect(state.event).toEqual(event);
        if (stateSelector !== null) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(getFromState(state, stateSelector)).toEqual(getVal(actions, value));
        }
    });
});
