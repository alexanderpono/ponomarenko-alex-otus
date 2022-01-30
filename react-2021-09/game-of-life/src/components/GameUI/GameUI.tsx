import React from 'react';
import { frameCSS } from '@src/consts';
import { GameField } from '@components/GameField';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { TableBg } from '@components/common';
import { useAppState } from '@src/store/hooks';

export interface GameUIProps {
    invert: (num: number) => void;
}
export const GameUI: React.FC<GameUIProps> = ({ ...func }) => {
    const { data, fieldWidth, event } = useAppState();

    return (
        <TableBg>
            <article style={{ display: 'flex', justifyContent: 'center' }}>
                <GameBox>
                    <GameField
                        data={data}
                        onCellClick={func.invert}
                        width={fieldWidth}
                        actionId={event}
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
