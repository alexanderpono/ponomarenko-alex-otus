import React from 'react';
import { AppStateView } from '../AppStateView';
import { CELL_WIDTH } from '../Cell';
import { FieldSize } from '../FieldSize';
import { GameField } from '../GameField';
import { appReducer, AppState, defaultAppState, fieldSize, invert } from './appReducer';

interface AppProps {}

export class AppStateController extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = defaultAppState;
        this.setSmall = this.setSmall.bind(this);
        this.setMedium = this.setMedium.bind(this);
        this.setLarge = this.setLarge.bind(this);
        this.invert = this.invert.bind(this);
    }

    setSmall() {
        this.setState(appReducer(this.state, fieldSize(10, 10)));
    }
    setMedium() {
        this.setState(appReducer(this.state, fieldSize(20, 20)));
    }
    setLarge() {
        this.setState(appReducer(this.state, fieldSize(30, 30)));
    }
    invert(num: number) {
        this.setState(appReducer(this.state, invert(num)));
    }

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
