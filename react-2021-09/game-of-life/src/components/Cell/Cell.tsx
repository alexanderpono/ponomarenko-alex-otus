import React from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import cn from 'classnames';
import { CELL_HEIGHT, CELL_WIDTH } from '@src/consts';

export interface CellProps {
    num: number;
    showContent: boolean;
    onClick: (num: number) => void;
    isLeft: boolean;
    isRight: boolean;
    isBottom: boolean;
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
    const onClick = () => {
        props.onClick(props.num);
    };
    const frameColor = '#ddd';

    const styles = {
        container: css`
            display: block;
            width: ${props.isRight ? CELL_WIDTH - 2 : CELL_WIDTH - 1}px;
            height: ${props.isBottom ? CELL_HEIGHT - 2 : CELL_HEIGHT - 1}px;
            text-align: center;
            border-top: 1px solid ${frameColor};
            border-left: 1px solid ${frameColor};
            ${props.isRight ? 'border-right: 1px solid ' + frameColor + ';' : ''}
            ${props.isBottom ? 'border-bottom: 1px solid ' + frameColor + ';' : ''}
            cursor: pointer;
            float: left;
            ${props.isLeft ? 'clear: both;' : ''}
            transition-property: background;
            transition-duration: 0.3s;
            transition-timing-function: ease-out;
            background: #555;

            &.show {
                background: #e44;
            }
        `,
        content: css``,
    };

    return (
        <article
            onClick={onClick}
            css={styles.container}
            className={cn({ show: props.showContent })}
        >
            <span className={cn({ show: props.showContent })} css={styles.content}></span>
        </article>
    );
};
