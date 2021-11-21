import React from 'react';
import { LARGE_SIZE, MIDDLE_SIZE, Mode, Size, SMALL_SIZE, Speed } from '@src/consts';
import { AppStateView } from '@components/AppStateView';
import { DefineMode } from '@src/components/DefineMode';
import { FieldSize } from '@components/FieldSize';
import { FlllPercent } from '@components/FlllPercent';
import { GameField } from '@components/GameField';
import { UserNameForm } from '@components/UserNameForm/UserNameForm';
import { DefineSpeed } from '@src/components/DefineSpeed';
import { appReducer, AppState, defaultAppState, fieldSize, invert } from './appReducer';
import '@/node_modules/reset-css/reset.css';

export class AppStateManager extends React.Component<{}, AppState> {
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
                    <GameField
                        showAll={showAll}
                        data={this.state.data}
                        onCellClick={this.invert}
                        width={this.state.fieldWidth}
                        actionId={this.state.event}
                    />
                </article>
                <article>
                    <DefineMode play={dummy} pause={dummy} mode={Mode.PLAY} />
                </article>
                <article>
                    <FieldSize
                        setSmall={this.setSmall}
                        setMedium={this.setMedium}
                        setLarge={this.setLarge}
                        size={Size.SMALL}
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
                    <DefineSpeed slow={dummy} medium={dummy} fast={dummy} speed={Speed.SLOW} />
                </article>
            </div>
        );
    }
}
