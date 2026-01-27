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
        }
    }
};
