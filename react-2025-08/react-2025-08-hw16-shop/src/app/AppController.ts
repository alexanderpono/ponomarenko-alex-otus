import { AppStateManager } from 'src/store/AppStateManager';
import { IAppController } from './AppController.types';
import { defaultProduct, ProductType } from 'src/entities/Product';
import { middleText } from 'src/constants/middleText';

export class AppController implements IAppController {
    onAppMount = () => {
        AppStateManager.create().products([
            {
                ...defaultProduct,
                type: ProductType.TOY,
                price: 2999,
                name: 'Котик',
                desc: middleText,
                photo: 'cat.jpg'
            },
            {
                ...defaultProduct,
                type: ProductType.TOY,
                price: 1999,
                name: 'Sed ut perspiciatis, unde omnis',
                desc: middleText
            },
            {
                ...defaultProduct,
                type: ProductType.CAR,
                price: 999,
                name: 'Машинка',
                desc: 'Дешево и сердито'
            }
        ]);
    };
}
