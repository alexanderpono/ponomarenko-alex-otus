import React from 'react';
import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { ShellState } from '@src/bricksEditor/BricksEditorController.types';
import cn from 'classnames';

interface IntroScreenProps {
    ctrl: GameFieldController;
    shellState: ShellState;
}
export const IntroScreen: React.FC<IntroScreenProps> = ({ ctrl, shellState }) => {
    return (
        <section className={styles.introScreen}>
            <div className={styles.bg}></div>
            <div className={styles.content}>
                <div className={styles.win}>
                    <h1>ПРАВИЛА ИГРЫ:</h1>
                    <p>
                        <span className={styles.gold}></span>
                        ПЕРСОНАЖ АВТОМАТИЧЕСКИ ИЩЕТ КРАТЧАЙШИЙ ПУТЬ ДО СУНДУКА{' '}
                    </p>
                    <p className={styles.pretty}>
                        <span className={styles.coin}></span> РАССТАВЬТЕ ИНВЕНТАРЬ ТАК, ЧТОБЫ НА
                        ПУТИ ПЕРСОНАЖА <br /> ОКАЗАЛОСЬ КАК МОЖНО БОЛЬШЕ МОНЕТ
                    </p>
                    <p>ИНВЕНТАРЬ:</p>
                    <p>
                        <span className={cn(styles.stairs, styles.li)}></span> ЛЕСТНИЦА ПОЗВОЛЯЕТ
                        ПОДНЯТЬСЯ ИЛИ СПУСТИТЬСЯ
                    </p>
                    <p>
                        <span className={cn(styles.brick, styles.li)}></span> СТЕНА ПОЗВОЛЯЕТ
                        ЗАКРЫТЬ ПУТЬ
                    </p>
                    <p>
                        <span className={cn(styles.space, styles.li)}></span> ПУСТОТА ПОЗВОЛЯЕТ
                        УБРАТЬ ЛЮБОЙ ЭЛЕМЕНТ С ЭКРАНА
                    </p>
                    <p className={styles.pretty}>
                        <span className={styles.timer}></span> НЕ ЗАТЯГИВАЙТЕ С РЕШЕНИЕМ: ПРИ РАВНОМ
                        КОЛИЧЕСТВЕ <br /> МОНЕТ ПОБЕДИТ ТОТ, КТО РЕШИТ ЗАДАЧУ БЫСТРЕЕ
                    </p>
                    <p>
                        <span className={styles.level}></span> ВАС ЖДЕТ 4 УРОВНЯ. ПРОЙДИТЕ ВСЕ,
                        ЧТОБЫ ЗАВЕРШИТЬ ОБУЧЕНИЕ
                    </p>
                    <div className={styles.bt}>
                        <button onClick={ctrl.onBtToLevel1} className={styles.appBut}>
                            <div>ИГРАТЬ</div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
