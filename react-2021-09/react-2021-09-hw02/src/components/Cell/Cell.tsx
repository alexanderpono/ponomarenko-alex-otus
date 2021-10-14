import React from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import cn from 'classnames';

export const CELL_WIDTH = 20;
export const CELL_HEIGHT = 20;

const styles = {
    container: css`
        display: block;
        width: ${CELL_WIDTH - 2}px;
        height: ${CELL_HEIGHT - 2}px;
        text-align: center;
        border: 1px solid red;
        cursor: pointer;
        float: left;
    `,
    content: css`
        transition-property: opacity;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
        opacity: 0%;

        &.show {
            opacity: 100%;
        }
    `,
};

export interface CellProps {
    num: number;
    showContent: boolean;
    caption: string;
    onClick: (num: number) => void;
}

export const Cell: React.FC<CellProps> = (props: CellProps) => {
    const onClick = () => {
        props.onClick(props.num);
    };

    return (
        <article onClick={onClick} css={styles.container}>
            <span className={cn({ show: props.showContent })} css={styles.content}>
                {props.caption.substring(props.caption.length - 2)}
            </span>
        </article>
    );
};
