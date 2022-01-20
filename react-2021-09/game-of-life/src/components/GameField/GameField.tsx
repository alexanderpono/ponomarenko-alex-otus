import React from 'react';
import { AppActions } from '@src/store/ducks/game';
import { CellInfo } from '@src/types';
import { Cell } from '@components/Cell';
import styled from '@emotion/styled';

export interface GameFieldProps {
    data: CellInfo[];
    onCellClick: (num: number) => void;
    width: number;
    actionId: AppActions;
}

export class GameField extends React.Component<GameFieldProps> {
    onCellClick = (num: number) => {
        this.props.onCellClick(num);
    };

    render() {
        const widthMinus1 = this.props.width - 1;
        const heightMinus1 = Math.floor(this.props.data.length / this.props.width) - 1;
        return (
            <FieldContainer role="grid">
                {this.props.data.map((item: CellInfo, index: number) => {
                    const y = Math.floor(index / this.props.width);
                    const x = index % this.props.width;
                    const isRight = x === widthMinus1;
                    const isBottom = y === heightMinus1;
                    const isLeft = x === 0;
                    return (
                        <Cell
                            key={`${y}-${x}`}
                            num={index}
                            alive={item === CellInfo.alive}
                            onClick={this.onCellClick}
                            isLeft={isLeft}
                            isRight={isRight}
                            isBottom={isBottom}
                        ></Cell>
                    );
                })}
                <div style={{ clear: 'both' }}></div>
            </FieldContainer>
        );
    }

    shouldComponentUpdate(nextProps: GameFieldProps) {
        const result =
            [
                AppActions.FILL_PERCENT,
                AppActions.FIELD_SIZE,
                AppActions.INVERT,
                AppActions.CLEAR,
                AppActions.SAVE_STATE,
            ].indexOf(nextProps.actionId) >= 0;
        return result;
    }
}

export interface ButtonProps {
    active?: boolean;
}

export const FieldContainer = styled.section`
    background: #fff;
`;
