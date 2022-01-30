import React from 'react';
import { FillPercent, Size } from '@src/consts';
import {
    AppActions,
    AppState,
    fieldSize,
    fillPercent,
    invert,
    loadState,
    saveState,
    user,
} from '@src/store/ducks/game';

import { StorageService } from '@src/StorageService';
import { AppRouter } from '@src/components/AppRouter';
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

    private loadState = () => {
        this.props.store.dispatch(loadState() as unknown as AnyAction);
    };

    private saveState = (st: AppState) => {
        this.props.store.dispatch(saveState(st) as unknown as AnyAction);
    };

    componentDidMount() {
        this.props.store.subscribe(this.storeChange);
        this.loadState();
    }

    storeChange = () => {
        const event = this.props.store.getState().game.event;
        this.forceUpdate();
        if (
            event !== AppActions.REPLACE_STATE &&
            event !== AppActions.DEFAULT &&
            event !== AppActions.LOAD_STATE &&
            event !== AppActions.SAVE_STATE
        ) {
            this.saveState(this.props.store.getState().game);
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
                />
            </Provider>
        );
    }
}
