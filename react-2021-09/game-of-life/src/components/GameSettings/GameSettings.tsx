import React from 'react';
import { CAPTION_COLOR, frameCSS, Mode, Speed } from '@src/consts';
import { DefineMode } from '@src/components/DefineMode';
import { FieldSize } from '@components/FieldSize';
import { SetFillPercent } from '@src/components/SetFillPercent';
import { DefineSpeed } from '@src/components/DefineSpeed';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { AppState } from '@src/components/AppStateManager/appReducer';
import { TableBg, TopControls } from '@components/common';

export interface GameSettingsProps {
    appState: AppState;
    setSmall: () => void;
    setMedium: () => void;
    setLarge: () => void;
    clear: () => void;
    fill25: () => void;
    fill50: () => void;
    fill75: () => void;
    fill100: () => void;
}
export const GameSettings: React.FC<GameSettingsProps> = ({ appState, ...func }) => {
    const dummy = () => {};
    return (
        <TableBg>
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

const BottomControls = TopControls;

const BottomBox = styled.section`
    display: inline-block;
    padding-top: 5px;
    width: 400px;
    ${frameCSS}
`;

const Caption = styled.div`
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
const Buttons = styled.div`
    display: block;
    height: 30px;
`;
