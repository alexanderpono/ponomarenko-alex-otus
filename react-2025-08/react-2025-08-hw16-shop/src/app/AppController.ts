import { AppStateManager } from 'src/store/AppStateManager';
import { IAppController } from './AppController.types';
import { defaultProduct, ProductType } from 'src/entities/Product';
import { middleText } from 'src/constants/middleText';
import { Theme } from 'src/constants/Theme';
import { Language } from 'src/constants/i18n';
import { LoginFormValues } from 'src/features/forms/LoginForm/LoginForm.types';

const COLOR_THEME = 'colorTheme';
const LANGUAGE = 'language';

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

        const themeStr = localStorage.getItem(COLOR_THEME);
        this.appSTM.colorTheme(themeStr === Theme.BLUE ? Theme.BLUE : Theme.GREY);

        const languageStr = localStorage.getItem(LANGUAGE);
        this.appSTM.language(languageStr === Language.RU ? Language.RU : Language.EN);

        this.onLoginClick();
    };

    onThemeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newColorTheme = evt.target.value === Theme.BLUE ? Theme.BLUE : Theme.GREY;
        this.appSTM.colorTheme(newColorTheme);
        localStorage.setItem(COLOR_THEME, newColorTheme);
    };

    onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const newLanguage = evt.target.value === Language.RU ? Language.RU : Language.EN;
        this.appSTM.language(newLanguage);
        localStorage.setItem(LANGUAGE, newLanguage);
    };

    onLoginClick = () => {
        console.log('onLoginClick()');
        this.appSTM.isLoginFormVisible(true);
        this.appSTM.isRegistering(false);
    };

    onLogoutClick = () => {
        console.log('onLogoutClick()');
    };

    onLoginSubmit = (values: LoginFormValues) => {
        console.log('onSubmit() values=', values);
        this.appSTM.isLoginFormVisible(false);
    };

    onSelectLogin = () => {
        this.appSTM.isRegistering(false);
    };
    onSelectRegister = () => {
        this.appSTM.isRegistering(true);
    };

    onLoginCloseClick = () => {
        this.appSTM.isLoginFormVisible(false);
    };
}
