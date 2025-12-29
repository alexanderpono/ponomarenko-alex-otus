import React from 'react';
import styles from './CartItem.scss';
import BtToBasket from 'src/shared/BtToBacket/BtToBasket';

interface CartItemProps {
    image: string;
    count: number;
    price: number;
    name: string;
}
export const CartItem: React.FC<CartItemProps> = ({ image, count, price, name }) => {
    return (
        <div className={styles.CartItem}>
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
