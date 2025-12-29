import React from 'react';
import styles from './BtToBacket.scss';

interface BtToBasketProps {
    count: number;
}
export const BtToBasket: React.FC<BtToBasketProps> = ({ count }) => {
    return (
        <div className={styles.BtToBasket}>
            {count === 0 && <div className={styles.basket}></div>}
            {count > 0 && (
                <>
                    <div className={styles.plus}></div>
                    <input className={styles.input} value={count}></input>
                    <div className={styles.minus}></div>
                </>
            )}
        </div>
    );
};
export default BtToBasket;
