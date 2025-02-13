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
            <div className={cn(styles.tip, 'txt')}>ИНВЕНТАРЬ:</div>
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
                                <span className={cn(styles.count, 'txt')}>{item.count}</span>
                            </label>
                        );
                    })}
                </section>
            </div>
            <button onClick={ctrl.onBtStartClick} className={cn(styles.appBut, styles.btGo)}>
                <div>СТАРТ</div>
            </button>
        </>
    );
};
