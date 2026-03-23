import React from 'react';
import styles from './CartItem.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';
import { IAppController } from 'src/app/AppController.types';

export interface CartItemProps {
    image: string;
    count: number;
    price: number;
    name: string;
    ctrl: IAppController;
    productId: string;
}
export const CartItem: React.FC<CartItemProps> = ({ image, count, price, name, ctrl, productId }) => {
    const colorTheme = useSelector(appSelector.colorTheme);

    return (
        <div
            className={cn(styles.CartItem, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
            })}
            data-productid={productId}
        >
            {image && (
                <div className={styles.image}>
                    <img src={image} alt={name} />
                </div>
            )}
            {!image && <div className={styles.defaultImage}></div>}

            <div className={styles.info}>
                <div className={styles.title}>{name}</div>
                <div className={styles.price}>₽ {price}</div>
                <BtToBasket count={count} onPlusClick={ctrl.onPlusClick} onMinusClick={ctrl.onMinusClick} />

                <div className={styles.total}>₽ {count * price}</div>
            </div>

            <div className={styles.remove}>
                <button className={styles.btRemove} aria-label="Удалить товар" onClick={ctrl.onCartItemDelClick}>
                    ✖️
                </button>
            </div>
        </div>
    );
};
export default CartItem;
