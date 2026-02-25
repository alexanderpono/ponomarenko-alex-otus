import { bool, getFromState, getVal, num, rndAr, rndSize, str } from 'src/testFramework';
import { defaultAppState, app, AppEvent, appReducer, AppState } from './appReducer';
import { defaultProduct, Product } from 'src/entities/Product';
import { Action } from 'redux-actions';
import { Language } from 'src/constants/i18n';
import { Theme } from 'src/constants/Theme';
import { Partition } from 'src/app/AppController.types';
import { Category, defaultCategory } from 'src/entities/Category';

describe('appReducer', () => {
    const products: Product[] = rndAr<Product>(rndSize(3, 5), (): Product => {
        return { ...defaultProduct, date: str() } as Product;
    });
    const rndLanguage = str() as Language;
    const rndTheme = str() as Theme;
    const rndBool = bool();
    const rndProduct: Product = { ...defaultProduct, name: str() };
    const rndPartition = str() as unknown as Partition;
    const rndCategory: Category = { ...defaultCategory, name: str() };
    const rndNum = num();
    const rndCategories: Category[] = rndAr<Category>(rndSize(3, 5), (): Category => {
        return { ...defaultCategory, name: str() } as Category;
    });

    test.each`
        actions                                | testName                                                                    | event                               | stateSelector             | value
        ${[app.products(products)]}            | ${'sets .products for AppEvent.PRODUCTS action'}                            | ${AppEvent.PRODUCTS}                | ${'products'}             | ${products}
        ${[app.language(rndLanguage)]}         | ${'sets .language for AppEvent.LANGUAGE action'}                            | ${AppEvent.LANGUAGE}                | ${'language'}             | ${rndLanguage}
        ${[app.colorTheme(rndTheme)]}          | ${'sets .colorScheme for AppEvent.COLOR_THEME action'}                      | ${AppEvent.COLOR_THEME}             | ${'colorTheme'}           | ${rndTheme}
        ${[app.isUserAuthorized(rndBool)]}     | ${'sets .isUserAuthorized for AppEvent.IS_USER_AUTORIZED action'}           | ${AppEvent.IS_USER_AUTORIZED}       | ${'isUserAuthorized'}     | ${rndBool}
        ${[app.isLoginFormVisible(rndBool)]}   | ${'sets .isLoginFormVisible for AppEvent.IS_LOGIN_FORM_VISIBLE action'}     | ${AppEvent.IS_LOGIN_FORM_VISIBLE}   | ${'isLoginFormVisible'}   | ${rndBool}
        ${[app.isRegistering(rndBool)]}        | ${'sets .isRegistering for AppEvent.IS_REGISTERING action'}                 | ${AppEvent.IS_REGISTERING}          | ${'isRegistering'}        | ${rndBool}
        ${[app.isEditProductVisible(rndBool)]} | ${'sets .isEditProductVisible for AppEvent.IS_EDIT_PRODUCT_VISIBLE action'} | ${AppEvent.IS_EDIT_PRODUCT_VISIBLE} | ${'isEditProductVisible'} | ${rndBool}
        ${[app.editedProduct(rndProduct)]}     | ${'sets .editedProduct for AppEvent.EDITED_PRODUCT action'}                 | ${AppEvent.EDITED_PRODUCT}          | ${'editedProduct'}        | ${rndProduct}
        ${[app.curPartition(rndPartition)]}    | ${'sets .curPartition for AppEvent.CUR_PARTITION action'}                   | ${AppEvent.CUR_PARTITION}           | ${'curPartition'}         | ${rndPartition}
        ${[app.categories(rndCategories)]}     | ${'sets .categories for AppEvent.CATEGORIES action'}                        | ${AppEvent.CATEGORIES}              | ${'categories'}           | ${rndCategories}
        ${[app.curCategoryId(rndNum)]}         | ${'sets .curCategoryId for AppEvent.CUR_CATEGORY_ID action'}                | ${AppEvent.CUR_CATEGORY_ID}         | ${'curCategoryId'}        | ${rndNum}
        ${[app.editedCategory(rndCategory)]}   | ${'sets .editedCategory for AppEvent.EDITED_CATEGORY action'}               | ${AppEvent.EDITED_CATEGORY}         | ${'editedCategory'}       | ${rndCategory}
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
