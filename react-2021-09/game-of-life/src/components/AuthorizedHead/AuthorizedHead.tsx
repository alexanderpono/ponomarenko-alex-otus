import React from 'react';
import { CAPTION_COLOR, frameCSS } from '@src/consts';
import { TableBg, TopControls } from '@components/common';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { Button } from '@components/Button';

export interface AuthorizedHeadProps {
    userName: string;
    onLogout: () => void;
}
export const AuthorizedHead: React.FC<AuthorizedHeadProps> = ({ userName, onLogout }) => {
    return (
        <TableBg>
            <TopControls>
                <TopBox>
                    <H1>Game of life</H1>
                    <article>
                        <LoggedInUser>
                            <Label>{userName} </Label>
                            <Button onClick={onLogout}>Logout</Button>
                        </LoggedInUser>
                    </article>
                </TopBox>
            </TopControls>
        </TableBg>
    );
};

const TopBox = styled.section`
    display: inline-block;
    width: 400px;
    ${frameCSS}
`;

const H1 = styled.h1`
    text-align: center;
    color: ${CAPTION_COLOR};
    font-size: 130%;
    line-height: 140%;
`;

const LoggedInUser = styled.div`
    text-align: center;
`;

const Label = styled.label`
    color: ${CAPTION_COLOR};
    font-size: 14px;
`;
