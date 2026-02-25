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
import ProfileButton from 'src/shared/ProfileButton/ProfileButton';
import Menu from 'src/shared/Menu/Menu';

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
            <div className={styles.logo}>
                <Logo />
            </div>
            <div className={styles.color}>
                <ThemeSelector ctrl={ctrl} />
            </div>
            <div className={styles.language}>
                <LanguageSelector ctrl={ctrl} />
            </div>
            <div className={styles.profile}>
                <ProfileButton ctrl={ctrl} />
            </div>
            <div className={styles.menu}>
                <Menu ctrl={ctrl} />
            </div>
        </div>
    );
};
export default Header;
