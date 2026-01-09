import React, { useContext } from 'react';
import styles from './LanguageSelector.scss';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';
import { Language } from 'src/shared/I18nContext/I18nContext.types';

export const LanguageSelector: React.FC = () => {
    const { language, i18n, setLanguage } = useContext(I18nContext);

    const onLanguageChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(evt.target.value as Language);
    };

    const translations = i18n[language].languageSelector;

    return (
        <>
            <div className={styles.LanguageSelector}>
                <span>{translations.caption}</span>
                <select className={styles.select} value={language} onChange={onLanguageChange}>
                    <option value={'en'}>{translations.en}</option>
                    <option value={'ru'}>{translations.ru}</option>
                </select>
            </div>
        </>
    );
};
export default LanguageSelector;
