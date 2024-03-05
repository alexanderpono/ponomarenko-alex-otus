import React from 'react';
import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { InventoryItem, ShellState } from '@src/bricksEditor/BricksEditorController.types';
import cn from 'classnames';

interface GameLevelControlsProps {
    ctrl: GameFieldController;
    shellState: ShellState;
}
export const GameLevelControls: React.FC<GameLevelControlsProps> = ({ ctrl, shellState }) => {
    return (
        <>
            <div className={styles.tip}>ПЕРСОНАЖ АВТОМАТИЧЕСКИ ИЩЕТ КРАТЧАЙШИЙ ПУТЬ ДО СУНДУКА</div>
            <div className={styles.tip}>
                1. ОТРЕДАКТИРУЙТЕ УРОВЕНЬ ПРИ&nbsp;ПОМОЩИ ИНВЕНТАРЯ ТАК, ЧТОБЫ НА ПУТИ ПЕРСОНАЖА
                ОКАЗАЛОСЬ КАК МОЖНО БОЛЬШЕ МОНЕТ:
            </div>
            <div className={styles.inventory}>
                {shellState.inventory.map((item: InventoryItem) => {
                    return (
                        <div key={item.name}>
                            <input
                                type="radio"
                                id={item.name}
                                name="category"
                                value={item.char}
                                onChange={ctrl.handleSelectInventoryItem}
                            />
                        </div>
                    );
                })}
                <section className={styles.categories}>
                    {shellState.inventory.map((item: InventoryItem) => {
                        return (
                            <label
                                key={item.name}
                                htmlFor={item.name}
                                id={`${item.name}-label`}
                                className={cn({
                                    [styles.cur]: item.char === shellState.curChar
                                })}
                            >
                                <span className={item.name}></span>
                                <span className={styles.count}>{item.count}</span>
                            </label>
                        );
                    })}
                </section>
            </div>
            <div className={styles.tip}>2. НАЖМИТЕ НА&nbsp;КНОПКУ:</div>
            <button onClick={ctrl.onBtStartClick} className={cn(styles.appBut, styles.btGo)}>
                <div>СТАРТ</div>
            </button>
        </>
    );
};
