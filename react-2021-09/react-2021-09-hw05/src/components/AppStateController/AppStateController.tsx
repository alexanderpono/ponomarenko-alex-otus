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

type CancelablePromise = { promise: Promise<any>; cancel: () => void };

//makeCancelable() defined by @istarkov
const makeCancelable = (promise: Promise<any>): CancelablePromise => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            (val) => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
            (error) => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};

export class AppStateController extends React.Component<{}, AppState> {
    state: AppState;
    _isMounted: boolean;
    _cancelablePromise: CancelablePromise | null;

    constructor(props: {}) {
        super(props);
        this.state = defaultAppState;
        this.invert = this.invert.bind(this);
        this._isMounted = false;
        this._cancelablePromise = null;
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
                    actionId={this.state.event}
                />
            </div>
        );
    }

    componentDidMount() {
        this._isMounted = true;

        this._cancelablePromise = makeCancelable(
            fetch('https://jsonplaceholder.typicode.com/todos/1')
                .then((response) => response.json())
                .then((json) => {
                    if (this._isMounted) {
                        this.setState(appReducer(this.state, dataFromBack(json)));
                    }
                })
                .catch((e) => {
                    console.log('exception e=', JSON.stringify(e));
                })
        );

        this._cancelablePromise.promise.catch((e) => {
            console.log('exception2 e=', JSON.stringify(e));
        });

        document.addEventListener('mousemove', this.onMouseMove);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this._cancelablePromise?.cancel();
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    componentDidUpdate(_: any, prevState: AppState) {
        const maxX = 200;
        if (prevState.mouse.x > maxX) {
            this.setState(appReducer(prevState, mouse({ x: maxX, y: prevState.mouse.y })));
        }
    }
}
