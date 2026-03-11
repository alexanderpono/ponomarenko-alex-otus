import React from 'react';
import styles from './Menu.scss';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController, Partition } from 'src/app/AppController.types';
import { i18n } from 'src/constants/i18n';

interface MenuProps {
    ctrl: IAppController;
}
export const Menu: React.FC<MenuProps> = ({ ctrl }) => {
    const colorTheme = useSelector(appSelector.colorTheme);
    const curPartition = useSelector(appSelector.curPartition);
    const cart = useSelector(appSelector.cart);
    const language = useSelector(appSelector.language);
    const translations = i18n[language].menu;
    return (
        <ul
            className={cn(styles.Menu, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
        >
            <li onClick={ctrl.onProductsClick} className={cn({ [styles.cur]: curPartition === Partition.PRODUCTS })}>
                {translations.products}
            </li>
            <li
                onClick={ctrl.onCategoriesClick}
                className={cn({ [styles.cur]: curPartition === Partition.CATEGORIES })}
            >
                {translations.categories}
            </li>
            <li onClick={ctrl.onCartClick} className={cn({ [styles.cur]: curPartition === Partition.CART })}>
                {translations.cart} {cart.totalCount > 0 ? ` (${cart.totalCount})` : ''}
            </li>
            <li onClick={ctrl.onProfileClick} className={cn({ [styles.cur]: curPartition === Partition.PROFILE })}>
                {translations.profile}
            </li>
        </ul>
    );
};
export default Menu;
