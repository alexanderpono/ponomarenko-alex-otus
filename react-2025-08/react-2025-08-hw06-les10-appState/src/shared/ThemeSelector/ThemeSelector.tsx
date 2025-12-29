import React, { useContext } from 'react';
import styles from './ThemeSelector.scss';
import { Theme } from 'src/constants/Theme';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';

export const ThemeSelector: React.FC = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const onThemeChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(evt.target.value);
    };

    console.log('theme=', theme);

    return (
        <>
            <div className={styles.ThemeSelector}>
                <span>Цветовая схема:</span>
                <select value={theme} onChange={onThemeChange}>
                    <option value={Theme.GREY}>Серая</option>
                    <option value={Theme.BLUE}>Синяя</option>
                </select>
            </div>
        </>
    );
};
export default ThemeSelector;
