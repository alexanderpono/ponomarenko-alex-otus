import React from 'react';
import styles from './Header.scss';
import Logo from 'src/shared/Logo/Logo';
import ThemeSelector from 'src/shared/ThemeSelector/ThemeSelector';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import LanguageSelector from 'src/shared/LanguageSelector/LanguageSelector';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';

interface HeaderProps {
    ctrl: IAppController;
}
export const Header: React.FC<HeaderProps> = ({ ctrl }) => {
    const colorTheme = useSelector(appSelector.colorTheme);
    return (
        <div
            className={cn(styles.Header, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
        >
            <Logo />
            <ThemeSelector ctrl={ctrl} />
            <LanguageSelector />
        </div>
    );
};
export default Header;
