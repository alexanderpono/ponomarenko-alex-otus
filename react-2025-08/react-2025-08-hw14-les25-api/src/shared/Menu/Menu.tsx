import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Menu.scss';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { i18n } from 'src/constants/i18n';
import { Partition } from 'src/app/AppController.types';

export const Menu: React.FC = () => {
    const colorTheme = useSelector(appSelector.colorTheme);
    const language = useSelector(appSelector.language);
    const cart = useSelector(appSelector.cart);
    const isUserAuthorized = useSelector(appSelector.isUserAuthorized);
    const location = useLocation();
    const translations = i18n[language].menu;

    const getActivePartition = (): Partition | null => {
        const path = location.pathname;
        if (path.includes('/products')) return Partition.PRODUCTS;
        if (path.includes('/categories')) return Partition.CATEGORIES;
        if (path.includes('/cart')) return Partition.CART;
        if (path.includes('/profile')) return Partition.PROFILE;
        return null;
    };

    const isActive = (partition: Partition) => getActivePartition() === partition;
    return (
        <ul
            className={cn(styles.Menu, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
            role="navigation"
            aria-label="Основное меню"
        >
            <li onClick={(e) => e.preventDefault()} className={cn({ [styles.cur]: isActive(Partition.PRODUCTS) })}>
                <Link to={`/products`}>{translations.products}</Link>
            </li>

            {isUserAuthorized && (
                <li
                    onClick={(e) => e.preventDefault()}
                    className={cn({ [styles.cur]: isActive(Partition.CATEGORIES) })}
                >
                    <Link to={`/categories`}>{translations.categories}</Link>
                </li>
            )}

            <li onClick={(e) => e.preventDefault()} className={cn({ [styles.cur]: isActive(Partition.CART) })}>
                <Link to={`/cart`}>
                    {translations.cart} {cart.totalCount > 0 ? ` (${cart.totalCount})` : ''}
                </Link>
            </li>

            {isUserAuthorized && (
                <li onClick={(e) => e.preventDefault()} className={cn({ [styles.cur]: isActive(Partition.PROFILE) })}>
                    <Link to={`/profile`}>{translations.profile}</Link>
                </li>
            )}
        </ul>
    );
};

export default Menu;
