import React from 'react';
import { LARGE_SIZE, MIDDLE_SIZE, SMALL_SIZE } from '../../consts';
import { AppStateView } from '../AppStateView';
import { CELL_WIDTH } from '../Cell';
import { FieldSize } from '../FieldSize';
import { GameField } from '../GameField';
import {
    appReducer,
    AppState,
    dataFromBack,
    defaultAppState,
    fieldSize,
    invert,
    mouse,
} from './appReducer';

export class AppStateController extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        this.state = defaultAppState;
        this.invert = this.invert.bind(this);
    }

    private setSize = (len: number) => this.setState(appReducer(this.state, fieldSize(len, len)));
    private setSmall = () => this.setSize(SMALL_SIZE);
    private setMedium = () => this.setSize(MIDDLE_SIZE);
    private setLarge = () => this.setSize(LARGE_SIZE);
    private invert(num: number) {
        this.setState(appReducer(this.state, invert(num)));
    }
    private onMouseMove = (event: MouseEvent) => {
        this.setState(appReducer(this.state, mouse({ x: event.clientX, y: event.clientY })));
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

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then((response) => response.json())
            .then((json) => this.setState(appReducer(this.state, dataFromBack(json))));

        document.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmout() {
        document.removeEventListener('mousemove', this.onMouseMove);
    }
}
