import { AppStateManager } from 'src/store/AppStateManager';
import { IAppController } from './AppController.types';
import { defaultProduct, ProductType } from 'src/entities/Product';
import { middleText } from 'src/constants/middleText';
import { Theme } from 'src/constants/Theme';

export class AppController implements IAppController {
    private appSTM: AppStateManager = null;

    constructor() {
        this.appSTM = AppStateManager.create();
    }

    onAppMount = () => {
        this.appSTM.products([
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

        const themeStr = localStorage.getItem('colorTheme');
        this.appSTM.colorTheme(themeStr === Theme.BLUE ? Theme.BLUE : Theme.GREY);
    };

    onThemeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newColorTheme = evt.target.value === Theme.BLUE ? Theme.BLUE : Theme.GREY;
        this.appSTM.colorTheme(newColorTheme);
        localStorage.setItem('colorTheme', newColorTheme);
    };
}
