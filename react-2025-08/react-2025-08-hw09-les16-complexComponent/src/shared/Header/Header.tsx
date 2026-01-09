import React, { useContext } from 'react';
import styles from './Header.scss';
import Logo from 'src/shared/Logo/Logo';
import ThemeSelector from 'src/shared/ThemeSelector/ThemeSelector';
import cn from 'classnames';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';
import { Theme } from 'src/constants/Theme';
import LanguageSelector from 'src/shared/LanguageSelector/LanguageSelector';

export const Header: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={cn(styles.Header, { [styles.grey]: theme === Theme.GREY, [styles.blue]: theme === Theme.BLUE })}
        >
            <Logo />
            <ThemeSelector />
            <LanguageSelector />
        </div>
    );
};
export default Header;
