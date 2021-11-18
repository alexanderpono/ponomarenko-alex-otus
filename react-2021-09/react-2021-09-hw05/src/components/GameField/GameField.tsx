import React from 'react';
import { AppActions, CellInfo } from '../AppStateController/appReducer';
import { Cell } from '../Cell';

export interface GameFieldProps {
    showAll: boolean;
    data: CellInfo[];
    onCellClick: (num: number) => void;
    widthPixels: number;
    actionId: AppActions;
}

export class GameField extends React.Component<GameFieldProps> {
    onCellClick = (num: number) => {
        this.props.onCellClick(num);
    };

    render() {
        return (
            <section style={{ width: this.props.widthPixels }} role="grid">
                {this.props.data.map((item: CellInfo) => {
                    return (
                        <Cell
                            key={item.id}
                            num={Number(item.id)}
                            showContent={item.visible}
                            onClick={this.onCellClick}
                            caption={String(item.id)}
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
