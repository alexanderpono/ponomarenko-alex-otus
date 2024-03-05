import React from 'react';
import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { formatTime } from '@src/adapters/formatTime';
import { ShellState } from '@src/bricksEditor/BricksEditorController.types';
import { calcSumma } from '@src/services/calcSumma';

interface GameOverScreenProps {
    ctrl: GameFieldController;
    shellState: ShellState;
}
export const GameOverScreen: React.FC<GameOverScreenProps> = ({ ctrl, shellState }) => {
    const currentSumma = calcSumma(shellState.levelStats);

    return (
        <section className={styles.gameOverScreen}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
                <div className={styles.win}>
                    <h1>ПОЗДРАВЛЯЕМ! ОБУЧЕНИЕ ЗАВЕРШЕНО!</h1>
                    <div className={styles.bt}>
                        <button className={styles.appBut} onClick={ctrl.onSendResultsClick}>
                            <div>ОК</div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
