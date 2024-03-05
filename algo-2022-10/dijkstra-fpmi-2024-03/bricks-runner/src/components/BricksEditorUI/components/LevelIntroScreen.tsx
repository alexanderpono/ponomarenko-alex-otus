import React from 'react';
import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { ShellState } from '@src/bricksEditor/BricksEditorController.types';
import parse from 'html-react-parser';

interface LevelIntroScreenProps {
    ctrl: GameFieldController;
    shellState: ShellState;
}
const replaceAll = (s: string, toReplace: string, toInsert: string): string => {
    return s.split(toReplace).join(toInsert);
};
export const LevelIntroScreen: React.FC<LevelIntroScreenProps> = ({ ctrl, shellState }) => {
    const level = shellState.levels[shellState.levelIndex];
    const introText = replaceAll(level.introText, '[br]', '<br />');
    return (
        <section className={styles.introScreen}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
                <div className={styles.win}>
                    <h1>УРОВЕНЬ {shellState.levelIndex + 1}</h1>
                    <p>{parse(introText)}</p>
                    <div className={styles.bt}>
                        <button
                            onClick={() => ctrl.gotoLevel(shellState.levelIndex)}
                            className={styles.appBut}
                        >
                            <div>ИГРАТЬ</div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
