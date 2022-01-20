import React from 'react';
import { FillPercent, Size } from '@src/consts';
import {
    AppActions,
    AppState,
    clear,
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
    unsubscribe: () => void = () => {};

    constructor(props: AppStateManagerProps) {
        super(props);
    }

    private setSmall = () => this.props.store.dispatch(fieldSize(Size.SMALL));
    private setMedium = () => this.props.store.dispatch(fieldSize(Size.MIDDLE));
    private setLarge = () => this.props.store.dispatch(fieldSize(Size.LARGE));
    private invert = (num: number) => this.props.store.dispatch(invert(num));
    private clear = () => this.props.store.dispatch(clear());
    private fill25 = () => this.props.store.dispatch(fillPercent(FillPercent.P25));
    private fill50 = () => this.props.store.dispatch(fillPercent(FillPercent.P50));
    private fill75 = () => this.props.store.dispatch(fillPercent(FillPercent.P75));
    private fill100 = () => this.props.store.dispatch(fillPercent(FillPercent.P100));
    private onChangeName = (name: string) => this.props.store.dispatch(user(name));
    private onLogout = () => this.props.store.dispatch(user(''));

    private loadState = () => {
        this.props.store.dispatch(loadState(this.props.storage) as unknown as AnyAction);
    };

    private saveState = (st: AppState) => {
        this.props.store.dispatch(saveState(this.props.storage, st) as unknown as AnyAction);
    };

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(this.storeChange);
        this.loadState();
    }

    storeChange = () => {
        const event = this.props.store.getState().game.event;
        this.forceUpdate();
        if (event !== AppActions.REPLACE_STATE) {
            this.saveState(this.props.store.getState().game);
        }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <AppRouter
                    appState={this.props.store.getState().game}
                    invert={this.invert}
                    setSmall={this.setSmall}
                    setMedium={this.setMedium}
                    setLarge={this.setLarge}
                    clear={this.clear}
                    fill25={this.fill25}
                    fill50={this.fill50}
                    fill75={this.fill75}
                    fill100={this.fill100}
                    onChangeName={this.onChangeName}
                    onLogout={this.onLogout}
                />
            </Provider>
        );
    }
}
