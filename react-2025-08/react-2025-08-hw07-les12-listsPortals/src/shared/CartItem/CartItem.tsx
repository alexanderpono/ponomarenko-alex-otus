import React, { useContext } from 'react';
import styles from './CartItem.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';

interface CartItemProps {
    image: string;
    count: number;
    price: number;
    name: string;
}
export const CartItem: React.FC<CartItemProps> = ({ image, count, price, name }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={cn(styles.CartItem, {
                [styles.grey]: theme === Theme.GREY,
                [styles.blue]: theme === Theme.BLUE
            })}
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
                <BtToBasket count={count} />

                <div className={styles.total}>₽ {count * price}</div>
            </div>

            <div className={styles.remove}>
                <button className={styles.btRemove} aria-label="Удалить товар">
                    ✖️
                </button>
            </div>
        </div>
    );
};
export default CartItem;
