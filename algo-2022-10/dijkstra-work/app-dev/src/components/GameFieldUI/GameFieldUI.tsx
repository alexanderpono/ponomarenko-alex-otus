import { GameField, Point2D } from '@src/game/GameField';
import React from 'react';
import { GRField } from '@src/ports/GRField';
import { GRGraph } from '@src/ports/GRGraph';
import { AbstractGraph } from '@src/game/Graph.types';
import { GameFieldController, GameState, RenderOptions } from './Game.types';
import { GRGold } from '@src/ports/GRGold';
import { GRMan } from '@src/ports/GRMan';
import { GRSelect } from '@src/ports/GRSelect';
import parse from 'html-react-parser';

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
                showBtNodes: gameState.showBtNodes,
                showBtEdges: gameState.showBtEdges,
                showBtStartStop: gameState.showBtStartStop,
                highlightCells: gameState.highlightCells,
                showBtPath: gameState.showBtPath,
                showBtCost: gameState.showBtCost,
                showProgress: gameState.showProgress,
                curVertexIndex: gameState.curVertexIndex
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
            <>
                <h3>{parse(title)}</h3>
                <div className="canvas">
                    <canvas height={canvasH} width={canvasW} id="GraphUI" ref={canvasRef}></canvas>
                </div>
                {gameState.showControls && (
                    <div className="controls">
                        {gameState.showBtNodes &&
                            Label(gameState.nodesChecked, ctrl.nodesClicked, `${id}-nodes`, 'Узлы')}
                        {gameState.showBtEdges &&
                            Label(
                                gameState.linesChecked,
                                ctrl.linesClicked,
                                `${id}-lines`,
                                'Ребра'
                            )}
                        {gameState.showBtPath &&
                            Label(gameState.pathChecked, ctrl.pathClicked, `${id}-path`, 'Путь')}
                        {gameState.showBtCost &&
                            Label(
                                gameState.nodesCostChecked,
                                ctrl.nodesCostClicked,
                                `${id}-nodesCost`,
                                'Стоимость'
                            )}
                        {gameState.showBtMap &&
                            Label(gameState.mapChecked, ctrl.mapClicked, `${id}-map`, 'Карта')}
                        {gameState.showBtStartStop && (
                            <>
                                <button onClick={ctrl.onBtStartClick} className="appButton">
                                    Старт
                                </button>
                                <button onClick={ctrl.onBtClearClick} className="appButton">
                                    Стоп
                                </button>
                            </>
                        )}
                        {gameState.showProgress && (
                            <>
                                <button onClick={ctrl.onBtToStartClick} className="appButton">
                                    |&lt;
                                </button>
                                <button onClick={ctrl.onBtPrevClick} className="appButton">
                                    &lt;
                                </button>
                                <button onClick={ctrl.onBtNextClick} className="appButton">
                                    &gt;
                                </button>
                                <button onClick={ctrl.onBtNextJumpClick} className="appButton">
                                    &gt;&gt;
                                </button>
                                <button onClick={ctrl.onBtToFinishClick} className="appButton">
                                    &gt;|
                                </button>
                                <label>
                                    {gameState.maxCalcStep}
                                    <input
                                        type="range"
                                        name="volume"
                                        min="0"
                                        max="200"
                                        value={gameState.maxCalcStep}
                                        onChange={ctrl.onMaxStepChange}
                                    />
                                </label>
                            </>
                        )}
                    </div>
                )}
            </>
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
