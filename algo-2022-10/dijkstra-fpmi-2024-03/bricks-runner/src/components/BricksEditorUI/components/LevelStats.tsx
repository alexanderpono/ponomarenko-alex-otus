import React from 'react';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { ShellState } from '@src/bricksEditor/BricksEditorController.types';
import { formatTime } from '@src/adapters/formatTime';
import { calcSumma } from '@src/services/calcSumma';

interface LevelStatsProps {
    shellState: ShellState;
}
export const LevelStats: React.FC<LevelStatsProps> = ({ shellState }) => {
    const currentSumma = calcSumma(shellState.levelStats);
    currentSumma.coins += shellState.coinsTaken;
    return (
        <>
            <article className={styles.statsCoins}>{currentSumma.coins}</article>
            <article className={styles.statsLevel}>
                {shellState.levelIndex + 1}/{shellState.levels.length}
            </article>
            <article className={styles.statsTime}>{formatTime(shellState.levelTime)}</article>
        </>
    );
};
