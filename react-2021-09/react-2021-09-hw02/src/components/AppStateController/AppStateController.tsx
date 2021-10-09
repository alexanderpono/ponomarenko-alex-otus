import React from 'react';
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
                {this.props.children}
                <p>fieldWidth={this.state.fieldWidth}</p>
                <p>fieldHeight={this.state.fieldHeight}</p>
                <button onClick={this.setSmall}>small 10x10</button>
                <button onClick={this.setMedium}>medium 20x20</button>
                <button onClick={this.setLarge}>large 30x30</button>
            </div>
        );
    }
}
