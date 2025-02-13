import React from 'react';
import styles from './UI.scss';
import { IKeyboard } from '@src/ports/keyboard/Keyboard.types';
import cn from 'classnames';
import { UIState } from '@src/types/UIState';
import { Label } from '@src/components/Label';
import { GuardState } from '@src/types/GuardState';
import { ManState } from '@src/types/ManState';

interface Ctrl {
    nodesClicked: () => void;
    linesClicked: () => void;
    pathClicked: () => void;
    nodesCostClicked: () => void;
    mapClicked: () => void;
    guardRunClicked: () => void;
    manRunClicked: () => void;
}
interface UIProps {
    kb: IKeyboard;
    uiState: UIState;
    ctrl: Ctrl;
    guardState: GuardState;
    manState: ManState;
    canvasW: number;
    canvasH: number;
    canvasId: string;
}

export const UI: React.FC<UIProps> = ({ kb, uiState, ctrl, guardState, manState, canvasW, canvasH, canvasId }) => {
    return (
        <div className={cn(styles.ui, 'ui')}>
            <canvas id={canvasId} height={canvasH} width={canvasW}></canvas>
            <div className={cn(styles.playerControls, 'playerControls')}>
                <button id="btLeft" className={cn({ pressed: kb.isLeftPressed })}>
                    &lt;
                </button>
                <button id="btRight" className={cn({ pressed: kb.isRightPressed })}>
                    &gt;
                </button>
                <button id="btDown" className={cn({ pressed: kb.isDownPressed })}>
                    D
                </button>
                <button id="btUp" className={cn({ pressed: kb.isUpPressed })}>
                    U
                </button>
            </div>
            <div className={cn(styles.guardianControls, 'guardianControls')}>
                <button id="btGLeft">&lt;</button>
                <button id="btGRight">&gt;</button>
                <button id="btGDown">D</button>
                <button id="btGUp">U</button>
            </div>
            <div className={cn(styles.uiOptions, 'uiOptions')}>
                {Label(uiState.showNodes, ctrl.nodesClicked, `nodes`, 'Узлы')}
                {Label(uiState.showLines, ctrl.linesClicked, `lines`, 'Ребра')}
                {Label(uiState.showPath, ctrl.pathClicked, `path`, 'Путь')}
                {Label(uiState.showNodesCost, ctrl.nodesCostClicked, `nodesCost`, 'Стоимость')}
                {Label(uiState.showMap, ctrl.mapClicked, `map`, 'Карта')}
            </div>
            <div className={cn(styles.guardCtrl2, 'guardCtrl2')}>
                {Label(guardState.run, ctrl.guardRunClicked, `guardRun`, 'Бежать')}
            </div>
            <div className={cn(styles.manCtrl2, 'manCtrl2')}>
                {Label(manState.run, ctrl.manRunClicked, `manRun`, 'Бежать')}
            </div>
        </div>
    );
};
