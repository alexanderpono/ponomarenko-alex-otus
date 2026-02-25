import React from 'react';
import styles from './CategoriesPage.scss';
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

interface CategoriesPageProps {
    ctrl: IAppController;
}
export const CategoriesPage: React.FC<CategoriesPageProps> = ({ ctrl }) => {
    // const colorTheme = useSelector(appSelector.colorTheme);
    return (
        <div className={cn(styles.CategoriesPage)}>
            <div className={styles.categoryList}>list</div>
            <div className={styles.curCategory}>info</div>
        </div>
    );
};
export default CategoriesPage;
