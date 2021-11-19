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
import 'reset-css';

export class AppStateManager extends React.Component<{}, AppState> {
    state: AppState;
    abortController;

    constructor(props: {}) {
        super(props);
        this.state = defaultAppState;
        this.invert = this.invert.bind(this);
        this.abortController = new AbortController();
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
            <>
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
                    actionId={this.state.event}
                />
            </>
        );
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1', {
            signal: this.abortController.signal,
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState(appReducer(this.state, dataFromBack(json)));
            })
            .catch((err) => {
                if (err.name == 'AbortError') {
                    console.log('fetch прерван!');
                }
            });

        document.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount()');
        this.abortController.abort();
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    componentDidUpdate(_: any, prevState: AppState) {
        const maxX = 200;
        if (prevState.mouse.x > maxX) {
            this.setState(appReducer(prevState, mouse({ x: maxX, y: prevState.mouse.y })));
        }
    }
}
