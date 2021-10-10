import React from 'react';
import { Cell } from '../Cell';

export interface CellInfo {
    id: string;
    visible: boolean;
}

export interface GameFieldProps {
    showAll: boolean;
    data: CellInfo[];
    onCellClick: (num: number) => void;
    widthPixels: number;
}

export const GameField: React.FC<GameFieldProps> = (props: GameFieldProps) => {
    const onCellClick = (num: number) => {
        props.onCellClick(num);
    };

    return (
        <section style={{ width: props.widthPixels }}>
            {props.data.map((item: CellInfo) => {
                return (
                    <Cell
                        key={item.id}
                        num={Number(item.id)}
                        showContent={item.visible}
                        onClick={onCellClick}
                        caption={String(item.id)}
                    ></Cell>
                );
            })}
        </section>
    );
};
