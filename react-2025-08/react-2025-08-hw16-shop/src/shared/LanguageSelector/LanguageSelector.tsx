import React from 'react';
import styles from './LanguageSelector.scss';
import { i18n } from 'src/constants/i18n';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';

interface LanguageSelectorProps {
    ctrl: IAppController;
}
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ ctrl }) => {
    const language = useSelector(appSelector.language);
    const translations = i18n[language].languageSelector;

    return (
        <>
            <div className={styles.LanguageSelector}>
                <span>{translations.caption}</span>
                <select className={styles.select} value={language} onChange={ctrl.onLanguageChange}>
                    <option value={'en'}>{translations.en}</option>
                    <option value={'ru'}>{translations.ru}</option>
                </select>
            </div>
        </>
    );
};
export default LanguageSelector;
