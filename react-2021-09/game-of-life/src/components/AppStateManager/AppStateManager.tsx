import React from 'react';
import { FillPercent, Size } from '@src/consts';
import { clear, fieldSize, fillPercent, invert, user } from '@src/store/ducks/game';

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

    private onChangeName = (name: string) => {
        this.props.store.dispatch(user(name));
        this.props.storage.setName(name);
    };
    private onLogout = () => {
        this.props.store.dispatch(user(''));
        this.props.storage.clearName();
    };

    componentDidMount() {
        this.unsubscribe = this.props.store.subscribe(this.storeChange);
        if (this.props.storage.getName() !== null) {
            this.onChangeName(this.props.storage.getName() as string);
        }
    }

    storeChange = () => {
        this.forceUpdate();
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
