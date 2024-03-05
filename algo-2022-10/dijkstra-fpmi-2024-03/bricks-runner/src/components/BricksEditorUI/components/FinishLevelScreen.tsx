import React from 'react';
import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { formatTime } from '@src/adapters/formatTime';
import { ShellState, defaultLevelStats } from '@src/bricksEditor/BricksEditorController.types';
import { calcSumma } from '@src/services/calcSumma';

interface FinishLevelScreenProps {
    ctrl: GameFieldController;
    shellState: ShellState;
}
export const FinishLevelScreen: React.FC<FinishLevelScreenProps> = ({ ctrl, shellState }) => {
    const levelStats =
        shellState.levelStats.length > 0
            ? shellState.levelStats[shellState.levelStats.length - 1]
            : { ...defaultLevelStats };

    const currentSumma = calcSumma(shellState.levelStats);
    const finishGame = shellState.levelIndex + 1 >= shellState.levels.length;
    return (
        <section className={styles.finishLevelScreen}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
                <div className={styles.win}>
                    {!shellState.pathIsFound && <h1>ПРОХОД НЕ НАЙДЕН...</h1>}
                    <h1>
                        ПРОЙДЕН УРОВЕНЬ {shellState.levelIndex + 1} / {shellState.levels.length}
                    </h1>
                    <p>
                        КОЛИЧЕСТВО МОНЕТ: {levelStats.coins} <br />
                        ВРЕМЯ РЕШЕНИЯ ЗАДАЧИ: {formatTime(levelStats.time)}
                    </p>
                    <p>
                        ОБЩЕЕ КОЛИЧЕСТВО МОНЕТ: {currentSumma.coins} <br />
                        ОБЩЕЕ ВРЕМЯ РЕШЕНИЯ ЗАДАЧ: {formatTime(currentSumma.time)}
                    </p>
                    {!finishGame && (
                        <button className={styles.appBut} onClick={ctrl.onBtNextLevelClick}>
                            <div>
                                К УРОВНЮ {shellState.levelIndex + 2} / {shellState.levels.length}
                            </div>
                        </button>
                    )}
                    {finishGame && (
                        <div className={styles.bt}>
                            <button className={styles.appBut} onClick={ctrl.onSendResultsClick}>
                                <div>ОК</div>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
