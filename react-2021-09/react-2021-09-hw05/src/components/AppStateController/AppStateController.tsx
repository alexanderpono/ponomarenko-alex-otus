import React from 'react';
import { LARGE_SIZE, MIDDLE_SIZE, SMALL_SIZE } from '../../consts';
import { AppStateView } from '../AppStateView';
import { Control } from '../Control';
import { FieldSize } from '../FieldSize';
import { FlllPercent } from '../FlllPercent';
import { GameField } from '../GameField';
import { UserNameForm } from '../UserNameForm/UserNameForm';
import { Speed } from '../Speed';
import { appReducer, AppState, defaultAppState, fieldSize, invert } from './appReducer';

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

    render() {
        const showAll = true;
        const dummy = () => {};
        return (
            <div>
                <h1>Game of life proto</h1>
                <article>
                    <UserNameForm onName={(name) => console.log('name=', name)} />
                </article>
                <article>
                    <AppStateView appState={this.state} />
                </article>
                <article>
                    <FieldSize
                        setSmall={this.setSmall}
                        setMedium={this.setMedium}
                        setLarge={this.setLarge}
                    />
                </article>
                <article>
                    <FlllPercent
                        fill0={dummy}
                        fill25={dummy}
                        fill50={dummy}
                        fill75={dummy}
                        fill100={dummy}
                    />
                </article>
                <article>
                    <Speed slow={dummy} medium={dummy} fast={dummy} speed={1} />
                </article>
                <article>
                    <Control play={dummy} pause={dummy} clear={dummy} />
                </article>
                <article>
                    <GameField
                        showAll={showAll}
                        data={this.state.data}
                        onCellClick={this.invert}
                        width={this.state.fieldWidth}
                        actionId={this.state.event}
                    />
                </article>
            </div>
        );
    }
}
