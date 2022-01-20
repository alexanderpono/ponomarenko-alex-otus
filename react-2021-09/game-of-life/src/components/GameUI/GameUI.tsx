import React from 'react';
import { frameCSS } from '@src/consts';
import { GameField } from '@components/GameField';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { AppState } from '@src/store/ducks/game';
import { TableBg } from '@components/common';
import { useSelector } from 'react-redux';
import { RootState } from '@src/store';

export interface GameUIProps {
    invert: (num: number) => void;
}
export const GameUI: React.FC<GameUIProps> = ({ ...func }) => {
    const appState = useSelector<RootState, AppState>((st: RootState) => st.game);

    return (
        <TableBg>
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
        </TableBg>
    );
};

const GameBox = styled.section`
    display: flex;
    justify-content: center;
    min-width: 400px;
    ${frameCSS}
`;
