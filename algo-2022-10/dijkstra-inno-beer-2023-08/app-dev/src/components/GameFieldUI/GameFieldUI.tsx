import { GameField } from '@src/game/GameField';
import React from 'react';
import { GRField } from '@src/ports/GRField';
import { GRGraph } from '@src/ports/GRGraph';
import { AbstractGraph } from '@src/game/Graph.types';
import { GameFieldController, GameState } from './Game.types';

export interface RenderOptions {
    nodes: boolean;
    lines: boolean;
    path: boolean;
    nodesCost: boolean;
    map: boolean;
}
export const defaultRenderOptions: RenderOptions = {
    nodes: false,
    lines: false,
    path: false,
    nodesCost: false,
    map: false
};

interface GameFieldUIProps {
    field: GameField;
    graph: AbstractGraph;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    canvas: HTMLCanvasElement;
    ctrl: GameFieldController;
    gameState: GameState;
}

export const GameFieldUI = React.forwardRef<HTMLCanvasElement, GameFieldUIProps>(
    ({ field, graph, id, title, canvasW, canvasH, canvas, ctrl, gameState }, canvasRef) => {
        React.useEffect(() => {
            if (!gameState.picLoaded) {
                return;
            }

            if (canvas === null) {
                return;
            }
            const context = canvas.getContext('2d') as CanvasRenderingContext2D;
            context.fillStyle = 'orange';
            context.strokeStyle = '#FF0000';
            context.lineWidth = 3;
            context.strokeRect(0, 0, canvas.width, canvas.height);

            if (canvas === null || context === null || graph === null) {
                return;
            }

            const options: RenderOptions = {
                nodes: gameState.nodesChecked,
                lines: gameState.linesChecked,
                path: gameState.pathChecked,
                nodesCost: gameState.nodesCostChecked,
                map: gameState.mapChecked
            };

            GRField.create(context, field, gameState.pic, options).draw();
            GRGraph.create(context, field, graph, options).draw();
        }, [gameState, canvas, graph]);

        return (
            <div style={{ width: '720px' }}>
                <h3>{title}</h3>
                <canvas height={canvasH} width={canvasW} id="GraphUI" ref={canvasRef}></canvas>
                {gameState.showControls && (
                    <div>
                        {Label(gameState.nodesChecked, ctrl.nodesClicked, `${id}-nodes`, 'Узлы')}
                        {Label(gameState.linesChecked, ctrl.linesClicked, `${id}-lines`, 'Ребра')}
                        {Label(gameState.pathChecked, ctrl.pathClicked, `${id}-path`, 'Траектория')}
                        {Label(
                            gameState.nodesCostChecked,
                            ctrl.nodesCostClicked,
                            `${id}-nodesCost`,
                            'Стоимость узлов'
                        )}
                        {Label(gameState.mapChecked, ctrl.mapClicked, `${id}-map`, 'Карта')}
                        <button onClick={ctrl.onBtStartClick} className="appButton">
                            Start
                        </button>
                        <button onClick={ctrl.onBtClearClick} className="appButton">
                            Clear
                        </button>
                    </div>
                )}
            </div>
        );
    }
);

export function Label(val: boolean, setter: () => void, id: string, caption: string) {
    return (
        <label htmlFor={id}>
            <input type="checkbox" checked={val} onChange={setter} id={id} />
            {caption}
        </label>
    );
}
