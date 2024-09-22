import React from 'react';
import { GameFieldController } from '@src/components/GameFieldUI/Game.types';
import styles from '@src/components/BricksEditorUI/BricksEditorUI.scss';
import { ShellState } from '@src/bricksEditor/BricksEditorController.types';
import cn from 'classnames';
import { Cell } from '@src/game/GameField';

interface DevelopControlsProps {
    ctrl: GameFieldController;
    shellState: ShellState;
}
export const DevelopControls: React.FC<DevelopControlsProps> = ({ ctrl, shellState }) => {
    return (
        <section className={styles.develop}>
            <div className={styles.editInventory}>
                <button
                    className={cn(styles.brick, {
                        [styles.cur]: shellState.curChar === Cell.wall
                    })}
                    onClick={ctrl.handleClickBtBrick}
                ></button>
                <button
                    className={cn(styles.stairs, {
                        [styles.cur]: shellState.curChar === Cell.stairs
                    })}
                    onClick={ctrl.handleClickBtStairs}
                ></button>
                <button
                    className={cn(styles.gold, {
                        [styles.cur]: shellState.curChar === Cell.gold
                    })}
                    onClick={ctrl.handleClickBtGold}
                ></button>
                <button
                    className={cn(styles.space, {
                        [styles.cur]: shellState.curChar === Cell.space
                    })}
                    onClick={ctrl.handleClickBtSpace}
                ></button>
                <button
                    className={cn(styles.coin, {
                        [styles.cur]: shellState.curChar === Cell.coin
                    })}
                    onClick={ctrl.handleClickBtCoin}
                ></button>
            </div>
            <div className={styles.wrapLoad}>
                <input
                    type="file"
                    name="file"
                    className={styles.btLoad}
                    onChange={ctrl.onUploadFileChange}
                />
            </div>
            <button className={styles.save} onClick={ctrl.handleClickBtSaveAs}>
                СОХРАНИТЬ&nbsp;УРОВЕНЬ
            </button>
        </section>
    );
};
