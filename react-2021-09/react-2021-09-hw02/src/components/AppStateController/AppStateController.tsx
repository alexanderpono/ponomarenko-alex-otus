import React from 'react';
import { AppStateView } from '../AppStateView';
import { CELL_WIDTH } from '../Cell';
import { FieldSize } from '../FieldSize';
import { GameField } from '../GameField';
import { appReducer, AppState, defaultAppState, fieldSize, invert } from './appReducer';

export class AppStateController extends React.Component<{}, AppState> {
    state = defaultAppState;

    setSmall = () => {
        this.setState(appReducer(this.state, fieldSize(10, 10)));
    };

    setMedium = () => {
        this.setState(appReducer(this.state, fieldSize(20, 20)));
    };

    setLarge = () => {
        this.setState(appReducer(this.state, fieldSize(30, 30)));
    };

    invert = (num: number) => {
        this.setState(appReducer(this.state, invert(num)));
    };

    render() {
        const showAll = true;
        return (
            <div>
                <h1>Game of life proto</h1>
                <AppStateView appState={this.state} />
                <FieldSize
                    setSmall={this.setSmall}
                    setMedium={this.setMedium}
                    setLarge={this.setLarge}
                />
                <GameField
                    showAll={showAll}
                    data={this.state.data}
                    onCellClick={this.invert}
                    widthPixels={this.state.fieldWidth * CELL_WIDTH}
                />
            </div>
        );
    }
}
