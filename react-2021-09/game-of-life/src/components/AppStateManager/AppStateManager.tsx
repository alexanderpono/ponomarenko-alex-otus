import React from 'react';
import { FillPercent, Size } from '@src/consts';
import {
    AppActions,
    AppState,
    clear,
    fieldSize,
    fillPercent,
    invert,
    setState,
    user,
} from '@src/store/ducks/game';

import { MyStorage } from '@src/MyStorage';
import { AppRouter } from '@src/components/AppRouter';
import { Store } from 'redux';
export interface AppStateManagerProps {
    storage: MyStorage;
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

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(this.storeChange);
        if (this.props.storage.getState() !== null) {
            const st = this.props.storage.getState() as AppState;
            this.props.store.dispatch(setState(st));
        }
    }

    storeChange = () => {
        const event = this.props.store.getState().game.event;
        this.forceUpdate();
        if (event !== AppActions.SET_STATE) {
            this.props.storage.setState(this.props.store.getState().game);
        }
    };

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
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
        );
    }
}
