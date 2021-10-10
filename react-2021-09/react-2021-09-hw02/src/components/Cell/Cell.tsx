import React from 'react';
// this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import cn from 'classnames';

export const CELL_WIDTH = 20;
export const CELL_HEIGHT = 20;
export const CELL_DEAD = false;
export const CELL_LIVE = true;

const styles = {
    container: css`
        display: block;
        width: ${CELL_WIDTH - 2}px;
        height: ${CELL_HEIGHT - 2}px;
        text-align: center;
        border: 1px solid red;
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
    onClick?: Function;
}

export interface CellState {
    showContent: boolean;
}

export class Cell extends React.Component<CellProps, CellState> {
    constructor(props: CellProps) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { showContent: this.props.showContent === true };
    }

    onClick() {
        const triggeredState = !this.state.showContent;
        this.setState((prevState) => ({ ...prevState, showContent: triggeredState }));
        if (typeof this.props.onClick === 'function') {
            this.props.onClick(this.props.num, triggeredState);
        }
    }

    render() {
        return (
            <article onClick={this.onClick} css={styles.container}>
                <span className={cn({ show: this.state.showContent })} css={styles.content}>
                    {this.props.num}
                </span>
            </article>
        );
    }
}
