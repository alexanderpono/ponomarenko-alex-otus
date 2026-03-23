import React, { ChangeEvent, useCallback } from 'react';
import styles from './BtToBacket.scss';
import cn from 'classnames';
import { Theme } from 'src/constants/Theme';
import { useSelector } from 'react-redux';
import { appSelector } from 'src/store/selectors';

interface BtToBasketProps {
    count: number;
    onPlusClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
    onMinusClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
}
export const BtToBasket: React.FC<BtToBasketProps> = ({ count, onPlusClick, onMinusClick }) => {
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
            {count === 0 && <div className={styles.basket} onClick={onPlusClick}></div>}
            {count > 0 && (
                <>
                    <div className={styles.plus} onClick={onPlusClick}></div>
                    <input className={styles.input} value={count} onChange={onChange}></input>
                    <div className={styles.minus} onClick={onMinusClick}></div>
                </>
            )}
        </div>
    );
};
export default BtToBasket;
