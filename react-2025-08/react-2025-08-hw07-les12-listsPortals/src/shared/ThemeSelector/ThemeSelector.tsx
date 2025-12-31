import React, { useContext } from 'react';
import styles from './ThemeSelector.scss';
import { Theme } from 'src/constants/Theme';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';
import { I18nContext } from 'src/shared/I18nContext/I18nContext';

export const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const onThemeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(evt.target.value);
    };

    const { language, i18n } = useContext(I18nContext);
    const translations = i18n[language].themeSelector;

    return (
        <>
            <div className={styles.ThemeSelector}>
                <span>{translations.caption}</span>
                <select className={styles.select} value={theme} onChange={onThemeChange}>
                    <option value={Theme.GREY}>{translations.grey}</option>
                    <option value={Theme.BLUE}>{translations.blue}</option>
                </select>
            </div>
        </>
    );
};
export default ThemeSelector;
