import React from 'react';
import { Mode, Size, Speed } from '@src/consts';
import { AppStateView } from '@components/AppStateView';
import { DefineMode } from '@src/components/DefineMode';
import { FieldSize } from '@components/FieldSize';
import { FlllPercent } from '@components/FlllPercent';
import { GameField } from '@components/GameField';
import { UserNameForm } from '@components/UserNameForm/UserNameForm';
import { DefineSpeed } from '@src/components/DefineSpeed';
import { appReducer, AppState, defaultAppState, fieldSize, invert } from './appReducer';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';

export class AppStateManager extends React.Component<{}, AppState> {
    state: AppState;

    constructor(props: {}) {
        super(props);
        this.state = defaultAppState;
        this.invert = this.invert.bind(this);
    }

    private setSmall = () => this.setState(appReducer(this.state, fieldSize(Size.SMALL)));
    private setMedium = () => this.setState(appReducer(this.state, fieldSize(Size.MIDDLE)));
    private setLarge = () => this.setState(appReducer(this.state, fieldSize(Size.LARGE)));
    private invert(num: number) {
        this.setState(appReducer(this.state, invert(num)));
    }

    render() {
        const showAll = true;
        const dummy = () => {};
        return (
            <Table>
                <h1>Game of life proto</h1>
                <article>
                    <UserNameForm onName={(name) => console.log('name=', name)} />
                </article>
                <article>
                    <AppStateView appState={this.state} />
                </article>
                <article style={{ display: 'flex', justifyContent: 'center' }}>
                    <GameBox>
                        <GameField
                            showAll={showAll}
                            data={this.state.data}
                            onCellClick={this.invert}
                            width={this.state.fieldWidth}
                            actionId={this.state.event}
                        />
                    </GameBox>
                </article>
                <BottomControls>
                    <BottomBox>
                        <Caption>Mode:</Caption>
                        <Buttons>
                            <DefineMode play={dummy} pause={dummy} mode={Mode.PLAY} />
                        </Buttons>
                        <Caption>Field size:</Caption>
                        <Buttons>
                            <FieldSize
                                setSmall={this.setSmall}
                                setMedium={this.setMedium}
                                setLarge={this.setLarge}
                                size={this.state.size}
                            />
                        </Buttons>
                        <Caption>Fill percent:</Caption>
                        <Buttons>
                            <FlllPercent
                                fill0={dummy}
                                fill25={dummy}
                                fill50={dummy}
                                fill75={dummy}
                                fill100={dummy}
                            />
                        </Buttons>
                        <Caption>Game speed:</Caption>
                        <Buttons>
                            <DefineSpeed
                                slow={dummy}
                                medium={dummy}
                                fast={dummy}
                                speed={Speed.SLOW}
                            />
                        </Buttons>
                    </BottomBox>
                </BottomControls>
            </Table>
        );
    }
}

export const BottomControls = styled.section`
    display: flex;
    justify-content: center;
`;

export const BottomBox = styled.section`
    display: inline-block;
    border: 9px solid #333;
    border-radius: 9px;
    box-shadow: 0px 16px 30px 0px #200;
    width: 400px;
    background: #555;
`;

export const GameBox = styled.section`
    display: flex;
    justify-content: center;
    border: 9px solid #333;
    border-radius: 9px;
    box-shadow: 0px 16px 30px 0px #200;
    min-width: 400px;
    background: #555;
`;

export const Caption = styled.div`
    display: block;
    float: left;
    font-family: Arial, sans-serif;
    font-size: 14px;
    width: 90px;
    line-height: 27px;
    height: 30px;
    text-align: right;
    margin-right: 5px;
    color: #ddd;
`;
export const Buttons = styled.div`
    display: block;
    height: 30px;
`;

export const Table = styled.div`
    background: #e9e2d7;
`;
