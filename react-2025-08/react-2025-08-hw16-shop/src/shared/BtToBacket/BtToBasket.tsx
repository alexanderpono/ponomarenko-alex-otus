import React, { ChangeEvent, useCallback } from 'react';
import styles from './BtToBacket.scss';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';

interface BtToBasketProps {
    count: number;
}
export const BtToBasket: React.FC<BtToBasketProps> = ({ count }) => {
    const colorTheme = useSelector(appSelector.colorTheme);

    const onChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            console.log('count, event.target.value=', count, event.target.value);
        },
        [count]
    );
    return (
        <div
            className={cn(styles.BtToBasket, {
                [styles.grey]: colorTheme === Theme.GREY,
                [styles.blue]: colorTheme === Theme.BLUE
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
