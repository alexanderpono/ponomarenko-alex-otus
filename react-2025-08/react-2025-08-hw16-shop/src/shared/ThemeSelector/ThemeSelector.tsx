import React, { useContext } from 'react';
import styles from './ThemeSelector.scss';
import { Theme } from 'src/constants/Theme';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';

interface ThemeSelectorProps {
    ctrl: IAppController;
}
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ ctrl }) => {
    const colorTheme = useSelector(appSelector.colorTheme);

    const { language, i18n } = useContext(I18nContext);
    const translations = i18n[language].themeSelector;

    return (
        <>
            <div className={styles.ThemeSelector}>
                <span>{translations.caption}</span>
                <select className={styles.select} value={colorTheme} onChange={ctrl.onThemeChange}>
                    <option value={Theme.GREY}>{translations.grey}</option>
                    <option value={Theme.BLUE}>{translations.blue}</option>
                </select>
            </div>
        </>
    );
};
export default ThemeSelector;
