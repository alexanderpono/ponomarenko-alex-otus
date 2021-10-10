import React from 'react';
import { Cell, CELL_WIDTH, CELL_DEAD, CELL_LIVE } from '../Cell';

export interface GameFieldProps {
    w: number;
    h: number;
    showAll: boolean;
}

export interface GameFieldState {
    widthPixels: number;
    data: boolean[];
}

export class GameField extends React.Component<GameFieldProps, GameFieldState> {
    constructor(props: GameFieldProps) {
        super(props);
        const data: boolean[] = [];
        const cellsNumber = props.w * props.h;
        const startCellState = this.props.showAll ? CELL_LIVE : CELL_DEAD;
        for (let i = 0; i < cellsNumber; i++) {
            data.push(startCellState);
        }
        this.state = { widthPixels: CELL_WIDTH * props.w, data };
        this.onCellClick = this.onCellClick.bind(this);
    }

    onCellClick(num: number, alive: boolean) {
        if (num < 0 || num >= this.state.data.length) {
            return;
        }

        this.setState((oldState) => {
            const newData = oldState.data.concat();
            newData[num] = alive;

            return {
                ...oldState,
                data: newData,
            };
        });
    }

    static getDerivedStateFromProps(props: GameFieldProps, state: GameFieldState) {
        const oldCellsNumber = state.data.length;
        const newCellsNumber = props.w * props.h;
        const newWidthPixels = CELL_WIDTH * props.w;

        if (newCellsNumber > oldCellsNumber) {
            const newData = state.data.concat();
            const startCellState = props.showAll ? CELL_LIVE : CELL_DEAD;
            for (let i = oldCellsNumber; i < newCellsNumber; i++) {
                newData.push(startCellState);
            }
            return {
                ...state,
                data: newData,
                widthPixels: newWidthPixels,
            };
        }

        if (newCellsNumber < oldCellsNumber) {
            const newData = state.data.concat();
            const newWidthPixels = CELL_WIDTH * props.w;
            for (let i = newCellsNumber; i < oldCellsNumber; i++) {
                newData.pop();
            }
            return {
                ...state,
                data: newData,
                widthPixels: newWidthPixels,
            };
        }

        return null;
    }

    render() {
        return (
            <section style={{ width: this.state.widthPixels }}>
                {this.state.data.map((item, index) => {
                    return (
                        <Cell
                            key={index}
                            num={Number(index)}
                            showContent={item}
                            onClick={this.onCellClick}
                        ></Cell>
                    );
                })}
            </section>
        );
    }
}
