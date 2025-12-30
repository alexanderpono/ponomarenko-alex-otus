import React, { useContext } from 'react';
import styles from './BtToBacket.scss';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';

interface BtToBasketProps {
    count: number;
}
export const BtToBasket: React.FC<BtToBasketProps> = ({ count }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div
            className={cn(styles.BtToBasket, {
                [styles.grey]: theme === Theme.GREY,
                [styles.blue]: theme === Theme.BLUE
            })}
        >
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
