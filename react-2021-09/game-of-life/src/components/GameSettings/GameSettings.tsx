import React from 'react';
import { CAPTION_COLOR, FillPercent, frameCSS, Mode, Size, Speed } from '@src/consts';
import { DefineMode } from '@src/components/DefineMode';
import { FieldSize } from '@components/FieldSize';
import { SetFillPercent } from '@src/components/SetFillPercent';
import { DefineSpeed } from '@src/components/DefineSpeed';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { TableBg, TopControls } from '@components/common';
import { useAppState } from '@src/store/hooks';

export interface GameSettingsProps {
    fill: (percent: FillPercent) => void;
    setSize: (size: Size) => void;
}
export const GameSettings: React.FC<GameSettingsProps> = ({ ...func }) => {
    const { size, fillPercent } = useAppState();
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
                        <FieldSize setSize={func.setSize} size={size} />
                    </Buttons>
                    <Caption>Fill percent:</Caption>
                    <Buttons>
                        <SetFillPercent fill={func.fill} curPercent={fillPercent} />
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
