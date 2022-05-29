import React from 'react';
import cn from 'classnames';
import styles from './Cell.scss';

export interface CellProps {
    num: number;
    alive: boolean;
    onClick: (num: number) => void;
    isLeft: boolean;
    isRight: boolean;
    isBottom: boolean;
}

export const Cell: React.FC<CellProps> = ({ num, alive, isLeft, isRight, isBottom, ...func }) => {
    const onClick = () => {
        func.onClick(num);
    };
    return (
        <article
            onClick={onClick}
            className={cn(styles.cell, {
                [styles.show]: alive,
                [styles.left]: isLeft,
                [styles.right]: isRight,
                [styles.bottom]: isBottom,
            })}
        >
            <span data-testid="inner-cell" className={cn({ [styles.show]: alive })}></span>
        </article>
    );
};
