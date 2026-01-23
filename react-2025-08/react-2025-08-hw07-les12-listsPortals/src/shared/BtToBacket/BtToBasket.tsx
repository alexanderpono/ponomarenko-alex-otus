import React, { ChangeEvent, useCallback, useContext } from 'react';
import styles from './BtToBacket.scss';
import { ThemeContext } from 'src/shared/ThemeContext/ThemeContext';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';

interface BtToBasketProps {
    count: number;
}
export const BtToBasket: React.FC<BtToBasketProps> = ({ count }) => {
    const { theme } = useContext(ThemeContext);
    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            console.log('count, event.target.value=', count, event.target.value);
        },
        [count]
    );
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
                    <input className={styles.input} value={count} onChange={onChange}></input>
                    <div className={styles.minus}></div>
                </>
            )}
        </div>
    );
};
export default BtToBasket;
