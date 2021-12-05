import React from 'react';
import { AppActions } from '@src/components/AppStateManager/appReducer';
import { CellInfo } from '@src/components/AppStateManager/playField.types';
import { Cell } from '@components/Cell';
import styled from '@emotion/styled';

export interface GameFieldProps {
    showAll: boolean;
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
                            key={item.id}
                            num={Number(item.id)}
                            showContent={item.visible}
                            onClick={this.onCellClick}
                            caption={String(item.id)}
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
        return (
            nextProps.actionId === AppActions.FIELD_SIZE || nextProps.actionId === AppActions.INVERT
        );
    }
}

export interface ButtonProps {
    active?: boolean;
}

export const FieldContainer = styled.section`
    background: #fff;
`;
