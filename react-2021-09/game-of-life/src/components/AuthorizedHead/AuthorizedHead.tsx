import React from 'react';
import { CAPTION_COLOR, frameCSS } from '@src/consts';
import { TableBg, TopControls } from '@components/common';
import '@/node_modules/reset-css/reset.css';
import styled from '@emotion/styled';
import { Button } from '@components/Button';
import styles from './AuthorizedHead.scss';
import cn from 'classnames';
export interface AuthorizedHeadProps {
    userName: string;
    onLogout: () => void;
    counter: number;
}
export const AuthorizedHead: React.FC<AuthorizedHeadProps> = ({ userName, onLogout, counter }) => {
    return (
        <TableBg>
            <TopControls>
                <section className={cn(styles.topBox, styles.frame)}>
                    <h1 className={styles.h1}>Game of life</h1>
                    <article>
                        <div className={styles.loggedInUser}>
                            <label className={styles.label}>{userName} </label>
                            <Button onClick={onLogout}>Logout</Button>
                        </div>
                    </article>
                    <article className={styles.counterArticle}>
                        <p>Generation:</p>
                        <p className={styles.counter}>{counter}</p>
                    </article>
                </section>
            </TopControls>
        </TableBg>
    );
};

// const TopBox = styled.section`
//     display: inline-block;
//     position: relative;
//     width: 400px;
//     ${frameCSS}
// `;

// const H1 = styled.h1`
//     text-align: center;
//     color: ${CAPTION_COLOR};
//     font-size: 130%;
//     line-height: 140%;
// `;

// const LoggedInUser = styled.div`
//     text-align: center;
// `;

// const Label = styled.label`
//     color: ${CAPTION_COLOR};
//     font-size: 14px;
// `;

// const CounterArticle = styled.article`
//     color: ${CAPTION_COLOR};
//     font-size: 14px;
//     position: absolute;
//     left: 10px;
//     top: calc(50% - 17px);
//     height: 40px;
// `;

// const Counter = styled.p`
//     color: ${CAPTION_COLOR};
//     margin-top: 11px;
// `;
