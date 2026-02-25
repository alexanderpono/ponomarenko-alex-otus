import { bool, num, rndAr, rndSize, str } from 'src/testFramework';
import { AppStateManager } from './AppStateManager';
import { app } from './appReducer';
import * as store from './store';
import { defaultProduct, Product } from 'src/entities/Product';
import { castPartialTo } from 'src/testFramework/castPartialTo';
import { Store } from 'redux';
import { Language } from 'src/constants/i18n';
import { Theme } from 'src/constants/Theme';
import { Partition } from 'src/app/AppController.types';
import { Category, defaultCategory } from 'src/entities/Category';
jest.mock('./store');

describe('AppStateManager', () => {
    describe('dispatchers', () => {
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
            method                    | param1           | param2  | expected
            ${'products'}             | ${products}      | ${null} | ${app.products(products)}
            ${'language'}             | ${rndLanguage}   | ${null} | ${app.language(rndLanguage)}
            ${'colorTheme'}           | ${rndTheme}      | ${null} | ${app.colorTheme(rndTheme)}
            ${'isUserAuthorized'}     | ${rndBool}       | ${null} | ${app.isUserAuthorized(rndBool)}
            ${'isLoginFormVisible'}   | ${rndBool}       | ${null} | ${app.isLoginFormVisible(rndBool)}
            ${'isRegistering'}        | ${rndBool}       | ${null} | ${app.isRegistering(rndBool)}
            ${'isEditProductVisible'} | ${rndBool}       | ${null} | ${app.isEditProductVisible(rndBool)}
            ${'editedProduct'}        | ${rndProduct}    | ${null} | ${app.editedProduct(rndProduct)}
            ${'curPartition'}         | ${rndPartition}  | ${null} | ${app.curPartition(rndPartition)}
            ${'categories'}           | ${rndCategories} | ${null} | ${app.categories(rndCategories)}
            ${'curCategoryId'}        | ${rndNum}        | ${null} | ${app.curCategoryId(rndNum)}
            ${'editedCategory'}       | ${rndCategory}   | ${null} | ${app.editedCategory(rndCategory)}
        `('$method() calls store.dispatch', ({ method, param1, param2, expected }) => {
            const dispatchMock = jest.fn();
            jest.spyOn(store, 'getStore').mockReturnValue(
                castPartialTo<Store>({
                    dispatch: dispatchMock
                })
            );

            const model = AppStateManager.create();
            if (param1 !== null && param2 !== null) {
                model[method as keyof AppStateManager].apply(this, [param1, param2]);
            } else if (param1 !== null) {
                model[method as keyof AppStateManager].apply(this, [param1]);
            } else {
                model[method as keyof AppStateManager].apply(this, []);
            }

            expect(dispatchMock).toHaveBeenCalledWith(expected);
        });
    });
});
