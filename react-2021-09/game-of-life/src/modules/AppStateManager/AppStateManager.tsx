import React from 'react';
import { FillPercent, Mode, Size, Speed } from '@src/consts';
import {
    AppActions,
    AppState,
    fieldSize,
    fillPercent,
    invert,
    loadState,
    mode,
    saveState,
    setCounter,
    setSpeed,
    user,
} from '@src/store/ducks/game';

import { StorageService } from '@src/StorageService';
import { AppRouter } from '@src/modules/AppRouter';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
export interface AppStateManagerProps {
    storage: StorageService;
    store: Store;
}

export class AppStateManager extends React.Component<AppStateManagerProps> {
    constructor(props: AppStateManagerProps) {
        super(props);
    }

    private setSize = (size: Size) => this.props.store.dispatch(fieldSize(size));
    private invert = (num: number) => this.props.store.dispatch(invert(num));
    private fill = (percent: FillPercent) => this.props.store.dispatch(fillPercent(percent));
    private onChangeName = (name: string) => this.props.store.dispatch(user(name));
    private onLogout = () => this.props.store.dispatch(user(''));
    private setSpeed = (speed: Speed) => this.props.store.dispatch(setSpeed(speed));

    private loadState = () => {
        this.props.store.dispatch(loadState() as unknown as AnyAction);
    };

    private saveState = (st: AppState) => {
        this.props.store.dispatch(saveState(st) as unknown as AnyAction);
    };
    private mode = (m: Mode) => {
        this.props.store.dispatch(mode(m));
        this.props.store.dispatch(setCounter(0));
    };

    componentDidMount() {
        this.props.store.subscribe(this.storeChange);
        this.loadState();
    }

    storeChange = () => {
        const event = this.props.store.getState().game.event;
        this.forceUpdate();
        if (
            ![
                AppActions.REPLACE_STATE,
                AppActions.DEFAULT,
                AppActions.LOAD_STATE,
                AppActions.SAVE_STATE,
            ].includes(event)
        ) {
            this.saveState(this.props.store.getState().game);
        }

        if (event === AppActions.REPLACE_STATE) {
            const curMode = this.props.store.getState().game.mode;
            if (curMode === Mode.PLAY) {
                setTimeout(() => this.mode(Mode.PLAY), 1000);
            }
        }
    };

    render() {
        return (
            <Provider store={this.props.store}>
                <AppRouter
                    invert={this.invert}
                    setSize={this.setSize}
                    fill={this.fill}
                    onChangeName={this.onChangeName}
                    onLogout={this.onLogout}
                    setMode={this.mode}
                    setSpeed={this.setSpeed}
                    counter={this.props.store.getState().game.counter}
                />
            </Provider>
        );
    }
}
