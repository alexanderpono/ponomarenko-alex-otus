import React from 'react';
import { AppFC } from '../AppFC';
import { AppStateView } from '../AppStateView';
import { FieldSize } from '../FieldSize';
import { appReducer, AppState, defaultAppState, fieldSize } from './appReducer';

interface AppProps {}

export class AppStateController extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = defaultAppState;
        this.setSmall = this.setSmall.bind(this);
        this.setMedium = this.setMedium.bind(this);
        this.setLarge = this.setLarge.bind(this);
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

    render() {
        return (
            <div>
                <AppFC />
                <AppStateView appState={this.state} />
                <FieldSize
                    setSmall={this.setSmall}
                    setMedium={this.setMedium}
                    setLarge={this.setLarge}
                />
            </div>
        );
    }
}
