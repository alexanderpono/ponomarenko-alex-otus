import React from 'react';
import styles from './Menu.scss';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController, Partition } from 'src/app/AppController.types';

interface MenuProps {
    ctrl: IAppController;
}
export const Menu: React.FC<MenuProps> = ({ ctrl }) => {
    const colorTheme = useSelector(appSelector.colorTheme);
    const curPartition = useSelector(appSelector.curPartition);
    const cart = useSelector(appSelector.cart);
    return (
        <ul
            className={cn(styles.Menu, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
        >
            <li onClick={ctrl.onProductsClick} className={cn({ [styles.cur]: curPartition === Partition.PRODUCTS })}>
                Products
            </li>
            <li
                onClick={ctrl.onCategoriesClick}
                className={cn({ [styles.cur]: curPartition === Partition.CATEGORIES })}
            >
                Categories
            </li>
            <li onClick={ctrl.onCartClick} className={cn({ [styles.cur]: curPartition === Partition.CART })}>
                Cart{cart.totalCount > 0 ? ` (${cart.totalCount})` : ''}
            </li>
            <li onClick={ctrl.onProfileClick} className={cn({ [styles.cur]: curPartition === Partition.PROFILE })}>
                Profile
            </li>
        </ul>
    );
};
export default Menu;
