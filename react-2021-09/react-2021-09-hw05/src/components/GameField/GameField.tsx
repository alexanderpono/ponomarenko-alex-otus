import React from 'react';
import { AppActions } from '@components/AppStateController/appReducer';
import { CellInfo } from '@components/AppStateController/playField.types';
import { Cell, CELL_WIDTH } from '@components/Cell';

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
            <section style={{ width: this.props.width * CELL_WIDTH }} role="grid">
                {this.props.data.map((item: CellInfo, index: number) => {
                    const y = Math.floor(index / this.props.width);
                    const x = index % this.props.width;
                    const isRight = x === widthMinus1;
                    const isBottom = y === heightMinus1;
                    return (
                        <Cell
                            key={item.id}
                            num={Number(item.id)}
                            showContent={item.visible}
                            onClick={this.onCellClick}
                            caption={String(item.id)}
                            isRight={isRight}
                            isBottom={isBottom}
                        ></Cell>
                    );
                })}
            </section>
        );
    }

    shouldComponentUpdate(nextProps: GameFieldProps) {
        return (
            nextProps.actionId === AppActions.FIELD_SIZE || nextProps.actionId === AppActions.INVERT
        );
    }
}
