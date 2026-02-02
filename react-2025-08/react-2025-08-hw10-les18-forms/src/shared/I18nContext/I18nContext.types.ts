export enum Language {
    EN = 'en',
    RU = 'ru'
}

export interface I18nContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    i18n: {
        [key in Language]: {
            example: {
                modalHeader: string;
                modalText: string;
                category: string;
            };
            languageSelector: {
                caption: string;
                ru: string;
                en: string;
            };
            themeSelector: {
                caption: string;
                grey: string;
                blue: string;
            };
            profileForm: {
                name: string;
                about: string;
                submit: string;
                cancel: string;
            };
            loginForm: {
                login: string;
                password: string;
                repeatPassword: string;
                submit: string;
            };
            registerForm: {
                login: string;
                password: string;
                repeatPassword: string;
                submit: string;
            };
            editProductForm: {
                image: string;
                price: string;
                name: string;
                category: string;
                description: string;
                submit: string;
                cancel: string;
            };
            errors: {
                mustBePositive: string;
                required: string;
                max32Length: string;
                max2048Length: string;
                passwordsMustBeEqual: string;
            };
        };
    };
}

// Define language-specific text
export const i18n: I18nContextType['i18n'] = {
    en: {
        languageSelector: {
            caption: 'Language:',
            ru: 'Russian',
            en: 'English'
        },
        themeSelector: {
            caption: 'Color scheme:',
            grey: 'grey',
            blue: 'blue'
        },
        example: {
            modalHeader: 'Modal Header',
            modalText: 'Modal text',
            category: 'Cats'
        },
        profileForm: {
            name: 'Name',
            about: 'About',
            submit: 'Save',
            cancel: 'Cancel'
        },
        loginForm: {
            login: 'Login',
            password: 'Password',
            repeatPassword: 'Repeat password',
            submit: 'Sign in'
        },
        registerForm: {
            login: 'Login',
            password: 'Password',
            repeatPassword: 'Repeat password',
            submit: 'Sign up'
        },
        editProductForm: {
            image: 'Image',
            price: 'Price',
            name: 'Name',
            category: 'Category',
            description: 'Description',
            submit: 'Save',
            cancel: 'Cancel'
        },
        errors: {
            mustBePositive: 'Must be positive',
            required: 'This field is required',
            max32Length: 'Should be max 32 characters length',
            max2048Length: 'Should be max 2048 characters length',
            passwordsMustBeEqual: 'Passwords must be equal'
        }
    },
    ru: {
        languageSelector: {
            caption: 'Язык:',
            ru: 'русский',
            en: 'английский'
        },
        themeSelector: {
            caption: 'Цветовая схема:',
            grey: 'серая',
            blue: 'синяя'
        },
        example: {
            modalHeader: 'Заголовок',
            modalText: 'Текст писать ту-тут',
            category: 'Котики'
        },
        profileForm: {
            name: 'Имя',
            about: 'О себе',
            submit: 'Сохранить',
            cancel: 'Отменить'
        },
        loginForm: {
            login: 'Логин',
            password: 'Пароль',
            repeatPassword: 'Повторите пароль',
            submit: 'Войти'
        },
        registerForm: {
            login: 'Логин',
            password: 'Пароль',
            repeatPassword: 'Повторите пароль',
            submit: 'Зарегистрироваться'
        },
        editProductForm: {
            image: 'Изображение',
            price: 'Цена',
            name: 'Название',
            category: 'Категория',
            description: 'Описание',
            submit: 'Сохранить',
            cancel: 'Отмена'
        },
        errors: {
            mustBePositive: 'Должно быть больше 0',
            required: 'Обязательное поле',
            max32Length: 'Должно быть не длиннее 32 символов',
            max2048Length: 'Должно быть не длиннее 2048 символов',
            passwordsMustBeEqual: 'Пароли должны совпадать'
        }
    }
};
