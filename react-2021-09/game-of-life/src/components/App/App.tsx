import React from 'react';
import { CAPTION_COLOR, Mode, PANEL_BG_COLOR, PANEL_BORDER_COLOR, Speed } from '@src/consts';
import { DefineMode } from '@src/components/DefineMode';
import { FieldSize } from '@components/FieldSize';
import { SetFillPercent } from '@src/components/SetFillPercent';
import { GameField } from '@components/GameField';
import { UserNameForm } from '@components/UserNameForm/UserNameForm';
import { DefineSpeed } from '@src/components/DefineSpeed';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { AppState } from '@src/components/AppStateManager/appReducer';

interface AppProps {
    appState: AppState;
    invert: (num: number) => void;
    setSmall: () => void;
    setMedium: () => void;
    setLarge: () => void;
    clear: () => void;
    fill25: () => void;
    fill50: () => void;
    fill75: () => void;
    fill100: () => void;
}
export const App: React.FC<AppProps> = ({ appState, ...func }) => {
    const dummy = () => {};
    return (
        <TableBg>
            <TopControls>
                <TopBox>
                    <H1>Game of life</H1>
                    <article>
                        <UserNameForm onName={(name) => console.log('name=', name)} />
                    </article>
                </TopBox>
            </TopControls>
            <article style={{ display: 'flex', justifyContent: 'center' }}>
                <GameBox>
                    <GameField
                        data={appState.data}
                        onCellClick={func.invert}
                        width={appState.fieldWidth}
                        actionId={appState.event}
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
                            setSmall={func.setSmall}
                            setMedium={func.setMedium}
                            setLarge={func.setLarge}
                            size={appState.size}
                        />
                    </Buttons>
                    <Caption>Fill percent:</Caption>
                    <Buttons>
                        <SetFillPercent
                            fill0={func.clear}
                            fill25={func.fill25}
                            fill50={func.fill50}
                            fill75={func.fill75}
                            fill100={func.fill100}
                            curPercent={appState.fillPercent}
                        />
                    </Buttons>
                    <Caption>Game speed:</Caption>
                    <Buttons>
                        <DefineSpeed slow={dummy} medium={dummy} fast={dummy} speed={Speed.SLOW} />
                    </Buttons>
                </BottomBox>
            </BottomControls>
        </TableBg>
    );
};

export const H1 = styled.h1`
    text-align: center;
    color: ${CAPTION_COLOR};
    font-size: 130%;
    line-height: 140%;
`;

export const TopControls = styled.section`
    display: flex;
    justify-content: center;
`;
const frameCSS = `
    border: 9px solid ${PANEL_BORDER_COLOR};
    border-radius: 9px;
    box-shadow: 0px 16px 30px 0px #200;
    background: ${PANEL_BG_COLOR};
`;

const TopBox = styled.section`
    display: inline-block;
    width: 400px;
    ${frameCSS}
`;

export const BottomControls = TopControls;

export const BottomBox = styled.section`
    display: inline-block;
    padding-top: 5px;
    width: 400px;
    ${frameCSS}
`;

export const GameBox = styled.section`
    display: flex;
    justify-content: center;
    min-width: 400px;
    ${frameCSS}
`;

export const Caption = styled.div`
    display: block;
    float: left;
    font-size: 14px;
    width: 90px;
    line-height: 27px;
    height: 30px;
    text-align: right;
    margin-right: 5px;
    color: ${CAPTION_COLOR};
`;
export const Buttons = styled.div`
    display: block;
    height: 30px;
`;

export const TableBg = styled.div`
    background: #e9e2d7;
    font-family: Arial, sans-serif;
`;
