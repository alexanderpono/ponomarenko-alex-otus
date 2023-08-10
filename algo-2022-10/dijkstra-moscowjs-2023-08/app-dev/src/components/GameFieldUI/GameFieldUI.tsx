import { GameField, Point2D } from '@src/game/GameField';
import React from 'react';
import { GRField } from '@src/ports/GRField';
import { GRGraph } from '@src/ports/GRGraph';
import { AbstractGraph } from '@src/game/Graph.types';
import { GameFieldController, GameState, RenderOptions } from './Game.types';
import { GRGold } from '@src/ports/GRGold';
import { GRMan } from '@src/ports/GRMan';
import { GRSelect } from '@src/ports/GRSelect';

interface GameFieldUIProps {
    field: GameField;
    emptyField: GameField;
    graph: AbstractGraph;
    id: string;
    title: string;
    canvasW?: number;
    canvasH?: number;
    canvas: HTMLCanvasElement;
    ctrl: GameFieldController;
    gameState: GameState;
    picLoaded: boolean;
}

export const GameFieldUI = React.forwardRef<HTMLCanvasElement, GameFieldUIProps>(
    (
        {
            field,
            graph,
            id,
            title,
            canvasW,
            canvasH,
            canvas,
            ctrl,
            gameState,
            emptyField,
            picLoaded
        },
        canvasRef
    ) => {
        React.useEffect(() => {
            if (!picLoaded) {
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
                nodesShortCost: gameState.nodesShortCost,
                map: gameState.mapChecked,
                showBtMap: gameState.showBtMap,
                highlightCells: gameState.highlightCells
            };

            GRField.create(context, emptyField, gameState.pic, options).draw();
            GRGold.create(context, gameState.goldScreenXY, gameState.pic).draw();
            GRGraph.create(context, field, graph, options).draw();
            GRMan.create(
                context,
                gameState.manScreenXY,
                gameState.manAni,
                gameState.pic,
                gameState.miniCounter
            ).draw();
            gameState.highlightCells.forEach((point: Point2D) => {
                GRSelect.create(context, point, gameState.pic).draw();
            });
        }, [gameState, canvas, graph, picLoaded]);

        return (
            <div style={{ width: '720px' }}>
                <h3>{title}</h3>
                <canvas height={canvasH} width={canvasW} id="GraphUI" ref={canvasRef}></canvas>
                {gameState.showControls && (
                    <div>
                        {Label(gameState.nodesChecked, ctrl.nodesClicked, `${id}-nodes`, 'Узлы')}
                        {Label(gameState.linesChecked, ctrl.linesClicked, `${id}-lines`, 'Ребра')}
                        {Label(gameState.pathChecked, ctrl.pathClicked, `${id}-path`, 'Путь')}
                        {Label(
                            gameState.nodesCostChecked,
                            ctrl.nodesCostClicked,
                            `${id}-nodesCost`,
                            'Стоимость'
                        )}
                        {gameState.showBtMap &&
                            Label(gameState.mapChecked, ctrl.mapClicked, `${id}-map`, 'Карта')}
                        <button onClick={ctrl.onBtStartClick} className="appButton">
                            Старт
                        </button>
                        <button onClick={ctrl.onBtClearClick} className="appButton">
                            Стоп
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
